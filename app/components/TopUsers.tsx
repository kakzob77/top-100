"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const NEYNAR_API_KEY = process.env.NEXT_PUBLIC_NEYNAR_API_KEY!;

export default function TopUsers() {
  const [users, setUsers] = useState<{ fid: string; count: number }[]>([]);

  const fetchTopUsers = async () => {
    try {
      const res = await axios.get("https://api.neynar.com/v2/farcaster/casts?limit=100", {
        headers: { api_key: NEYNAR_API_KEY },
      });

      const activityCount: Record<string, number> = {};
      res.data.casts.forEach((cast: any) => {
        const fid = cast.author.fid;
        activityCount[fid] = (activityCount[fid] || 0) + 1;
      });

      const sortedUsers = Object.entries(activityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 100)
        .map(([fid, count]) => ({ fid, count }));

      setUsers(sortedUsers);
    } catch (err) {
      console.error("Failed to fetch casts:", err);
    }
  };

  useEffect(() => {
    fetchTopUsers();

    const socket = io("wss://api.neynar.com/v1/ws", {
      transports: ["websocket"],
      query: { api_key: NEYNAR_API_KEY },
    });

    socket.on("connect", () => {
      console.log("Connected to Farcaster realtime");
      socket.emit("subscribe", { event: "cast.create" });
    });

    socket.on("cast.create", (data: any) => {
      const fid = data.author.fid;
      setUsers((prev) => {
        const userMap: Record<string, number> = {};
        prev.forEach((u) => (userMap[u.fid] = u.count));
        userMap[fid] = (userMap[fid] || 0) + 1;

        return Object.entries(userMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 100)
          .map(([fid, count]) => ({ fid, count }));
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Top 100 Active Farcaster Users</h1>
      <ul className="space-y-2">
        {users.map((user, i) => (
          <li key={user.fid} className="bg-white rounded-xl shadow p-4 flex justify-between">
            <span>#{i + 1} - FID: {user.fid}</span>
            <span className="text-gray-500">{user.count} casts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}