import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }

    const response = await fetch(
      "https://wandering-bracelet-dove.cyclic.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          password,
        }),
      }
    );

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
        <div className="row">
        <div className="col-frm col-lg-6 col-md-6 col-sm-12">
            <div className="formBox">
              <h1>Sign Up Here</h1>
              <form onSubmit={registerUser}>
                <input
                className="registerInput"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter name"
                />
                <br />
                <input
                className="registerInput"
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  type="mail"
                  placeholder="Enter mail"
                />
                <br />
                <input
                className="registerInput"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Enter password"
                />
                <br />
                <input
                  className="registerInput"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Confirm password"
                />
                <br />
                <button className="registerButton" type="submit">Sign Up</button>
                <p className="linkPara">
                  Already Registered ? <a className="linkPage" href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
          <div className="coverImageBox col-lg-6 col-md-6 col-sm-12 ">
            {/* <div className="coverImageBox"> */}
              <img
                className="coverImage"
                src="https://drive.google.com/uc?id=1Hf_lcfar2RjGH8flkzRA-pMh6XfazDhb"
                width={"90%"}
                alt="CoverImage"
              />
            {/* </div> */}
          </div>
          
        </div>
  );
}

export default Register;
