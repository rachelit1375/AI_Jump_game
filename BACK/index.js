
const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
async function TranslationClassificationWord(word) {
    console.log("k" + word + "h");
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are given a word: "${word}". 
    - If its meaning is "RIGHT", return 1.
    - If its meaning is "LEFT", return 2.
    - Otherwise, return 3.
    answer me only in one digit!
    Note: The word might originate from a different language but be written in Hebrew letters. Analyze the word carefully to determine its meaning.
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

async function sendToGeminiForStressLevel(loudness, speechRate, pitch) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Given the following audio data, evaluate the stress level on a scale from 1 to 10, where 1 is least stressed and 10 is most stressed.
   
    The user is engaged in an interactive game requiring focus and quick reactions. Emotional responses are expected but should be within reasonable limits.
   
    ### Audio Data:
       loudness: ${loudness}, speech rate: ${speechRate}, pitch: ${pitch}
   
    ### Key Stress Indicators:
    - **Loudness (average)**:
        - Below 2000: Very Calm (Rating: 1-2)
        - 2000-7000: Mild Stress (Rating: 3-5)
        - 7000-10000: Moderate Stress (Rating: 6-7)
        - Above 10000: High Stress or Panic (Rating: 8-9)
        -Above 14000:very High Stress or Panic(10)
    - **Speech Rate (average)** (Less significant in this analysis):
        - Below 0.01: Very Calm (Rating: 1-2)
        - 0.01-0.05: Calm to Moderate (Rating: 3-5)
        - 0.05-0.1: Moderate Stress (Rating: 6-7)
        - Above 0.1: High Stress (Rating: 8-10)
    - **Pitch (average)**:
        - Below 200: Very Calm (Rating: 1-2)
        - 200-600: Calm to Moderate (Rating: 3-5)
        - 600-800: Moderate Stress (Rating: 6-7)
        - Above 800: High Stress (Rating: 8-10)
   
    ### Important Note:
    - While **Speech Rate** is a factor in determining stress, **Loudness** and **Pitch** have a stronger impact on the overall stress level.
    - Please weigh the **Loudness** and **Pitch** more heavily when determining the final stress rating.

    Answer with a single number from 1 to 10 (no explanations), based on the combined indicators.
`;
        
    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // מחזיר את התוצאה שנשקלת כטקסט
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Error'; // במקרה של שגיאה, מחזיר "Error"
    }


}

app.post("/storeScoreAndStress", async (req, res) => {
    const { loudness, speechRate, pitch, score } = req.body;

    if (loudness == null || speechRate == null || pitch == null || score == null) {
        return res.status(400).send('Missing required data');
    }
    const stressLevel = parseInt(await sendToGeminiForStressLevel(loudness, speechRate, pitch), 10);
    console.log(stressLevel);
    InsertToSchema(stressLevel, score);
})
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
app.get('/AnalyzePressureAndPerformance', async (req, res) => {

    // מבצע את קריאת ה-API ומקבל את התוצאה
    const response = await analyzePressureAndScores(1);

    // שולח את התוצאה חזרה כתגובה
    res.send(response);
});

app.get('/PressureScoresChart', async (req, res) => {
    try {
        const pressureMap = await analyzePressureAndScores(2);
        for (const [key, scores] of pressureMap) {//חישוב ממוצע
            const average = scores.reduce((sum, val) => sum + val, 0) / scores.length;
            pressureMap.set(key, average);
        }
        const sortedPressureData = Array.from(pressureMap.entries())
            .sort((a, b) =>a[0]-  b[0]); // מיון לפי הממוצע (הערך)

        const labels = sortedPressureData.map(entry => entry[0]); // שמות הצירים
        const data = sortedPressureData.map(entry => entry[1]); // הנתונים הממוצעים


        // מחזירים מבנה JSON ידידותי לפרונט
        res.json({
            labels, // הצירים
            datasets: [
                {
                    label: 'Average Scores by Pressure Levels',
                    data, // הנתונים הממוצעים
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal server error');
    }

});
const Pressure = mongoose.model('Pressure', PressureSchema);

async function InsertToSchema(pressureLevel, score) {
    console.log("score :" + score)
    const pressure = new Pressure({ pressureLevel, score });
    await pressure.save();
}

async function analyzePressureAndScores(id) {
    const pressures = await Pressure.find();

    const pressureMap = new Map();
    pressures.forEach(line => {
        pressureMap.set(line.pressureLevel, [...pressureMap.get(line.pressureLevel) || [], line.score]);
    });
    if (id === 1)
        return generateAnalysis(pressureMap);
    if (id === 2)
        return pressureMap;

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
    Format the entire response in valid HTML tags only:
    - Use at least one <h1> for the main title.
    - Use <h2> or <h3> for section headings.
    - Use <p> for paragraphs.
    - Use <ul> or <ol> for any lists of insights or trends.
    Ensure the HTML can be directly pasted into the <body> tag without needing a <head> section or additional formatting.
    `;


    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text().replace(/```html/g, "").replace(/```/g, "");; // מחזיר את התוצאה שנשקלת כטקסט
    } catch (error) {
        console.error('Error generating response:', error);
        return 'Error generating response'; // במקרה של שגיאה
    }
}

//analyzePressureAndScores();



