import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import './i18n';


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
)
