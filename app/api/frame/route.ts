'use client'
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { useState } from 'react';

const [frameID, setFrameID] = useState(0)

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {allowFramegear: true});

  if (isValid) {
    console.log("isValid: ", isValid)
    if (message?.button === 1) {
        setFrameID(frameID - 1);
        console.log("message.button === 1: ", message)
    }
    
    if (message?.button === 3) {
        setFrameID(frameID + 1);
        console.log("message.button === 3: ", message)
    }
  }

  console.log("isValid: ", isValid)
  console.log("message: ", message)

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'post',
          label: '⬅️ Back',
        },
        {
          label: `${frameID}/6`,
        },
        {
          action: 'post',
          label: 'Next ➡️',
        },
      ],
      image: {
        src: `http://localhost:3000/park-3.png`,
        aspectRatio: '1:1',
      },
      postUrl: `http://localhost:3000/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';