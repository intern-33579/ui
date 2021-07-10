import React from "react";
export default function Home(props) {
  console.log(localStorage.getItem("token"));
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "undefined"
  ) {
    props.history.push("/sign-in");
    return <h1>Homepage</h1>;
  } else {
    function handleOnClick(event) {
      localStorage.removeItem("token");
      props.history.push("/sign-in");
    }
    return (
      <div>
        <h1>Homepage</h1>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          block
          size="lg"
          onClick={handleOnClick}
        >
          Logout
        </button>
      </div>
    );
  }
}
