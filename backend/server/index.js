import express from "express";

const app = express();
const port = 5000; // You can change the port if needed

app.use(express.json());

// A simple route for testing the backend
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
