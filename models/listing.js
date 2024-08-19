const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        default:"https://www.pexels.com/photo/photo-of-stream-during-daytime-3225517/",
        set: (v)=>
            v === ""
         ? "c:\Users\malka\Downloads\pexels-timon-reinhard-1577192467-27308308.jpg" : v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

