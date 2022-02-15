const Project = require("../models/Project");

module.exports.projectsController = {
    addProject: async (req, res) => {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            linkGitHub: req.body.linkGitHub,
            grade: req.body.grade
        });
        res.json("success added project");
    },

    getAllProject: async (req, res) => {
        const allProject = await Project.find();
        res.json(allProject)
    },

    getEasyProject: async (req, res) => {
        const easyProject = await Project.find({grade: ["легкий","средний"]});
     res.json(easyProject);
    },

    getHardProject: async (req, res) => {
        const hardProject = await Project.find({grade: "тяжелый"});
        res.json(hardProject)
    }
};
