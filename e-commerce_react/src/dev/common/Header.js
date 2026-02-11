import {NavLink} from 'react-router-dom'

function Header() {
    return(
        <>
        <div className='header'>
            <br/>
            <h1 className='heading'>E-Commerce site</h1>
            <br/>
            <NavLink to='/' className='navLinks'>Home | </NavLink>
            <NavLink to='/user-list' className='navLinks'>User List | </NavLink>
            <NavLink to='/user-add' className='navLinks'>User Add | </NavLink>
            <NavLink to='/item-list' className='navLinks'>Item List | </NavLink>
            <NavLink to='/item-add' className='navLinks'>Item Add | </NavLink>
            <NavLink to='/make-order' className='navLinks'>Make Order | </NavLink>
            <NavLink to='/login-page' className='navLinks'>Login </NavLink>
        </div>
        </>
    )
}

export default Header;