const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  tNumber: { type: String, required: true },
    firstName:  { type: String, required: true },
    lastName: { type: String, required: true },
    job: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    employmentDates: { type: String, required: true },
    salary: { type: Number, required: true },
    DOB: { type: String, required: true },
    SSN: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
