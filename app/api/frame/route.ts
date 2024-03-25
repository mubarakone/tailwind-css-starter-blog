import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

let frameID = 0;
let firstFrameCalled = false

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {allowFramegear: true});

  if (isValid) {
    if (message?.button === 1) {
        frameID--;
    }
    
    if (message?.button === 3) {
        frameID++;
    }
  }

  if (firstFrameCalled) {
    if (frameID === 0) {
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                      label: ' ',
                    },
                    {
                      label: `${frameID}/6`,
                    },
                    {
                      action: 'post',
                      label: 'Preview ↪️',
                    },
                  ],
                  image: {
                    // Image is located in the public directory. Works perfectly during development (with localhost domain of course)
                    src: `https://newspaper.tips/first-frame-article.png`,
                    aspectRatio: '1:1',
                  },
                  postUrl: `https://newspaper.tips/api/frame`,
            }),
          );
      }
    
      if (frameID === 7) {
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
                  action: 'link',
                  label: 'Continue Reading 📖',
                  target: 'https://newspaper.tips/latest/blog/release-of-tailwind-nextjs-starter-blog-v2.0'
                },
              ],
              image: {
                src: `https://newspaper.tips/last-frame-article.png`,
                aspectRatio: '1:1',
              },
              postUrl: `https://newspaper.tips/api/frame`,
            }),
          );
      }
    
      if (frameID !== 0) {
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
                src: `https://newspaper.tips/generated_images/snippet_${frameID - 1}.png`,
                aspectRatio: '1:1',
              },
              postUrl: `https://newspaper.tips/api/frame`,
            }),
          );
      }
  }

  firstFrameCalled = true;

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: ' ',
        },
        {
          label: `0/6`,
        },
        {
          action: 'post',
          label: 'Next ➡️',
        },
      ],
      image: {
        src: `https://newspaper.tips/first-frame-article.png`,
        aspectRatio: '1:1',
      },
      postUrl: `https://newspaper.tips/api/generateFrames`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';