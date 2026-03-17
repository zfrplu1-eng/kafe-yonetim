import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegionSelect from "./pages/RegionSelect"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegionSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
