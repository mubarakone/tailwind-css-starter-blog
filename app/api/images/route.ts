// pages/api/images/[filename].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function (req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;
    const filePath = path.join('/tmp', filename as string);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('Image not found');
            return;
        }

        res.setHeader('Content-Type', 'image/png');
        res.send(data);

        // Optionally delete the file after serving it
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting the file:', err);
        });
    });
}
