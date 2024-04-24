const Job = require("../models/job");
const createJobPost = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      jobType,
      information,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills ||
      !jobType ||
      !information
    ) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }
    const jobDetails = new Job({
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      jobType,
      information,
    refUserId: currentUserId,
    });

    await jobDetails.save();
    
    res.json({ message: "Job created successfully" });
  } catch (error) {
    next(error)
  }
};

const getJobDetailsById = async (req, res, next)=>{
  try {
    const {jobId} = req.params;
    if (!jobId) return res.status(404).json({
      errorMessage: "Bad request",
    })
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
      return res.status(400).json({
        errorMessage: "Bad request",
      })
    }
    res.json({jobDetails})
    
  } catch (error) {
    next(error);
    
  }

}
const UpdateJobDetailsById = async (req, res, next) =>{
  try {
    const jobId = req.params.jobId;
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      jobType,
      information,
  } = req.body;

  if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills ||
      !jobType ||
      !information
  ) {
      return res.status(400).json({
          errorMessage: "Bad request",
      });
  }
    if(!jobId){
      return res.status(400).json({
        errorMessage:"Bad Request"
      })
    }

    const isJobExist = await Job.findOne({_id:jobId})
    if(!isJobExist){
      return res.status(400).json({
        errorMessage:"Bad Request"
      })
    }

    await Job.updateOne({_id:jobId},{$set:{
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
      jobType,
      information,

    }})
    res.json({message : "job update successfully"})
    
  } catch (error) {
    next(error)
    

  }
 }

const getAllJobs = async (req, res, next) =>{
  try {
    const jobList = await Job.find({},{companyName:1, title: 1, description: 1})
    res.json({data : jobList})
  } catch (error) {
    next(error)
    
  }

}

module.exports = {createJobPost,getJobDetailsById,UpdateJobDetailsById,getAllJobs}