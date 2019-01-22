import React, { Component } from 'react';


class ImageUpload extends Component {

  constructor(props){
      super(props);

      this.state={
          itemid:this.props.id,
          selectedFile: null,
          loaded: 0,
          file:'',
          imagepreviewurl:'',

      }

      this.handleSelectedFiles=this.handleSelectedFiles.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }

  handleSelectedFiles(event){
    this.setState({
      selectedFile: event.target.files[0],
      loaded:1
    });


    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file:file,
        imagepreviewurl:reader.result
      });
    }
      reader.readAsDataURL(file);
  }


  handleUpload(){
    const data = new FormData();
    data.append('file',this.state.selectedFile);
    //console.log(data)

    fetch('http://localhost:4000/index/imageup/'+this.state.itemid,{
      mode:"no-cors",
      
      method:"POST",
  
      body:data
    }) .then(function (response) {

      return response.json();
    })
    .then((res) => {
      console.log(res.message);
      // window.alert(res);  
    });
    // console.log(this.state.selectedFile)
  }




  render() {

    let {imagepreviewurl} = this.state;
    let $imagePreview = null;

    if(imagepreviewurl) {
      $imagePreview = (<img src={imagepreviewurl}/>);
    } else{
      $imagePreview = (<div>Please select an image for preview</div>)
    }

    return (
      
      <div className="container" >

      <form className="form-horizontal" onSubmit={this.onValueSubmit}>
      <h2>Image Upload</h2>
      <br />
      <br />



<div className="form-group">
  <label className="control-label col-sm-2" >Image:</label>
  <div className="col-sm-10">
  <input type="file" className="form-control" onChange={this.handleSelectedFiles}/>
  </div>
</div>


{/* <div className="form-group">
  <div className="col-sm-offset-2 col-sm-10">
    <button type="submit" className="btn btn-default"  >Submit</button>
  </div>
</div> */}
   

</form> 
<button className="btn btn-primary col-sm-2" id="subButton" onClick={this.handleUpload}>Upload</button>


<div className="imgPreview">
  {$imagePreview}
</div>

{/* <div><img src={require('./upload/'+this.state.imagepath['imagepath'])} className="img-rounded img-responsive" alt="not available"/></div> */}
  

</div>


    );
  }
}

export default ImageUpload;
