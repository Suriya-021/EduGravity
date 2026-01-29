import axios from 'axios';

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const BASE_URL = 'https://api.sarvam.ai'; // Assuming base URL, would verify if docs were available

export const sarvamService = {
    /**
     * Converts Text to Speech (Tamil)
     * @param text The text to convert
     * @returns Audio Blob URL
     */
    async textToSpeech(text: string): Promise<string> {
        try {
            if (!SARVAM_API_KEY) throw new Error("Sarvam API Key missing");

            // Note: This endpoint is hypothetical based on standard patterns.
            // In a real scenario, we'd verify the exact endpoint from Sarvam docs.
            const response = await axios.post(
                `${BASE_URL}/text-to-speech`,
                {
                    inputs: [text],
                    target_language_code: 'ta-IN',
                    speaker: 'meera' // Example speaker
                },
                {
                    headers: {
                        'api-subscription-key': SARVAM_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob' // Important for audio
                }
            );

            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error("Sarvam TTS Error:", error);
            throw error;
        }
    },

    /**
     * Converts Speech to Text (Tamil)
     * @param audioBlob The recorded audio blob
     * @returns Transcribed text
     */
    async speechToText(audioBlob: Blob): Promise<string> {
        try {
            if (!SARVAM_API_KEY) throw new Error("Sarvam API Key missing");

            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            formData.append('language_code', 'ta-IN');
            formData.append('model', 'saarika:v1'); // Example model name

            const response = await axios.post(
                `${BASE_URL}/speech-to-text`,
                formData,
                {
                    headers: {
                        'api-subscription-key': SARVAM_API_KEY,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data.transcript;
        } catch (error) {
            console.error("Sarvam STT Error:", error);
            throw error;
        }
    }
};
