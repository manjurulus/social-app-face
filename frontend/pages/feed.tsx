import { useState, useEffect } from "react";
import axios from "../lib/api";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchPosts = async () => {
    const res = await axios.get("/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    setPosts(res.data.reverse()); // latest first
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <CreatePost onPostCreated={(p) => setPosts([p, ...posts])} />
      {posts.map((p) => (
        <Post key={p._id} post={p} user={user} onUpdate={fetchPosts} />
      ))}
    </div>
  );
}
