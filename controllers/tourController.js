import Tour from "../models/Tour.js";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage }).single('photo');

//create new tour
export const createTour = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        success: false,
        message: "Error uploading file."
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    const newTour = new Tour({
      title: req.body.title,
      city: req.body.city,
      address: req.body.address,
      distance: req.body.distance,
      price: req.body.price,
      maxGroupSize: req.body.maxGroupSize,
      desc: req.body.desc,
      photo:req.file ? `public/images/${req.file.filename}` : null 
    });

    try {
      const savedTour = await newTour.save();
      res.status(200).json({
        success: true,
        message: "successfully created",
        data: savedTour,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "failed to create",
      });
    }
  });
};
//update tour
export const updateTour = async (req, res) => {
  console.log("jcndjc  jcjdncd")
  const id = req.params.id;
  console.log(id);
  console.log(req.body)
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to deleted",
    });
  }
};

//getsingle tour
export const getSingleTour = async (req, res) => {
   const id = req.params.id;
   try {
     const tour=await Tour.findById(id);
     res.status(200).json({
       success: true,
       message: "successfully found",
       data:tour
     });
   } catch (err) {
     res.status(404).json({
       success: false,
       message: "cannot be found",
     });
   }
};

//getall tour
export const getAllTour = async (req, res) => {
    //for pagination

    const page=parseInt(req.query.page);

 

 try {
   const tours = await Tour.find({}).skip(page*8).limit(8);
   res.status(200).json({
     success: true,
     count:tours.length,
     message: "successfully found",
     data: tours,
   });
 } catch (err) {
   res.status(404).json({
     success: false,
     message: "cannot be found",
   });
 }
};

//get tour by search
export const getTourBySearch=async(req,res)=>{

    const city=new RegExp(req.query.city,'i')
    const distance= parseInt(req.query.distance)
    const maxGroupSize= parseInt(req.query.maxGroupSize)
    try{
        const tours=await Tour.find({city,distance:{ $gte:distance},maxGroupSize:{$gte:maxGroupSize}})
    res.status(200).json({
      success: true,
      
      message: "successfully found",
      data: tours,
    });
    
    
    }catch(err){
          res.status(404).json({
            success: false,
            message: "cannot be found",
          });
    }
}


//get tour counts
export const getTourCount=async(req,res)=>{
    try{
        const tourcount=await Tour.estimatedDocumentCount()
        res.status(200).json({
            success:true,
            data:tourcount
        })
    }catch(err){
          res.status(500).json({
            success: false,
          message:'failed to fetch',
          });
    }
}
