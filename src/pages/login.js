import {useState} from 'react';

function Login() {
  const [mail,setMail] = useState('');
  const [password,setPassword] = useState('');

  async function loginUser(e){
    e.preventDefault();
    const response = await fetch('https://wandering-bracelet-dove.cyclic.app/api/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        mail,
        password
      }),
    })

    const data = await response.json();
    if(data.user){
        // console.log(data);
        localStorage.setItem('token', data.user)
        window.location.href = '/contacts';
    }
    else{
        alert('Please Check your username and password');
    }
  }


  return (
    <div className="row">
      <div className="coverImageBox col-lg-6 col-md-6 col-sm-12 ">
              <img
                className="coverImage"
                src="./resources/loginCover.jpg"
                width={"90%"}
                alt="CoverImage"
              />
    </div>
    <div className="col-frm col-lg-6 col-md-6 col-sm-12">
            <div className="formBox">
            <h1 id='loginH1'>Log In</h1>
      <form onSubmit={loginUser}>
        <input className="registerInput" value={mail} onChange={(e)=>{setMail(e.target.value)}} type="mail" placeholder="Enter mail" />
        <br/>
        <input className="registerInput" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter password" />
        <br/>
        <button className="registerButton" type="submit">Login</button>
        <p className="linkPara">Don't have an account ? <a className="linkPage" href='/register'>Register</a></p>
      </form>
      </div>
      </div>
    </div>
  );
}

export default Login;