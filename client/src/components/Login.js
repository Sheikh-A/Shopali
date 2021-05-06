import React, {useState} from 'react';
import axios from 'axios'

function Login(props) {


    const [user, setUser] = useState({
      username: "",
      password: "",
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('https://aliport.herokuapp.com/api/auth/login', user)
        .then(res => {
            console.log("login post response" , res);
            localStorage.setItem('token', JSON.stringify(res.data.token))
            props.setLogged(true);
            props.history.push('/flexdata');

        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div className="registerContainer negative-top-margin-adjustment">
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <div>
                            <input
                                id="firstName"
                                onChange={handleChange}
                                placeholder="username"
                                value={user.username}
                                name="username"
                            />
                        </div>
                        <div>
                            <input
                                    id="secondName"
                                    onChange={handleChange}
                                    placeholder="password"
                                    value={user.password}
                                    name="password"
                                    type="password"
                            />
                        </div>
                    </div>
                </div>
        <button className="blackButton" type="submit">Login</button>
    </form>
    </div>
    </div>
    );
}

export default Login;
