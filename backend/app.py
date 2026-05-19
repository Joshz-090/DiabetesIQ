import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

from model_loader import load_model_and_scaler

app = Flask(__name__)
# Enable CORS for all routes (essential for local cross-origin development)
CORS(app)

# Load model and scaler globally on startup
try:
    model, scaler = load_model_and_scaler()
    print("Model and Scaler loaded successfully. API is ready.")
except Exception as e:
    print(f"Failed to load model or scaler: {e}")
    model, scaler = None, None

@app.route("/health", methods=["GET"])
def health():
    """Server health status route."""
    if model is None or scaler is None:
        return jsonify({"status": "error", "message": "Model files not loaded"}), 500
    return jsonify({"status": "ok"})

@app.route("/predict", methods=["POST"])
def predict():
    """Predicts diabetes risk based on 8 clinical features."""
    if model is None or scaler is None:
        return jsonify({"error": "Prediction service is currently unavailable. Model not loaded."}), 500

    data = request.get_json(silent=True)
    if not data or "features" not in data:
        return jsonify({"error": "Missing 'features' array in request body."}), 400

    features = data["features"]
    
    # Validation: must be a list of exactly 8 numeric items
    if not isinstance(features, list) or len(features) != 8:
        return jsonify({"error": "The features array must contain exactly 8 clinical measurements."}), 400

    try:
        # Convert to float and validate no None values
        numeric_features = [float(x) for x in features]
    except (ValueError, TypeError):
        return jsonify({"error": "All inputs in the features array must be valid numbers."}), 400

    try:
        # Reshape for scikit-learn (1 sample, 8 features)
        input_data = np.array(numeric_features).reshape(1, -1)
        
        # Apply standard scaling
        scaled_data = scaler.transform(input_data)
        
        # Inference
        prediction = int(model.predict(scaled_data)[0])
        probabilities = model.predict_proba(scaled_data)[0]
        
        # Calculate confidence probability of the predicted class
        probability = float(probabilities[prediction])
        label = "Diabetic" if prediction == 1 else "Non-Diabetic"
        
        return jsonify({
            "prediction": prediction,
            "label": label,
            "probability": round(probability, 4)
        })
    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"error": "An internal error occurred during model inference."}), 500

if __name__ == "__main__":
    # In development, bind to port 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
