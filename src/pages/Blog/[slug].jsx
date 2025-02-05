import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm"; // ✅ NEW: Keeps HTML tags intact
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import Header from "../../components/Header.jsx";

export default function Post({ post }) {




  return (
    <div className="app">
      <main className="blogpost-header"
        style={{
          backgroundImage: `url(${post.image}),linear-gradient(rgb(255, 214, 210), rgb(233, 88, 85))`
        }}>


        <Header />
        <div className="box">
          <div className="dopot-power">
            <h5 className="flex items-center justify-center gap-2 !drop-shadow-xl">
              <img
                className="mr-2 mb-1 w-5 h-5"
                src="/assets/img/Icon.png"
                alt="Icon"
              />
              Blog
            </h5>
            <h1 style={{
              "filter": "drop-shadow(0px 5px 4px #000) !important"
            }}>{post.title}</h1>
            <div className="flex flex-col gap-2">

              <h5 style={{
                "filter": "drop-shadow(0px 5px 4px #000) !important"
              }}>{post.description}</h5>
              <h5 style={{
                "filter": "drop-shadow(0px 5px 4px #000) !important"
              }}>Author: {post.author}</h5>
              <h5 style={{
                "filter": "drop-shadow(0px 5px 4px #000) !important"
              }}>{post.date}</h5>
            </div>
          </div>
        </div>
      </main>
      <article className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") }, // Remove .md extension
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Process Markdown, ensuring HTML is preserved
  const processedContent = await remark()
    .use(remarkParse)      // Parse Markdown
    .use(remarkGfm)        // Support for tables/lists
    .use(remarkHtml, { sanitize: false }) // ✅ Preserve raw HTML (keeps <a id="ref-X">)
    .process(content);

  const contentHtml = processedContent.toString();
  // Extract the first image URL from the Markdown content
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const firstImageUrl = imageMatch ? imageMatch[1] : "/default-image.jpg"; // Fallback if no image found

  return {
    props: {
      post: {
        title: data.title,
        description: data.description || "",
        date: data.date || "Unknown Date",
        author: data.author || "Anonymous",
        content: contentHtml, // Now preserves IDs
        image: firstImageUrl, // Pass extracted image
      },
    },
  };
}
