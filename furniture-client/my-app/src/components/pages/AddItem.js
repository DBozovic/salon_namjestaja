import React, {Component} from "react";
import axios from "axios";
import jwt from "jwt-decode";
import './AddItem.css';

export default class AddItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],   //za dropdown
            selectedFile: null, //null dok ne uploadujemo fajl
            name: '',
            categoryID: '',
            description: '',
            price: '',
            image_path: ''
        }
    }

    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

    //kopirano sa geeks for geeks
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "img",
          this.state.selectedFile,
          //this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:3000/upload", formData).then(res =>{
           // window.alert(res.data.message);
        }).catch(err => {
            console.log(err);
            //window.alert(err);
        });
      };

    componentWillMount = () =>{
        if(!jwt(localStorage.getItem('token')).isAdmin){
            this.props.history.push('/');
            return;
        }
        let token = localStorage.getItem('token');
        axios.get('http://localhost:3000/category', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res =>{
            if(res.data.status == 0){
                this.setState({
                    categories: res.data.data //res ima svoje data i u to data je nase data
                })
                console.log(this.state.categories);
            } else {
                this.props.history.push('/profil');
            }
        }).catch(err =>{
            this.props.history.push('/profil');
        })
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    hendleSubmit = () =>{
        var data = {};
        if(this.state.selectedFile){
            this.onFileUpload();
            data = {
                name: this.state.name,
                description: this.state.description,
                price: `${this.state.price}€`,
                categoryID: this.state.categoryID,
                image_path: this.state.selectedFile.name
            }
        }else {
            data = {
                name: this.state.name,
                description: this.state.description,
                price: `${this.state.price}€`,           //ako se ne poziva fileUpload onda saljemo podatke bez slike
                categoryID: this.state.categoryID        
            }
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:3000/furniture', data,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.data.status == 0){
                window.alert("Uspjesno ste dodali proizvod.");
                this.props.history.push('/profil');
            } else {
                window.alert("Doslo je do greske. Pokusajte ponovo.");
            }
        }).catch(err => {
            window.alert("Doslo je do greske. Pokusajte ponovo.");
        })
    }

    render(){
        return(
            <form className='signUpForm'>
            <h3 className="signup">Add item</h3>

            <div className="form-group">
                <label>Ime</label>
                <input type="text" className="form-control" placeholder="Ime"
                    name='name' onChange={this.textChanged}/>

            </div>
            <div className="form-group">
                <label>Kategorija</label>
                <select type="text" className="form-control" 
                      name='categoryID' onChange={this.textChanged}>
                          <option></option>
                          {
                              this.state.categories.map((val, ind) => (
                                  <option value={val.id} name='categoryID'>{val.name}</option>
                              ))
                          }
                      </select>
            </div>

            <div className="form-group">
                <label>Opis</label>
                <textarea rows='4' className="form-control" placeholder="Opis"
                      name='description' onChange={this.textChanged}></textarea>
            </div>

            <div className="form-group">
                <label>Cijena</label>
                <input type="number" className="form-control" placeholder="Cijena"
                     name='price' onChange={this.textChanged}/>
            </div>

            <div className="form-group">
                <label>Slika</label>
                <div className='file form-group form-control'>
                <input type="file" 
                    name='selectedFile' onChange={this.onFileChange} />
                </div>
            </div>
            <button type='button' className="btn btn-primary btn-block" onClick={this.hendleSubmit}>Add item</button>
        </form>
        )
    }
}