import { useState } from "react"
import DisciplineSidebar from "../components/disciplinesidebar.jsx"
import ProcedureSidebar from "../components/proceduresidebar.jsx"
import Workspace from "../components/workspace.jsx"

function WorkspacePage({
  selectedProcedures,
  setSelectedProcedures,
  setCurrentPage
}) {
  const [selectedDiscipline, setSelectedDiscipline] =
    useState("diagnostic_sciences")

  function addProcedure(procedure) {
    setSelectedProcedures((current) => [
      ...current,
      procedure
    ])
  }

  function clearWorkspace() {
    setSelectedProcedures([])
  }

  function runSequence() {
    setCurrentPage("report")
  }

  return (
    <div className="workspace_screen">
      <header className="app_header">
        <div className="brand">
          <div className="brand_icon">
            S
          </div>

          <span className="brand_name">
            SequenceMe
          </span>
        </div>

        <div className="workspace_header_actions">
          <button
            className="header_clear_button"
            onClick={clearWorkspace}
          >
            Clear
          </button>

          <button
            className="header_run_button"
            onClick={runSequence}
          >
            ▶ Run Sequence
          </button>
        </div>
      </header>

      <div className="workspace_page">
        <DisciplineSidebar
          selectedDiscipline={selectedDiscipline}
          setSelectedDiscipline={setSelectedDiscipline}
        />

        <ProcedureSidebar
          selectedDiscipline={selectedDiscipline}
          addProcedure={addProcedure}
        />

        <Workspace
          selectedProcedures={selectedProcedures}
          setSelectedProcedures={setSelectedProcedures}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default WorkspacePage