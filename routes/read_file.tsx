// const Home = async () => {
//   // const filePath = "./Documents/temp/blog_utis_deno/merged.txt"; // Đường dẫn đến tệp
//   const filePath = "/Users/hainguyen/Documents/temp/blog_utils_deno/merged.txt"; // Đường dẫn đến tệp
//   const content = await Deno.readTextFile(filePath); // Đọc tệp

//   return (
//     <div>
//       <h1>Nội dung tệp:</h1>
//       <pre>{content}</pre> {/* Hiển thị nội dung */}
//     </div>
//   );
// };

// export default Home;

import ReadFile from "../islands/demo/ReadFile.tsx";

export default function Demo () {
  return (
    <div>
      <h1>Chart</h1>
      <ReadFile />
    </div>
  );
};
