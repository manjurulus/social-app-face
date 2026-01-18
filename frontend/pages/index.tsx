import { useEffect, useState } from "react";
import axios from "../lib/api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 20,
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "500px" }}>
        {/* Create Post */}
        <CreatePost onPostCreated={(post) => setPosts([post, ...posts])} />

        {/* Posts */}
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
