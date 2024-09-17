// routes/api/readPosts.ts
import { readFile } from "../../lib/read_file.ts";

export default async function handler(req: Request) {
  const posts = await readFile("/Users/hainguyen/Documents/temp/pedal-pedal/data/blog");
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}