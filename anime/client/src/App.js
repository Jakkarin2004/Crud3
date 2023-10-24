import Axios from "axios";
import { useState } from "react";
import AddAnime from "./AddAnime";
import "./App.css";
function App() {
  const [animeList, setAnimeList] = useState([]);
  const [editList, setEditList] = useState([]);

  const getAnimes = () => {
    Axios.get("http://localhost:3001/animes").then((response) => {
      setAnimeList(response.data);
      setEditList(response.data);
    });
  };

  //ฟังก์ชั่นใช้ในการลบข้อมูล มีการใช้ filter เพื่อกรองข้อมูล id ที่ถูกลบมาใช้
  const deleteAnime = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setAnimeList(
        animeList.filter((val) => {
          return val.id !== id;
        })
      );
      setEditList(
        animeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  const UpdateAnime = (key) => {
    Axios.put("http://localhost:3001/update", {
      name: editList[key].name,
      type: editList[key].type,
      ep: editList[key].ep,
      watchs: editList[key].watchs,
      director: editList[key].director,
      id: editList[key].id,
    }).then((response) => {
      setAnimeList(
        animeList.map((val) => {
          return val.id === editList[key].id
            ? {
                id: val.id,
                name: editList[key].name,
                type: editList[key].type,
                ep: editList[key].ep,
                watchs: editList[key].watchs,
                director: editList[key].director,
              }
            : val;
        })
      );
      setEditList(
        animeList.map((val) => {
          return val.id === editList[key].id
            ? {
                id: val.id,
                name: editList[key].name,
                type: editList[key].type,
                ep: editList[key].ep,
                watchs: editList[key].watchs,
                director: editList[key].director,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="App ">
      <h1 className="text-center text-2xl text-white font-medium ">อนิเมะ</h1>
      <div className="information">
        <AddAnime />
      </div>
      <hr />
      <div className="employees">
        <button
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getAnimes}
        >
          แสดงข้อมูลอนิเมะทั้งหมด
        </button>
        <div className="result_main">
        {animeList.map((val, key) => {
          return (
            <div className="anime">
              <div className="card-body text-left">
                <p className="card-text">ชื่อ: {val.name}</p>
                <p className="card-text">ประเภท: {val.type}</p>
                <p className="card-text">จำนวนตอน: {val.ep}</p>
                <p className="card-text">ช่องทางการดู: {val.watchs}</p>
                <p className="card-text">ผู้แต่ง: {val.director}</p>
                <input
                  type="text"
                  Type="text"
                  className="form-control mt-2"
                  value={editList[key].name}
                  onChange={(event) => {
                    setEditList(
                      editList.map((v, k) => {
                        return key === k
                          ? {
                              id: v.id,
                              name: event.target.value,
                              type: v.type,
                              ep: v.ep,
                              watchs: v.watchs,
                              director: v.director,
                            }
                          : v;
                      })
                    );
                  }}
                />

                <input
                  type="text"
                  Type="text"
                  className="form-control mt-2"
                  value={editList[key].type}
                  onChange={(event) => {
                    setEditList(
                      editList.map((v, k) => {
                        return key === k
                          ? {
                              id: v.id,
                              name: v.name,
                              type: event.target.value,
                              ep: v.ep,
                              watchs: v.watchs,
                              director: v.director,
                            }
                          : v;
                      })
                    );
                  }}
                />

                <input
                  type="text"
                  Type="number"
                  className="form-control mt-2"
                  value={editList[key].ep}
                  onChange={(event) => {
                    setEditList(
                      editList.map((v, k) => {
                        return key === k
                          ? {
                              id: v.id,
                              name: v.name,
                              type: v.type,
                              ep: event.target.value,
                              watchs: v.watchs,
                              director: v.director,
                            }
                          : v;
                      })
                    );
                  }}
                />

                <input
                  type="text"
                  Type="text"
                  className="form-control mt-2"
                  value={editList[key].watchs}
                  onChange={(event) => {
                    setEditList(
                      editList.map((v, k) => {
                        return key === k
                          ? {
                              id: v.id,
                              name: v.name,
                              type: v.type,
                              ep: v.ep,
                              watchs: event.target.value,
                              director: v.director,
                            }
                          : v;
                      })
                    );
                  }}
                />

                <input
                  type="text"
                  Type="text"
                  className="form-control mt-2"
                  value={editList[key].director}
                  onChange={(event) => {
                    setEditList(
                      editList.map((v, k) => {
                        return key === k
                          ? {
                              id: v.id,
                              name: v.name,
                              type: v.type,
                              ep: v.ep,
                              watchs: v.watchs,
                              director: event.target.value,
                            }
                          : v;
                      })
                    );
                  }}
                />
                <button
                  class=" mt-2 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    UpdateAnime(key);
                  }}
                >
                  Update
                </button>
                <button
                  class="ml-3 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    deleteAnime(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default App;
