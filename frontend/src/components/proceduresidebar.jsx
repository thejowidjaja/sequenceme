function ProcedureSidebar({ selectedDiscipline }) {
  const procedures = {
    diagnostic_sciences: [
      "D0150 - Complete Exam",
      "D0120 - Recall Exam",
      "D0140 - Limited Exam"
    ],
    endodontics: [
      "D3310 - RCT Anterior",
      "D3320 - RCT Premolar",
      "D3330 - RCT Molar"
    ],
    fixed_prosthodontics: [
      "D2740 - Ceramic Crown",
      "D2752 - PFM Crown",
      "D2920 - Recement Crown"
    ],
    periodontics: [
      "D1110 - Adult Prophylaxis",
      "D4341 - SRP 4+ Teeth",
      "D4910 - Periodontal Maintenance"
    ]
  }
  const selectedProcedures =
    procedures[selectedDiscipline] || []
  return (
    <aside className="procedure_sidebar">
      <h2>Procedures</h2>
      {selectedProcedures.map((procedure) => (
        <button
          key={procedure}
          className="procedure_button"
        >
          {procedure}
        </button>
      ))}
    </aside>
  )
}

export default ProcedureSidebar