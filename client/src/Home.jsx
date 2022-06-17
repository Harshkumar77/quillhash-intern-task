import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h1>Dating made easy</h1>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </>
  )
}
