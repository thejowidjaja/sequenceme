import { useEffect, useState } from "react"

function ProcedureSidebar({ 
    selectedDiscipline
    , addProcedure
  }) {
  const [procedures, setProcedures] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8000/procedures/${selectedDiscipline}`)
      .then(response => response.json())
      .then(data => {
        setProcedures(data)
      })
      .catch(error => {
        console.error("Error loading procedures:", error)
      })
  }, [selectedDiscipline])
  return (
    <aside className="procedure_sidebar">
      <h2>Procedures</h2>
      {procedures.map((procedure) => (
        <button
          key={procedure.procedure_ID}
          className="procedure_button"
          onClick={() => addProcedure(procedure)}
        >
          {procedure.procedure_code} - {procedure.procedure_text}
        </button>
      ))}
    </aside>
  )
}

export default ProcedureSidebar