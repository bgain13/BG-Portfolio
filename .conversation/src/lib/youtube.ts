export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // youtu.be/<id>
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id ?? null;
    }

    // youtube.com/watch?v=<id>
    if (parsed.pathname === "/watch") {
      return parsed.searchParams.get("v") ?? null;
    }

    // youtube.com/shorts/<id>
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) {
      return shortsMatch[1] ?? null;
    }

    return null;
  } catch {
    return null;
  }
}
