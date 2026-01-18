import { useState } from "react";
import axios from "../lib/api";

interface Comment {
  _id: string;
  userId: string;
  text: string;
}

interface PostProps {
  post: {
    _id: string;
    userId: string;
    content: string;
    imageUrl?: string;
    likes?: string[];
    comments?: Comment[];
  };
  user: { sub: string; email: string };
  onUpdate: () => void;
}

export default function Post({ post, user, onUpdate }: PostProps) {
  const [commentText, setCommentText] = useState("");

  const toggleLike = async () => {
    try {
      await axios.post(
        `/posts/${post._id}/like`,
        { userId: user.sub },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      onUpdate();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const commentPost = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(
        `/posts/${post._id}/comment`,
        { userId: user.sub, text: commentText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      setCommentText("");
      onUpdate();
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  return (
    <div
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
      <p>{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post image"
          style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
        />
      )}

      <div style={{ display: "flex", gap: 15, marginTop: 10 }}>
        <button type="button" onClick={toggleLike}>
          {post.likes?.includes(user.sub) ? "❤️ Liked" : "🤍 Like"} (
          {post.likes?.length || 0})
        </button>
        <button type="button">💬 Comment ({post.comments?.length || 0})</button>
        <button type="button">🔁 Share</button>
      </div>

      <div style={{ marginTop: 10 }}>
        {post.comments?.map((c) => (
          <div key={c._id} style={{ marginBottom: 5, fontSize: 14 }}>
            <strong>{c.userId}</strong>: {c.text}
          </div>
        ))}

        <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ flex: 1, padding: 5, borderRadius: 5 }}
          />
          <button type="button" onClick={commentPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
