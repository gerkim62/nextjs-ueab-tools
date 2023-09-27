"use client";

import React, { useState } from "react";

import { signIn } from "next-auth/react";
import useLocalStorage from "../hooks/useLocalStorage";

export const LoginForm = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        const authRes = await signIn("credintials", {
          username,
          password,
        });
        if (authRes?.error) {
          return console.log("Auth failure");
        }
        console.log(`res is ok`);
        (e.target as HTMLFormElement).reset();
      } else {
        console.log("login failed");
      }
    } catch (error) {
      console.log("Error during request", error);
    }
  };

  return (
    <div className="relative z-5 flex items-center justify-center bg-gray-50 mx-auto">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6">Enter your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Student ID
            </label>
            <input
              minLength={10}
              maxLength={10}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g SMURGE2311"
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-pink-500"
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
