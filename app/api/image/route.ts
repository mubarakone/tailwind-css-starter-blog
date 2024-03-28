// app/routes/api/image.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';


export const runtime = 'edge';

async function fetchImage(request: NextRequest): Promise<NextResponse> {
    // Extract the filename query parameter
    const searchParams = request.nextUrl.searchParams
    const filename = searchParams.get('filename');
    if (!filename) {
        return new NextResponse('Filename is required', { status: 400 });
    }

    const filePath = path.join('/tmp', filename);

    try {
        // Ensure the file exists
        if (!fs.existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }

        // Read the image file from the temporary directory
        const fileBuffer = fs.readFileSync(filePath);

        // Create a response with the image content
        const response = new NextResponse(fileBuffer);
        response.headers.set('Content-Type', 'image/png'); // Adjust the content type based on your image format

        // // Optionally delete the file after serving
        // fs.unlinkSync(filePath);

        return response;
    } catch (error) {
        console.error('Error serving the image:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    return fetchImage(request)
}
