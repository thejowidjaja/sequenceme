import { useState } from "react"
import DisciplineSidebar from "../components/disciplinesidebar.jsx"
import ProcedureSidebar from "../components/proceduresidebar.jsx"
import Workspace from "../components/workspace.jsx"

function WorkspacePage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState("diagnostic_sciences")
  return (
    <div className="workspace_page">
      <DisciplineSidebar
        selectedDiscipline={selectedDiscipline}
        setSelectedDiscipline={setSelectedDiscipline}
      />
      <ProcedureSidebar
        selectedDiscipline={selectedDiscipline}
      />
      <Workspace />
    </div>
  )
}

export default WorkspacePage