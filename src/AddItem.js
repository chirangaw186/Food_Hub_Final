import React, { Component } from 'react';
import './additemCSS.css';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import Links from './links'

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemid: "C001",
      itemname: "Fried Rice",
      qty: 20,
      price: 100,
      selectedFile: null,
      loaded: 0,
      imagepath: [],
      file: '',
      imagepreviewurl: '',
      uploadstatus: false


    };
    this.handleChange = this.handleChange.bind(this);
    this.onIDValueChange = this.onIDValueChange.bind(this);
    this.onNameValueChange = this.onNameValueChange.bind(this);
    //  this.onValueSubmit=this.onValueSubmit.bind(this);
    this.onQtyValueChange = this.onQtyValueChange.bind(this);
    this.onPriceValueChange = this.onPriceValueChange.bind(this);
    this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);

  }





  componentDidMount() {

    // const user ={
    //     email:this.state.username,
    //     password:this.state.password
    //   }

    //   fetch('http://localhost:4000/index/abc',{
    //     method:"POST",
    //     headers: {
    //       "Content-Type": "application/json",

    //     },
    //     body:JSON.stringify(user)
    //   })
    //   .then(function(response){ 
    //     return response.json();   
    //    })
    //    .then(function(data){ 

    //    console.log(data)
    //    });

  }

  onIDValueChange(event) {
    event.preventDefault();
    this.setState({
      itemid: event.target.value
    });
  }

  onNameValueChange(event) {
    event.preventDefault();
    this.setState({
      itemname: event.target.value
    });
  }
  onQtyValueChange(event) {
    event.preventDefault();
    this.setState({
      qty: event.target.value
    });
  }

  onPriceValueChange(event) {
    event.preventDefault();
    this.setState({
      price: event.target.value
    });
  }

  handleSelectedFiles(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 1
    });


    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagepreviewurl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  handleImageUpload() {
    this.setState({
      uploadstatus: true
    })
  }



  // onValueSubmit(){

  //   const user ={
  //     itemid: this.state.itemid,
  //     itemname: this.state.itemname,
  //     qty:this.state.qty,
  //     price: this.state.price
  //   }

  //       fetch('http://localhost:4000/index/def',{
  //         method:"POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body:JSON.stringify(user)
  //       })
  //       .then(function(response){ 
  //         return response.json();   
  //        })
  //        .then(function(data){ 

  //        console.log(data)
  //        });

  // }



  handleChange() {

    const item = {
      itemid: this.state.itemid,
      itemname: this.state.itemname,
      qty: this.state.qty,
      price: this.state.price
    }

    fetch('http://localhost:4000/index/fooddet', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify(item)
    })
      .then(function (response) {

        return response.json();
      })
      .then((res) => {
        window.alert(res.message);
      });

  }
  form() {
    return (
      <div className="idform" >
        <form className="form-horizontal" onSubmit={this.onValueSubmit}>
          <div className="form-group col-md-8">
            <label htmlFor="exampleFormControlInput1"> Item ID :</label>
            <input type="text" className="form-control" value={this.state.itemid} onChange={this.onIDValueChange} placeholder="Enter ID" />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleFormControlInput1"> Item Name :</label>
            <input type="text" className="form-control" id="pwd" value={this.state.itemname} onChange={this.onNameValueChange} placeholder="Enter Name" />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleFormControlInput1"> Available Quantity :</label>
            <input type="Number" className="form-control" value={this.state.qty} onChange={this.onQtyValueChange} id="email" placeholder="Enter Available Quantity" />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="exampleFormControlInput1"> Price:</label>
            <input type="Number" className="form-control" id="pwd" value={this.state.price} onChange={this.onPriceValueChange} placeholder="Enter Price" />
          </div>
          <div className="form-group">
            <div className="col-sm-8">
              <button className="btn btn-primary col-sm-2" id="subButton" onClick={this.handleChange}>Save</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  render() {

    let { imagepreviewurl } = this.state;
    let $imagePreview = null;

    if (imagepreviewurl) {
      $imagePreview = (<img src={imagepreviewurl} />);
    } else {
      $imagePreview = (<div>Please select an image for preview</div>)
    }



    let { uploadstatus } = this.state;
    let $imageDIV = null;

    if (uploadstatus) {
      $imageDIV = (<ImageUpload id={this.state.itemid} />);

    } else {
      $imageDIV = (<div>
        <button id="hide" className="btn btn-primary col-sm-2" id="subButton" onClick={this.handleImageUpload}>Upload an Image</button>
        <p>You can upload an image for food item here</p>
      </div>
      )
    }
    return (
      <div className="container-fluid">
        <h2 className="custitle">New Item</h2>
        <div className="col-sm-2">
        </div>
        <div className="col-sm-8 contain">
          <hr />
          <div className="middle">
            {this.form()}
          </div>
          <div className="form">
            <div className="col-sm-8">
              {$imageDIV}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
