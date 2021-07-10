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
    if (otpSent) {
      let loginUrl = `${url}signup/${email}/${otp}`;
      await axios.get(loginUrl).then((res) => {
        if (res.data.status === "true") {
          console.log(res.data.token);
        } else {
          alert("Wrong OTP");
        }
      });
    } else {
      let otpSendUrl = `${url}otp/${email}/${otp}`;
      console.log("yes");
      await axios.get(otpSendUrl).then((res) => {
        if (res.data.status === "true") {
          setOtpSent(true);
        } else {
          alert("User Already exist");
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
        {otpSent ? "Submit" : "Send OTP"}
      </button>
    </form>
  );
}
