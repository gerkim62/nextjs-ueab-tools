import React from "react";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return <div className="p-3 min-h-[100vh] pt-10 ">
    <p className="text-center">Please log in </p>
    <LoginForm />
    </div>;
};

export default Login;
