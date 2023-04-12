import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Employee } from "../employee.model";
import { EmployeesService } from "../employees.service";

@Component({
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})

export class NewEmployeeComponent implements OnInit{
  enteredTNumber = "";
  enteredFirstName = "";
  enteredLasstName = "";
  enteredJob = "";
  enteredEmploymentStatus = "Active";
  enteredEmployementDate = "";
  enteredSalary = 0;
  enteredDOB = "";
  enteredSSN = "";
  post: Employee;
  private mode = "create";
  private postId: string;


  constructor(public employeesService: EmployeesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = "edit";
        this.postId = paramMap.get('postId');
        this.employeesService.getEmployee(this.postId).subscribe(postData => {
          this.post = {
            id:postData._id,
            tNumber: postData.tNumber.toUpperCase(),
            firstName: postData.firstName.toUpperCase(),
            lastName: postData.lastName.toUpperCase(),
            job: postData.job.toUpperCase(),
            employmentStatus: postData.employmentStatus,
            employmentDates: postData.employmentDates,
            salary: postData.salary,
            DOB: postData.DOB,
            SSN: postData.SSN
          }
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSaveEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode ==='create') {
      this.employeesService.addEmployee(
        form.value.tNumber.toUpperCase(),
        form.value.firstName.toUpperCase(),
        form.value.lastName.toUpperCase(),
        form.value.job.toUpperCase(),
        this.enteredEmploymentStatus,
        form.value.employmentDates,
        form.value.salary,
        form.value.DOB,
        form.value.SSN);
    } else {
      this.employeesService.updateEmployee(
        this.postId,
        form.value.tNumber.toUpperCase(),
        form.value.firstName.toUpperCase(),
        form.value.lastName.toUpperCase(),
        form.value.job.toUpperCase(),
        form.value.EmploymentStatus,
        form.value.employmentDates,
        form.value.salary,
        form.value.DOB,
        form.value.SSN )
    }

      form.resetForm();
  }
}
