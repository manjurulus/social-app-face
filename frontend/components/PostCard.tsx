import { useState } from "react";
import axios from "../lib/api";
import { useUser } from "../context/UserContext";

export default function PostCard({ post }: { post: any }) {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");

  const commentPost = async () => {
    if (!commentText.trim()) return;

    await axios.post(`/posts/${post._id}/comment`, {
      userId: user?.sub,
      text: commentText,
    });

    setCommentText("");
    location.reload(); // simple refresh for now
  };

  const likePost = async () => {
    await axios.post(`/posts/${post._id}/like`, {
      userId: user?.sub,
    });
    location.reload();
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: 20,
        padding: 15,
      }}
    >
      <p>
        <b>{post.userId}</b>
      </p>
      <p>{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          style={{
            width: "100%",
            borderRadius: 8,
            marginTop: 10,
            objectFit: "cover",
          }}
        />
      )}

      {/* Likes & Comments */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <button onClick={likePost}>👍 Like ({post.likes.length})</button>
        <span>{post.comments.length} comments</span>
      </div>

      {/* Add Comment */}
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{ width: "80%", padding: 5 }}
        />
        <button onClick={commentPost} style={{ padding: 5, marginLeft: 5 }}>
          Comment
        </button>
      </div>

      {/* Display Comments */}
      <div style={{ marginTop: 10 }}>
        {post.comments.map((c: any, i: number) => (
          <p key={i} style={{ margin: "2px 0" }}>
            <b>{c.userId}</b>: {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
