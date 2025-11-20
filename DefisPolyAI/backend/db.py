import sqlite3
from pathlib import Path
from datetime import datetime

db = Path(__file__).parent / "smartsort.db"

def conn():
    c = sqlite3.connect(db)
    c.row_factory = sqlite3.Row
    return c


def init_db():
    c = conn()
    cur = c.cursor()

    # Table des prédictions
    cur.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY,
            user TEXT,
            t TEXT,
            input TEXT,
            cat TEXT,
            conf REAL
        )
    """)

    # Table gamification par utilisateur
    cur.execute("""
        CREATE TABLE IF NOT EXISTS gamification (
            user TEXT PRIMARY KEY,
            score INT,
            total INT
        )
    """)

    c.commit()
    c.close()


def insert_prediction(user, inp, cat, conf):
    c = conn()
    cur = c.cursor()

    cur.execute("""
        INSERT INTO predictions(user, t, input, cat, conf)
        VALUES(?,?,?,?,?)
    """, (user, datetime.utcnow().isoformat(), inp, cat, conf))

    # Mettre à jour la gamification
    cur.execute("""
        INSERT INTO gamification(user, score, total)
        VALUES(?,1,1)
        ON CONFLICT(user) DO UPDATE SET
            score = score + 1,
            total = total + 1
    """, (user,))

    c.commit()
    c.close()


def get_history(user):
    c = conn()
    cur = c.cursor()

    cur.execute("""
        SELECT input, cat, conf, t
        FROM predictions
        WHERE user = ?
        ORDER BY t DESC
        LIMIT 20
    """, (user,))

    rows = [dict(x) for x in cur.fetchall()]
    c.close()
    return rows


def get_gamification(user):
    c = conn()
    cur = c.cursor()

    cur.execute("SELECT score, total FROM gamification WHERE user = ?", (user,))
    row = cur.fetchone()

    if not row:
        return {"score": 0, "total": 0, "badges": ["Aucun"]}

    score = row["score"]
    total = row["total"]

    badges = []
    if total >= 5:
        badges.append("Debutant")
    if total >= 20:
        badges.append("Intermediaire")
    if total >= 50:
        badges.append("Expert")
    if not badges:
        badges = ["Aucun"]

    return {"score": score, "total": total, "badges": badges}


def get_leaderboard():
    c = conn()
    cur = c.cursor()

    cur.execute("""
        SELECT user, score, total
        FROM gamification
        ORDER BY score DESC
        LIMIT 10
    """)

    rows = [dict(x) for x in cur.fetchall()]
    c.close()
    return rows


def reset_all():
    c = conn()
    cur = c.cursor()

    cur.execute("DELETE FROM predictions")
    cur.execute("DELETE FROM gamification")

    c.commit()
    c.close()