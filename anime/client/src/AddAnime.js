import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./AddAnime.css";

function AddAnime() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [ep, setEp] = useState(0);
  const [watchs, setWatchs] = useState("");
  const [director, setDirector] = useState("");

  const [animeList, setAnimeList] = useState([]);

  const addAnime = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      type: type,
      ep: ep,
      watchs: watchs,
      director: director,
    }).then(() => {
      setAnimeList([
        ...animeList,
        {
          name: name,
          type: type,
          ep: ep,
          watchs: watchs,
          director: director,
        },
      ]);
    });
  };
  return (
    <>
      <form action="">
        <div className="mb-3 ">
          <label htmlFor="name" className="text-white text-lg">ชื่อ :</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="text-white text-lg">ประเภท :</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setType(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ep" className="text-white text-lg">จำนวนตอน :</label>
          <input
            type="number"
            className="form-control"
            onChange={(event) => {
              setEp(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="watchs" className="text-white text-lg">ช่องทางการดู :</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setWatchs(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="text-white text-lg">ผู้แต่ง :</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => {
              setDirector(event.target.value);
            }}
          />
        </div>
        <button
          class="mt-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          onClick={addAnime}
        >
          เพิ่มอนิเมะ
        </button>
      </form>
      <br/>
    </>
  );
}

export default AddAnime;
