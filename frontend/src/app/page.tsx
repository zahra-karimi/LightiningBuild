'use client'
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">JobSearch Made Easy</h1><br></br>
      <p>Paste your resume here to find the job that matches your Profile.</p><br></br>

      <div className="flex space-x-4">
        <textarea
          className="w-full h-40 p-2 border"
          placeholder="Paste your Resume Here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />

        <textarea
          className="w-full h-40 p-2 border"
          placeholder="Paste your job description here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      </div>

    

      <button className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Submit
      </button>
      </div>
  );
}