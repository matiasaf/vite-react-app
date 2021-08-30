import axios from "axios";
import React, { useEffect, useState } from "react";

const URL = "https://hn.algolia.com/api/v1/search";

interface IStory {
  objectID: string;
  url: string;
  title: string;
}

interface APIResponse {
  data: {
    hits: IStory[];
  };
}

interface IProps {
  query: string;
}

function HackersNews(props: IProps) {
  const [stories, setStories] = useState([] as IStory[]);
  const [error, setError] = useState("" as string);

  async function handleFetch() {
    let result;
    try {
      result = (await axios.get(`${URL}?query=${props.query}`)) as APIResponse;
      setStories(result.data.hits);
    } catch (err: any) {
      setError(err);
    }
  }

  useEffect(() => {
    if (props.query) {
      handleFetch();
    }
  }, [props.query]);

  return (
    <div>
      {error && <span>Something went wrong ...</span>}

      <ul className="stories-container">
        {stories.map((story: IStory) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HackersNews;
