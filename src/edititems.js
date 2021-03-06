import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';

class Edit extends Component {

constructor(props){
    super(props);
    this.state={
        itemid:this.props.match.params.id,
        mitemid:"",
        itemname:"",
        qty:null,
        price:null,
        imagepath:"",
        i:"",
        description:"",
        files:null,

       
    }

    this.onIDValueChange=this.onIDValueChange.bind(this);
    this.onNameValueChange=this.onNameValueChange.bind(this);
    this.onQtyValueChange=this.onQtyValueChange.bind(this);
    this.onPriceValueChange=this.onPriceValueChange.bind(this);
    this.onDescriptionValueChange=this.onDescriptionValueChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleImage=this.handleImage.bind(this);

    
   

}


onIDValueChange (event) {
  event.preventDefault();
  this.setState({
      mitemid: event.target.value
  });
}

onNameValueChange (event) {
  event.preventDefault();
  this.setState({
      itemname: event.target.value
  });
}
onQtyValueChange (event) {
event.preventDefault();
this.setState({
    qty: event.target.value
});
}

onPriceValueChange (event) {
event.preventDefault();
this.setState({
    price: event.target.value
});
}

onDescriptionValueChange (event) {
  event.preventDefault();
  this.setState({
      description: event.target.value
  });
  }



componentDidMount(){
    const item ={
          
        itemid: this.state.itemid
       
      }
     
          fetch('http://localhost:4000/index/retrieveone',{
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(item)
          })
          .then(response => response.json())

        .then((res) => {
           
           
            this.setState({

              itemname:res.itemname,
              mitemid:res.itemid,
              qty:res.qty,
              price:res.price,
              imagepath:res.imagepath,
              description:res.description

             
           });
        
        })

       
    

}

getFiles(files){
  this.setState({ files: files })
}


handleSubmit(){
  
        // fetch('http://localhost:4000/index/foodupdate/'+this.state.itemid,{
        //   method:"POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body:JSON.stringify({
        //     itemname:this.state.itemname,
        //     itemid:this.state.itemid,
        //     qty:this.state.qty,
        //     price:this.state.price, 
        //     description:this.state.description
        //   })
        // })
        // .then(response => response.json())
        // .then(()=>{
        //   window.alert("Food Item Updated Successfully!")
        // })

        
        var myimage="alternate.jpg";
        if(this.state.files==null){
           console.log("inside if")
            
        }else{
           myimage=this.state.files.base64
        }

        const data = new FormData();
        data.append('imagepath',myimage);
        data.append('itemid',this.state.mitemid);
        data.append('itemname',this.state.itemname);
        data.append('qty',this.state.qty);
        data.append('price',this.state.price);
        data.append('description',this.state.description);
    


        fetch('http://localhost:4000/index/foodupdate/'+this.state.itemid,{
          method:"POST",
          
          body:data
        })
        .then(response => response.json())
        .then(()=>{
          window.alert("Food Item Updated Successfully!")
        })

}

 

  handleImage(){
  
    return <img src={"./upload/"+this.state.imagepath} alt="No image to preview"/>;    
  }


  render() {
    const { i } =this.state;
    console.log(i)
    
          
    return (
        <div className="container">
               <div>  
        <hr/>
        <div style={{backgroundColor:"#FFF0F5" }}>
        <div className="form-group" >
          <label className="col-lg-3 control-label">Item ID:</label>
          <div className="col-lg-8">
          <input className="form-control" type="text" value={this.state.mitemid} onChange={this.onIDValueChange} />
          </div>
        </div>
     
        <div className="form-group">
          <label className="col-lg-3 control-label">Item name:</label>
          <div className="col-lg-8">
          <input className="form-control" type="text" value={this.state.itemname} onChange={this.onNameValueChange}/>
          </div>
        </div>

        <div className="form-group">
              <label className="col-lg-3 control-label">Price (Rs):</label>
          <div className="col-lg-8">
          <input className="form-control" type="text" value={this.state.price} onChange={this.onPriceValueChange}/>
          </div>
          </div>

            <div class="form-group">
              <label className="col-lg-3 control-label">Available Quantity:</label>
          <div className="col-lg-8">
          <input className="form-control" type="text" value={this.state.qty} onChange={this.onQtyValueChange}/>
          </div>
          </div>

          <div className="form-group">
          <label className="col-lg-3 control-label">Description:</label>
          <div className="col-lg-8">
          <input className="form-control" type="text" value={this.state.description} onChange={this.onDescriptionValueChange}/>
          </div>
        </div>

        <div className="form-group">
                        <label className="control-label col-sm-2" >Change Image:</label>
                        <div className="col-sm-10">
                            <FileBase64
                                multiple={false}
                                onDone={this.getFiles.bind(this)}
                               />

                        </div>
                    </div>


         
              

          <div className="form-group">
          <label className=" control-label"></label>

            
          
                 <button type="button" className="btn btn-danger btn-sm" style={{margin:"20px" }} onClick={this.handleSubmit} >
                    <span className="glyphicon glyphicon-trash"></span> Update
                 </button> 

                </div>

                <div className="imgPreview">            

                <img src={this.state.imagepath} alt="Please select an image to preview"/> 
                </div>



               


            
          
                

                </div>
         </div>
        </div>
    );
  }
}

export default Edit;
