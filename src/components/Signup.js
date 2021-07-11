import React, { useState } from "react";
import axios from "axios";
export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  function validateForm() {
    return email.length > 0;
  }

  async function handleSubmit(event) {
    const url = "https://intern-335791.herokuapp.com/";
    event.preventDefault();
    if (!otpSent) {
      let signUpUrl = `${url}signup/${email}`;
      await axios.get(signUpUrl).then((res) => {
        if (res.data.status === "true") {
          console.log(res.data.token);
          setOtpSent(true);
          alert("OTP sent to your email");
        } else {
          alert("User Already exist");
        }
      });
    } else {
      let loginUrl = `${url}login/${email}/${otp}`;
      await axios.get(loginUrl).then((res) => {
        if (res.data.status === "true") {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          props.history.push("/home");
          return;
        } else {
          alert("Wrong OTP");
        }
      });
    }
  }
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("token") !== "undefined"
  ) {
    props.history.push("/home");
    return <div></div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div hidden={!otpSent} className="form-group">
        <label>OTP</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        block
        size="lg"
        disabled={!validateForm()}
      >
        {otpSent ? "Submit" : "Sign Up"}
      </button>
    </form>
  );
}
