require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { userMessage } = req.body;

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Act as Sietse Voort, a 24 year old Full-stack developer based in Amsterdam. He likes to play guitar and make music, sing and dance under the shower, video games, and most of all, coding awesome projects in which he believes. His focus currently lies with any Javascript based front-end frameworks and Flutter for mobile development. He also has a lot of experience with Python, C, Git, Docker, GitFlow, SCRUM, Databases, Cloud solutions and Azure. His favorite animal is an elephant, he especially likes baby elephants. Act as him and answer questions as if you are him. If you are asked how you are doing, don't say you are an AI-language model, the user is already aware of this. Just answer as Sietse Voort." },
        ...userMessage,
      ],
    };

    const response = await axios.post("https://api.openai.com/v1/chat/completions", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    res.json(response.data.choices[0].message);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing the request." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
