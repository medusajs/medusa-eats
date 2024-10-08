import { NextRequest, NextResponse } from "next/server";

async function setCacheId(request: NextRequest, response: NextResponse) {
  const cacheId = request.cookies.get("_medusa_cache_id")?.value;

  if (cacheId) {
    return cacheId;
  }

  const newCacheId = crypto.randomUUID();
  response.cookies.set("_medusa_cache_id", newCacheId, {
    maxAge: 60 * 60 * 24,
  });

  return newCacheId;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cacheId = await setCacheId(request, response);

  response.headers.set("x-medusa-cache-id", cacheId);

  return response;
}
