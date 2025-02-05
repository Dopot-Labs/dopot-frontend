import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Header from "../../components/Header.jsx";

export default function Blog({ posts }) {
  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="box">
          <div className="dopot-power">
            <h5 className="flex items-center justify-center gap-2">
              <img className="mr-2 mb-1 w-5 h-5 " src="\assets\img\Icon.png" alt="Icon" />
              Blog
            </h5>
            <h1 className="text-4xl font-bold">Dopot Blog</h1>
            <h5 className="text-gray-500">Get useful insights with our blog posts</h5>
          </div>


        </div>
      </main>
      {/* Grid Layout for Blog Cards */}
      <div className="box-token">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/Blog/${post.slug}`} className="group">
              <div className="!rounded-2xl shadow-lg overflow-hidden transition-transform !h-120 transform hover:scale-105 blogpost-card">

                {/* Image Section */}
                <div
                  className="h-60 bg-cover bg-center !rounded-t-2xl"
                  style={{
                    backgroundImage: `url(${post.image})`,
                  }}
                ></div>

                {/* Text Section */}
                <div className="p-2 bg-white h-full flex flex-col">
                  <h2 className="!text-3xl !text-[#ed6154] !font-bold">{post.title}</h2>
                  {/* <p className="!text-lg text-black">{post.description}</p> */}
                  <p className="!text-lg text-black">Author: {post.author}</p>
                  <p className="!text-lg text-black">{post.date}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Extract first image URL from Markdown
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    const firstImageUrl = imageMatch ? imageMatch[1] : "/assets/img/default-blog.jpg"; // Fallback image

    return {
      title: data.title || "Untitled",
      description: data.description || "No description available.",
      date: data.date || "Unknown Date",
      author: data.author || "Anonymous",
      slug: filename.replace(".md", ""), // Remove .md extension
      image: firstImageUrl, // Pass extracted image
    };
  });

  return { props: { posts } };
}

