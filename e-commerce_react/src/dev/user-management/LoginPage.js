import {useState} from 'react'
import axios from 'axios'

function LoginPage() {
    const [emailId, setEmailId] = useState('')
    const [emailIdError, setEmailIdError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const changeEmailId = (e) => setEmailId(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    const validateEmailId = () => {
        let isValid = true
        setEmailIdError('')
        if(!emailId){
            isValid = false
            setEmailIdError('EmailId cannot be empty')
        }
        return isValid
    }

    const validatePassword = () => {
        let isValid = true
        setPasswordError('')
        if(!password){
            isValid = false
            setPasswordError('Password cannot be empty')
        }
        return isValid
    }

    const reset = () => {
        setEmailId('')
        setEmailIdError('')
        setPassword('')
        setPasswordError('')
    }

    const submitForm = async(e) => {
        e.preventDefault();
        if(validateEmailId() && validatePassword()){
            let body = {emailId, password,}
            console.log('body: ', body)
            await axios.post(process.env.REACT_APP_BACKEND_URL_USERS + 'login', body)
            .then(response => {
                console.log(response.data)
                localStorage.setItem('jwt_token', response.data.jwtToken)
                localStorage.setItem('currentUserEmail', emailId)
                reset()
                // window.location.pathname = '/login-page'
            })
            .catch(error => console.log(error))
        } else {
            console.log('Not inserted')
        }
    }

    return(
        <>
        <div className='smallerWindow'>
        <h1>Login</h1>
        <form onSubmit={submitForm}>
        <div className='form-group'>
            <label>EmailId:</label>
            <input type='text' name='emailId' value={emailId} placeholder='Enter emailId'
            onChange={changeEmailId} onBlur={validateEmailId} className='form-control' />
            <div className='error'>{emailIdError}</div>
        </div>
        <div className='form-group'>
            <label>Password:</label>
            <input type='text' name='password' value={password} placeholder='Enter password'
            onChange={changePassword} onBlur={validatePassword} className='form-control' />
            <div className='error'>{passwordError}</div>
        </div>
        <div className='form-group'>
        <div className='center'>
            <button type='submit' className='btn btn-success'>Submit</button>
            <button type='reset' className='btn btn-warning' onClick={reset}>Reset</button>
        </div>
        </div>
        </form>
        </div>
        </>
    )
}

export default LoginPage;