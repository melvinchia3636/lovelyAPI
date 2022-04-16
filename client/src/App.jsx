import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/sum", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numbers: [6, 7, 8, 9, 10]
      })
    })
      .then(response => response.text())
      .then(json => setData(json));
  }, [])

  return (
    <div className="App">
      {data}
    </div>
  )
}

export default App
