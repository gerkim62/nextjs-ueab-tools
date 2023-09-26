import React from "react";

export const CredintialsForm = () => {
  return (
    <form className="flex flex-col items-center justify-between p-24">
      <label htmlFor="username">UMIS Username</label>
      <input type="username" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Login</button>
    </form>
  );
};
