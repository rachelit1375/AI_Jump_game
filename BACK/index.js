
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3000;
app.use(cors());
async function TranslationClassificationWord(word) {
    console.log(word);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are given a word: "${word}". 
    - If its meaning is "RIGHT", return 1.
    - If its meaning is "LEFT", return 2.
    - Otherwise, return 3.
    answer me only in one digit!
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // מחזיר את התוצאה שנשקלת כטקסט
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Error'; // במקרה של שגיאה, מחזיר "Error"
    }
}

app.get('/getWordMeaning', async (req, res) => {
    const word = req.query.word; // מקבל את המילה מתוך ה-query parameter
    if (!word) {
        return res.status(400).send('Word parameter is required');
    }

    // מבצע את קריאת ה-API ומקבל את התוצאה
    const response = await TranslationClassificationWord(word);

    // שולח את התוצאה חזרה כתגובה
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



//=============================
//In this part we envolve analyzing data from the jobs and from the CV files to predict the latest required skills
//save data page
// import mongoose from 'mongoose';
// import { GeminiClient } from '@google-cloud/gemini';
// import dotenv from 'dotenv';

// dotenv.config();

// const mongoAtlasUri = 'mongodb+srv://naamashvalb:leHnICQc9v91p649@cluster0.zoxge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(mongoAtlasUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to MongoDB Atlas!");
// }).catch(err => {
//     console.error("Error connecting to MongoDB Atlas:", err);
// });

// const jobSchema = new mongoose.Schema({
//     keywords: [String]
// });

// const candidateSchema = new mongoose.Schema({
//     skills: [String]
// });

// const Job = mongoose.model('Job', jobSchema);
// const Candidate = mongoose.model('Candidate', candidateSchema);

// export async function saveJob(keywords) {
//     const job = new Job({ keywords });
//     await job.save();
// }

// export async function saveCandidate(skills) {
//     const candidate = new Candidate({ skills });
//     await candidate.save();
// }

// export async function analyzeSupplyAndDemand() {
//     const jobs = await Job.find();
//     const candidates = await Candidate.find();

//     const requiredSkills = new Map();
//     const existingSkills = new Map();

//     jobs.forEach(job => {
//         job.keywords.forEach(skill => {
//             requiredSkills.set(skill, (requiredSkills.get(skill) || 0) + 1);
//         });
//     });

//     candidates.forEach(candidate => {
//         candidate.skills.forEach(skill => {
//             existingSkills.set(skill, (existingSkills.get(skill) || 0) + 1);
//         });
//     });

//     const gapAnalysis = [];
//     requiredSkills.forEach((count, skill) => {
//         const supply = existingSkills.get(skill) || 0;
//         if (count > supply) {
//             gapAnalysis.push({ skill, demand: count, supply });
//         }
//     });

//     const recommendations = await generateRecommendations(gapAnalysis);
//     return recommendations;
// }

// const gemini = new GeminiClient({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
// });

// export async function generateRecommendations(gapAnalysis) {
//     const prompt = `Analyze the following skill gaps and suggest training courses:\n${JSON.stringify(gapAnalysis)}`;

//     const request = {
//         model: 'gemini-text-001',
//         prompt: prompt,
//         maxTokens: 100
//     };

//     try {
//         const [response] = await gemini.generateText(request);
//         return response.text.trim();
//     } catch (error) {
//         console.error("Error generating recommendations:", error);
//         throw error;
//     }
// }

const mongoose = require('mongoose');
const mongoAtlasUri = process.env.MONGO_URI;
mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas:", err);
});
const PressureSchema = new mongoose.Schema({
    pressureLevel: Number,
    score: Number
});
const Pressure = mongoose.model('Pressure', PressureSchema);

async function InsertToSchema(pressureLevel, score) {
    const pressure = new Pressure({ pressureLevel, score });
    await pressure.save();
}

async function analyzePressureAndScores() {
    const pressures = await Pressure.find();

    const pressureMap = new Map();
    pressures.forEach(line => {
        pressureMap.set(line.pressureLevel, [...pressureMap.get(pressureLevel) || [], line.score]);
    });
    generateAnalysis(pressureMap);
}

async function generateAnalysis(pressureMap) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // המידע שאתה מעביר ל-Gemini כפרומפט
    const pressureData = Array.from(pressureMap.entries()).map(([key, value]) => `Pressure Level: ${key}, Scores: ${value}`).join("\n");

    const prompt = `
    I have the following data of pressure levels and scores:
    ${pressureData}

    Please analyze the relationship between pressure levels and the scores.
    - Describe any noticeable trends you see.
    - Explain what you think about how pressure levels affect the scores, and provide any insights or conclusions you can draw.
    - For example, do people with lower pressure levels tend to have higher scores? Please explain in detail.
    
    Write a detailed analysis similar to an article in a newspaper.
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // מחזיר את התוצאה שנשקלת כטקסט
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Error generating response'; // במקרה של שגיאה
    }
}










