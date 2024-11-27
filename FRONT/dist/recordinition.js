let audioContext, analyser, microphone, dataArray;
let volumeSum = 0, speechRateSum = 0, pitchSum = 0;
let count = 0; // מספר הפעמים שאנחנו עושים עדכון
const MIN_THRESHOLD = 50; // אם הערך נמוך מזה, נניח שזו עוצמת שקט ולא מחשבים את זה כחלק מהמהירות

// פונקציה שמבצעת התחלת הקלטה
export function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            // יצירת AudioContext ו-AnalyserNode
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            // הגדרות ל-AnalyserNode
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.8; // להחלקת הרעש
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            // הפעלת קריאה מתמשכת
            requestAnimationFrame(updateAudioData);

            console.log("הקלטה התחילה...");
        })
        .catch((err) => {
            console.error("שגיאה בגישה למיקרופון:", err);
        });
}

// פונקציה שמתעדכנת כל הזמן ומביאה את נתוני האודיו
function updateAudioData() {
    // קריאת נתוני אודיו
    analyser.getByteFrequencyData(dataArray);

    // חישוב עוצמת קול (Volume)
    const volume = dataArray.reduce((sum, val) => sum + val, 0); // ללא ממוצע

    // חישוב מהירות דיבור
    const speechRate = calculateSpeechRate(dataArray);

    // חישוב טון (Pitch)
    const pitch = calculatePitch(dataArray);

    // עדכון סכומים
    volumeSum += volume;
    speechRateSum += speechRate;
    pitchSum += pitch;
    count++;

    // קריאה מתמשכת
    requestAnimationFrame(updateAudioData);
}

// פונקציה שמבצעת חישוב מהירות דיבור על פי שינויי התדרים
function calculateSpeechRate(dataArray) {
    let totalTime = 0; // זמן כולל (כולל שקט)
    let speechTime = 0; // זמן שבו הייתה פעילות דיבור

    // עבור כל הערכים ב-dataArray
    for (let i = 1; i < dataArray.length; i++) {
        if (dataArray[i] > MIN_THRESHOLD) { // אם יש עוצמת קול משמעותית
            speechTime++; // הוספה לזמן הדיבור
        }
        totalTime++; // הוספה לכל הזמן
    }

    return speechTime / totalTime; // יחס בין הזמן שבו הייתה פעילות לבין זמן השקט
}

// פונקציה שמבצעת חישוב הטון
function calculatePitch(dataArray) {
    // זיהוי תדר הטון המשמעותי ביותר
    const maxIndex = dataArray.indexOf(Math.max(...dataArray));
    const pitch = (audioContext.sampleRate / analyser.fftSize) * maxIndex; // חישוב לפי אינדקס
    return pitch;
}

// פונקציה שמסיימת את ההקלטה ומדפיסה את הממוצעים
export function stopRecording(score) {
    if (audioContext) {
        audioContext.close(); // סגירת הקלטה
        console.log("הקלטה הסתיימה.");

        // חישוב הממוצעים
        const avgVolume = volumeSum / count;
        const avgSpeechRate = speechRateSum / count;
        const avgPitch = pitchSum / count;

        // הדפסת הממוצעים לקונסול
        console.log("ממוצע עוצמת קול: ", avgVolume);
        console.log("ממוצע מהירות דיבור: ", avgSpeechRate);
        console.log("ממוצע טון: ", avgPitch);

        // שליחת הנתונים לשרת
        fetch("http://localhost:3000/storeScoreAndStress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loudness: avgVolume,
                speechRate: avgSpeechRate,
                pitch: avgPitch,
                score: score // שים את הציון לפי הצורך
            })
        })
            .catch(error => {
                console.error("Error sending data to server:", error);
            });
    }
}
