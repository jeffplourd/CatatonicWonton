var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;
var Project = Models.Project;

module.exports = {
  // Get class returns each class with students 
  getClass: function (req, res) {
    Class
      .find({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Student
          },
          {
            model: Project
          }
        ]
      })
      .then(helpers.sendResponse(res));
  },

  getUserClasses: function (req, res) {
    var user = req.session.passport.user;

    if (user.accountType === 'Teacher') {
      Class
        .findAll({
          where: {
            TeacherId: user._id
          },
          include: [
            {
              model: Project
            }
          ]
        })
        .then(helpers.sendResponse(res));
    } else {
      StudentClass
        .findAll({
          where: {
            StudentId: user._id
          }
        })
        .then(helpers.sendResponse(res));
    }
  },

  createClass: function (req, res) {
    var user = req.session.passport.user;

    Promise
      .all([
        Class
          .create({
            name: req.body.name
          }),
          
        Teacher
          .findById(user._id)
      ])
      .spread(function (newClass, teacher) {
        return newClass.setTeacher(teacher);
      })
      .then(helpers.sendResponse(res))
      .catch(function (error){
        helpers.sendError(res, 409)(error);
      });
  },

  deleteClass: function (req, res) {
    Class
      .findById(req.params.id)
      .then(function (foundClass) {
        return foundClass.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};