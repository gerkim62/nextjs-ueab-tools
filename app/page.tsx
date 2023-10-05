"use client";

import Link from "next/link";
import { LoginForm } from "./components/LoginForm";
import Logo from "./components/Logo";
import useLocalStorage from "./hooks/useLocalStorage";

export default function Home() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useLocalStorage("password", "");

  return (
    <main className="text-black flex flex-col justify-center items-center pt-10">
    <div className="text-center">
      <h1 className="text-2xl font-semibold mb-4">UEAB Tools App</h1>
      <p className="text-lg mb-3">
        Explore a set of UEAB Tools made just for You! <br />
        <span className="font-extrabold p-1 pr-0 border-pink-600 rounded-lg text-center overflow-hidden">
          <span className="text-xs text-pink-600">by</span>{" "}
          <span className="font-semibold font-mono mb-2">
            <span className="border-l-2 pl-1 border-pink-200">
              developer
            </span>
            .
            <span className="rounded-full border-r-2 pr-2 border-pink-500">
              gerison
            </span>
          </span>
        </span>
      </p>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left w-[80%]">
      {/* App 1: Download Cute Timetable */}
      <div className="bg-white p-6 rounded-lg text-left">
        <h2 className="text-pink-500 text-xl font-semibold mb-4">
          1. Cute class Timetable
        </h2>
        <p className="text-gray-700">
          Easily download and manage your class Timetable using the cute
          timetable app.
        </p>
        <Link className=" text-pink-600 hover:underline hover:text-pink-700  font-semibold transition duration-300 underline" href={'/cute-timetable'}>Launch cute timetable</Link>
      </div>
  
      {/* App 2: Extract Exam Timetable */}
      <div className="bg-white px-6 pt-6  text-left">
        <h2 className="text-pink-500 text-lg font-semibold mb-4">
          2. Exam Timetable Extractor
        </h2>
        <p className="text-gray-700">
          Effortlessly extract and organize your exam timetable for
          stress-free preparation.
        </p>
        <Link className=" text-pink-600 hover:underline hover:text-pink-700  font-semibold transition duration-300 underline" href={'/exam-timetable'}>Extract Exam timetable</Link>
      </div>
  
      {/* App 3: Select Courses */}
      <div className="bg-white p-6 text-left">
        <h2 className="text-pink-500 text-xl font-semibold mb-4">
          3. Easy Courses Selector
        </h2>
        <p className="text-gray-700">
          Automatically chooses your courses without having to deal with clashing courses. You can choose which lecturers to avoid as well as which time you prefer.
        </p>
        <Link className=" text-pink-600 hover:underline hover:text-pink-700  font-semibold transition duration-300 underline" href={'/courses-selector'}>Select your courses</Link>
      </div>
    </div>
  </main>
  
  );
}
