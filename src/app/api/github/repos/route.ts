import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/github';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ projects }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in GitHub repos API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

