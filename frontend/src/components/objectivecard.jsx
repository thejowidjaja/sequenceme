import { useEffect, useState } from "react"

function ObjectiveCard({
  procedure,
  objective,
  mode
}) {
  const [explanation, setExplanation] = useState("")
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [pharmaData, setPharmaData] = useState(null)
  const [loadingPharma, setLoadingPharma] = useState(false)
  useEffect(() => {
    async function getPharmaContext() {
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
    getPharmaContext()
  }, [
    procedure.procedure_text,
    objective.objective_text
  ])
  useEffect(() => {
    if (mode === "expert") {
      setExplanation("")
      setLoadingExplanation(false)
      return
    }
    async function getExplanation() {
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
    getExplanation()

  }, [
    procedure.procedure_text,
    objective.objective_text,
    mode
  ])

  return (
    <div className="objective_card">
      <div className="objective_title">
        <strong>
          {objective.sequence_number}. {objective.objective_text}
        </strong>
      </div>
      {mode === "beginner" && (
        <div className="objective_explanation">
          {loadingExplanation
            ? "Generating explanation..."
            : explanation}
        </div>
      )}
      {loadingPharma && (
        <div className="pharma_loading">
          Checking for relevant pharma information...
        </div>
      )}
      {pharmaData?.relevant && (
        <div className="pharma_card">
          <strong>
            Impiricus Clinical Update
          </strong>
          <p>
            <strong>Drug:</strong> {pharmaData.data.drug}
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
    </div>
  )
}

export default ObjectiveCard