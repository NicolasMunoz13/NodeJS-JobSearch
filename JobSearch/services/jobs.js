const Job = require("../models/jobs");
const rolesJob = require("../server/rolesJob")

class Jobs {
  async getJobs(req, res, next) {
    const jobs = await Job.find({});
    res.status(200).json({
      data: jobs,
    });
  }

  async getJobsById(req, res, next) {
    try {
      const jobId = req.params.jobId;
      const job = await Job.findById(jobId);

      if (!job) {
        return next(new Error("Job does not exist"));
      }
      res.status(200).json({
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async postJob(req, res, next) {
    try {
      const { title, salary, emailContact, yearsExperience, area } = req.body;
      const newJob = new Job({
        title,
        salary,
        emailContact,
        yearsExperience,
        area,
      });
      await newJob.save();
      res.status(201).json({
        data: newJob,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateJob(req, res, next) {
    try {
      const update = req.body;
      const jobId = req.params.jobId;
      await Job.findByIdAndUpdate(jobId, update);
      const job = await Job.findById(jobId);
      res.status(200).json({
        data: job,
        message: "Job information has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deletejob(req, res, next) {
    try {
      const jobId = req.params.jobId;
      await Job.findByIdAndDelete(jobId);
      res.status(200).json({
        data: null,
        message: "Job query/id has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  grantAccess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = rolesJob.rolesJob.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action",
          });
        }
        next()
      } catch (error) {
          next(error)
      }
    };
  }

  async allowIfLoggedin(req, res, next){
      try {
        const user = res.locals.loggedInUser;
        if (!user)
        return res.status(401).json({
          error: "You need to be logged in to access this route",
        });
      req.user = user;
      next();
      } catch (error) {
          next(error)
      }
  }

}

module.exports = Jobs;
