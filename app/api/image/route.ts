import { fetchImage } from "../fetchImage"
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
    return fetchImage(request)
}
