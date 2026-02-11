import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function UserList() {
    const [userArray, setUserArray] = useState([]);

    const getData = async() => {
        await axios.get(process.env.REACT_APP_BACKEND_URL_USERS)
        .then(response => {
            console.log(response.data)
            setUserArray(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {getData()}, [])

    const delete1 = async(record) => {
        if(window.confirm(`Are you sure to delete ${record.userName}?`)) {
            await axios.delete(process.env.REACT_APP_BACKEND_URL_USERS + record._id)
            .then(() => {
                console.log('Deleted')
                let updatedArray = userArray.filter(users => users._id !== record._id)
                setUserArray(updatedArray)
            })
            .catch(error => console.log(error))
        }
    }

    return(
        <>
        <h1>User List</h1>
        {userArray.length === 0 &&<h1>No data found</h1>}
        {userArray.length !== 0 && (
            <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover'>
            <thead><tr><th>S.No</th><th>Username</th><th>EmailId</th><th>Password</th></tr></thead>
            <tbody>
                {userArray.map((record, index) => {
                    return <tr key={record._id}> 
                    <td>{index + 1}</td>
                    <td>{record.userName}</td>
                    <td>{record.emailId}</td>
                    <td>{record.password}</td>
                    <td className='center'><Link to={'/user-edit/' + record._id}><button>Edit</button></Link></td>
                    <td><button onClick={() => delete1(record)}>Delete</button></td>
                    </tr>
                })}
            </tbody>
            </table>
            </div>
        )}
        </>
    )
}

export default UserList;