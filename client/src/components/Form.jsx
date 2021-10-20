import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'

const Form = ({Cookies}) => {

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [logincredentials, setLoginCredentials] = useState({

        email: "",
        password: "",

    });

    const [validState, setValidState] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    })
    const [loginValidState, setLoginValidState] = useState({
        email: false,
        password: false,
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }
    const handleChangeLogin = (e) => {
        setLoginCredentials({
            ...logincredentials,
            [e.target.name]: e.target.value
        });
    }
    const [err, setErr] = useState(false)




    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.firstName.length < 3) {
            var firstName = true;
        }
        if (credentials.lastName.length < 3) {
            var lastName = true;
        }
        if (credentials.email.length < 3) {
            var email = true;
        }
        if (credentials.password.length < 8) {
            var password = true;
        }
        if (credentials.confirmPassword !== credentials.password) {
            var confirmPassword = true;
        }

        setValidState({
            ...validState, firstName, lastName, email, password, confirmPassword
        });
        if (firstName || lastName || email || password || confirmPassword) return
        axios.post("http://localhost:8000/api/users/register", credentials, {withCredentials: true})
            .then(res => {
                Cookies.set("user",JSON.stringify(res.data))
                navigate("/success")
            })
            .catch(err => console.log(err.response))
        setCredentials({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (logincredentials.email.length < 3) {
            var email = true;
        }
        if (logincredentials.password.length < 8) {
            var password = true;
        }

        setLoginValidState({
            ...loginValidState, email, password
        });
        if (email || password) return
        axios.post("http://localhost:8000/api/users/login", logincredentials, {withCredentials: true})
            .then(res => {
                setErr(false)
                console.log(res.data)
                Cookies.set("user",JSON.stringify(res.data))
                navigate("/success")
            })
            .catch(err => {
                setErr(true)
            })
        setLoginCredentials({
            email: "",
            password: "",
        })
    }

    return (
        <div className={"container container-fluid"}>
            <div style={{marginTop:"60px",backgroundImage:"url('https://www.google.com/url?sa=i&url=http%3A%2F%2Fclipart-library.com%2Fcloud-bubble-cliparts.html&psig=AOvVaw2fzu2jk7g-JHJqppm2dylC&ust=1633138389891000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKibx96IqPMCFQAAAAAdAAAAABAD')"}}>
                <h3>Share Your Thoughts on different Matters.</h3>
            </div>
        <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: "100px"}}>
                <form className="card" onSubmit={handleSubmit}>
                    <div className={"card-body"}>
                        <input placeholder="First Name" value={credentials.firstName} onChange={handleChange} name="firstName" type="text"/>
                        {validState.firstName ?  <span style={{color: "red",display:"block"}}>it has to be more than 3 chars.</span> : null}
                        <br/>

                        <input placeholder="Last Name" value={credentials.lastName} onChange={handleChange} name="lastName" type="text"/>
                        {validState.lastName ?  <span style={{color: "red",display:"block"}}>it has to be more than 3 chars.</span> : null}
                        <br/>

                        <input placeholder="Email" value={credentials.email} onChange={handleChange} name="email" type="email"/>
                        {validState.email ?  <span style={{color: "red",display:"block"}}>it has to be more than 3 chars.</span> : null}
                        <br/>

                        <input placeholder="Password" type="password" value={credentials.password} onChange={handleChange} name="password" />
                        {validState.password ?  <span style={{color: "red",display:"block"}}>it has to be more than 8 chars.</span> : null}

                        <br/>
                        <input placeholder="Confirm Password" type="password" value={credentials.confirmPassword} onChange={handleChange} name="confirmPassword" />
                        {validState.confirmPassword ? <span style={{color: "red",display:"block"}}>passwords has to match.</span> : null}
                        <br/>
                        <br/>
                        <button className="btn btn-outline-success">Register</button>
                    </div>
                </form>

                <form class="card" onSubmit={handleSubmitLogin}>
                    <div className={"card-body"}>
                    {
                        err ? <span style={{color: "red",display:"block"}}>Wrong Email or Password</span> : null
                    }

                    <input value={logincredentials.email} placeholder="Email" onChange={handleChangeLogin} name="email" type="email"/>
                    {loginValidState.email ?
                        <span style={{color: "red",display:"block"}}>it has to be more than 3 chars.</span> : null}
                    <br/>
                    <input value={logincredentials.password} placeholder="Password" type="password" onChange={handleChangeLogin} name="password"/>
                    {loginValidState.password ?
                    <span style={{color: "red",display:"block"}}>it has to be more than 8 chars.</span> : null}
                        <br/>
                        <br/>
                        <button className="btn btn-outline-success">Log In</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form;