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
    <div className="p-6 w-full max-w-screen-lg mx-auto">
  
      <h1 className="text-4xl font-bold text-center mb-6">JobSearch Made Easy</h1>
      <p className="text-lg text-center mb-6">
        Paste your resume here to find the job that matches your profile.
      </p>
  
     
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        <textarea
          className="w-full h-60 p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your Resume Here"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
  
        <textarea
          className="w-full h-60 p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your Job Description Here"
          value={jobDescriptionText}
          onChange={(e) => setJobDescriptionText(e.target.value)}
        />
      </div>
  
    
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white p-3 rounded-md w-full md:w-auto hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>
  
     
      {matchResult && (
        <div className="mt-6 p-6 border-2 border-gray-300 rounded-lg bg-gray-100">
          <h3 className="text-2xl font-semibold mb-4">Match Result</h3>
          <pre className="text-sm text-gray-800">{JSON.stringify(matchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  
}