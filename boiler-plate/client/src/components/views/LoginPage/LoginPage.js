import Axios from 'axios'
import React, {useState} from 'react'

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        let body = {
            email: Email,
            password: Password
        }

        Axios.post('/api/user/login', body)
        .then(response => {

        })
    }


    return (
    <div className="login-page">
        <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />

            <br />
            <button type="submit">
                Login
            </button>
        </form>
    </div> 
    )
}

export default LoginPage