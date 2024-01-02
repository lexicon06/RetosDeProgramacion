import { useState, useEffect } from "react";
import "./App.css";

import img_1 from "./assets/Luke Skywalker.jpg";
import img_2 from "./assets/C-3PO.jpg";
import img_3 from "./assets/R2-D2.jpg";
import img_4 from "./assets/Darth Vader.jpg";
import img_5 from "./assets/Leia Organa.jpg";
import img_6 from "./assets/Owen Lars.jpg";
import img_7 from "./assets/Beru Whitesun lars.jpg";
import img_8 from "./assets/R5-D4.jpg";
import img_9 from "./assets/Biggs Darklighter.jpg";
import img_10 from "./assets/Obi-Wan Kenobi.jpg";

const images = {
  "Luke Skywalker": img_1,
  "C-3PO": img_2,
  "R2-D2": img_3,
  "Darth Vader": img_4,
  "Leia Organa": img_5,
  "Owen Lars": img_6,
  "Beru Whitesun lars": img_7,
  "R5-D4": img_8,
  "Biggs Darklighter": img_9,
  "Obi-Wan Kenobi": img_10,
  default: img_1,
  // add more images here
};

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <h1 className="windowTitle">StarWars Wiki</h1>

      <footer>
        <h4>
          Powered by <a href="https://swapi.dev/">SWAPI</a>,{" "}
          <a href="https://vitejs.dev/">Vite</a> +{" "}
          <a href="https://react.dev/">React</a>
        </h4>
        <h4>
          Created by <span>Pablo Santillan</span>
        </h4>
      </footer>

      <div className="charactersWiki">
        {data.results.slice(0, 10).map((result) => (
          <div className="charactersWiki__box">
            <div className="charactersWiki__name">{result.name}</div>
            <img
              className="charactersWiki__image"
              src={images[result.name] || images["default"]}
              alt=""
            />
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(data.results.length, null, 2)}</pre>
    </>
  );
}

export default App;
