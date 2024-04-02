import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from 'canvas';
import { fetchMDXContent } from '../fetchMDXContent';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from 'app/firebaseConfig';
import fs from 'fs'
import OpenAI from 'openai';
import path from 'path'
import fetch from 'node-fetch';

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

// function wrapText(context, text, x, y, maxWidth, lineHeight) {
//     const words = text.split(' ');
//     let line = '';

//     for(let n = 0; n < words.length; n++) {
//         const testLine = line + words[n] + ' ';
//         const metrics = context.measureText(testLine);
//         const testWidth = metrics.width;
//         if (testWidth > maxWidth && n > 0) {
//             context.fillText(line, x, y);
//             line = words[n] + ' ';
//             y += lineHeight;
//         }
//         else {
//             line = testLine;
//         }
//     }
//     context.fillText(line, x, y);
// }

async function generateAndSaveImage(textSnippet: string, index: number, storage): Promise<void> {

    // const canvas = createCanvas(800, 800); // Adjust size as needed
    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = '#fff';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = '#000';
    // ctx.font = '56px';
    // wrapText(ctx, textSnippet, 20, 60, 780, 55); // You might need to adjust maxWidth and lineHeight

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

    const buffer = await response.buffer();
    const fileName = `snippet_${index}.png`;

    const storageRef = ref(storage, 'images/' + fileName);
    await uploadBytes(storageRef, buffer, metadata)

    console.log('Uploaded a blob or file!: ');
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  const storage = getStorage(app);

  if (isValid) {
//  const frameURL = 
//  const filePath = `data/blog/${frameURL}.mdx`
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