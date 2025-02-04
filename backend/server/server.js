import express from "express";
import { parseResume, parseJobDescription, matchPortfolio } from "./services/matchService.js";

const app = express();
app.use(express.json());

// Submit resume text
app.post("/api/submit/resume", async (req, res) => {
    try {
        const { resumeText } = req.body;
        const resumeData = parseResume(resumeText);
        res.json({ success: true, data: resumeData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error processing resume" });
    }
});

// Submit job description text
app.post("/api/submit/job", async (req, res) => {
    try {
        const { jobText } = req.body;
        const jobData = parseJobDescription(jobText);
        res.json({ success: true, data: jobData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error processing job description" });
    }
});

// Match resume with job description
app.post("/api/match", async (req, res) => {
    try {
        const { resumeText, jobText } = req.body;
        const matchResult = matchPortfolio(resumeText, jobText);
        res.json(matchResult);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error matching resume with job description" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
