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

    return (
    <div className="login-page">
        <form style={{ display: 'flex', flexDirection: 'column'}}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />

            <br />
            <button>
                Login
            </button>

            

        </form>
    </div> 
    )
}

export default LoginPage