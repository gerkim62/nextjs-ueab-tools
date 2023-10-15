import Link from "next/link";
import React from "react";

const CuteTimetableTutorial = () => {
  return (
    <div className="bg-white text-gray-700 py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl text-center font-semibold text-pink-600 mb-6">
          How to Get Your Timetable CSV
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-md text-left mb-8">
          <p className="text-gray-600 mb-4">
            Follow these simple steps to access your timetable CSV file:
          </p>

          <div className="mb-4">
            <p className="text-gray-600 font-semibold mb-2">
              1. Log in to UMIS
            </p>
            <p>
              <a target="_blank" href="https://registration.ueab.ac.ke/ueab/a_students.jsp?view=1:0" className="text-pink-600 hover:underline font-semibold block mb-2">
                Click here to log in to UMIS portal
              </a>
              This link will take you to the UMIS login page. Log in with your student ID and password then return to this page to continue to the next step.
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold mb-4">
              2. Download Your Timetable
            </p>
            <p>
              <a target="_blank" href="https://registration.ueab.ac.ke/ueab/grid_export?view=28:0&action=export" className="text-pink-600 hover:underline font-semibold block mb-2">
                Click here to download your timetable CSV
              </a>
              After logging in, click the above link to download your timetable as a CSV file.
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold mb-4">
              3. Go back to Upload
            </p>
            <Link href="/cute-timetable" className="text-pink-600 hover:underline font-semibold block mb-2">
              Click here to go back to the upload page
            </Link>
            <p>
              After downloading the CSV file, click the above link to return to the upload page and upload your timetable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuteTimetableTutorial;
