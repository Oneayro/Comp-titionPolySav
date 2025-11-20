import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const [gamification, setGamification] = useState({ score: 0, total: 0, badges: ["Aucun"] });
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const refreshData = () => {
    if (!user || user.trim() === "") return;

    fetch(`http://localhost:8000/gamification?user=${user}`)
      .then(r => r.json())
      .then(setGamification);

    fetch(`http://localhost:8000/history?user=${user}`)
      .then(r => r.json())
      .then(setHistory);

    fetch("http://localhost:8000/leaderboard")
      .then(r => r.json())
      .then(setLeaderboard);
  };

  useEffect(() => {
    if (user.trim() !== "") refreshData();
  }, [user]);

  const handleClassify = async () => {
    if (!user.trim()) {
      alert("Entre ton nom d'utilisateur !");
      return;
    }

    const form = new FormData();
    form.append("user", user);
    if (description) form.append("description", description);
    if (image) form.append("image", image);

    const res = await fetch("http://localhost:8000/classify", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data);

    refreshData();
  };

  const handleReset = async () => {
    await fetch("http://localhost:8000/reset", { method: "POST" });

    setHistory([]);
    setGamification({ score: 0, total: 0, badges: ["Aucun"] });

    refreshData();
  };

  return (
    <div className="container">

      <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞" : "🌙"}
      </div>

      <h1>SmartSort – MakeCode ♻️</h1>

      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <textarea
        placeholder="Décris 1 objet"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button onClick={handleClassify}>Classifier</button>
      <button onClick={handleReset} className="reset-btn">Reset</button>

      {result && (
        <div className="section">
          <h2>Résultat</h2>
          <p><strong>{result.category}</strong></p>
          <p>{Math.round(result.confidence * 100)}%</p>
        </div>
      )}

      <div className="section">
        <h2>Progression</h2>
        <p>Score: {gamification.score}</p>
        <p>Total: {gamification.total}</p>
        <p>Badges: {gamification.badges.join(", ")}</p>
      </div>

      <div className="section leaderboard">
        <h2>Leaderboard</h2>
        {leaderboard.map((u, i) => (
          <p key={i}>
            <strong>{u.user}</strong> — Score: {u.score} / {u.total}
          </p>
        ))}
      </div>

      <div className="section">
        <h2>Historique</h2>
        {history.map((h, i) => (
          <div key={i} className="history-item">
            • {h.input} → {h.cat} ({Math.round(h.conf * 100)}%)
          </div>
        ))}
      </div>
    </div>
  );
}