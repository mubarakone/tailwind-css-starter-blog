import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from 'canvas';
import fs from 'fs'
import OpenAI from 'openai';
import path from 'path'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION,
});

async function readFileAndGenerateSummary(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const mdxContent = fs.readFileSync(fullPath, 'utf8');

    const response = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "Summarize this entire article into 6 snippets. Each snippet can only be 40 words max."},
            {role: "user", content: mdxContent},
        ],
        model: "gpt-3.5-turbo"
    });

    return response.choices[0].message.content;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for(let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function generateAndSaveImage(textSnippet: string, index: number) {
    // Define the folder to save images
    const folderPath = path.join(process.cwd(), 'public', 'generated_images');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const canvas = createCanvas(800, 800); // Adjust size as needed
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '56px Arial';
    wrapText(ctx, textSnippet, 20, 60, 780, 55); // You might need to adjust maxWidth and lineHeight

    const buffer = canvas.toBuffer('image/png');
    const fileName = `snippet_${index}.png`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, buffer);
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (isValid) {
//  const frameURL = 
//  const filePath = `data/blog/${frameURL}.mdx`
    const filePath = 'data/blog/release-of-tailwind-nextjs-starter-blog-v2.0.mdx'
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
                textParts.map((part, index) => generateAndSaveImage(part, index))
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
        src: `https://newspaper.tips/generated_images/snippet_0.png`,
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