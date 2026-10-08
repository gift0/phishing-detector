# 🛡️ A Hybrid Machine Learning Framework for Detecting Phishing Attacks in Web Traffic

A comprehensive machine learning-based system for real-time phishing URL detection, developed as part of a Master's thesis in Cybersecurity.

## 🚀 Live Demo

**[Try the application here](https://gift0.github.io/phishing-detector/)**

---

## 📚 Research Information

### Author
**Gift Maduabuchi**  
Master's in Cybersecurity  
The Africa Centre of Excellence on Technology Enhanced Learning (ACETEL)  
📧 giftmaduabuchi@gmail.com  
🔗 [GitHub Profile](https://github.com/gift0)

### Supervisors
- Dr. Saheed Kayode
- Dr. Adeyinka Abiodun

### Thesis Title
*A Hybrid Machine Learning Framework for Detecting Phishing Attacks in Web Traffic*

---

## 🎯 Research Goals and Objectives

### Primary Goal
To create and implement a hybrid machine learning framework for identifying phishing attacks in web traffic.

### Research Aim
To develop a hybrid machine learning framework for detecting phishing attacks in web traffic.

### Research Objectives

1. To design a novel hybrid phishing detection framework via supervised learning methods (SLM) with an unsupervised anomaly detection technique.

2. To implement the performance of the proposed hybrid framework against shallow machine learning models using performance metrics such as accuracy, precision, recall, and ROC curve.

3. To design a Shapley Additive Explanation framework (SHAP) and Local Interpretable Model-Agnostic Explanation (LIME) to address the black box issue and enhance the model transparency and interpretability.

---

## 🔬 Research Methodology

This study adopts an **experimental quantitative research design** to develop and evaluate a hybrid machine learning framework for detecting phishing attacks in web traffic.

### Key Methodological Features

- **Integrated Approach**: Combines supervised and unsupervised algorithms to improve classification accuracy and model robustness
- **Data-Driven Experimentation**: Focuses on dataset preprocessing, model optimization, and performance evaluation
- **Reproducible Testing**: Enables validation of machine learning models under controlled conditions
- **Multi-Dataset Strategy**: Uses three benchmark datasets to address dataset bias and enhance generalization

### Research Workflow

1. **Data Acquisition** from multiple sources
2. **Preprocessing and Encoding** of raw data
3. **Feature Extraction** (24 engineered features)
4. **Model Training** using multiple algorithms
5. **Validation** against benchmark metrics
6. **Performance Evaluation** and comparison
7. **Interpretability Analysis** using SHAP

---

## 📊 Dataset Sources

### Benchmark Datasets
- **PhishTank**: Verified phishing URLs database
- **PhishStorm**: Curated phishing samples
- **Tranco**: Top legitimate websites ranking

**Total URLs**: 296,138 samples  
**Purpose**: Ensures diversity and representativeness of phishing and legitimate web samples

---

## 🤖 Machine Learning Models

### Implemented Models
1. **Logistic Regression** - Linear classification baseline
2. **Random Forest** - Ensemble learning approach
3. **Hybrid Model** - Combined supervised/unsupervised framework
4. **Isolation Forest** - Unsupervised anomaly detection
---

## ✨ Key Features

### Technical Features
- **Real-time Analysis**: Instant URL classification
- **24 Feature Extraction**: Comprehensive URL characteristic analysis
- **Client-Side Processing**: Privacy-preserving architecture
- **Rule-Based Overrides**: Enhanced detection for edge cases

### Feature Categories
1. **Lexical Features**: URL length, special characters, digits
2. **Structural Features**: Domain structure, path analysis
3. **Heuristic Features**: Suspicious keywords, TLD analysis
4. **Protocol Features**: HTTPS detection, IP address identification

---

## 🛠️ Technology Stack

### Machine Learning & Data Science
- **Python 3.13**: Core programming language
- **scikit-learn**: Machine learning algorithms
- **XGBoost**: Gradient boosting framework
- **imbalanced-learn**: Handling class imbalance
- **SHAP**: Model explainability
- **Pandas & NumPy**: Data manipulation

### Web Deployment
- **HTML5, CSS3, JavaScript**: Frontend technologies
- **GitHub Pages**: Hosting platform
- **Vanilla JS**: Client-side ML inference

---

## 🔒 Security Architecture

### Detection Mechanisms
- **IP Address Detection**: Flags URLs using IP addresses
- **Suspicious TLD Analysis**: Identifies risky extensions (.tk, .xyz, .top, .club, .zip)
- **Keyword Pattern Matching**: Detects common phishing terms (login, verify, update, bank, secure, account)
- **Structural Anomalies**: Examines URL patterns and irregularities

### Privacy Features
- ✅ 100% client-side processing
- ✅ No data sent to servers
- ✅ No user tracking
- ✅ No cookies or analytics

---

## 📈 Model Interpretability

### SHAP (Shapley Additive Explanations)
- Provides feature importance rankings
- Explains individual predictions
- Enhances model transparency
- Supports trust and validation

### Visualization
- Feature importance plots
- Model comparison charts
- Error analysis scatter plots
- Confusion matrices

---

## 🎓 Academic Contributions

### Novel Contributions
1. **Hybrid Framework**: Integration of supervised and unsupervised learning
2. **Multi-Dataset Validation**: Comprehensive evaluation across diverse sources
3. **Explainable AI**: SHAP-based interpretability framework
4. **Lightweight Deployment**: Browser-based ML inference

### Research Alignment
Aligns with recent studies on phishing detection frameworks:
- Barik et al. (2025)
- Opara et al. (2024) 
- Karim et al. (2023)
- Ahammad et al. (2022)
- Yang et al. (2021)
- Alsariera et al. (2020)
- Kunju et al. (2019)

---

## 💻 Local Development

\\\ash
# Clone the repository
git clone https://github.com/gift0/phishing-detector.git
cd phishing-detector

# Open in browser
# Simply open docs/index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000/docs/
\\\

---

## 📁 Project Structure

\\\
phishing-detector/
├── docs/                       # Deployed web application
│   ├── index.html             # Main interface
│   ├── app.js                 # Prediction engine
│   ├── features.js            # Feature extraction
│   ├── style.css              # Styling
│   ├── model.json             # Trained model (2.8 KB)
│   └── assets/                # Images and icons
├── src/                       # Python source code
│   ├── feature_engineering.py # Feature extraction
│   ├── model_training.py      # Model training
│   └── preprocess.py          # Data preprocessing
├── output/                    # Model artifacts
│   ├── figures/               # Visualizations
│   └── reports/               # Performance metrics
└── README.md                  # This file
\\\

---

---

## 🔍 How It Works

### User Workflow
1. User enters a URL in the web interface
2. System extracts 24 features from the URL
3. Features are normalized using StandardScaler
4. Logistic Regression model classifies the URL
5. Confidence score is calculated and displayed
6. Rule-based checks override for edge cases

### Technical Workflow
1. **Input Validation**: URL format checking
2. **Feature Extraction**: 24 features computed
3. **Normalization**: StandardScaler transformation
4. **Prediction**: Logistic regression inference
5. **Post-Processing**: Rule-based adjustments
6. **Output**: Classification + confidence score

---

## ⚠️ Limitations and Future Work

### Current Limitations
- Model trained on specific dataset timeframe
- Limited to URL-based features (no content analysis)
- Static model (requires periodic retraining)
- No real-time threat intelligence integration

### Future Enhancements
- Integration with live threat databases
- Deep learning model exploration
- Content-based feature extraction
- Real-time model updates
- Multi-language support

---

## 📄 Citation

If you use this work in your research, please cite:

\\\
Maduabuchi, G., Saheed, K., & Adeyinka, A. (2026). A Hybrid Machine Learning Framework for Detecting
Phishing Attacks in Web Traffic. Master's Thesis, Africa Centre of Excellence on Technology Enhanced Learning (ACETEL).
\\\

---

## 🙏 Acknowledgments

- **Supervisors**: Dr. Saheed Kayode and Dr. Adeyinka Abiodun for guidance and support
- **University**: The Africa Centre of Excellence on Technology Enhanced Learning for research support
- **Dataset Providers**: PhishTank, PhishStorm, and Tranco for making data publicly available
- **Open Source Community**: scikit-learn, XGBoost, and SHAP contributors

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ⚠️ Disclaimer

This tool is developed for **educational and research purposes only**. While the system demonstrates effective phishing detection capabilities, users should:

- Always verify URLs through multiple sources
- Use official antivirus and anti-phishing tools
- Exercise caution with unfamiliar websites
- Never enter sensitive information on suspicious sites
- Understand that no detection system is 100% accurate

---

## 📞 Contact

**Gift Maduabuchi**  
📧 Email: giftmaduabuchi@gmail.com  
🔗 GitHub: [@gift0](https://github.com/gift0)  
🌐 Live Demo: [https://gift0.github.io/phishing-detector/](https://gift0.github.io/phishing-detector/)

---

**Built with ❤️ for safer web browsing and advancing cybersecurity research**
