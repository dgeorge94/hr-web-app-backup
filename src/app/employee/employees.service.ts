import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounce, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SearchByFirstName } from './search-by-first-name.pipe';

import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class EmployeesService{
  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();
  empStatus = ''

  constructor(private http: HttpClient) {}

  getEmployees() {
    this.http.get<{message: string, employees: any}> ('http://localhost:3000/api/employee')
      .pipe(map((employeeData) => {
        return employeeData.employees.map(employee => {
          return {
            tNumber: employee.tNumber,
            firstName: employee.firstName,
            lastName: employee.lastName,
            job: employee.job,
            employmentStatus: employee.employmentStatus,
            employmentStartDate: employee.employmentStartDate,
            employmentTerminationDate: employee.employmentTerminationDate,
            salary: employee.salary,
            DOB: employee.DOB,
            SSN: employee.SSN,
            contractLength: employee.contractLength,
            id: employee._id
          }
        });
      }))
      .subscribe((transformedEmployees) => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }


  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(id: string) {
    return this.http.get<{
      _id: string, tNumber: string, firstName: string,
      lastName: string, job: string, employmentStatus: string,
      employmentStartDate: Date, employmentTerminationDate: Date, salary: bigint, DOB: Date, SSN: string, contractLength: number  }>('http://localhost:3000/api/employee/' + id);
  }


  addEmployee(
    tNumber:string,
    firstName:string,
    lastName:string,
    job:string,
    employmentStatus:string,
    employmentStartDate: Date,
    employmentTerminationDate: Date,
    salary:bigint,
    DOB:Date,
    SSN:string,
    contractLength:number) {


    const employee: Employee = { id: null, tNumber: tNumber.toUpperCase(), firstName: firstName.toUpperCase(), lastName: lastName.toUpperCase(), job: job.toUpperCase(),
                            employmentStatus: employmentStatus.toUpperCase(), employmentStartDate: employmentStartDate, employmentTerminationDate: employmentTerminationDate, salary: salary,
                            DOB: DOB, SSN: SSN, contractLength: contractLength };
    this.http.post<{message: string, employeeID: string}>('http://localhost:3000/api/employee', employee)
      .subscribe((responseData) => {
        const id = responseData.employeeID;
        employee.id = id;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
      })
    }

    updateEmployee(
      id: string,
      tNumber:string,
      firstName:string,
      lastName:string,
      job:string,
      employmentStatus:string,
      employmentStartDate: Date,
      employmentTerminationDate: Date,
      salary:bigint,
      DOB:Date,
      SSN:string,
      contractLength:number ) {

        const employee: Employee = {
          id: id,
          tNumber: tNumber.toUpperCase(),
          firstName: firstName.toUpperCase(),
          lastName: lastName.toUpperCase(),
          job: job.toUpperCase(),
          employmentStatus: employmentStatus,
          employmentStartDate: employmentStartDate,
          employmentTerminationDate: employmentTerminationDate,
          salary: salary,
          DOB: DOB,
          SSN: SSN,
          contractLength: contractLength
          };


          this.http.put('http://localhost:3000/api/employee/' + id, employee)
            .subscribe(response =>{
              const updatedEmployees = [...this.employees];
              const oldEmployeeIndex = updatedEmployees.findIndex(e => e.id === employee.id);
              updatedEmployees[oldEmployeeIndex] = employee;
              this.employees = updatedEmployees;
              this.employeesUpdated.next([...this.employees]);
            }
            );
            console.log('Employee Updated!');

      }

    deleteEmployee(employeeID: string) {
      this.http.delete('http://localhost:3000/api/employee/' + employeeID)
        .subscribe(() =>{
          const updatedEmployees = this.employees.filter(employee => employee.id !== employeeID);
          this.employees = updatedEmployees;
          this.employeesUpdated.next([...this.employees]);
        })
    }
}


