import React, { useEffect, useState } from "react";
import "./HackersNews.css";
export interface IStory {
  objectID: string;
  url: string;
  title: string;
}
interface IProps {
  stories: IStory[];
  loading: boolean;
}

function HackersNews(props: IProps) {
  const { stories } = props;

  if (props.loading) {
    return <div className="loading-container">Loading ...</div>;
  } else {
    return (
      <div>
        <ul className="stories-container">
          {stories.map((story: IStory) => (
            <li key={story.objectID} className="li-item">
              <a href={story.url} className="link-story">
                {story.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HackersNews;
