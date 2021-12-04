  
import React from 'react';
import '../../App.css';
import axios from 'axios';
import './Login.css';

export default class SignUp extends React.Component{

  hendleSubmit = () => {
    //e.preventDefault();
  
    const data = {
       email: this.email,
       password: this.password
    }

    axios.post('http://localhost:3000/login' , data)
    .then( res => {
      if(res.data.status == -1){
        window.alert('Login neuspjesan.');
        return;
      } else {
        localStorage.setItem('token', res.data.token);
        this.props.history.push('/profil');
      }
    })
    .catch( err => {
      window.alert('Login neuspjesan.');
      return;
    })
  
  
  };

  render(){

    return(
      <form className='logInForm'>
          <h3 className="signup">Login</h3>

          <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Email"
                    onChange={e => this.email=e.target.value}/>

          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password"
                   onChange={e => this.password=e.target.value}/>

          </div>

          <button type='button' className="btn btn-primary btn-block" onClick={this.hendleSubmit}>Login</button>
      </form>
  )
      
  
  }



}
