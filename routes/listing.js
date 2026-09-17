const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing= require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing }=require("../middleware.js");
const listingController= require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router
    .route("/")
//Index Route 
    .get(wrapAsync(listingController.index ))
//Create Route
    .post(isLoggedIn, upload.single('listing[image]'),  validateListing,wrapAsync( listingController.createListing));
   


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SEARCH ROUTE
router.get("/search",  wrapAsync(listingController.searchListings));


router
    .route("/:id")
    //show route
    .get(wrapAsync( listingController.showListing))
    //update route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing , wrapAsync (listingController.updateListing))
    //delete route
    .delete(isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));


//Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm));


router


router
module.exports=router;