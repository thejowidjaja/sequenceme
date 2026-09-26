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
    return (
    <aside className="discipline_sidebar">
        <h2>Disciplines</h2>
        {disciplines.map(([id, label]) => (
            <button
            key={id}
            className="discipline_button"
            onClick={() => setSelectedDiscipline(id)}
            >
            {label}
            </button>
        ))}
    </aside>
    )
}


export default DisciplineSidebar

