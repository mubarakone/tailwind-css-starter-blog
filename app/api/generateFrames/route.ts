import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { fetchMDXContent } from '../fetchMDXContent';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from 'app/firebaseConfig';
import OpenAI from 'openai';
import fetch from 'node-fetch';

export const runtime = 'edge';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
});

async function readFileAndGenerateSummary(filePath: string) {
    // const fullPath = path.join(process.cwd(), filePath);
    const mdxContent = await fetchMDXContent(filePath)

    const response = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "Summarize this entire article into 6 snippets. Each snippet must be at least 40 words, but no more than 60 words."},
            {role: "user", content: mdxContent},
        ],
        model: "gpt-3.5-turbo"
    });

    return response.choices[0].message.content;
}

async function generateAndSaveImage(textSnippet: string, index: number, storage): Promise<void> {

    const apiUrl = 'https://newspaper.tips/api/og'; // Adjust this URL to your actual API endpoint
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textSnippet })
    });

    const metadata = {
        contentType: 'image/png',
        contentDisposition: 'inline',
      };

    const buffer = await response.arrayBuffer();
    const fileName = `snippet_${index}.png`;

    const storageRef = ref(storage, 'images/' + fileName);
    const snapshot = await uploadBytes(storageRef, buffer, metadata)
    if (snapshot) {
        console.log('Uploaded a blob or file!: ', snapshot);
    } else {
        console.log('Upload failed')
    }
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  const storage = getStorage(app);

  if (isValid) {
    const filePath = 'https://newspaper.tips/data/blog/release-of-tailwind-nextjs-starter-blog-v2.0.mdx'
    console.log('filePath is: ', filePath)
    // Read the file
    // Generate the summary
    const summary = await readFileAndGenerateSummary(filePath);

    if (summary) {
      console.log('summary: ', summary)
      // Split summary into 6 parts
      const textParts = summary.split(/\n(?=\d+\. )/).map(part => part.replace(/^\d+\. /, ''));
        if (textParts) {
            console.log('textParts: ', textParts)
            // Generate 6 PNG images of the 6 part summary text
            await Promise.all(
                textParts.map((part, index) => generateAndSaveImage(part, index, storage))
            );
        }
    }
  }

  return new NextResponse(
    getFrameHtmlResponse({ 
      buttons: [
        {
          action: 'post',
          label: '⬅️ Back',
        },
        {
          label: `1/6`,
        },
        {
          action: 'post',
          label: 'Next ➡️',
        },
      ],
      image: {
        src: 'http://34.36.130.28/images/snippet_0.png',
        aspectRatio: '1:1',
      },
      postUrl: `https://newspaper.tips/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';