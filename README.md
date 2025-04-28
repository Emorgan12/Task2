# How To Run (Windows)

## Backend

### Required software:

    - UV
    - pip
    - Python

### Instructions:

    - In a new terminal, run these commands:
        - cd ./backend
        - uv venv
        - .venv/Scripts/Activate (Execution-Policy must be set to Unrestricted)
        - uv pip install -r requirements.txt
        - fastapi dev main.py

    - The API documentation will be live at '127.0.0.1:8000/docs

---

## Frontend

### Required Software:

    - node.js
    - pnpm

### Instructions:

    - In a new terminal, run these commands:
        - cd ./frontend
        - pnpm install
        - pnpm run dev

    - The website will be live at '127.0.0.1:300'
