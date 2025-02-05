import { useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Header from "../../components/Header.jsx";

export default function Blog({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Extract unique tags from posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Function to filter posts based on search query and selected tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="app">
      <main className="dashboard">
        <div className="dashboard-header">
          <Header />
        </div>
        <div className="box">
          <div className="dopot-power">
            <h5 className="flex items-center justify-center gap-2">
              <img className="mr-2 mb-1 w-5 h-5" src="/assets/img/Icon.png" alt="Icon" />
              Blog
            </h5>
            <h1 className="text-4xl font-bold">Dopot Blog</h1>
            <h5 className="text-gray-500">Get useful insights with our blog posts</h5>
          </div>

          
        </div>
      </main>

      {/* Blog Posts Grid */}
      <div className="box-token">
        {/* Search and Filter Section */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full sm:w-2/3 p-3 border m-0 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed6154]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Tag Dropdown */}
            <select
              className="w-full sm:w-1/3 p-3 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ed6154]"
              style={{"height":"40px"}}
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}

            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link key={post.slug} href={`/Blog/${post.slug}`} className="group">
                <div className="!rounded-2xl shadow-lg overflow-hidden transition-transform !h-150 transform hover:scale-105 blogpost-card">
                  
                  {/* Image Section */}
                  <div
                    className="h-60 bg-cover bg-center !rounded-t-2xl"
                    style={{ backgroundImage: `url(${post.image})` }}
                  ></div>

                  {/* Text Section */}
                  <div className="p-4 bg-white h-full flex flex-col">
                    <h2 className="!text-3xl !text-[#ed6154] !font-bold">{post.title}</h2>
                    <p className="!text-lg !text-[#ed6154]">
                      {post.tags ? post.tags.map((tag) => `#${tag}`).join(" ") : "No Tags"}
                    </p>
                    <p className="!text-lg text-black">Author: {post.author}</p>
                    <p className="!text-lg text-black">{post.date}</p>
                  </div>

                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8 col-span-full">
              No posts found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Fetch Markdown posts
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
      tags: Array.isArray(data.tags) ? data.tags : [data.tags], // Ensure tags is always an array
      slug: filename.replace(".md", ""), // Remove .md extension
      image: firstImageUrl, // Pass extracted image
    };
  });

  return { props: { posts } };
}
