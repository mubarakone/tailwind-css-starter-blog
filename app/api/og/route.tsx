import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';

interface SnippetRequest {
    textSnippet: string;
}

export const runtime = 'edge';

export default async function (req: NextRequest, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            const { textSnippet } = req.body as unknown as SnippetRequest;

            return new ImageResponse(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#f4f4f4',
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            border: '1px solid #ddd',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: '50px',
              height: '50px',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="#0070f3"
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>
          <p
            style={{
              fontSize: '40px',
              textAlign: 'justify',
              marginTop: '60px',
              width: '95%',
            }}
          >
            {textSnippet}
          </p>
        </div>
            );
        } catch (e) {
            console.log(`${e.message}`);
            return new Response(`Failed to generate the image`, {
                status: 500,
            });
        }
    } else {
        return new Response(`Method Not Allowed`, {
            status: 405,
        });
    }
}
