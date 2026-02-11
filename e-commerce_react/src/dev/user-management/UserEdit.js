import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function UserEdit(){
    const params = useParams()

    const [id, setId] = useState('')
    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [emailId, setEmailId] = useState('')
    const [emailIdError, setEmailIdError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const changeUserName = (e) => setUserName(e.target.value)
    const changeEmailId = (e) => setEmailId(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    useEffect(() => {
        const getData = async() => {
            await axios.get(process.env.REACT_APP_BACKEND_URL_USERS + params.id)
            .then(response => {
                console.log(response.data)
                setId(response.data._id)
                setUserName(response.data.userName)
                setEmailId(response.data.emailId)
                setPassword(response.data.password)
            })
            .catch(error => console.log(error))
        }
        getData()
    }, [params.id])

    const validateUserName = () => {
        let isValid = true
        setUserNameError('')
        if(!userName){
            isValid = false
            setUserNameError('User name cannot be empty')
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
    }

    const submitForm = async(e) => {
        e.preventDefault();
        if(validateUserName() && validateEmailId()) {
            let body = {userName, emailId}
            await axios.put(process.env.REACT_APP_BACKEND_URL_USERS + id,body)
            .then(response => {
                console.log('Updated', response.data)
                reset()
                window.location.pathname = '/user-list'
            })
            .catch(error => console.log(error))
        } else {
            console.log('Not updated')
        }
    }

    return(
        <>
        <div className='smallerWindow'>
        <h1>User Edit</h1>
        <form onSubmit={submitForm}>
        <div className='form-group'>
            <label>Username:</label>
            <input type='text' name='userName' value={userName} placeholder='Enter Username' 
            onChange={changeUserName} onBlur={validateUserName} className='form-control' />
            <div className='error'>{userNameError}</div>
        </div>
        <div className='form-group'>
            <label>EmailId:</label>
            <input type='text' name='emailId' value={emailId} placeholder='Enter EmailId' 
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

export default UserEdit;