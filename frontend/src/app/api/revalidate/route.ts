import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation Endpoint
 * 
 * Called by Strapi webhooks ketika data berubah
 * Instantly invalidate cache tanpa menunggu revalidate window
 * 
 * Usage:
 * curl -X POST http://localhost:3000/api/revalidate \
 *   -H "x-revalidate-secret: your-secret" \
 *   -H "Content-Type: application/json" \
 *   -d '{"tags": ["strapi-data"]}'
 */

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  // 1. Validate secret dari header
  const secret = request.headers.get('x-revalidate-secret');
  const expectedSecret = process.env.REVALIDATE_SECRET;
  
  if (!expectedSecret) {
    console.error('❌ REVALIDATE_SECRET tidak di-set di environment!');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }
  
  if (secret !== expectedSecret) {
    console.warn(`⚠️  Unauthorized revalidation attempt. Secret received: ${secret?.substring(0, 5)}...`);
    return NextResponse.json(
      { error: 'Invalid revalidation secret' },
      { status: 401 }
    );
  }

  try {
    // 2. Parse request body untuk custom tags (optional)
    let tagsToRevalidate = ['strapi-data']; // default tag
    
    try {
      const body = await request.json();
      if (body.tags && Array.isArray(body.tags)) {
        tagsToRevalidate = body.tags;
      }
    } catch (e) {
      // Body might be empty, that's OK
    }
    
    // 3. Revalidate all specified tags
    console.log(`🔄 Revalidating tags: ${tagsToRevalidate.join(', ')}`);
    
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, "max");
    }
    
    const duration = Date.now() - startTime;
    console.log(`✅ Cache revalidated successfully in ${duration}ms`);
    
    return NextResponse.json(
      { 
        revalidated: true,
        timestamp: new Date().toISOString(),
        tags: tagsToRevalidate,
        duration: `${duration}ms`
      },
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error('❌ Revalidation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Revalidation failed',
        details: error 
      },
      { status: 500 }
    );
  }
}