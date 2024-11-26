let audioContext, analyser, microphone, dataArray;
let volumeSum = 0, speechRateSum = 0, pitchSum = 0;
let count = 0;  // מספר הפעמים שאנחנו עושים עדכון

// פונקציה שמבצעת התחלת הקלטה
export function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            // יצירת AudioContext ו-AnalyserNode
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            analyser.fftSize = 2048;
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
    const volume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

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
    let rate = 0;
    // מניח שמהירות הדיבור תלויה במספר השינויים בתדרים
    for (let i = 1; i < dataArray.length; i++) {
        if (Math.abs(dataArray[i] - dataArray[i - 1]) > 10) {
            rate++;
        }
    }
    return rate;
}

// פונקציה שמבצעת חישוב הטון
function calculatePitch(dataArray) {
    let pitch = 0;
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > pitch) {
            pitch = dataArray[i];
        }
    }
    return pitch;
}

// פונקציה שמסיימת את ההקלטה ומדפיסה את הממוצעים
export function stopRecording(score) {
    if (audioContext) {
        audioContext.close();  // סגירת הקלטה
        console.log("הקלטה הסתיימה.");

        // חישוב הממוצעים
        const avgVolume = volumeSum / count;
        const avgSpeechRate = speechRateSum / count;
        const avgPitch = pitchSum / count;

        // הדפסת הממוצעים לקונסול
        console.log("ממוצע עוצמת קול: ", avgVolume);
        console.log("ממוצע מהירות דיבור: ", avgSpeechRate);
        console.log("ממוצע טון: ", avgPitch);

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
                // טיפול בשגיאות בלבד
                console.error("Error sending data to server:", error);
            });


    }
}
