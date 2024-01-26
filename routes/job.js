const express = require("express");
const router = express.Router();
const Job = require("../models/job")
const jwtVerify = require("../middlewares/authMiddleware")

router.post("/create",jwtVerify, async (req,res)=>{
    try {
        const { companyName, title, description, logoUrl} = req.body;

        if (!companyName || !title || !description || !logoUrl) {
            return res.status(400).json({
                errorMessage: "Bad Request"
            });
        }

        jobDetails = new Job({
            companyName, 
            title, 
            description, 
            logoUrl,
            refUserId: req.body.userId,
        });

        await jobDetails.save();

        res.json({message: "New job created successfully"})

    }catch(error){
        console.log(error);
    }
});


router.put("/edit/:jobId",jwtVerify, async (req,res)=>{
    try {
        const { companyName, title, description, logoUrl} = req.body;
        const jobId = req.params.jobId;

        if (!companyName || !title || !description || !logoUrl || !jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request"
            });
        }

        await Job.updateOne(
          { _id: jobId },
          {
            $set: {
              companyName,
              title,
              description,
              logoUrl,
            },
          }
        );

        res.json({message: "Job details updated successfully"})

    }catch(error){
        console.log(error);
    }
});


router.get("/job-description/:jobId", async (req,res)=>{
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request"
            });
        }

        const jobDetails = await Job.findById(jobId);

        res.json({data: jobDetails});

    }catch(error){
        console.log(error);
    }
});


router.get("/all", async (req,res)=>{
    try {
        const jobList = await Job.find({}, { companyName: 1, title: 1});

        res.json({data: jobList});

    }catch(error){
        console.log(error);
    }
});


router.get("/search", async (req,res)=>{
    try {
        const title = req.query.title || "";
        const skills = req.query.skills;
        let filterSkills = skills?.split(",");  // skills ? skills.split(",") : null;  instead of this this is used ==> skills?.split(",")

        let filter = {};

        if (filterSkills) {
             filter = { skills : {$in: [...filterSkills]}};
        }

        const searchResult = await Job.find(
            { title : {$regex: title, $options: "i"},
              ...filter,
            },
            { companyName: 1, title: 1, skills: 1});

        res.json({data: searchResult});

    }catch(error){
        console.log(error);
    }
});


module.exports = router;
