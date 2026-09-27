import { useEffect, useState } from "react"

function ObjectiveCard({
  procedure,
  objective,
  mode
}) {
  const [explanation, setExplanation] = useState("")
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const [pharmaData, setPharmaData] = useState(null)
  const [loadingPharma, setLoadingPharma] = useState(false)
  const [pharmaExpanded, setPharmaExpanded] = useState(false)

  useEffect(() => {
    async function checkPharma() {
      setLoadingPharma(true)

      try {
        const response = await fetch(
          "http://localhost:8000/pharma-context",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              procedure_text: procedure.procedure_text,
              objective_text: objective.objective_text
            })
          }
        )

        const data = await response.json()
        setPharmaData(data)
      } catch (error) {
        console.error("Pharma error:", error)
        setPharmaData(null)
      }

      setLoadingPharma(false)
    }

    checkPharma()
  }, [
    procedure.procedure_text,
    objective.objective_text
  ])

  async function getExplanation() {
    if (explanation || loadingExplanation) {
      return
    }

    setLoadingExplanation(true)

    try {
      const response = await fetch(
        "http://localhost:8000/explain-objective",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            procedure_text: procedure.procedure_text,
            objective_text: objective.objective_text,
            mode: mode
          })
        }
      )

      const data = await response.json()

      if (data.error) {
        setExplanation(`Error: ${data.error}`)
      } else if (data.explanation) {
        setExplanation(data.explanation)
      } else {
        setExplanation("No explanation returned.")
      }
    } catch (error) {
      console.error("Explanation error:", error)
      setExplanation("Unable to generate explanation.")
    }

    setLoadingExplanation(false)
  }

  function handleDetails() {
    if (expanded) {
      setExpanded(false)
      return
    }

    setExpanded(true)

    if (!explanation && !loadingExplanation) {
      getExplanation()
    }
  }

  return (
    <div className="objective_card">
      <div className="objective_row">
        <div className="objective_number">
          {objective.sequence_number}
        </div>

        <div className="objective_content">
          <div className="objective_title">
            <strong>
              {objective.objective_text}
            </strong>
          </div>

          <div className="objective_descriptor">
            Complete this stage of the clinical workflow before proceeding.
          </div>

          {pharmaData?.relevant && (
  <>
    <button
      className="pharma_badge"
      onClick={() => setPharmaExpanded((current) => !current)}
    >
      💊 {pharmaExpanded
        ? "Hide pharma insight"
        : "Pharma insight available"}
    </button>

    {pharmaExpanded && (
      <div className="pharma_card">
        <strong>
          Impiricus Clinical Update
        </strong>

        <p>
          <strong>Drug:</strong>{" "}
          {pharmaData.data.drug}
        </p>

        <p>
          {pharmaData.data.summary}
        </p>

        <p>
          <strong>Clinical note:</strong>{" "}
          {pharmaData.data.clinical_note}
        </p>

        <small>
          Demo data representing approved Impiricus content
        </small>
      </div>
    )}
  </>
)}

          {expanded && mode === "beginner" && (
            <div className="objective_explanation">
              {loadingExplanation
                ? "Generating clinical steps..."
                : explanation}
            </div>
          )}
        </div>

        {mode === "beginner" && (
          <button
            className={
              expanded
                ? "details_button active"
                : "details_button"
            }
            onClick={handleDetails}
          >
            {expanded
              ? "Hide details"
              : "Show details"}
          </button>
        )}
      </div>
    </div>
  )
}

export default ObjectiveCard