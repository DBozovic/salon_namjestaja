import React, {Component} from "react";
import axios from "axios";
import jwt from "jwt-decode";

export default class EditProfil extends Component{

    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            id: 0
        }
    }

    componentWillMount = () =>{
        let token = localStorage.getItem('token');
        if(!token){
            this.props.history.push('/login');
        } else {
            axios.get(`http://localhost:3000/login/${jwt(localStorage.getItem('token')).id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                if(res.data.status == -1){
                    this.props.history.push('/');
                } else {
                    let id1 = jwt(localStorage.getItem('token')).id;
                    this.setState({first_name: res.data.User.first_name, 
                                    last_name : res.data.User.last_name, 
                                    email: res.data.User.email, 
                                    id: id1});
                }
            })
        } 
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    hendleSubmit = () =>{
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            id: this.state.id
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:3000/user', data,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.data.status == 0){
                window.alert("Uspjeno ste unijeli izmjene.");
                this.props.history.push('/profil');
                return;
            } else {
                window.alert("Doslo je do greske. Pokusajte ponovo.");
            }
        }).catch(err =>{
            window.alert("Doslo je do greske. Pokusajte ponovo.");
        })
    }

    render(){
        return(
            <div>
                <form className='signUpForm'>
                <h3 className="signup">Edit profile</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name"
                        value={this.state.first_name} name='first_name' onChange={this.textChanged}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name"
                         value={this.state.last_name} name='last_name' onChange={this.textChanged}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                         value={this.state.email} name='email' onChange={this.textChanged}/>
                </div>
                <button type='button' className="btn btn-primary btn-block" onClick={this.hendleSubmit}>Edit profile</button>
            </form>
            </div>
        )
    }
}