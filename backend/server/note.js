
import express from "express";
import { parseResume, parseJobDescription, matchPortfolio, generateCoverLetter } from "./services/matchService.js";

const app = express();
app.use(express.json());

// Parse resume from pasted text
app.post("/api/parse/resume", async (req, res) => {
    try {
        const { resumeText } = req.body;
        const resumeData = await parseResume(resumeText);
        res.json({ success: true, data: resumeData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error parsing resume" });
    }
});

// Parse job description from pasted text
app.post("/api/job/parse", async (req, res) => {
    const { jobText } = req.body;
    const jobData = parseJobDescription(jobText);
    res.json(jobData);
});

// Match portfolio with job description
app.post("/api/match", async (req, res) => {
    const { resumeText, jobText } = req.body;
    const matchResult = await matchPortfolio(resumeText, jobText);
    res.json(matchResult);
});

// Generate cover letter based on job description and resume
app.post("/api/cover-letter", async (req, res) => {
    const { resumeText, jobText } = req.body;
    try {
        const coverLetter = await generateCoverLetter(resumeText, jobText);
        res.json({ success: true, coverLetter });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error generating cover letter" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
