import React, {Component} from "react";
import axios from "axios";
import jwt from "jwt-decode";
import './AddItem.css';

export default class EditItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            selectedFile: null,
            name: '',
            categoryID: '',
            description: '',
            price: '',
            image_path: '',
            id: 0
        }
    }

    onFileChange = event => {
    
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

    //kopirano sa geeks for geeks
    onFileUpload = (event) => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "img",
          this.state.selectedFile,
          //this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        //console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:3000/upload", formData.append(
            "img",
            this.state.selectedFile,
            //this.state.selectedFile.name
          )).then(res =>{
            //window.alert(res.data.message);
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
        axios.get('http://localhost:3000/category',{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res =>{
            if(res.data.status == 0){
                this.setState({
                    categories: res.data.data
                })
                console.log(this.state.categories);
            } else {
                this.props.history.push('/profil');
            }
        }).catch(err =>{
            this.props.history.push('/profil');
        })
        axios.get(`http://localhost:3000/furniture/${this.props.match.params.id}`,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.data.status == -1){
                this.props.history.push('/');
            } else {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    price: res.data.price,
                    description: res.data.description,
                    categoryID: res.data.categoryID
                })
            }
        }).catch(err =>{
            this.props.history.push('/login');
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
                price: `${this.state.price}`,
                image_path: this.state.selectedFile.name,
                id: this.state.id
            }
        }else {
            data = {
                name: this.state.name,
                description: this.state.description,
                price: `${this.state.price}`,
                id: this.state.id
            }
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:3000/furniture', data,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.data.status == 0){
                window.alert("Uspjesno ste izmjenili informacije o proizvodu.");
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
            <h3 className="signup">Edit item</h3>

            <div className="form-group">
                <label>Ime</label>
                <input type="text" className="form-control" placeholder="Ime"
                    name='name' value={this.state.name} onChange={this.textChanged}/>

            </div>
            <div className="form-group">
                <label>Kategorija</label>
                <select type="text" className="form-control" 
                      name='categoryID' value={this.state.categoryID} onChange={this.textChanged}>
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
                      name='description' value={this.state.description} onChange={this.textChanged}></textarea>
            </div>

            <div className="form-group">
                <label>Cijena</label>
                <input type="text" className="form-control" placeholder="Cijena"
                     name='price' value={this.state.price} onChange={this.textChanged}/>
            </div>

            <div className="form-group">
                <label>Slika</label>
                <div className='file form-group form-control'>
                <input type="file" 
                    name='selectedFile' onChange={this.onFileChange} />
                </div>
            </div>
            <button type='button' className="btn btn-primary btn-block" onClick={this.hendleSubmit}>Edit item</button>
        </form>
        )
    }
}