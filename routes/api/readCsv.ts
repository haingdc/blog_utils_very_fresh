// routes/api/readPosts.ts
import { readCsvFileContent } from "../../lib/read_file.ts";

export default async function handler(req: Request) {
  const posts = await readCsvFileContent('downloads/alphabet.csv');
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}