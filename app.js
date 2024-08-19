const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const initData = require("./init/data");
const { create } = require("hbs");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
  console.log("connected to DB successfully");
})
.catch((err)=>{
  console.log(err)
})


async function main(){
  await mongoose.connect(MONGO_URL);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res)=>{
  res.send("I m root element");
});
app.get("/About",(req,res)=>{
  res.send("I m about element");
});


//Index Route
app.get("/listings",async(req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings})
});

// New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})


// Show Route
app.get("/listings/:id",async(req,res)=>{
 let {id} = req.params;
 const listing = await Listing.findById(id);
 res.render("Listings/show.ejs",{listing})
});

// create Route
app.post("/listings", async(req,res)=>{  
  // _________METHOD ONE_____________
  // let {title,description,image,price,country,location}
  // ___________METHOD TWO______________
  // let listing = req.body.listing;
  // console.log(listing);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

// __________________Edit Route_______
app.get("/listings/:id/edit",async(req,res)=>{
  let {id} = req.params;
 const listing = await Listing.findById(id);
 res.render("listings/edit.ejs",{listing});
})


// app.get("/testListing", async(req,res)=>{
//   const sampleListing = new  Listing({
//     title:"My new villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangute, Goa",
//     country:"India",
//   });
// await sampleListing.save();
// console.log("sample was saved");
// res.send("successfull testing");
// });
app.listen(5000,()=>{
  console.log("listening to the server");
});