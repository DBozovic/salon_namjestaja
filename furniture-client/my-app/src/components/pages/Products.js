  
import React from 'react';
import axios from 'axios';
import '../../App.css';



class Products extends React.Component {
    
  constructor(props){
    super(props);
    this.state =  {
                      furniture: [],
                      page: 0,
                      pageCount: 0,
                      furniturePrikaz: []
    }
  }
    
    componentDidMount(){
      //AJAX poziv ka backendu
      axios.get('http://localhost:3000/furniture').then(response => {
        console.log("Data:", response.data);
        this.setState({
           furniture: response.data,
           page: 1,
           pageCount: Math.ceil(response.data.length / 4), 
        })
        var i = 4 * this.state.page - 1;
        var j = i - 4;
        let lista = [];
        for (var k = j + 1; k <= i; k++){
            if(this.state.furniture[k] != null ){
                lista.push(this.state.furniture[k]);
            }
        }
        this.setState({furniturePrikaz: lista});
    })
    .catch(err => {
        console.log("Error: ", err);
    })
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

    render(){
      var i = this.state.pageCount;
      var lista = [];
      var j = 1;
      while(j <= i){                 //pravim listu u koju cu da ubacim brojeve za paging 1,2,3,4
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
      return (
     <div>
    <div className='products'>
      
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Kategorija</th>
            <th>Slika</th>
            <th>Opis</th>
            <th>Cijena</th>
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
              </tr>
            })
          }
        </tbody>
      </table>
      <div className='pagination'>
        {
          lista.map((val,ind) => 
            <button onClick={this.pageHandler} name='page' value={val} className='page-item'>{val}</button>  ) }
      </div>   
    </div>




    </div>
  );
}
}

export default Products
