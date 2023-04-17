const express = require('express');
const Employee = require('../models/employee');
const employee = require('../models/employee');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  const employee = new Employee({
    tNumber: req.body.tNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    job: req.body.job,
    employmentStatus: req.body.employmentStatus,
    employmentStartDate: req.body.employmentStartDate,
    employmentTerminationDate: req.body.employmentTerminationDate,
    salary: req.body.salary,
    DOB: req.body.DOB,
    SSN: req.body.SSN,
    contractLength: req.body.contractLength
  });
  employee.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Employee Added Successfully!',
      epmloyeeID: result._id
    });
  });

});

router.put("/:id", checkAuth, (req, res, next) => {
  const employee = new Employee({
    _id: req.body.id,
    tNumber: req.body.tNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    job: req.body.job,
    employmentStartDate: req.body.employmentStartDate,
    employmentTerminationDate: req.body.employmentTerminationDate,
    salary: req.body.salary,
    DOB: req.body.DOB,
    SSN: req.body.SSN,
    contractLength: req.body.contractLength
  });
  Employee.updateOne({_id: req.params.id}, employee).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
  })
});

router.get('', checkAuth, (req, res, next) => {
  Employee.find()
    .then(documents => {
      res.status(200).json({
    message: 'Employees fetched successfully!',
    employees: documents
  });
    });

});

router.get('/:id', checkAuth, (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({message: 'Employee Not Found'});
    }
  })
})

router.delete('/:id', checkAuth, (req, res, next) => {
  Employee.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted'});
  });

});

router.search('', checkAuth, (req, res, next) => {
  Employee.findOne(req.params.firstName, req.params.LastName, req.params.tNumber).then(employee =>{
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({message: 'Employee Not Found'});
    }
  })
})

module.exports = router;


