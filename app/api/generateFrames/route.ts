import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@upstash/qstash";

const qstashClient = new Client({
    // Add your token to a .env file
    token: process.env.NEXT_PUBLIC_QSTASH_TOKEN!,
  });

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

   async function startBackgroundJob() {
    try {
        const response = await qstashClient.publishJSON({
            url: "https://newspaper.tips/api/handleGenerateFrames",
            body: { hello: "world" },
            callback: "https://newspaper.tips/api/handleCallback"
          });

        if (response) {
            console.log("Background job began!")
            return true;
        }
    } catch (error) {
        console.log("Background job failed to start")
        return false
    }
   }

  if (isValid) {
    startBackgroundJob()
    console.log("Background job began!")
  }

  return new NextResponse(
    getFrameHtmlResponse({ 
      buttons: [
        {
          action: 'post',
          label: '🔄 Refresh',
        },
      ],
      image: {
        src: 'https://newspaper.tips/generating-summary.png',
        aspectRatio: '1:1',
      },
      postUrl: `https://newspaper.tips/api/handleCallback`,
    }),
  );

}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';