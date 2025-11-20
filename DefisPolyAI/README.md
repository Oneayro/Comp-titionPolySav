# 🌱 **SmartSort – MakeCode**  
### ♻️ *L’application intelligente qui t’aide à trier tes déchets… et à devenir une légende du recyclage.*

SmartSort – MakeCode est une application web complète (front-end, back-end et IA) conçue pour aider les utilisateurs à trier leurs déchets grâce à de l’intelligence artificielle.  
Elle accepte **une description textuelle** ou **une image**, et prédit automatiquement la catégorie de recyclage :  
**plastique, métal, verre, papier, organique ou autre.**

En bonus :  
- un système de **gamification** (score + badges)  
- un **leaderboard** interactif   
- un **mode sombre animé** 
- un design moderne et smooth  

---

## 🌟 **Fonctionnalités principales**

### 🔍 1. Classification automatique  
- Décris un objet (ex: *“bouteille en plastique”*)  
- Ou upload une image  

➡️ L’IA prédit sa catégorie et renvoie un niveau de confiance.

---

### 🧠 2. Intelligence artificielle  
SmartSort utilise :  
- **OpenAI** pour comprendre le texte (NLP)  
- **un modèle léger (Mobilenet)** pour les images (ou fallback texte)

---

### 📊 3. Gamification  
À chaque classification :  
- ton **score** augmente  
- ton **total** aussi  
- des **badges** se débloquent automatiquement :  
  - 🟢 *Débutant* : 5+ classifications  
  - 🔵 *Intermédiaire* : 20+  
  - 🔥 *Expert* : 50+

---

### 🏆 4. Leaderboard en temps réel  
Chaque utilisateur peut entrer son **nom** → ses stats s’ajoutent automatiquement dans le classement.

---

### 📜 5. Historique personnel  
SmartSort garde trace des **20 dernières prédictions** pour chaque utilisateur distinct.

---

### 🎨 6. Interface moderne + mode sombre  
- UI clean, responsive  
- Dark mode animé  
- Effets glassmorphism  
- Expérience utilisateur fluide & intuitive  

---

# 🧩 **Architecture du projet**

```
📁 DefisPolyAI/
│
├── 📁 backend/
│   ├── main.py          → API FastAPI (routes)
│   ├── ml_text.py       → Classification textuelle (OpenAI)
│   ├── ml_image.py      → Classification d’images
│   ├── db.py            → Base de données SQLite + gamification + leaderboard
│   └── smartsort.db     → Base de données (auto-générée au démarrage)
│
└── 📁 frontend/
    ├── src/
    │   ├── App.jsx      → Interface utilisateur (React)
    │   ├── App.css      → Style et animations
    │   └── main.jsx     → Point d'entrée React
    └── index.html
```

---

# 🚀 **Comment exécuter le projet ?**

## 1️⃣ **Backend — FastAPI**
Dans un terminal :

```sh
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
set OPENAI_API_KEY=ta_cle
uvicorn main:app --reload --port 8000
```

Ton API roule ici :  
👉 http://localhost:8000  
👉 Doc auto : http://localhost:8000/docs

---

## 2️⃣ **Frontend — React / Vite**
Dans un deuxième terminal :

```sh
cd frontend
npm install
npm run dev
```

Site web :  
👉 http://localhost:5173  

---

# 🎮 **Comment jouer ? (Guide utilisateur)**

### ① Choisis un **nom d’utilisateur**  
Ton score sera enregistré dans le **leaderboard**.

---

### ② Décris un objet *ou* upload une image  
Exemples :  
- "bouteille en plastique"  
- "canette de métal"  
- "coquille de banane"  

---

### ③ Clique sur **Classifier**  
L’IA renvoie :  
- une catégorie  
- un pourcentage de confiance  

---

### ④ Gagne des points  
Chaque classification =  
- +1 score  
- +1 total  

Débloque des **badges automatiques** 🎖️

---

### ⑤ Affiche ton historique  
Tu verras les dernières prédictions associées **à ton nom d’utilisateur**.

---

### ⑥ Compète dans le leaderboard  
Monte dans le top.  
Dominne le tri intelligent.  
**Règne sur MakeCode.**

---

# 🤖 **Choix du modèle IA & justification**

## 🧠 Pour le texte
Utilisation de **GPT-4.1-mini** :

✔ Très bon en compréhension  
✔ Idéal pour classification contextuelle  
✔ Ultra rapide  
✔ Peu coûteux  

---

## 🖼️ Pour les images
Un modèle léger type **Mobilenet** (ou API OpenAI Vision pour fallback) :

✔ Rapide  
✔ Suffisant pour déchets courants  
✔ Deployment-friendly  

---

## Pourquoi ces modèles ?
Parce qu’ils offrent :  
- **un bon compromis performance / coût / déploiement**  
- **une intégration simple dans FastAPI**  
- **la stabilité nécessaire pour un hackathon / projet étudiant**

---

# 📦 **Installation via Docker (optionnel)**

```sh
docker-compose up --build
```

Et ça roule. 🐳🔥

---
 
Projet réalisé dans le cadre du challenge **PolyScav – Polytechnique Montréal**.
