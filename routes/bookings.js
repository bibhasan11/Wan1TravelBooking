import express from "express";
import { createBooking, getAllBooking, getBooking, updateBooking } from "../controllers/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router=express.Router()


//create booking
router.post("/",verifyUser,createBooking)


//update tour
router.put('/:id',verifyAdmin,updateBooking)

//get single booking
router.get("/:id", verifyUser, getBooking);

//get all booking
router.get("/", verifyAdmin, getAllBooking);


export default router