const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
  tNumber: { type: String, required: true, unique: true },
    firstName:  { type: String, required: true },
    lastName: { type: String, required: true },
    job: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    employmentStartDate: { type: String, required: true },
    employmentTerminationDate: {type: String},
    salary: { type: Number, required: true },
    DOB: { type: String, required: true },
    SSN: { type: String, required: true, },
    contractLength: { type: Number, required: true}
});


module.exports = mongoose.model('Employee', employeeSchema);
