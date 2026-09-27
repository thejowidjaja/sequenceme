{/*STATE AND FUNCTIONS*/}
function Workspace({
  selectedProcedures,
  setSelectedProcedures
}) {
  function removeProcedure(indexToRemove) {
    setSelectedProcedures((current) =>
      current.filter((_, index) => index !== indexToRemove)
    )
  }

  return (
    <main className="workspace">
      {/*SEQUENCE HEADER*/}
      <div className="sequence_header">
        <h1>Build Your Sequence</h1>
        <p>
          <strong>{selectedProcedures.length}</strong>{" "}
          procedures in sequence
        </p>
      </div>
      {/*END SEQUENCE HEADER*/}

      {/*PROCEDURE SPECIFIC CARDS*/}
      <div className="sequence_list">
        {selectedProcedures.map((procedure, index) => (
          <div
            key={index}
            className={`sequence_row workspace_${procedure.discipline_ID}`}
          >
            <div className="sequence_marker">
              <div className="sequence_number">
                {index + 1}
              </div>
              {index !== selectedProcedures.length - 1 && (
                <div className="sequence_line"></div>
              )}
            </div>
            <div className="workspace_procedure">
              <div className="workspace_procedure_info">
                <span className="procedure_tag">
                  {procedure.discipline_ID
                    ?.replaceAll("_", " ")
                    .toUpperCase()}
                </span>
                <strong>
                  {procedure.procedure_text}
                </strong>
                <small>
                  {procedure.procedure_code}
                </small>
              </div>
              <button
                className="remove_button"
                onClick={() => removeProcedure(index)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        {selectedProcedures.length === 0 && (
          <div className="empty_workspace">
            Add procedures from the sidebar to build your sequence.
          </div>
        )}
      </div>
      {/*END PROCEDURE SPECIFIC CARDS*/}

    </main>
  )
}

export default Workspace