import { useState } from "react";
import axios from "../lib/api";

export default function CreatePost({ onPostCreated }: any) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", user.sub);
    if (file) formData.append("file", file);

    const res = await axios.post("/posts", formData);

    onPostCreated(res.data);
    setContent("");
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: 15,
        marginBottom: 20,
      }}
    >
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: 10, borderRadius: 8 }}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit" style={{ marginTop: 10, padding: 8 }}>
        Post
      </button>
    </form>
  );
}
