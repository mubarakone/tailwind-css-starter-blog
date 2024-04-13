import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';

let QStashCallbackCalled = false;

async function isFrameRequest(obj): Promise<boolean> {
    const body: FrameRequest = obj;
    const { isValid } = await getFrameMessage(body)

    if (isValid) {
        return true
    } else {
        return false
    }
}

async function handleCallback(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();

    try {

        if (await isFrameRequest(body)) {

            return handleFrameRequest(body)

        } else {

            QStashCallbackCalled = true;

            return new NextResponse(JSON.stringify({ success: true, message: 'Callback returns true' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

    } catch (error) {

        return new NextResponse(JSON.stringify({ success: false, message: 'JSON Payload does not return a FrameRequest or Callback' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    }
}

async function handleFrameRequest(obj): Promise<NextResponse> {
    const body: FrameRequest = obj;
    const { isValid } = await getFrameMessage(body);

    if (isValid) {
        console.log('QStash Callback: ', QStashCallbackCalled)

        if (QStashCallbackCalled) {
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
    return handleCallback(req);
}
  
export const dynamic = 'force-dynamic';