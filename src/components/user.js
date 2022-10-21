import { useEffect, useState } from "react";
import { getData } from "../api/data";
import "../css/user.css";

function User() {
  const [data, setData] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getData()
      .then((data) => {
        setData(data);
      })
      .catch(handelError);
  }, []);

  //Function for api error message
  const handelError = (error) => {
    setErrorState({
      hasError: true,
      message: error.message,
    });
  };

  return (
    <>
      {/*Error message */}
      {errorState.hasError && <div>{errorState.message}</div>}
      <div className="header">
        <div className="image">
          <img src={data.avatar_url} alt="" />
        </div>
        <div className="information">
          <h1 className="name">{data.name}</h1>
          <p className="userName">
            <span>User Name: </span>
            {data.login}
          </p>
          <p className="accountType">
            <span>Account Type: </span>
            {data.type}
          </p>
          <p className="location">{data.location}</p>
          <a className="github" href={data.html_url}>
            Github
          </a>
        </div>
        <div className="publications">
          <p>{data.public_repos}</p>
          <span>Publications</span>
        </div>
      </div>
    </>
  );
}

export default User;
