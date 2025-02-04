import express from "express";
import { parseResume, parseJobDescription, matchPortfolio, generateCoverLetter} from "./matchServices.js";

const app = express();
const port = 5000;

import cors from "cors";
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from React frontend
  methods: ['GET', 'POST'],  // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// A simple route for testing the backend
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

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


app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
