# 🩺 DiabetesIQ — Diabetes Prediction Web Application 

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg?style=flat-square&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Flask-3-lightgrey.svg?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.6-orange.svg?style=flat-square&logo=scikit-learn)](https://scikit-learn.org/)

DiabetesIQ is a full-stack, AI-powered web application that predicts diabetes risk based on 8 clinical inputs. The system uses a trained Random Forest model on the backend, exposed via a Flask REST API, with a clean and interactive medical-themed React frontend.

---

## 📝 Project Description

Diabetes is a chronic disease that affects millions worldwide. Early detection is vital for effective clinical management and intervention. DiabetesIQ allows users or medical professionals to enter patient clinical details (such as glucose levels, insulin, BMI, and age) to instantly receive a diabetes risk prediction, along with a confidence percentage.

---

## 🚀 Live Demo

🔗 **[[touch here]](https://diabetes-iq.vercel.app/)**

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Machine Learning** | Python, Scikit-learn, Pandas, Numpy | Data preprocessing, multi-model evaluation, and serialization. |
| **Backend API** | Flask, Flask-CORS, Gunicorn | Lightweight REST API serving predictions. |
| **Frontend** | React (Vite), Axios, Vanilla CSS | Medical-themed, responsive user interface. |
| **Deployment** | Render (Backend), Vercel (Frontend) | Production-ready cloud hosting solutions. |

---

## 📊 Dataset

* **Name:** Pima Indians Diabetes Dataset
* **Source:** National Institute of Diabetes and Digestive and Kidney Diseases
* **Size:** 768 rows, 9 columns
* **Target Variable:** `Outcome` (0 = Non-Diabetic, 1 = Diabetic)

### Column Explanations:
| Feature | Description | Range / Unit |
|---|---|---|
| **Pregnancies** | Number of times pregnant | 0 – 17 |
| **Glucose** | Plasma glucose concentration a 2 hours in an oral glucose tolerance test | 0 – 199 mg/dL |
| **BloodPressure** | Diastolic blood pressure | 0 – 122 mm Hg |
| **SkinThickness** | Triceps skin fold thickness | 0 – 99 mm |
| **Insulin** | 2-Hour serum insulin | 0 – 846 μU/mL |
| **BMI** | Body mass index (weight in kg / (height in m)^2) | 0 – 67.1 |
| **DiabetesPedigreeFunction** | A function which scores likelihood of diabetes based on family history | 0.078 – 2.42 |
| **Age** | Age in years | 21 – 81 |

---

## 🧬 ML Pipeline Summary

The training pipeline in [diabetes_prediction.ipynb](file:///d:/projects/Eyasu/DiabetesIQ/ml/notebooks/diabetes_prediction.ipynb) covers the following:

1. **Problem Definition:** Outlining clinical goals and dataset features.
2. **Exploratory Data Analysis (EDA):** Visualizing distributions, correlation heatmaps, outliers, and feature pair plots.
3. **Data Preprocessing:** Handling invalid zero values (Glucose, BloodPressure, etc.) by converting them to NaN and imputing the median grouped by class.
4. **Feature Selection:** Ranking features via SelectKBest (chi-squared statistics) and correlation.
5. **Model Training:** Training Logistic Regression, KNN, Decision Tree, Random Forest, SVM, and XGBoost.
6. **Model Evaluation:** Detailed comparison of Accuracy, Precision, Recall, F1-Score, and ROC-AUC.
7. **Model Saving:** Serializing the best-performing model (Random Forest) and scaler using `joblib`.

---

## 📈 Model Performance Table

| Model | Accuracy | F1-Score | AUC |
|---|---|---|---|
| **XGBoost** | 0.8831 | 0.8364 | 0.9470 |
| **Random Forest** | 0.8636 | 0.8037 | 0.9447 |
| **Support Vector Machine (SVM)** | 0.8377 | 0.7706 | 0.8974 |
| **K-Nearest Neighbors (KNN)** | 0.8117 | 0.7290 | 0.8631 |
| **Decision Tree** | 0.8117 | 0.7238 | 0.7869 |
| **Logistic Regression** | 0.7078 | 0.5714 | 0.8263 |

*Note: Metrics calculated on an 80/20 test split (random_state=42).*

---

## 📂 Folder Structure

```
DiabetesIQ/
│
├── ml/                              # All machine learning work
│   ├── data/
│   │   └── diabetes.csv             # Dataset goes here
│   ├── models/
│   │   ├── diabetes_model.pkl       # Saved trained model
│   │   └── scaler.pkl               # Saved StandardScaler
│   ├── notebooks/
│   │   └── diabetes_prediction.ipynb  # Full Jupyter notebook (all ML steps)
│   └── requirements_ml.txt          # ML-specific Python deps
│
├── backend/                         # Flask API
│   ├── app.py                       # Main Flask application
│   ├── model_loader.py              # Loads pkl model and scaler
│   ├── requirements.txt             # Backend Python deps
│   └── Procfile                     # For Render/Railway deployment
│
├── frontend/                        # React App
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionForm.jsx   # Main input form
│   │   │   ├── ResultCard.jsx       # Shows prediction result
│   │   │   └── Header.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/                            # Documentation
│   ├── project_report.md            # Full academic report template
│   ├── api_reference.md             # API endpoint documentation
│   └── deployment_guide.md          # Step-by-step deployment instructions
│
├── README.md                        # Main project README
├── .gitignore
└── .env.example                     # Environment variable template
```

---

## 💻 Getting Started (Windows Setup)

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd DiabetesIQ
```

### 2. Set Up Python Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
# Install ML pipeline dependencies
pip install -r ml/requirements_ml.txt

# Install backend dependencies
pip install -r backend/requirements.txt
```

### 4. Fetch Dataset & Train Model
1. Place `diabetes.csv` in `ml/data/` (or run the automated dataset download).
2. Open Jupyter:
   ```bash
   jupyter notebook
   ```
3. Run the notebook at [diabetes_prediction.ipynb](file:///d:/projects/Eyasu/DiabetesIQ/ml/notebooks/diabetes_prediction.ipynb) to train the model and save the pickle files into `ml/models/`.

### 5. Run Flask Backend
From the root directory:
```bash
cd backend
python app.py
```
*Backend runs on: http://localhost:5000*

### 6. Run React Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on: http://localhost:5173*

---

## 🔌 API Reference

### `GET /health`
Returns server operational status.
* **Response:**
  ```json
  { "status": "ok" }
  ```

### `POST /predict`
Submits clinical inputs for risk evaluation.
* **Request Body:**
  ```json
  {
    "features": [2, 120, 70, 25, 100, 31.5, 0.35, 30]
  }
  ```
* **Response:**
  ```json
  {
    "prediction": 0,
    "label": "Non-Diabetic",
    "probability": 0.87
  }
  ```

---

## 🌐 Deployment Guide

* **Backend:** Deploy `backend/` folder on **Render** (as a Web Service) utilizing the provided `Procfile` and python environment.
* **Frontend:** Deploy `frontend/` folder on **Vercel** or Netlify. Connect the backend by setting the `VITE_API_URL` environment variable.

---

## 🎓 Academic Context
This project is submitted for the course **Fundamentals of Machine Learning** at **Arba Minch University**, Department of Software Engineering.

* **Group Members:**
  * Eyasu Zerihun (NSR/331/16)
  * Misker Genene (NSR/1450/16)
  * Biruk Getahun (NSR/204/16)
  * Heran Mohamed (NSR/1667/16)
  * Hlina Kitachew (NSR/500/16)
* **Instructor:** Mr. Melaku

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
