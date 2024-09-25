import speech from 'speech-to-text';

export const startSpeechRecognition = () => {
  const recognizer = new speech.SpeechToText();
  return new Promise((resolve, reject) => {
    recognizer.on('data', (data) => {
      if (data.results[0].isFinal) {
        resolve(data.results[0].transcript);
      }
    });
    recognizer.on('error', reject);
    recognizer.start();
  });
};
