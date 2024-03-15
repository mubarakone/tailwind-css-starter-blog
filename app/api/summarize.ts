// pages/api/summarize.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, registerFont, CanvasRenderingContext2D } from 'canvas';
import OpenAI from 'openai';
import path from 'path';

const openai = new OpenAI({
    apiKey: '',
    organization: '',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
      const { article } = req.body;
      // Adjust model and parameters as needed
      const width = 800; // Width of the image
      const height = 800; // Height of the image
      const canvas = createCanvas(width, height);
      const context = canvas.getContext('2d');
      // Customize your canvas
      context.fillStyle = '#fff'; // Background color
      context.fillRect(0, 0, width, height);

      context.font = '30px Arial'; // Set font
      context.fillStyle = '#000'; // Text color
      context.textAlign = 'center';
    try {

      const response = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "Summarize this entire article into 6 snippets. Each snippet can only be 40 words max."},
            {role: "user", content: `${article}`},
        ],
        model: "gpt-3.5-turbo"
      });
    //   res.status(200).json({ summary: response.choices[0].message.content });
    const text = response.choices[0].message.content;
    if (text) {
        context.fillText(text, width / 2, height / 2); // Add text
    }
    const buffer = canvas.toBuffer('image/png');

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate summary' });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
