const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGOURL="mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("connected to Db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGOURL);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"6a9538754e57c0eaebe14cc8"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

}

initDB();