"use client"

import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LoginForm } from "../components/LoginForm";

const CoursesSelector = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");

  return (
    <div>
      {username.length !== 10 || password.length < 2 ? (
        <LoginForm />
      ) : (
        <p>we will fetch it</p>
      )}
    </div>
  );
};

export default CoursesSelector;
