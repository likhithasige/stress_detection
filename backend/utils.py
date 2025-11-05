import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, f1_score, roc_curve, auc, confusion_matrix

def preprocess_data(df):
    print("[INFO] Starting preprocessing...")
    X = df.iloc[:, :-1].values
    y = df.iloc[:, -1].values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    print(f"[INFO] Preprocessing complete — {X_train.shape[0]} train / {X_test.shape[0]} test samples")
    return X_train, X_test, y_train, y_test


def calculate_metrics(model, X_test, y_test, is_dl=False):
    if is_dl:
        y_pred_prob = model.predict(X_test)
        y_pred = np.argmax(y_pred_prob, axis=1)
        y_true = np.argmax(y_test, axis=1)
    else:
        y_pred = model.predict(X_test)
        y_true = y_test
        try:
            y_pred_prob = model.predict_proba(X_test)
        except:
            y_pred_prob = np.zeros((len(y_pred), len(np.unique(y_true))))

    cm = confusion_matrix(y_true, y_pred).tolist()
    acc = accuracy_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred, average='weighted')

    fpr, tpr, _ = roc_curve(y_true, y_pred_prob[:, 1]) if y_pred_prob.shape[1] > 1 else ([], [], [])
    roc_auc = auc(fpr, tpr) if len(fpr) > 0 else 0.0

    pos = int(np.sum(y_pred))
    neg = int(len(y_pred) - pos)

    return {
        'confusion_matrix': cm,
        'accuracy': acc,
        'f1': f1,
        'roc_curve': [{'fpr': float(a), 'tpr': float(b)} for a, b in zip(fpr, tpr)],
        'roc_auc': roc_auc,
        'pie_data': {'positive': pos, 'negative': neg}
    }
