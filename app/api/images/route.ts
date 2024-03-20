// app/routes/api/images/[filename].ts

import fs from 'fs';
import path from 'path';

export const GET = async (req, res) => {
    const { filename } = req.query;
    const filePath = path.join('/tmp', filename as string);

    try {
        const data = await fs.promises.readFile(filePath);
        res.setHeader('Content-Type', 'image/png');
        res.send(data);

        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error reading or deleting the file:', err);
        res.status(404).send('Image not found');
    }
};
