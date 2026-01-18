import api from "../lib/api";

export default function FriendRequest({
  request,
  onAction,
}: {
  request: any;
  onAction: () => void;
}) {
  const handleAccept = async () => {
    await api.post(`/friends/accept/${request._id}`);
    onAction();
  };

  const handleReject = async () => {
    await api.post(`/friends/reject/${request._id}`);
    onAction();
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
      <p>
        <strong>{request.sender.name}</strong> wants to be your friend
      </p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
