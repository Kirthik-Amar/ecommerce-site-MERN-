import {useState} from 'react'
import axios from 'axios'

function UserAdd() {
    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [emailId, setEmailId] = useState('')
    const [emailIdError, setEmailIdError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const changeUserName = (e) => setUserName(e.target.value)
    const changeEmailId = (e) => setEmailId(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    const validateUserName = () => {
        let isValid = true  
        setUserNameError('')
        if(!userName){
            isValid = false
            setUserNameError('Username cannot be empty')
        }
        return isValid
    }

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
        setUserName('')
        setUserNameError('')
        setEmailId('')
        setEmailIdError('')
        setPassword('')
        setPasswordError('')
    } 

    const submitForm = async(e) => {
        e.preventDefault();
        if(validateUserName() && validateEmailId() && validatePassword()){
            let body = {userName, emailId, password, active:'yes'}
            await axios.post(process.env.REACT_APP_BACKEND_URL_USERS, body)
            .then(response => {
                console.log('Inserted', response.data)
                reset()
                window.location.pathname = '/user-list'
            })
            .catch(error => console.log(error))
        } else {
            console.log('Not inserted')
        }
    }

    return(
        <>
        <div className='smallerWindow'>
        <h1>User Add</h1>
        <form onSubmit={submitForm}>
        <div className='form-group'>
            <label>User name:</label>
            <input type='text' name='userName' value={userName} placeholder='Enter Username'
            onChange={changeUserName} onBlur={validateUserName} className='form-control' />
            <div className='error'>{userNameError}</div>
        </div>
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

export default UserAdd;