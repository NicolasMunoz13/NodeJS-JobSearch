const express = require('express')
const JobsSerivce = require('../services/jobs')

function jobs(app){
    const router = express.Router();

    const jobsService = new JobsSerivce();

    app.use("/api/jobs", router);

    router.get("/", jobsService.allowIfLoggedin, jobsService.grantAccess("readAny", "job"), jobsService.getJobs);

    router.get("/:jobId", jobsService.allowIfLoggedin, jobsService.getJobsById);

    router.post("/", jobsService.allowIfLoggedin, jobsService.grantAccess("createOwn", "job"), jobsService.postJob);

    router.put("/:jobId", jobsService.allowIfLoggedin, jobsService.grantAccess("updateAny", "job"), jobsService.updateJob);

    router.delete("/:jobId", jobsService.allowIfLoggedin, jobsService.grantAccess("deleteAny", "job"), jobsService.deletejob);
}

module.exports = jobs