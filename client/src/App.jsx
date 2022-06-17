import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  )
}
