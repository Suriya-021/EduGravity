# 🌍 EduGravity (EduSocial GeoBot)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**EduGravity** is an interactive educational web platform designed to teach geography through an immersive 3D experience. It features an AI-powered Robot Tutor that communicates in Tamil, helping students explore continents using Google Earth visualizations.

## ✨ Features

-   **3D Earth Visualization**: Full-screen, interactive 3D globe using Google Maps Satellite view.
-   **AI Robot Tutor**: An animated AI avatar that serves as a friendly guide.
-   **Tamil Voice Interaction**: Integrated with **Sarvam AI** for high-quality Tamil Text-to-Speech (TTS).
-   **Intelligent Q&A**: Simply ask "Tell me about Asia" or "What is Antarctica?", and the bot will fly you there and explain facts in Tamil.
-   **Glassmorphism UI**: A modern, sleek user interface designed for engagement.

## 🚀 Tech Stack

-   **Frontend**: React (v18), TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS (with Glassmorphism utilities)
-   **Maps**: Leaflet (React Leaflet) + Stadia Maps Tiles
-   **AI/Voice**: Sarvam AI API
-   **State Management**: Zustand
-   **Animations**: Framer Motion

## 🛠️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Suriya-021/EduGravity.git
    cd EduGravity
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_STADIA_MAPS_API_KEY=your_stadia_maps_key
    VITE_SARVAM_API_KEY=your_sarvam_api_key
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 🎮 How to Use

1.  Open the app in your browser.
2.  **Explore**: Click on the suggestion chips (e.g., "Asia", "Africa") to fly to that continent.
3.  **Chat**: Type questions like "Tell me about South America" in the chat box.
4.  **Listen**: The AI Robot will answer and speak in Tamil!

## 🤝 Contributing

Contributions are welcome! Please feel free to wait for future updates or submit a Pull Request.

---

Built with ❤️ by [Suriya-021](https://github.com/Suriya-021)
