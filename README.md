# 🛡️ Phishing URL Detection System

A machine learning-based web application for real-time phishing URL detection using Logistic Regression.

## 🚀 Live Demo

**[Try it here](https://YOUR_USERNAME.github.io/phishing-detector/)**

## ✨ Features

- **Real-time Analysis**: Instantly check if a URL is safe or phishing
- **Machine Learning**: Uses trained Logistic Regression model
- **24 Feature Extraction**: Analyzes URL structure, keywords, and patterns
- **Rule-based Detection**: Special rules for IP addresses and suspicious combinations
- **User-friendly Interface**: Clean, responsive design
- **Client-side Processing**: All predictions run in your browser (privacy-focused)

## 🎯 How It Works

1. **Feature Extraction**: Extracts 24 features from the URL including:
   - URL length and structure
   - Domain characteristics
   - Suspicious keywords
   - Special character patterns
   - TLD analysis

2. **Normalization**: Features are standardized using pre-trained scaler parameters

3. **Prediction**: Logistic Regression model classifies the URL as safe or phishing

4. **Confidence Score**: Displays prediction confidence based on probability

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **ML Model**: Logistic Regression (scikit-learn)
- **Training**: Python 3.13, scikit-learn, pandas, numpy
- **Deployment**: GitHub Pages (100% client-side)

## 📊 Model Performance

- **Training Dataset**: 41,544 URLs
- **Algorithm**: Logistic Regression with StandardScaler
- **Features**: 24 engineered features
- **Deployment**: Model exported to JSON for browser execution

## 🔧 Local Development

\\\ash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/phishing-detector.git
cd phishing-detector

# Open in browser
# Simply open docs/index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000/docs/
\\\

## 📁 Project Structure

\\\
phishing-detector/
├── docs/                    # Web application (deployed)
│   ├── index.html          # Main page
│   ├── app.js              # Prediction logic
│   ├── features.js         # Feature extraction
│   ├── style.css           # Styling
│   ├── model.json          # Trained model (2.8 KB)
│   ├── favicon.ico         # Icon
│   └── phishing_bg.jpg     # Background image
└── README.md               # This file
\\\

## 🎓 Research Background

This project was developed as part of a Master's thesis on cybersecurity and machine learning. The system demonstrates how machine learning can be effectively deployed in the browser for real-time phishing detection without server-side processing.

### Key Research Contributions

- Lightweight model suitable for client-side deployment
- Real-time feature extraction in JavaScript
- Privacy-preserving architecture (no data sent to servers)
- Effective rule-based overrides for edge cases

## 🔒 Security Features

- **IP Address Detection**: Flags URLs using IP addresses instead of domains
- **Suspicious TLD Detection**: Identifies risky domain extensions (.tk, .xyz, etc.)
- **Keyword Analysis**: Detects common phishing terms
- **Structural Analysis**: Examines URL patterns and anomalies

## ⚠️ Disclaimer

This tool is for **educational and research purposes only**. While it provides useful insights, always:
- Verify URLs through multiple sources
- Use official antivirus/anti-phishing tools
- Exercise caution with unfamiliar websites
- Never enter sensitive information on suspicious sites

## 👨‍🎓 Author

**[Your Name]**
- Master's Thesis Project
- [Your University]
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Research supervisors and advisors
- Dataset sources
- Open-source machine learning community
- scikit-learn contributors

---

**Built with ❤️ for safer web browsing**
