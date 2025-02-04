'use client'
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText, jobDescriptionText }),
      })

       const data = await response.json();
       if (data.success) {
         setMatchResult(data); 
       } else {
         alert("Error: " + data.message);
       }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">JobSearch Made Easy</h1><br></br>
      <p>Paste your resume here to find the job that matches your Profile.</p><br></br>

      <div className="flex space-x-4 w-full">
        <textarea
          className="w-full h-40 p-2 border"
          placeholder="Paste your Resume Here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />

        <textarea
          className="w-full h-40 p-2 border"
          placeholder="Paste your job description here"
          value={jobDescriptionText}
          onChange={(e) => setJobDescriptionText(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>

      {matchResult && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="font-semibold">Match Result</h3>
          <pre>{JSON.stringify(matchResult, null, 2)}</pre>
        </div>
      )}

      </div>
  );
}