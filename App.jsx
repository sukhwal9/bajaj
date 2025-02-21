import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("{\"data\": [\"A\",\"C\",\"z\"]}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  const handleSelection = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Bajaj Finserv Health Dev Challenge</h2>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <h3>Filter Results:</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("alphabets")}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("numbers")}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("highest_alphabet")}
            />
            Highest Alphabet
          </label>

          <h3>Response:</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) =>
                  selectedOptions.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;
