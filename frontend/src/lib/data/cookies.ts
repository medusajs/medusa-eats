import "server-only";
import { cookies, headers } from "next/headers";

export const getAuthHeaders = (): { authorization: string } | {} => {
  const token = cookies().get("_medusa_jwt")?.value;

  if (token) {
    return { authorization: `Bearer ${token}` };
  }

  return {};
};

export const getCacheTag = (tag: string): string => {
  const cacheId = headers().get("_medusa_cache_id");

  if (cacheId) {
    return `${tag}-${cacheId}`;
  }

  return "";
};

export const getCacheHeaders = (
  tag: string
): { next: { tags: string[] } } | {} => {
  const cacheTag = getCacheTag(tag);

  if (cacheTag) {
    return { next: { tags: [`${cacheTag}`] } };
  }

  return {};
};
