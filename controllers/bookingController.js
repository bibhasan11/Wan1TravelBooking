import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
  } catch (err) {
    res.status(500).json({
        success:false,
        message:'internal server error'
    })
  }
};


//get single booking
export const getBooking=async(req,res)=>{
    const id=req.params.id
 try{
    const book= await Booking.findById(id)
    res.status(200).json({
        success:true,
        message:"successful",
        data:book
    })

 }catch(err){
res.status(404).json({
  success: false,
  message: "not found",
});
 }
}


//getall booking
export const getAllBooking=async(req,res)=>{
  
 try{
    const books= await Booking.find()
    res.status(200).json({
        success:true,
        message:"successful",
        data:books
    })

 }catch(err){
res.status(50).json({
  success: false,
  message: "internal error",
});
 }
}


//update booking
//update tour
export const updateBooking = async (req, res) => {
  
  const id = req.params.id;
  
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};