

function Workspace({
  selectedProcedures,
  setSelectedProcedures
}) {
  function clearWorkspace() {
    setSelectedProcedures([])
  }
  function runSequence() {
    console.log(selectedProcedures)
  }
  return (
    <main className="workspace">
      <div className="workspace_header">
        <h2>Workspace</h2>
        <div className="workspace_actions">
          <button
            className="run_button"
            onClick={runSequence}
          >
            Run
          </button>
          <button
            className="trash_button"
            onClick={clearWorkspace}
          >
            Trash
          </button>
        </div>
      </div>
      <div className="workspace_dropzone">
        {selectedProcedures.map((procedure, index) => (
          <div
            key={index}
            className="workspace_procedure"
          >
            <strong>
              {procedure.procedure_code}
            </strong>
            <span>
              {procedure.procedure_text}
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Workspace