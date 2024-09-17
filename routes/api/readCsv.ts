// routes/api/readPosts.ts
import { readCsvFileContent } from "../../lib/read_file.ts";

export default async function handler(req: Request) {
  const posts = await readCsvFileContent('/Users/hainguyen/Documents/temp/blog_utils_very_fresh/downloads/alphabet.csv');
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}