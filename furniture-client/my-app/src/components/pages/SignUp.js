import React from 'react';
import '../../App.css';
import axios from 'axios';
import './SignUp.css';

export default class Register extends React.Component{

    hendleSubmit = () => {
       // e.preventDefault();

        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword,
            isAdmin: false
        };
       axios.post('http://localhost:3000/register',data).then(
           res => {
               if(res.data.status == 0){
                   window.alert("Uspjeno ste otvorili nalog.");
                   this.props.history.push("/login");
               } else {
                   window.alert("Doslo je do greske. Pokusajte ponovo.");
               }
           }
       ).catch(
           err => {
               window.alert(err);
               console.log(err);
           }
       )
    }


    render(){
        return(
            <form className='signUpForm'>
                <h3 className="signup">Sign Up</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name"
                        onChange={e => this.firstName=e.target.value}/>

                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"
                          onChange={e => this.lastName=e.target.value}/>

                </div>

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

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password"
                        onChange={e => this.confirmPassword=e.target.value}/>

                </div>
                <button type='button' className="btn btn-primary btn-block" onClick={this.hendleSubmit}>Sign Up</button>
            </form>
        )
            
        
    }
}