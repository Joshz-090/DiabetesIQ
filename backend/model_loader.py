import os
import joblib

# Determine base directory paths robustly
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Primary target: ml/models/ outside backend/
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "ml", "models", "diabetes_model.pkl"))
SCALER_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "ml", "models", "scaler.pkl"))

def load_model_and_scaler():
    """Loads the serialized model and standard scaler robustly."""
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        # Fallback search path in case the app is structured differently in deployment
        fallback_model = os.path.normpath(os.path.join(BASE_DIR, "ml", "models", "diabetes_model.pkl"))
        fallback_scaler = os.path.normpath(os.path.join(BASE_DIR, "ml", "models", "scaler.pkl"))
        
        if os.path.exists(fallback_model) and os.path.exists(fallback_scaler):
            print(f"Loading model from fallback path: {fallback_model}")
            model = joblib.load(fallback_model)
            scaler = joblib.load(fallback_scaler)
            return model, scaler
        else:
            raise FileNotFoundError(
                f"Required weights not found.\nSearched: {MODEL_PATH} and {fallback_model}"
            )
            
    print(f"Loading model from: {MODEL_PATH}")
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, scaler
