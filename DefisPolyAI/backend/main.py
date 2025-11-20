from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from db import (
    init_db,
    insert_prediction,
    get_history,
    get_gamification,
    get_leaderboard,
    reset_all
)
from ml_text import classify_text
from ml_image import classify_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def start():
    init_db()

@app.post("/classify")
async def classify(
    user: str = Form(...),
    description: str | None = Form(None),
    image: UploadFile | None = File(None)
):
    if description:
        cat, conf = classify_text(description)
        insert_prediction(user, description, cat, conf)
    else:
        data = await image.read()
        cat, conf = classify_image(data, image.filename)
        insert_prediction(user, image.filename, cat, conf)

    return {"category": cat, "confidence": conf}


@app.get("/history")
def h(user: str):
    return get_history(user)

@app.get("/gamification")
def g(user: str):
    return get_gamification(user)

@app.post("/reset")
def reset():
    reset_all()
    return {"status": "ok"}


@app.get("/leaderboard")
def leaderboard():
    return get_leaderboard()