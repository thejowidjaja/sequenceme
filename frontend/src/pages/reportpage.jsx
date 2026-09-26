import ObjectiveCard from "../components/objectivecard.jsx"
import { useEffect, useState } from "react"
function ReportPage({
  selectedProcedures,
  setCurrentPage
}) {
  const [mode, setMode] = useState("beginner")
  const [reportData, setReportData] = useState([])
  useEffect(() => {
    async function loadReport() {
      const results = await Promise.all(
        selectedProcedures.map(async (procedure) => {
          const response = await fetch(
            `http://localhost:8000/sequence/${procedure.procedure_ID}`
          )
          const objectives = await response.json()
          return {
            ...procedure,
            objectives
          }
        })
      )
      setReportData(results)
    }

    loadReport()
  }, [selectedProcedures])
  return (
    <div className="report_page">
      <header className="report_topbar">
        <div className="mode_toggle">
            <button
                className={
                mode === "beginner"
                    ? "mode_button active"
                    : "mode_button"
                }
                onClick={() => setMode("beginner")}
            >
                Beginner
            </button>
            <button
                className={
                mode === "expert"
                    ? "mode_button active"
                    : "mode_button"
                }
                onClick={() => setMode("expert")}
            >
                Expert
            </button>
            </div>
        <div className="report_actions">
          <button
            className="return_button"
            onClick={() => setCurrentPage("workspace")}
          >
            Return
          </button>
          <button className="download_button">
            Download
          </button>
          
        </div>
      </header>
     <main className="report_content">
        {reportData.map((procedure, index) => (
          <section
            key={index}
            className="report_procedure_card"
          >
            <h2>
              {procedure.procedure_code} - {procedure.procedure_text}
            </h2>
            {procedure.objectives.map((objective) => (
                <ObjectiveCard
                    key={objective.sequence_number}
                    procedure={procedure}
                    objective={objective}
                    mode={mode}
                />
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}

export default ReportPage 