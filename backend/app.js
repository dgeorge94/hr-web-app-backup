const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Employee = require('./models/employee');
const employee = require('./models/employee');

const app = express();

mongoose.connect('mongodb+srv://dgeorge7:Y5Uc1W5VHLAtmzrz@cluster0.tvnvqaq.mongodb.net/node-angular-hr?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(() => {
    console.log('Connection Failed.')
  })

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
  next();
});

app.post('/api/employee', (req, res, next) => {
  const employee = new Employee({
    tNumber: req.body.tNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    job: req.body.job,
    employmentStatus: req.body.employmentStatus,
    employmentDates: req.body.employmentDates,
    salary: req.body.salary,
    DOB: req.body.DOB,
    SSN: req.body.SSN
  });
  employee.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Employee Added Successfully!',
      epmloyeeID: result._id
    });
  });

});

app.put("/api/employee/:id", (req, res, next) => {
  const employee = new Employee({
    _id: req.body.id,
    tNumber: req.body.tNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    job: req.body.job,
    employmentStatus: req.body.employmentStatus,
    employmentDates: req.body.employmentDates,
    salary: req.body.salary,
    DOB: req.body.DOB,
    SSN: req.body.SSN
  });
  Employee.updateOne({_id: req.params.id}, employee).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
  })
});

app.get('/api/employee', (req, res, next) => {
  Employee.find()
    .then(documents => {
      res.status(200).json({
    message: 'Employees fetched successfully!',
    employees: documents
  });
    });

});

app.get('/api/employee/:id', (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({message: 'Employee Not Found'});
    }
  })
})

app.delete('/api/employee/:id', (req, res, next) => {
  Employee.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted'});
  });

});

app.search('/api/employee', (req, res, next) => {
  Employee.findOne(req.params.firstName, req.params.LastName, req.params.tNumber).then(employee =>{
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({message: 'Employee Not Found'});
    }
  })
})

module.exports = app;
