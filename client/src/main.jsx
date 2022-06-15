import React from "react"
import ReactDOM from "react-dom/client"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="register" element={<>Register</>} />
          <Route path="login" element={<>login</>} />
          <Route path="*" element={<>Not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
