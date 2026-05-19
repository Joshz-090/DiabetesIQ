# 🔌 DiabetesIQ — API Reference

This document provides detailed specifications for the REST API backend of the DiabetesIQ application.

---

## ⚙️ Base Configuration

* **Development Server:** `http://localhost:5000`
* **Production Server:** `https://your-backend-app.onrender.com`
* **Authentication:** None (Public Endpoint)
* **Headers:** `Content-Type: application/json`

---

## 📍 Endpoints

### 1. Health Check
Checks if the server, model, and scaler are loaded and functioning.

* **URL:** `/health`
* **Method:** `GET`
* **Response Code:** `200 OK`
* **Response Body (JSON):**
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Predict Diabetes Risk
Accepts 8 clinical characteristics of a patient, normalizes them using a pre-trained `StandardScaler`, and outputs the prediction result and prediction confidence.

* **URL:** `/predict`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body (JSON):**
  The request must contain a `features` array containing exactly 8 numerical values in the following order:
  1. `Pregnancies` (Number of times pregnant)
  2. `Glucose` (Plasma glucose concentration)
  3. `BloodPressure` (Diastolic blood pressure in mm Hg)
  4. `SkinThickness` (Triceps skin fold thickness in mm)
  5. `Insulin` (2-Hour serum insulin in μU/mL)
  6. `BMI` (Body mass index in kg/m²)
  7. `DiabetesPedigreeFunction` (Genetic likelihood ratio)
  8. `Age` (Patient age in years)

  **Example Request:**
  ```json
  {
    "features": [2, 120, 70, 25, 100, 31.5, 0.35, 30]
  }
  ```

* **Response Code:** `200 OK`
* **Response Body (JSON):**
  * `prediction`: Integer (`0` for Non-Diabetic, `1` for Diabetic).
  * `label`: String (`"Non-Diabetic"` or `"Diabetic"`).
  * `probability`: Float (`0.0` to `1.0`) representing the prediction confidence of the active class.

  **Example Response (Non-Diabetic):**
  ```json
  {
    "prediction": 0,
    "label": "Non-Diabetic",
    "probability": 0.87
  }
  ```

  **Example Response (Diabetic):**
  ```json
  {
    "prediction": 1,
    "label": "Diabetic",
    "probability": 0.74
  }
  ```

---

## ❌ Error Handling

The API returns standard HTTP status codes indicating success or failure.

### 400 Bad Request
Returned if the request format is invalid, values are empty, or the features array does not contain exactly 8 parameters.

* **Response Body (JSON):**
  ```json
  {
    "error": "Invalid input. The features array must contain exactly 8 numeric inputs."
  }
  ```

### 500 Internal Server Error
Returned if the server encounters an error during model inference or if pickle files fail to load.

* **Response Body (JSON):**
  ```json
  {
    "error": "An internal error occurred during prediction inference."
  }
  ```

---

## 💻 Example cURL Invocation

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [6, 148, 72, 35, 0, 33.6, 0.627, 50]}'
```
