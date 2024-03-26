// fetchMDXContent.ts

import fetch from 'node-fetch';

export async function fetchMDXContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const mdxContent = await response.text();
      return mdxContent;
    } else {
      throw new Error(`Failed to fetch MDX content. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching MDX content: ${error instanceof Error ? error.message : error}`);
  }
}
