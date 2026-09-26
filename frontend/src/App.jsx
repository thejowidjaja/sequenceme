import { useState } from "react"
import "./App.css"

import WorkspacePage from "./pages/workspacepage.jsx"
import ReportPage from "./pages/reportpage.jsx"

function App() {
  const [currentPage, setCurrentPage] =
    useState("workspace")
  const [selectedProcedures, setSelectedProcedures] =
    useState([])

  if (currentPage === "report") {
    return (
      <ReportPage
        selectedProcedures={selectedProcedures}
        setCurrentPage={setCurrentPage}
      />
    )
  }
  return (
    <WorkspacePage
      selectedProcedures={selectedProcedures}
      setSelectedProcedures={setSelectedProcedures}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default App