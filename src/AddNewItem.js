import React, { Component } from 'react';
import './additemCSS.css';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Links from './links'

class NewItem extends Component {

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
            uploadstatus: false,
            files: null,
            description: 'Add Description',
            shopid: this.props.match.params.id,


        };
        this.handleChange = this.handleChange.bind(this);
        this.onIDValueChange = this.onIDValueChange.bind(this);
        this.onNameValueChange = this.onNameValueChange.bind(this);
        this.onQtyValueChange = this.onQtyValueChange.bind(this);
        this.onPriceValueChange = this.onPriceValueChange.bind(this);
        this.onDescriptionValueChange = this.onDescriptionValueChange.bind(this);


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

    onDescriptionValueChange(event) {
        event.preventDefault();
        this.setState({
            description: event.target.value
        });
    }


    getFiles(files) {
        this.setState({ files: files })
    }




    handleChange() {
        //console.log(this.state.files.base64);
        // const data = new FormData();
        // data.append('file',this.state.selectedFile);
        var myimage = "alternate.jpg";
        if (this.state.files == null) {
            console.log("inside if")

        } else {
            myimage = this.state.files.base64
        }

        const data = new FormData();
        data.append('myfile', myimage);
        data.append('itemid', this.state.itemid);
        data.append('itemname', this.state.itemname);
        data.append('qty', this.state.qty);
        data.append('price', this.state.price);
        data.append('description', this.state.description);
        data.append('shopid', this.state.shopid);
        // const item = {
        //     itemid: this.state.itemid,
        //     itemname: this.state.itemname,
        //     qty: this.state.qty,
        //     price: this.state.price,
        //     myfile:myimage
        // }

        fetch('http://localhost:4000/index/newfood', {
            method: "POST",


            body: data
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
                        <label htmlFor="exampleFormControlInput1"> Description:</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onDescriptionValueChange} placeholder="Add Description" />
                    </div>
                    <div className="form-group col-md-8">
                        <label htmlFor="exampleFormControlInput1">Image:</label>
                        <FileBase64
                            multiple={false}
                            onDone={this.getFiles.bind(this)}
                        />
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
        return (
            <div className="container-fluid">
                <h2 className="custitle">New Item</h2>
                <div className="col-sm-8 contain">
                    <hr />
                    <div className="middle">
                        {this.form()}
                    </div>
                    <div className="form">
                        <div className="col-sm-8">
                        </div>
                    </div>
                </div>
                <Links />
            </div>
        );
    }
}

export default NewItem;
