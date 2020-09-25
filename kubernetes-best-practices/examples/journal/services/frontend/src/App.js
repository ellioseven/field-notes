import React, { useState } from "react"
import fetch from "isomorphic-fetch"
import "./App.css"

function App() {
  const [value, setValue] = useState()

  const fetchValue = key => {
    fetch(`http://localhost:8080/param/${key}`)
      .then(response => response.json())
      .then(response => setValue(response.value))
      .catch(error => console.log(error))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const key = e.target[0]?.value
    const value = e.target[1]?.value
    if (!key || !value) return

    fetch(`http://localhost:8080/param/${key}`, {
      method: "put",
      body: JSON.stringify({ value }),
      headers: {"Content-Type": "application/json"}
    })
      .then(response => response.json())
      .then(response => { if (response.status === "OK") fetchValue(key) })
      .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <form onSubmit={ handleSubmit }>
        <p><label htmlFor="key">Key</label></p>
        <input type="text" id="key" />
        <p><label htmlFor="value">Value</label></p>
        <input type="text" id="value" />
        <p><button>Submit</button></p>
      </form>
      <p>Value: { value }</p>
    </div>
  )
}

export default App
