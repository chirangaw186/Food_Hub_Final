const express= require('express');
const router = express.Router();
const multer = require('multer');
const path =require('path');


const Details = require('../models/dataschema');
const Items = require('../models/itemschema');
const InvoiceItems = require('../models/invoicedb');
const OrderedItems = require('../models/ordereditems');
const Deliverer = require('../models/Deliverer');


let imagepath="";


//set storage engine

const storage = multer.diskStorage({
    destination: '../src/upload',
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname);   
    }

});

//Init Upload

const upload = multer({
    storage:storage

}).single('file');




//get a list from db
router.post('/ret',function(req,res){
    Items.find(function(details){
        res.send(details);
    });
 
});
//add anew data to db

router.post('/nikan',function(req,res){
   console.log('nikan')
});



router.get('/retrieve', (req, res) => {


    try {
        Items.find({}, (err, items) => {
            //console.log(items);
          if (err) return res.status(500).json({ success: false, error: err });
          return res.json(items);
        });
    } catch (error) {
        return res.json(items);
    }
   
  });

  router.get('/retrieveallinvoices/:id', (req, res) => {
    InvoiceItems.find({shopid:req.params.id}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });


  router.post('/invoicesbydate', (req, res) => {
      console.log(req.body.date);
    InvoiceItems.find({date: {$regex : ".*"+req.body.date}, shopid:req.body.shopid }, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });

  router.get('/retdel', (req, res) => {
    Deliverer.find({}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });




  router.get('/retrieveordereditems/:id', (req, res) => {
    OrderedItems.find({invoiceID:req.params.id}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });

  router.post('/retrieveone', (req, res) => {
    Items.findOne({itemid:req.body.itemid}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });

router.post('/abc',function(req,res,next){
    var det = new Details({
       
        email:req.body.email,
        password:req.body.password
       
    });
    det.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
        }
    });


}); 

router.post('/def',function(req,res,next){
    var det = new Items({
        itemid: req.body.itemid,
        itemname: req.body.itemname,
        qty:req.body.qty,
        price: req.body.price,
        imagepath:""
    });
    det.save((err,doc)=>{
        if(!err){
            res.send(doc);  
        }
        else{
            console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
        }
    });


});



router.post('/fooddetails/:id',function(req,res,next){

    //console.log("I'm in food details")
    Items.findOneAndUpdate({itemid:req.params.id},req.body).then(function(){
        Items.findOne({itemid:req.params.id}).then(function(details){
            res.send(details);
        });
        
    });

});


router.post('/foodupdate/:id',function(req,res,next){

    //console.log("I'm in food details")
    Items.findOneAndUpdate({itemid:req.params.id},req.body).then(function(){
        Items.findOne({itemid:req.params.id}).then(function(details){
            res.send(details);
        });
        
    });

});


router.post('/imageup/:id',function(req,res){
   
    let itemid=req.params.id;
    console.log("In image upload");




    Items.findOne({itemid:req.body.itemid}, (err, items) => {
        console.log(items);
      if (err) return res.json({ message:"food item does not exist!" });
      else upload(req,res,(err) => {
            if(err){
                res.json({ message : "Could not upload the image"})
            }else{  
                Items.findOneAndUpdate({itemid:itemid},{imagepath:req.file.filename},(err,items)=>{
                    if(err)res.json({message:"Image Upload failed!"})
                 
                    res.json({message:"Image successfully uploaded!"})

                })
               
            
            }
        });
      

        
    });






    
});


router.post('/fooddet',function(req,res){

            var det = new Items({
                itemid: req.body.itemid,
                itemname:req.body.itemname,
                qty:req.body.qty,
                price:req.body.price,
                imagepath:"alternate.jpg"   
            })
          //  console.log(req.file);
           
            //imagepath=req.file.filename;
            det.save((err,doc)=>{
                if(!err){
                    res.status(200).json({ message : "Food Item Added Successfully!"});
                }
                else{
                    res.status(404).json({ message : "Could not add the food item!"})
                }
            })
 

});





//update data in db
router.put('/get/:id',function(req,res,next){
    Details.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Details.findOne({_id:req.params.id}).then(function(details){
            res.send(details);
        });
        
    });
    
});


//deleta data from db
router.delete('/dew/:id',function(req,res,next){
    Details.findByIdAndRemove({_id:req.params.id}).then(function(details){
        res.send(details);
    });
    
});


router.post('/deletefromInvoice',function(req,res,next){
   
    InvoiceItems.deleteOne(req.body,(err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
      
  
   

}); 


router.post('/deletef',function(req,res,next){
   
    Items.deleteOne({ itemid:req.body.itemid },(err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
      
  
   

}); 


router.post('/authenticate',function(req,res){
    Items.find(function(details){
        res.send(details);
    });
 
});

router.post('/assignD/:id',function(req,res){
    InvoiceItems.findOneAndUpdate({invoiceID:req.params.id},req.body).then(function(){
        InvoiceItems.findOne({invoiceID:req.params.id}).then(function(details){
            res.send(details);
        });
        
    });
 
});



router.get('/', (req, res) => {
    Items.find({}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });




  router.get('/users', (req, res) => {
    Items.find({}, (err, items) => {
        console.log(items);
      if (err) return res.json({ success: false, error: err });
      return res.json(items);
    });
  });

  router.post('/insertintodeliverer',function(req,res,next){
    var det = new Deliverer({
        driverID: req.body.driverID,
        driverName: req.body.driverName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        address:req.body.address,
        mobile:req.body.mobile
    });
    det.save((err,doc)=>{
        if(!err){
            res.send(doc);  
        }
        else{
            console.log('Error in sending Employees :'+ JSON.stringify(err,undefined,2));
        }
    });


});

module.exports=router;