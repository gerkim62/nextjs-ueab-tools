"use client";

import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CuteTimetablePage = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [timetableCsv, setTimetableCsv] = useLocalStorage<string | null>(
    "timetableCsv",
    null
  );

  let content;

  if (timetableCsv) {
    content = <div>showing csv</div>;
  } else if (username && password) {
    content = <div>

    </div>;
  } else {
    content = <div>showing login</div>;
  }

  return content;
};

export default CuteTimetablePage;
