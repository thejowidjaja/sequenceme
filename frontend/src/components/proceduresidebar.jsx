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
    <div className="procedure_label">
      PROCEDURES
    </div>

    <div className="procedure_sidebar_header">
      <h2>
        {selectedDiscipline
          .split("_")
          .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(" ")}
      </h2>

      <span className="procedure_count">
        {procedures.length}
      </span>
    </div>

    <p className="procedure_hint">
      Click to add to your sequence
    </p>

    <div className="procedure_list">
      {procedures.map((procedure) => (
        <button
          key={procedure.procedure_ID}
          className={`procedure_button discipline_${selectedDiscipline}`}
          onClick={() =>
            addProcedure({
              ...procedure,
              discipline_ID: selectedDiscipline
            })
          }
        >
          <div className="procedure_button_text">
            <strong>
              {procedure.procedure_text}
            </strong>

            <small>
              {procedure.procedure_code}
            </small>
          </div>
        </button>
      ))}
    </div>
  </aside>
)
}

export default ProcedureSidebar