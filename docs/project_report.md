# 📑 Academic Project Report: DiabetesIQ Risk Prediction System

**Course:** Fundamentals of Machine Learning (CS-3121)  
**Institution:** Arba Minch University, College of Natural Sciences, Department of Software Engineering  
**Date:** May 2026  

**Group Members:**
* Eyasu Zerihun (NSR/331/16)
* Misker Genene (NSR/1450/16)
* Biruk Getahun (NSR/204/16)
* Heran Mohamed (NSR/16)
* Hlina Kitachew (NSR/500/16)

---

## 📄 Abstract
Diabetes mellitus is a growing global health crisis. Early diagnosis is essential to prevent severe clinical complications such as cardiovascular disease, neuropathy, and kidney failure. This report details the design and implementation of **DiabetesIQ**, an end-to-end machine learning system that predicts diabetes risk using the Pima Indians Diabetes Dataset. We evaluate multiple classification algorithms including Logistic Regression, K-Nearest Neighbors, Decision Trees, Support Vector Machines, Random Forests, and XGBoost. The XGBoost model achieved the highest classification performance with an accuracy of **88.31%** and an ROC-AUC of **0.9470**, followed closely by the Random Forest model with **86.36%** accuracy and **0.9447** ROC-AUC. For clinical screening assistance, the Random Forest model was serialized and deployed via a Flask REST API backend connected to a responsive React.js frontend interface.

---

## 1. Introduction
Diabetes mellitus is a metabolic disease characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both. The rapid rise of diabetes prevalence globally necessitates the integration of machine learning tools in clinical workflows. Predictive modeling enables healthcare systems to identify high-risk individuals proactively, allowing for early lifestyle interventions or therapeutic management. 

---

## 2. Problem Statement
The objective is to formulate a binary classification pipeline to predict whether a patient has diabetes based on eight clinical diagnostic measurements. Mathematically, given a feature vector $\mathbf{x} \in \mathbb{R}^8$, we train a classifier $f(\mathbf{x}) \rightarrow y$, where $y \in \{0, 1\}$ (0 represents non-diabetic, 1 represents diabetic).

---

## 3. Dataset Description
We utilize the **Pima Indians Diabetes Dataset**, originally sourced from the National Institute of Diabetes and Digestive and Kidney Diseases. The dataset consists of 768 female patients of Pima Indian heritage.

### Feature Definition Table
| Variable | Data Type | Units / Range | Description |
|---|---|---|---|
| **Pregnancies** | Integer | 0 – 17 | Number of times pregnant. |
| **Glucose** | Numeric | 0 – 199 mg/dL | Plasma glucose concentration in oral glucose tolerance test. |
| **BloodPressure** | Numeric | 0 – 122 mm Hg | Diastolic blood pressure. |
| **SkinThickness** | Numeric | 0 – 99 mm | Triceps skin fold thickness. |
| **Insulin** | Numeric | 0 – 846 μU/mL | 2-Hour serum insulin. |
| **BMI** | Numeric | 0 – 67.1 kg/m² | Body mass index. |
| **DiabetesPedigreeFunction**| Numeric | 0.078 – 2.42 | Likelihood of diabetes based on family history. |
| **Age** | Integer | 21 – 81 years | Age of the patient. |
| **Outcome** (Target) | Binary | 0 or 1 | Diagnosis (0: Non-Diabetic, 1: Diabetic). |

---

## 4. Methodology
Our machine learning pipeline consists of four major phases: Exploratory Data Analysis, Data Preprocessing, Model Training, and Evaluation.

```
[Raw Dataset] ➔ [EDA & Outliers] ➔ [Imputation (Class Medians)] ➔ [Standardization] ➔ [Training] ➔ [Evaluation]
```

### 4.1 Exploratory Data Analysis (EDA)
- Class balance: The target variable contains 500 (65.1%) non-diabetic and 268 (34.9%) diabetic cases, indicating class imbalance.
- Correlation analysis: Glucose levels and BMI demonstrate the strongest linear correlation with the outcome.

### 4.2 Data Preprocessing
- **Handling Medically Invalid Zeroes:** Features like Glucose, BloodPressure, SkinThickness, Insulin, and BMI contain zero values that are physiologically impossible. These were replaced with `NaN`.
- **Imputation:** Missing values were imputed using the **median value of the respective class** (`Outcome`) to preserve class distributions:
  $$\text{Imputed Value} = \text{Median}(X_{\text{feature}} \mid Y = y)$$
- **Scaling:** Features were normalized using `StandardScaler` to bring all values onto a common scale with mean 0 and variance 1.

### 4.3 Model Selection & Training
We trained and compared five baseline classifiers:
1. **Logistic Regression:** Linear decision boundaries.
2. **K-Nearest Neighbors (KNN):** Distance-based non-parametric classifier ($k=5$).
3. **Decision Tree:** Flowchart-like tree structure using Gini impurity.
4. **Random Forest:** Ensemble of decision trees using bagging.
5. **Support Vector Machine (SVM):** Maximum-margin linear/radial classifier.

---

## 5. Results & Discussion

### Model Evaluation Metrics (Test Split: 20%)
| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|---|---|---|---|---|---|
| **XGBoost** | **88.31%** | 82.14% | 85.19% | 83.64% | **0.9470** |
| **Random Forest** | 86.36% | 81.13% | 79.63% | 80.37% | 0.9447 |
| **Support Vector Machine** | 83.77% | 76.36% | 77.78% | 77.06% | 0.8974 |
| **K-Nearest Neighbors** | 81.17% | 73.58% | 72.22% | 72.90% | 0.8631 |
| **Decision Tree** | 81.17% | 74.51% | 70.37% | 72.38% | 0.7869 |
| **Logistic Regression** | 70.78% | 58.82% | 55.56% | 57.14% | 0.8263 |

### Insights
- **Feature Importance:** Random Forest feature importance calculations reveal that **Glucose** is the single most predictive feature, followed by **BMI** and **Age**.
- **Model Behavior:** Non-linear ensemble methods (XGBoost, Random Forest) outperform linear models significantly by capturing interactive dependencies between features (e.g., the combined non-linear effect of high BMI and Glucose).
- **Deployment Choice:** While XGBoost achieved the absolute highest accuracy (88.31%), Random Forest was selected for backend deployment due to its high accuracy (86.36%) combined with more stable prediction intervals on clinical input bounds.

---

## 6. Conclusion
The DiabetesIQ system successfully translates clinical patient characteristics into an accurate diabetes risk indicator. The Random Forest model provides a robust baseline for diagnostic assistance, offering a high ROC-AUC (0.8354) that indicates solid class discrimination. Future enhancements could include hyperparameter tuning via GridSearchCV and expanding the dataset size.

---

## 7. References
1. Smith, J.W., Everhart, J.E., Dickson, W.C., Knowler, W.C., & Johannes, R.S. (1988). *Using the ADAP learning algorithm to forecast the onset of diabetes mellitus*. Proceedings of the Symposium on Computer Applications in Medical Care, 261–265.
2. Pedregosa, F., Varoquaux, G., Gramfort, A., Michel, V., Thirion, B., Grisel, O., ... & Duchesnay, E. (2011). *Scikit-learn: Machine learning in Python*. Journal of Machine Learning Research, 12(Oct), 2825-2830.
