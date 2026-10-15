"""Camellia Horizons backend.

Endpoints
  GET  /api/health       simple check
  GET  /api/journeys     journeys shown on the site (edit journeys.json)
  POST /api/inquiries    saves a trip request from the website form
  GET  /api/inquiries    lists saved requests (needs X-Admin-Token header)

In production, `npm run build` in ../frontend creates ../frontend/dist
and this app serves it too, so one process runs the whole site.
"""
import json
import os
import re
import sqlite3
import time
from collections import defaultdict
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

BASE = Path(__file__).parent
DIST = (BASE.parent / "frontend" / "dist").resolve()
DB_PATH = os.environ.get("DB_PATH", str(BASE / "inquiries.db"))
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")

app = Flask(__name__, static_folder=str(DIST), static_url_path="")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# Very small in-memory rate limit: 5 requests per hour per IP.
_hits = defaultdict(list)


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with db() as conn:
        conn.execute(
            """CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                name TEXT, email TEXT, phone TEXT,
                topic TEXT, travel_month TEXT, travelers INTEGER,
                message TEXT
            )"""
        )


def rate_limited(ip):
    now = time.time()
    _hits[ip] = [t for t in _hits[ip] if now - t < 3600]
    if len(_hits[ip]) >= 5:
        return True
    _hits[ip].append(now)
    return False


@app.get("/api/health")
def health():
    return jsonify(ok=True)


@app.get("/api/journeys")
def journeys():
    return jsonify(json.loads((BASE / "journeys.json").read_text(encoding="utf-8")))


@app.post("/api/inquiries")
def create_inquiry():
    data = request.get_json(silent=True) or {}

    # Honeypot: real visitors never see or fill this field.
    if data.get("website"):
        return jsonify(ok=True), 201

    if rate_limited(request.remote_addr or "unknown"):
        return jsonify(error="Too many requests. Please try again later."), 429

    errors = {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()
    if len(name) < 2:
        errors["name"] = "Enter your name."
    if not EMAIL_RE.match(email):
        errors["email"] = "Enter a valid email address."
    if len(message) < 10:
        errors["message"] = "Tell us a little about the trip (at least 10 characters)."
    try:
        travelers = int(data.get("travelers") or 0)
    except (TypeError, ValueError):
        travelers = 0
    if errors:
        return jsonify(errors=errors), 400

    with db() as conn:
        conn.execute(
            "INSERT INTO inquiries (name, email, phone, topic, travel_month, travelers, message)"
            " VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                name[:120],
                email[:200],
                str(data.get("phone", ""))[:40],
                str(data.get("topic", ""))[:160],
                str(data.get("month", ""))[:20],
                travelers,
                message[:4000],
            ),
        )
    return jsonify(ok=True), 201


@app.get("/api/inquiries")
def list_inquiries():
    if not ADMIN_TOKEN or request.headers.get("X-Admin-Token") != ADMIN_TOKEN:
        return jsonify(error="Not authorised."), 401
    with db() as conn:
        rows = conn.execute("SELECT * FROM inquiries ORDER BY id DESC").fetchall()
    return jsonify([dict(r) for r in rows])


# Serve the built React app in production.
@app.get("/", defaults={"path": ""})
@app.get("/<path:path>")
def spa(path):
    if path.startswith("api/"):
        return jsonify(error="Not found."), 404
    target = DIST / path
    if path and target.is_file():
        return send_from_directory(DIST, path)
    if (DIST / "index.html").exists():
        return send_from_directory(DIST, "index.html")
    return "Run `npm run build` in the frontend folder first, or use `npm run dev` for development.", 404


init_db()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
