import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// This is a regular API route, not an Edge function
export default async function(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'GET') {
        return response.status(405).send('Method Not Allowed');
    }

    const { filename } = request.query;

    if (!filename || typeof filename !== 'string') {
        return response.status(400).send('Filename is required');
    }

    const filePath = path.join('/tmp', filename);

    try {
        if (!fs.existsSync(filePath)) {
            return response.status(404).send('File not found');
        }

        const fileBuffer = fs.readFileSync(filePath);
        response.setHeader('Content-Type', 'image/png'); // Adjust the content type as needed
        return response.send(fileBuffer);
    } catch (error) {
        console.error('Error serving the image:', error);
        return response.status(500).send('Internal Server Error');
    }
}
