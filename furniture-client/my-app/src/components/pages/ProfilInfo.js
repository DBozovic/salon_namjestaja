import React, {Component} from "react";
import jwt from 'jwt-decode';
import axios from "axios";
import './ProfilInfo.css';
import { Link } from "react-router-dom";

export default class ProfilInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            podaci: ''
        }
    }

    componentWillMount = () => {
        let token = localStorage.getItem('token');
        if(!token){
            //this.props.history.push('/login');
        } else {
            axios.get(`http://localhost:3000/login/${jwt(localStorage.getItem('token')).id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                if(res.data.status == -1){
                    //this.props.history.push('/');
                } else {
                    this.setState({podaci: res.data.User});
                }
            }).catch(err =>{
               // this.props.history.push('/login');
            })
        } 
    }

    render(){
        if(!this.state.podaci.isAdmin){
        return (
            <div className='profilInfo'>
                <div className='info bold'>
                    Osnovne informacije:
                </div>
                <div className='granica'>
                <div>
                    First name:
                </div>
                <div className='bold'>
                    {this.state.podaci.first_name}
                </div>
                <div>
                    Last name:
                </div>
                <div className='bold'>
                    {this.state.podaci.last_name}
                </div>
                <div>
                    Email:
                </div>
                <div className='bold'>
                    {this.state.podaci.email}
                </div>
                </div>
                <button className="btn btn-primary btn-block bold">
                    <Link to='/profil/edit' className='Link'>
                        Izmijeni profil
                    </Link>
                </button>
            </div>
        )
    } else{      //ako je admin onda ima i opciju dodaj proizvod
        return (
            <div className='profilInfo'>
                <div className='info bold'>
                    Osnovne informacije:
                </div>
                <div className='granica'>
                <div>
                    First name:
                </div>
                <div className='bold'>
                    {this.state.podaci.first_name}
                </div>
                <div>
                    Last name:
                </div>
                <div className='bold'>
                    {this.state.podaci.last_name}
                </div>
                <div>
                    Email:
                </div>
                <div className='bold'>
                    {this.state.podaci.email}
                </div>
                </div>
                <button className="btn btn-primary btn-block bold">
                    <Link to='/profil/edit' className='Link'>
                        Izmijeni profil
                    </Link>
                </button>
                <button className="btn btn-primary btn-block bold">
                    <Link to='/profil/addItem' className='Link'>
                        Dodaj proizvod
                    </Link>
                </button>
            </div>
        )
    }
    }
}