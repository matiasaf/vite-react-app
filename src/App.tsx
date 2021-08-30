import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import HackersNews, { IStory } from "./HackersNews";

const URL = "https://hn.algolia.com/api/v1/search";
interface APIResponse {
  data: {
    hits: IStory[];
  };
}

function App() {
  const [loading, setLoading] = useState(false);
  const [queryParam, setQueryParam] = useState("");
  const [stories, setStories] = useState([] as IStory[]);
  const [open, setOpen] = useState(false);
  const [inStatus, setInStatus] = useState(false);
  const [close, setClose] = useState(false);

  function handleCloseInput() {
    setQueryParam("");
    setStories([]);
    setClose(true);
    setInStatus(false);
    setOpen(false);

    setTimeout(() => setClose(false), 1000);
  }

  function handleFocusStatus() {
    if (open) return;
    setClose(false);
    setOpen(false);
    setInStatus(true);
    setTimeout(() => {
      setOpen(true);
      setInStatus(false);
    }, 1000);
  }

  async function handleOnSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const result = (await axios.get(
      `${URL}?query=${queryParam}`
    )) as APIResponse;
    setStories(result.data.hits);
    setLoading(false);
  }

  function handleChangeInput(e: any) {
    if (!e.target.value) {
      setStories([]);
    }
    setQueryParam(e.target.value);
  }

  return (
    <div className="App">
      <h1 className="search-title">Search on HackersNews</h1>
      <form
        onSubmit={handleOnSearch}
        className={`${inStatus ? "in" : ""} ${open ? "open" : ""} ${
          close ? "close" : ""
        }`}
      >
        <input
          type="text"
          onFocus={handleFocusStatus}
          value={queryParam}
          onChange={handleChangeInput}
        />
        <div className="after" onClick={handleCloseInput}></div>
        <input type="submit" />
      </form>
      <div className="results">
        <HackersNews stories={stories} loading={loading}/>
      </div>
    </div>
  );
}

export default App;
