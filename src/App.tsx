import React, { useState } from "react";
import "./App.css";
import HackersNews from "./HackersNews";

function App() {
  const [queryParam, setQueryParam] = useState("");

  return (
    <div className="App">
      <form>
        <div className="form-group">
          <h1 className="title">
            Insert what do you need to search for in HackerNews
          </h1>
          <input
            id="search-value"
            value={queryParam}
            onChange={(e) => setQueryParam(e.target.value)}
          />
        </div>
      </form>
      <div className="results">
        <HackersNews query={queryParam} />
      </div>
    </div>
  );
}

export default App;
