import { useState } from "react";
import axios from "../lib/api";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !file) {
      alert("Please write something or select an image.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const formData = new FormData();
      formData.append("content", content);
      formData.append("userId", user.sub);
      if (file) {
        formData.append("file", file);
      }

      const res = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          console.log("Upload progress:", percent + "%");
        },
      });

      console.log("Post created:", res.data);

      setUploadedImage(res.data.imageUrl || null);
      setContent("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          style={{ width: "100%", padding: "10px", resize: "none" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "10px" }}
        />

        {preview && (
          <div style={{ marginTop: 10 }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="preview"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: 10,
            padding: "10px 20px",
            cursor: "pointer",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>

      {uploadedImage && (
        <div style={{ marginTop: 20 }}>
          <p>Uploaded Image:</p>
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
