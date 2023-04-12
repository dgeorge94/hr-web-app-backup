import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Employee } from "./employee.model";
import { EmployeesService } from "./employees.service";
import { MatTable } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { DatePipe, formatDate } from "@angular/common";
import { NgForm } from "@angular/forms";
import { SearchByFirstName } from "./search-by-first-name.pipe";


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit, OnDestroy {

  searchFirstNameText = '';
  searchLastNameText = '';
  searchtNumberText = '';
  searchJobText = '';
  searchEmpStatusText = '';
  searchText = '';
  isSearched = false;



  // employees = [
  //    {  firstName: "John",
  //       lastName: "Doe",
  //       tNumber: "T00000001",
  //       job: "Administrator",
  //       employmentStatus: "Terminated",
  //       employmentDates: "10/11/2020 - 12/20/2021",
  //       salary: 20000,
  //       DOB: "5/12/1983",
  //       SSN: "111-11-1111"

  // },
  //    {  firstName: "Jane",
  //       lastName: "Doe",
  //       tNumber: "T00000002",
  //       job: "Adjunct",
  //       employmentStatus: "Active",
  //       employmentDates: "10/11/2020 - ",
  //       salary:25000,
  //       DOB:"06/05/1990",
  //       SSN:"111-11-1112"
  //     }
  //  ];

  employees: Employee[] = [];
  private employeesSub: Subscription;

  constructor(public employeesService: EmployeesService) {}

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date,format);
}


  ngOnInit() {
    this.employeesService.getEmployees();
    this.employeesSub = this.employeesService.getEmployeeUpdateListener()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });

  }

  onSearch(form: NgForm) {
   this.isSearched = true;
    console.log(form.value);

    // this.employeesService.searchEmployees(form.value.firstName)

  }

  onClear(form: NgForm) {
  this.searchFirstNameText = '';
  this.searchLastNameText = '';
  this.searchtNumberText = '';
  this.searchJobText = '';
  this.searchEmpStatusText = '';
  this.searchText = '';


  this.isSearched = false;
  }

  onDelete(employeeID: string) {
    this.employeesService.deleteEmployee(employeeID);
  }

  ngOnDestroy() {
    this.employeesSub.unsubscribe();

  }



}


