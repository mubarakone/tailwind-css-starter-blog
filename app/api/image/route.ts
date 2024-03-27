import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export default async function handler(request: NextRequest) {
    if (request.method !== 'GET') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    // Extract the filename query parameter
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('filename');
    
    if (!filename) {
        return new NextResponse('Filename is required', { status: 400 });
    }

    const filePath = path.join('/tmp', filename);

    try {
        if (!fs.existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);

        // Create a response with the image content
        const response = new NextResponse(fileBuffer);
        response.headers.set('Content-Type', 'image/png'); // Adjust the content type based on your image format

        return response;
    } catch (error) {
        console.error('Error serving the image:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
