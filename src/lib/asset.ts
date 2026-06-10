/**
 * Static assets live under the site root in normal hosting, but under a
 * sub-path when the site is served from GitHub Pages. next/image and plain
 * <video> srcs don't get basePath applied automatically, so every media
 * path goes through this helper.
 */
export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${ASSET_PREFIX}${path}`;
}
