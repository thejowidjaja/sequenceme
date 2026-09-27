from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    conn = sqlite3.connect("sequenceme.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/procedures/{discipline_id}")
def get_procedures(discipline_id: str):
    conn = get_connection()

    rows = conn.execute(
        """
        SELECT
            procedure_ID,
            procedure_code,
            procedure_text
        FROM procedures
        WHERE discipline_ID = ?
        ORDER BY procedure_text
        """,
        (discipline_id,)
    ).fetchall()

    conn.close()

    return [dict(row) for row in rows]


@app.get("/sequence/{procedure_id}")
def get_sequence(procedure_id: str):
    conn = get_connection()

    rows = conn.execute(
        """
        SELECT
            s.sequence_number,
            o.objective_class,
            o.objective_ID,
            o.objective_text
        FROM sequence s
        JOIN objectives o
            ON s.objective_ID = o.objective_ID
        WHERE s.procedure_ID = ?
        ORDER BY s.sequence_number
        """,
        (procedure_id,)
    ).fetchall()

    conn.close()

    return [dict(row) for row in rows]


import os
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

load_dotenv(override=True)
key = os.getenv("XAI_API_KEY")

print("Key loaded:", bool(key))
print("Key prefix:", key[:8] if key else None)
print("Key length:", len(key) if key else None)

grok_client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.x.ai/v1"
)

class ExplainRequest(BaseModel):
    procedure_text: str
    objective_text: str
    mode: str


@app.post("/explain-objective")
def explain_objective(request: ExplainRequest):
    try:
        if request.mode == "beginner":
            style = """
            Give only the practical clinical steps for this objective.

            Requirements:
            - Use a concise numbered list.
            - Include only actions the clinician should perform.
            - Do not explain the objective.
            - Do not include rationale.
            - Do not include cautions unless they are essential to performing the step safely.
            - Do not include a summary.
            - Include a small disclaimer at the end if there are major risks/cautions that should be considered.
            - Keep the response to 5-8 steps when possible.
            """
        else:
            style = """
            Explain this objective for an advanced dental student.
            Include:
            - concise clinical steps
            - important decision points
            - major cautions
            Assume foundational knowledge.
            """

        prompt = f"""
        Procedure:
        {request.procedure_text}
        Objective:
        {request.objective_text}
        {style}
        """
        print("Calling Grok...")
        response = grok_client.responses.create(
            model="grok-4.7",
            input=prompt
        )
        print("Grok response received")
        return {
            "explanation": response.output_text
        }

    except Exception as e:
        print("GROK ERROR:", repr(e))

        return {
            "error": str(e)
        }


IMPIRICUS_DATA = {
    "local_anesthetic": {
        "drug": "Articaine 4% with epinephrine 1:100,000",
        "summary": "Commonly used local anesthetic option in dental procedures.",
        "clinical_note": "Consider total epinephrine exposure and patient cardiovascular history."
    },

    "antibiotic": {
        "drug": "Amoxicillin",
        "summary": "Common antibiotic used for selected odontogenic infections.",
        "clinical_note": "Use only when clinically indicated; avoid routine prescribing when local treatment is sufficient."
    },

    "analgesic": {
        "drug": "Ibuprofen + Acetaminophen",
        "summary": "Common multimodal analgesic approach for acute dental pain.",
        "clinical_note": "Check contraindications, renal/hepatic status, and concurrent medications."
    }
}


class PharmaRequest(BaseModel):
    procedure_text: str
    objective_text: str


@app.post("/pharma-context")
def pharma_context(request: PharmaRequest):

    prompt = f"""
    Procedure:
    {request.procedure_text}

    Objective:
    {request.objective_text}

    Determine whether this objective directly involves medication,
    pharmacology, anesthesia, analgesia, antibiotics, or prescribing.

    Return only one category:
    local_anesthetic
    antibiotic
    analgesic
    none
    """

    response = grok_client.responses.create(
        model="grok-4.7",
        input=prompt
    )

    category = response.output_text.strip().lower()

    if category == "none":
        return {
            "relevant": False
        }

    data = IMPIRICUS_DATA.get(category)

    if not data:
        return {
            "relevant": False
        }

    return {
        "relevant": True,
        "source": "Mock Impiricus-approved data",
        "category": category,
        "data": data
    }