import React, {Component} from "react";
import ProfilInfo from "./ProfilInfo";
import './Profil.css';
import jwt from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Profil extends Component{

    constructor(props){
        super(props);
        this.state = {
            isAdmin: '',
            prikaz: 0,
            furniture: [], 
            wishList: [],
            id: 0,
            page: 0,
            pageCount: 0,
            pageCountWish: 0,
            furniturePrikaz: [],
            wishListPrikaz: []
        }
    }

    componentWillMount = () =>{
        let token = localStorage.getItem('token');
        if(!token){
            this.props.history.push('/');
        } else {
            this.setState({isAdmin: jwt(localStorage.getItem('token')).isAdmin, id: jwt(localStorage.getItem('token')).id});
            axios.get('http://localhost:3000/furniture').then(response => {
            this.setState({
                 furniture: response.data,
                 page: 1,
                 pageCount: Math.ceil(response.data.length / 4),
                 prikaz: 0
            })
            var i = 4 * this.state.page - 1;
            var j = i - 4;
            let lista = [];
            for (var k = j + 1; k <= i; k++){
                if(this.state.furniture[k] != null ){     //provjerimo je li null jer mozemo imati samo 2 proizvoda
                    lista.push(this.state.furniture[k]);  //pa ce ostala 2 polja tabele biti prazna
                }
            }
            this.setState({furniturePrikaz: lista});
        }).catch(err => {
            console.log("Error: ", err);
        })
        axios.get(`http://localhost:3000/login/${jwt(localStorage.getItem('token')).id}`,{  
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
                if(res.data.status == -1){
                    this.props.history.push('/login');
                } else {
                    let array = [];
                    res.data.User.wishList.forEach(e => {
                        for(var i = 0; i < this.state.furniture.length; i++){
                            if(e.furniture_id == this.state.furniture[i].id){ //popunjavamo listu prolazeci kroz sav namjes
                                array.push(this.state.furniture[i]);
                            }
                        }
                        this.setState({
                            wishList: array,
                            pageCountWish: Math.ceil(array.length / 4)
                        })
                        var i = 4 * this.state.page - 1;
                        var j = i - 4;
                        let lista = [];
                        for (var k = j + 1; k <= i; k++){
                            if(this.state.wishList[k] != null ){
                                lista.push(this.state.wishList[k]);
                            }
                        }
                        this.setState({wishListPrikaz: lista});
                    });
                }
            }).catch(err =>{
                this.props.history.push('/login');
            })
    }
    }

    pageHandler = (e) =>{
        const {name, value } = e.target;
        this.setState({ [name]: value, furniturePrikaz: [] });
        var i = 4 * value - 1;
        var j = i - 4;
        let lista = [];
        for (var k = j + 1; k <= i; k++){
            if(this.state.furniture[k] != null ){
                lista.push(this.state.furniture[k]);
            }
        }
        this.setState({furniturePrikaz: lista});
    }

    pageHandlerWish = (e) =>{
        const {name, value } = e.target;
        this.setState({ [name]: value, wishListPrikaz: [] });
        var i = 4 * value - 1;
        var j = i - 4;
        let lista = [];
        for (var k = j + 1; k <= i; k++){
            if(this.state.wishList[k] != null ){
                lista.push(this.state.wishList[k]);
            }
        }
        this.setState({wishListPrikaz: lista});
    }

    clickWishList = () =>{
        this.setState({
            prikaz: 1
        })
    }

    clickSviProizvodi = () =>{
        this.setState({
            prikaz: 0   //vraca se na sve proizvode i prikaz na nulu
        })
    }

    clickRemoveItem(id){
        let token = localStorage.getItem('token');
        if(window.confirm("Da li ste sigurni da zelite da obrisete proizvod.")){
            axios.delete(`http://localhost:3000/furniture/${id}`,{
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res =>{
                if(res.data.status == 0){
                    window.alert("Uspijesno ste obrisali proizvod.");
                    this.componentWillMount();
                } else {
                    window.alert("Doslo je do greske. Pokusajte ponovo.");
                }
            }).catch(err =>{
                window.alert("Doslo je do greske. Pokusajte ponovo.");
            })
        }
    }

    clickAddToWishlist(id){
        let data = {
            furniture_id: id,
            users_id: this.state.id
        }
        let token = localStorage.getItem('token');
        axios.post(`http://localhost:3000/wishList`, data,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res =>{
            if(res.data.status == 0){
                window.alert("Dodali ste proizvod na Vasu Wish listu.");
                this.componentWillMount(); //dodaje se noviproizvod na vishlistu i s ovom fukcijom se ucitava nanovo wishlista
            } else {
                window.alert("Doslo je do greske. Pokusajte ponovo.");
            }
        }).catch(err =>{
            window.alert("Doslo je do greske. Pokusajte ponovo.");
        })
    }

    clickRemoveFromWishList(id){
        let data = {
            furniture_id: id,
            users_id: this.state.id
        }
        let token = localStorage.getItem('token');
        axios.post(`http://localhost:3000/wishList/delete`, data,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res =>{
            if(res.data.status == 0){
                window.alert("Uklonili ste proizvod sa Vase Wish liste.");
                axios.get(`http://localhost:3000/login/${jwt(localStorage.getItem('token')).id}`,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => {
                        if(res.data.status == -1){
                            this.props.history.push('/login');
                        } else {
                            let array = [];
                            if(res.data.User.wishList.length == 0){
                                this.setState({
                                    wishList: [],
                                    wishListPrikaz: []
                                })
                                return;
                            }
                            res.data.User.wishList.forEach(e => {
                                for(var i = 0; i < this.state.furniture.length; i++){
                                    if(e.furniture_id == this.state.furniture[i].id){
                                        array.push(this.state.furniture[i]);
                                    }
                                }
                                this.setState({
                                    wishList: array,
                                    pageCountWish: Math.ceil(array.length / 4)
                                })
                                var i = 4 * this.state.page - 1;
                                var j = i - 4;
                                let lista = [];
                                for (var k = j + 1; k <= i; k++){
                                    if(this.state.wishList[k] != null ){
                                        lista.push(this.state.wishList[k]);
                                    }
                                }
                                this.setState({wishListPrikaz: lista});
                            });
                        }
                    })
            } else {
                window.alert("Doslo je do greske. Pokusajte ponovo.");
            }
        }).catch(err =>{
            console.log(err);
            window.alert("Doslo je do greske. Pokusajte ponovo.");
        })
    }

    LogOut = () =>{
        localStorage.removeItem('token'); //makne token iz lokal storage i vrati se na homepage
        this.props.history.push('/');
    }

    render(){
        var i = this.state.pageCount;
        var lista = [];
        var j = 1;
        while(j <= i){
            lista.push(j);
            j++;
        }
        var i = this.state.pageCountWish;
        var lista1 = [];
        var j = 1;
        while(j <= i){
            lista1.push(j);
            j++;
        }
        if(!this.state.isAdmin){
            if(this.state.prikaz == 0){
                return (
                    <div className='profil'>
                        <div className='glavniDio'>
                        <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                            Svi proizvodi
                        </button>
                         <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                             Wish list
                        </button>
                    <div>
                        <div>
                            <table>
                            <thead>
                                <tr>
                                <th>Ime</th>
                                <th>Kategorija</th>
                                <th>Slika</th>
                                <th>Opis</th>
                                <th>Cijena</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.furniturePrikaz.map(e => {
                                    return <tr>
                                    <td>{e.name}</td>
                                    <td>{e.category.name}</td>
                                    <td>
                                        <img src={"http://localhost:3000/"+ e.image_path} alt="error"/>
                                    </td>
                                    <td>{e.description}</td>
                                    <td>{e.price}</td>
                                    <td>
                                    <button id={e.id} className='btn btn-primary btn-block bold wishButton'
                                     onClick={() => this.clickAddToWishlist(e.id)}>
                                         Add to wish list
                                    </button></td>
                                    </tr>
                                })
                                }
                            </tbody>
                            </table>
                            <div className='pagination'>
                                {
                                lista.map((val,ind) => 
                                <button onClick={this.pageHandler} name='page' value={val} className='page-item'>{val}</button>
                                )
                                }
                            </div>   
                        </div>
                    </div>
                    </div>
                    <div>
                    <ProfilInfo />
                    <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                        Log out
                    </button>
                    </div>
                    </div>
                )
                } 
                if(this.state.prikaz == 1){
                   if(this.state.wishList.length == 0){
                    return(
                        <div className='profil'>
                        <div className='glavniDio'>
                        <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                            Svi proizvodi
                        </button>
                         <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                             Wish list
                        </button>
                    <div>
                        Nemate proizvoda u wish listi.
                    </div>
                    </div>
                    <div>
                    <ProfilInfo />
                    <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                        Log out
                    </button>
                    </div>
                    </div>
                    )
                   } else {
                    return(
                        <div className='profil'>
                        <div className='glavniDio'>
                        <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                            Svi proizvodi
                        </button>
                         <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                             Wish list
                        </button>
                    <div>
                    <table>
                            <thead>
                                <tr>
                                <th>Ime</th>
                                <th>Kategorija</th>
                                <th>Slika</th>
                                <th>Opis</th>
                                <th>Cijena</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.wishListPrikaz.map(e => {
                                    return <tr>
                                    <td>{e.name}</td>
                                    <td>{e.category.name}</td>
                                    <td>
                                        <img src={"http://localhost:3000/"+ e.image_path} alt="error"/>
                                    </td>
                                    <td>{e.description}</td>
                                    <td>{e.price}</td>
                                    <td className='td'>
                                        <button id={e.id} className='btn btn-primary btn-block bold wishButton'
                                         onClick={() => this.clickRemoveFromWishList(e.id)}>
                                             Remove from wish list
                                        </button>
                                    </td>
                                    </tr>
                                })
                                }
                            </tbody>
                            </table>
                            <div className='pagination'>
                                {
                                lista1.map((val,ind) => 
                                <button onClick={this.pageHandlerWish} name='page' value={val} className='page-item'>{val}</button>
                                )
                                }
                            </div>   
                    </div>
                    </div>
                    <div>
                    <ProfilInfo />
                    <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                        Log out
                    </button>
                    </div>
                    </div>
                    )
                   }
                }
        } else {
            if(this.state.prikaz == 0){
                return (
                    <div className='profil'>
                        <div className='glavniDio'>
                        <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                            Svi proizvodi
                        </button>
                         <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                             Wish list
                        </button>
                    <div>
                    <div>
                            <table>
                            <thead>
                                <tr>
                                <th>Ime</th>
                                <th>Kategorija</th>
                                <th>Slika</th>
                                <th>Opis</th>
                                <th>Cijena</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.furniturePrikaz.map(e => {
                                    return <tr>
                                    <td>{e.name}</td>
                                    <td>{e.category.name}</td>
                                    <td>
                                        <img src={"http://localhost:3000/"+ e.image_path} alt="error"/>
                                    </td>
                                    <td>{e.description}</td>
                                    <td>{e.price}</td>
                                    <td className='td'>
                                        <button id={e.id} className='btn btn-primary btn-block bold wishButton'
                                         onClick={() => this.clickAddToWishlist(e.id)}>
                                             Add to wish list
                                        </button>
                                        <button id={e.id} className='btn btn-primary btn-block bold wishButton'
                                         onClick={() =>this.clickRemoveItem(e.id)}>
                                            Remove item
                                        </button>
                                        <button id={e.id} className='btn btn-primary btn-block bold wishButton'>
                                            <Link to={`/profil/editItem/${e.id}`} className='Link'>
                                            Edit item
                                            </Link>
                                        </button>
                                    </td>
                                    </tr>
                                })
                                }
                            </tbody>
                            </table>
                            <div className='pagination'>
                                {
                                lista.map((val,ind) => 
                                <button onClick={this.pageHandler} name='page' value={val} className='page-item'>{val}</button>
                                )
                                }
                            </div>   
                        </div>
                    </div>
                    </div>
                    <div>
                    <ProfilInfo />
                    <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                        Log out
                    </button>
                    </div>
                    </div>
                )
                } 
                if(this.state.prikaz == 1){
                    if(this.state.wishList.length == 0){
                        return(
                            <div className='profil'>
                            <div className='glavniDio'>
                            <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                                Svi proizvodi
                            </button>
                             <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                                 Wish list
                            </button>
                        <div>
                            Nemate proizvoda u wish listi.
                        </div>
                        </div>
                        <div>
                        <ProfilInfo />
                        <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                            Log out
                        </button>
                        </div>
                        </div>
                        )
                       } else {
                        return(
                            <div className='profil'>
                            <div className='glavniDio'>
                            <button className="btn btn-primary btn-block bold button" onClick={this.clickSviProizvodi}>
                                Svi proizvodi
                            </button>
                             <button className="btn btn-primary btn-block bold button" onClick={this.clickWishList}>
                                 Wish list
                            </button>
                        <div>
                        <table>
                            <thead>
                                <tr>
                                <th>Ime</th>
                                <th>Kategorija</th>
                                <th>Slika</th>
                                <th>Opis</th>
                                <th>Cijena</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.wishListPrikaz.map(e => {
                                    return <tr>
                                    <td>{e.name}</td>
                                    <td>{e.category.name}</td>
                                    <td>
                                        <img src={"http://localhost:3000/"+ e.image_path} alt="error"/>
                                    </td>
                                    <td>{e.description}</td>
                                    <td>{e.price}</td>
                                    <td className='td'>
                                        <button id={e.id} className='btn btn-primary btn-block bold wishButton' 
                                        onClick={() => this.clickRemoveFromWishList(e.id)}>
                                            Remove from wish list
                                        </button>
                                    </td>
                                    </tr>
                                })
                                }
                            </tbody>
                            </table>
                            <div className='pagination'>
                                {
                                lista1.map((val,ind) => 
                                <button onClick={this.pageHandlerWish} name='page' value={val} className='page-item'>{val}</button>
                                )
                                }
                            </div>   
                        </div>
                        </div>
                        <div>
                        <ProfilInfo />
                        <button className="btn btn-primary btn-block bold button1" onClick={this.LogOut}>
                            Log out
                        </button>
                        </div>
                        </div>
                        )
                       }
                }
        }
    }
}