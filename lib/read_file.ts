import { walk } from "$std/fs/walk.ts";
import { Metadata } from "../types/blog/post.ts";
// @deno-types="@types/d3"
import * as d3 from "d3";
import { DataCsv, DataItem } from "../types/blog/csv-sample.ts";

// Hàm trích xuất metadata từ nội dung tệp
function extractMetadata(filePath: string): Metadata {
  const content = Deno.readTextFileSync(filePath);
  const metadata: Metadata = {
    title: "",
    date: "",
    filePath,
  };
  const lines = content.split("\n");

  // Lấy metadata trong phần đầu của tệp
  for (const line of lines) {
    if (line.startsWith("title: ")) {
      const value = line.slice(7).trim().replace(/'/g, "");
      if (!value) {
        throw new Error('Metadata "title" is required');
      }
      metadata.title = value;
    } else if (line.startsWith("date: ")) {
      const value = line.slice(6).trim().replace(/'/g, "");
      if (!value) {
        throw new Error('Metadata "date" is required');
      }
      metadata.date = value;
    }
  }

  return metadata;
}

async function readFile(folderPath: string) {
  const posts: Metadata[] = [];

  // Tìm tất cả các tệp .mdx trong thư mục và các thư mục con
  for await (const entry of walk(folderPath)) {
    if (entry.isFile && entry.name.endsWith(".mdx")) {
      const path = entry.path;
      try {
        const metadata = extractMetadata(path);
        posts.push(metadata);
      } catch (error) {
        console.error(`Error reading file ${path}: ${error}`);
      }
    }
  }
  return posts;
}

async function readCsvFileContent(filePath: string) {
  // Đọc nội dung tệp CSV
  const content = await Deno.readTextFile(filePath);

  // Phân tích nội dung CSV thành JSON
  const data: DataCsv = d3.csvParse(
    content,
    ({ letter, frequency }) => ({ name: letter, value: +frequency }),
  ).sort((a, b) => b.value - a.value);
  const csv = {
    data,
    columns: data.columns,
  }
  return csv;
}

export { readCsvFileContent, readFile };

