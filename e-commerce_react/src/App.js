import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './dev/common/HomePage';
import Header from './dev/common/Header';
import Footer from './dev/common/Footer';
import PageNotFound from './dev/common/PageNotFound';
import UserList from './dev/user-management/UserList';
import UserAdd from './dev/user-management/UserAdd';
import UserEdit from './dev/user-management/UserEdit';
import ItemList from './dev/item-management/ItemList';
import ItemAdd from './dev/item-management/ItemAdd';
import ItemEdit from './dev/item-management/ItemEdit';
import MakeOrder from './dev/order-management/MakeOrder';
import LoginPage from './dev/user-management/LoginPage';

function App() {
  return(
    <Router>
      <Header/>
      <div className='commonArea'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/user-list' element={<UserList/>} />
          <Route path='/user-add' element={<UserAdd/>} />
          <Route path='/user-edit/:id' element={<UserEdit/>}/>
          <Route path='/item-list' element={<ItemList/>} />
          <Route path='/item-add' element={<ItemAdd/>} />
          <Route path='/item-edit/:id' element={<ItemEdit/>}/>
          <Route path='/make-order' element={<MakeOrder/>}/>
          <Route path='/login-page' element={<LoginPage/>} />
          <Route path='*' element={<PageNotFound/>} />  
        </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App;