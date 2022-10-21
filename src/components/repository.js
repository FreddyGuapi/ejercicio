import { useState, useEffect } from "react";
import { getList } from "../api/data";
import "../css/repository.css";

function Repository() {
  const [list, setList] = useState([]);
  const [search, setSeach] = useState("");

  useEffect(() => {
    getList().then((list) => {
      setList(list);
    });
  }, []);

  //Function for the search engine
  const searcher = (e) => {
    setSeach(e.target.value);
  };

  //Filter method
  let results = [];
  if (!search) {
    results = list;
  } else {
    results = list.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <input
        className="search"
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Find Repository......"
      />
      <table className="table">
        <thead>
          <tr>
            <th className="id">ID</th>
            <th className="name">Name</th>
            <th className="link">Code</th>
            <th className="date">Publication date</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ id, name, html_url, created_at }) => (
            <tr key={id}>
              <td className="id"> {id} </td>
              <td className="name"> {name} </td>
              <td className="link">
                <a href={html_url}>Link</a>
              </td>
              <td className="date">{created_at.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Repository;
