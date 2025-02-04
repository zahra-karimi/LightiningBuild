import OpenAI from "openai";

// Function to parse the resume text (e.g., extract skills, experience, etc.)
export const parseResume = (resumeText) => {
    return {
      skills: extractSkills(resumeText),
      experience: extractExperience(resumeText),
      education: extractEducation(resumeText),
    };
  };
  
  // Function to parse the job description text (e.g., extract required skills, qualifications, etc.)
  export const parseJobDescription = (jobText) => {
    return {
      requiredSkills: extractRequiredSkills(jobText),
      qualifications: extractQualifications(jobText),
    };
  };
  
  // Function to match the resume with the job description
  export const matchPortfolio = (resumeText, jobText) => {
    const resumeData = parseResume(resumeText);
    const jobData = parseJobDescription(jobText);
  
    const matchedSkills = findMatchingSkills(resumeData.skills, jobData.requiredSkills);
  
    return {
      success: true,
      matchPercentage: calculateMatchPercentage(matchedSkills),
      matchedSkills: matchedSkills,
    };
  };
  
  // Helper function to extract skills from resume text
  const extractSkills = (text) => {
    const skills = ["JavaScript", "React", "Node.js", "Python"];
    return skills.filter(skill => text.includes(skill));
  };
  
  // Helper function to extract experience from resume text
  const extractExperience = (text) => {
    return "5 years of experience in software development";
  };
  
  // Helper function to extract education from resume text
  const extractEducation = (text) => {
    return "Bachelor's in Computer Science";
  };
  
  // Helper function to extract required skills from job description text
  const extractRequiredSkills = (text) => {
    return ["JavaScript", "React", "Node.js"];
  };
  
  // Helper function to extract qualifications from job description text
  const extractQualifications = (text) => {
    return "Bachelor's degree in Computer Science or related field";
  };
  
  // Helper function to find matching skills between the resume and job description
  const findMatchingSkills = (resumeSkills, jobSkills) => {
    return resumeSkills.filter(skill => jobSkills.includes(skill));
  };
  
  // Helper function to calculate the match percentage
  const calculateMatchPercentage = (matchedSkills) => {
    const totalJobSkills = 3; 
    return (matchedSkills.length / totalJobSkills) * 100;
  };
  
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have your OpenAI API key
});

export async function generateCoverLetter(resumeText, jobText) {
  try {
    const prompt = `
      Generate a professional cover letter based on the following resume and job description.

      Resume:
      ${resumeText}

      Job Description:
      ${jobText}

      The cover letter should highlight relevant skills and experiences from the resume that match the job description.
      Ensure it is well-structured, personalized, and professional.
    `;

    const response = await openai.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter.");
  }
}
