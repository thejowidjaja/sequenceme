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

  return (
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
  )
}

export default WorkspacePage