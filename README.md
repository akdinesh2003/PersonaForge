# 🧠 PersonaForge

**Craft synthetic user personas with emotional depth, realistic goals, and sample dialogue — all offline.**  
PersonaForge is a Python-based tool designed for UX designers, NLP developers, and AI researchers who need diverse, testable personas without relying on external APIs.

---

## 🚀 Features

- 🎭 Generate realistic personas with name, age, profession, and location
- 💬 Include emotional profiles and sample dialogue
- 🧠 Rule-based logic using local datasets — no cloud dependencies
- 📦 Output in JSON or Markdown for easy integration
- 🔐 Optional AI model support via Gemini or Ollama (user-provided keys)

---

## 📦 Installation

```bash
git clone https://github.com/akdinesh2003/PersonaForge.git
cd PersonaForge
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 🧪 How to Run

```bash
python persona_forge.py
```

You’ll be prompted to select parameters like:
- Profession
- Age range
- Emotional tone
- Output format (JSON/Markdown)

Sample output will be saved to `/output/` folder.

---

## 🔧 Optional: Enable AI Model Integration

If you want to enhance persona generation with AI models like Gemini or Ollama:

### 🔑 Gemini Setup
1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/)
2. Add it to a `.env` file:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

### 🧠 Ollama Setup
1. Install Ollama locally: [https://ollama.com](https://ollama.com)
2. Pull a model:
   ```bash
   ollama pull gemma
   ```
3. Start the server:
   ```bash
   ollama serve
   ```

PersonaForge will auto-detect local Ollama if available.

---

## 🌐 Deployment Options

### ✅ Local Use
- Fully offline with rule-based generation
- Works on any OS with Python 3.8+

### ☁️ Cloud Deployment (Optional)
- Deploy to Firebase Functions or Flask API
- Add your Gemini key securely via environment variables
- Use Genkit for Firebase AI orchestration (optional)

---

## 👤 Author

**AK DINESH**  
GitHub: [akdinesh2003](https://github.com/akdinesh2003)
