import { useState } from "react"
const App = () => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const supriseOptions = [
    "Whos is the founder of havard university",
    "natural Skincare remedy",
    "Who is the founder of tesla"
  ]
  const suprise = () => {
    const randomValue = supriseOptions[Math.floor(Math.random() * supriseOptions.length)]
    setValue(randomValue)
  }
  const getResponse = async () => {
    if (!value) {
      setError("Error pls ask a fucking quuestion")
      return
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch("http://localhost:8000/gemini", options)
      const data = await response.text()
      console.log(data)
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: value
      },
      {
        role: "model",
        parts: data
      }
      ])
      setValue("")
    } catch (error) {
      console.error(error)
      setError("Wrong😒😒❤❤")
    }
  }
  const clear =()=>{
    setValue("")
    setError("")
    setChatHistory([])
  }
  return (
    <div className="app">
      <p>What do you want to know
        <button className="suprise" onClick={suprise} disabled={!chatHistory}>Suprise me</button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="When is christmas"
          onChange={(e) => setValue(e.target.value)}

        />
        {!error && <button onClick={getResponse}>Ask Me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}

      <div className="search-result">
        {chatHistory.map((chatItem, _index) => <div key={_index}>
          <p className="answer">{chatItem.role} : {chatItem.parts}</p>
        </div>)}
      </div>
    </div>

  )
}
export default App