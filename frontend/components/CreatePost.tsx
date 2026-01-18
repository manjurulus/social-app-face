import { useState } from "react";
import axios from "../lib/api";

interface CreatePostProps {
  onPostCreated: (post: any) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const formData = new FormData();
      formData.append("content", content);
      formData.append("userId", user.sub);
      if (file) formData.append("file", file);

      const res = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      onPostCreated(res.data);
      setContent("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
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
        maxWidth: 600,
        margin: "20px auto",
      }}
    >
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: 10, borderRadius: 8 }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
        />
      )}

      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginTop: 10 }}
      />

      <button
        type="submit"
        style={{
          marginTop: 10,
          padding: 8,
          backgroundColor: "#1877f2",
          color: "#fff",
          border: "none",
          borderRadius: 5,
        }}
      >
        Post
      </button>
    </form>
  );
}
