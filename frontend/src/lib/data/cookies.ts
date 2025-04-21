import "server-only";
import {cookies, headers} from "next/headers";

export const getAuthHeaders = async (): Promise<
  {authorization: string} | {}
> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_medusa_jwt")?.value;

  if (token) {
    return {authorization: `Bearer ${token}`};
  }

  return {};
};

export const getCacheTag = async (tag: string): Promise<string> => {
  const headerStore = await headers();
  const cacheId = headerStore.get("_medusa_cache_id");

  if (cacheId) {
    return `${tag}-${cacheId}`;
  }

  return "";
};

export const getCacheHeaders = async (
  tag: string
): Promise<{next: {tags: string[]}} | {}> => {
  const cacheTag = await getCacheTag(tag);

  if (cacheTag) {
    return {next: {tags: [`${cacheTag}`]}};
  }

  return {};
};
