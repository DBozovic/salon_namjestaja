import React from 'react';
import './App.css';

import Navbar from './components/Navbar';

import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import Home from './components/pages/Home';


import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import AboutUs from './components/pages/AboutUs';
import Footer from './components/Footer';

import Login from './components/pages/Login';
import Profil from './components/pages/Profil';
import EditProfil from './components/pages/EditProfil';
import AddItem from './components/pages/AddItem';
import EditItem from './components/pages/EditItem';
 

function App() {
  return (
   <Router>
   <Navbar />
     <Switch>
     <Route exact path='/' component={Home}/>     
          <Route exact path='/furniture' component={Products}/>
          <Route exact path='/manufacturer' component={AboutUs}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={SignUp}/>
          <Route exact path='/profil' component={Profil}/>
          <Route exact path='/profil/edit' component={EditProfil}/>
          <Route exact path='/profil/addItem' component={AddItem}/>
          <Route exact path='/profil/editItem/:id' component={EditItem}/>
     </Switch>
     <Footer/>
   </Router>
  );
}

export default App;
