import express from "express";

import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router()

//create new tour
router.post('/',verifyAdmin,createTour)

//update tour
router.put('/:id',verifyAdmin,updateTour)

//delete tour
router.delete('/:id',verifyAdmin,deleteTour)

//getsingle tour
router.get('/:id',getSingleTour)

//getall tour
router.get('/',getAllTour)

//get tour search
router.get('/search/getTourBySearch',getTourBySearch)

//get tour count
router.get('/search/getTourCount',getTourCount)


export default router