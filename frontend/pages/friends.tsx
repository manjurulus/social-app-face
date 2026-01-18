import { useEffect, useState } from "react";
import api from "../lib/api";
import FriendRequest from "../components/FriendRequest";

export default function Friends() {
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  const fetchData = async () => {
    const reqRes = await api.get("/friends/requests");
    setRequests(reqRes.data);

    const listRes = await api.get("/friends/list");
    setFriends(listRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No requests</p>
      ) : (
        requests.map((r) => (
          <FriendRequest key={r._id} request={r} onAction={fetchData} />
        ))
      )}

      <h2>My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        friends.map((f) => (
          <div key={f._id}>
            {f.name} ({f.email})
          </div>
        ))
      )}
    </div>
  );
}
