{/*IMPORT COMPONENTS*/}
import ObjectiveCard from "../components/objectivecard.jsx"
import { useEffect, useState } from "react"

{/*STATE AND FUNCTIONS*/}
function ReportPage({
  selectedProcedures,
  setCurrentPage
}) {
  {/*REACT STATE: TRACKS REPORT MODE AND LOADED REPORT DATA*/}
  const [mode, setMode] = useState("beginner")
  const [reportData, setReportData] = useState([])
  {/*RELOAD REPORT DATA WHEN SELECTED PROCEDURES CHANGE*/}
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
      {/*START HEADER*/}
      <header className="report_topbar app_header">
        <div className="brand">
          <div className="brand_icon">
            S
          </div>
          <span className="brand_name">
            SequenceMe
          </span>
        </div>
        <div className="mode_toggle">
            <button
                className={
                mode === "beginner"
                    ? "mode_button active"
                    : "mode_button"
                }
                onClick={() => setMode("beginner")}
            >
                🌱 Beginner
            </button>
            <button
                className={
                mode === "expert"
                    ? "mode_button active"
                    : "mode_button"
                }
                onClick={() => setMode("expert")}
            >
                ⚡ Expert
            </button>
            </div>
        <div className="report_actions">
          <button
            className="return_button"
            onClick={() => setCurrentPage("workspace")}
          >
            ← Back to Workspace
          </button>
          <button className="download_button">
            Download
          </button>
        </div>
      </header>
      {/*END HEADER*/}

      <div className="report_layout">
        {/*START OF SIDEBAR*/}
        <aside className="report_sidebar">
          <div className="report_sidebar_label">
            SEQUENCE
          </div>
          <p className="report_sidebar_count">
            {reportData.length} procedures
          </p>
          <div className="report_navigation">
            {reportData.map((procedure, index) => (
              <div
                key={index}
                className="report_nav_item"
              >
                <div
                  className={`report_nav_number workspace_${procedure.discipline_ID}`}
                >
                  {index + 1}
                </div>
                <div className="report_nav_text">
                  <strong>
                    {procedure.procedure_text}
                  </strong>
                  <small>
                    {procedure.procedure_code}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <div className="report_mode_helper">
            <strong>
              {mode === "beginner"
                ? "🌱 BEGINNER MODE"
                : "⚡ EXPERT MODE"}
            </strong>
            <p>
              {mode === "beginner"
                ? "Generate clinical steps for objectives as needed."
                : "View the curated clinical sequence without AI guidance."}
            </p>
          </div>
        </aside>
        {/*END OF SIDEBAR*/}
        
        {/*START OF REPORT CONTENT*/}
        <main className="report_content">
          {reportData.map((procedure, index) => (
            <section
              key={index}
              className={`report_procedure_card workspace_${procedure.discipline_ID}`}
            >
              <div className="report_procedure_header">
                <div className="report_procedure_number">
                  {index + 1}
                </div>
                <div className="report_procedure_title">
                  <small>
                    {procedure.discipline_ID
                      ?.replaceAll("_", " ")
                      .toUpperCase()}
                  </small>
                  <h2>
                    {procedure.procedure_text}
                  </h2>
                  <span>
                    {procedure.procedure_code}
                  </span>
                </div>
              </div>
              <div className="report_objectives_label">
                <span>LEARNING OBJECTIVES</span>
                <span>
                  {procedure.objectives.length} objectives
                </span>
              </div>
              <div className="report_objectives">
                {procedure.objectives.map((objective) => (
                  <ObjectiveCard
                    key={objective.sequence_number}
                    procedure={procedure}
                    objective={objective}
                    mode={mode}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
        {/*END OF REPORT CONTENT*/}
      </div>
    </div>
  )
}

export default ReportPage 