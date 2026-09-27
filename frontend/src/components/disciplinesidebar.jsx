function DisciplineSidebar({
  selectedDiscipline,
  setSelectedDiscipline
}) 
{
    const disciplines = [
    ["diagnostic_sciences", "Diagnostic Sciences"],
    ["oral_pathology", "Oral Pathology"],
    ["operative_dentistry", "Operative Dentistry"],
    ["periodontics", "Periodontics"],
    ["endodontics", "Endodontics"],
    ["implant_dentistry", "Implant Dentistry"],
    ["oral_surgery", "Oral Surgery"],
    ["fixed_prosthodontics", "Fixed Prosthodontics"],
    ["removable_prosthodontics", "Removable Prosthodontics"],
    ["pediatric_dentistry", "Pediatric Dentistry"],
    ["admin", "Admin"]
    ]
    const disciplineColors = {
      diagnostic_sciences: "#18b3aa",
      oral_pathology: "#9f3f5c",
      operative_dentistry: "#2f67e8",
      periodontics: "#0b9b70",
      endodontics: "#7e38ef",
      implant_dentistry: "#4b45eb",
      oral_surgery: "#e32329",
      fixed_prosthodontics: "#df7b00",
      removable_prosthodontics: "#df2474",
      pediatric_dentistry: "#e6a700",
      admin: "#667085"
    }
    return (
  <aside className="discipline_sidebar">
    <div className="discipline_label">
      DISCIPLINES
    </div>

    {disciplines.map(([id, label]) => (
      <button
        key={id}
        className={
          selectedDiscipline === id
            ? "discipline_button active"
            : "discipline_button"
        }
        onClick={() => setSelectedDiscipline(id)}
      >
        <span
          className="discipline_dot"
          style={{
            backgroundColor:
              selectedDiscipline === id
                ? disciplineColors[id]
                : "#657487"
          }}
        ></span>
        <span>{label}</span>
      </button>
    ))}
  </aside>
)
}


export default DisciplineSidebar

