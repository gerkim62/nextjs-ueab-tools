"use client";

import Link from "next/link";
import React, { useState } from "react";

const UpdateExamTimetable = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setSelectedFileName(file ? file.name : null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    } else {
      setIsError(true);
      setErrorMessage("No file selected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 min-h-[50vh]">
      <h1 className="text-2xl font-semibold mb-4 text-pink-600">
        Upload Updated Exam Timetable
      </h1>

      <ul className="text-gray-600 list-inside list-disc">
        <li>Download the UEAB exam timetable from your email</li>
        <li>Go to <a className="text-pink-600 mt-4 hover:underline hover:text-pink-700 capitalize font-semibold transition duration-300 underline" href="https://xodo.com/convert-pdf-to-html">PDF to HTML converter</a> and convert it to HTML</li>
        <li>Then come back here and upload the converted file as HTML</li>
        <li>It will be used in extracting your personal timetable</li>
      </ul>

      <label
        htmlFor="fileInput"
        className="block font-medium mt-10 mb-2 text-gray-700"
      >
        Upload the conveted file here
      </label>
      <div className="flex items-center border rounded-lg overflow-hidden mb-5 max-w-[80%]">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-pink-500 text-white cursor-pointer whitespace-nowrap hover:bg-pink-600"
        >
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".html"
          className="hidden"
          onChange={handleFileChange}
        />
        <a
          href="#"
          onClick={() => {
            const fileInput = document.getElementById("fileInput");
            if (fileInput) {
              fileInput.click();
            }
          }}
          className="px-2 py-2 text-gray-600 text-ellipsis overflow-clip whitespace-nowrap cursor-pointer"
        >
          {selectedFileName || "No file selected"}
        </a>
      </div>

      {isError && <p className="text-red-500 text-sm my-2">{errorMessage}</p>}
      <button
        className={`py-2 px-4 rounded font-semibold ${
          selectedFile
            ? "bg-pink-600 hover:bg-pink-700 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
        }`}
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        {selectedFile ? "Upload HTML Now" : "Choose a HTML File"}
      </button>

      <Link
        href="/exam-timetable"
        className="underline mt-10 text-pink-600 hover:underline hover:text-pink-700 capitalize font-semibold transition duration-300"
      >
        Looking to extract timetable instead?
      </Link>
    </div>
  );
};

export default UpdateExamTimetable;
