import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounce, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  private employees: Employee[] = [];
  private employeesUpdated = new Subject<Employee[]>();

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
            employmentDates: employee.employmentDates,
            salary: employee.salary,
            DOB: employee.DOB,
            SSN: employee.SSN,
            id: employee._id
          }
        });
      }))
      .subscribe((transformedEmployees) => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  searchEmployees(firstName: string, lastName: string, tNumber: string) {
    this.http.get<{message: string, employees: any}> ('http://localhost:3000/api/employee')
      .pipe(map((employeeData) => {
        return employeeData.employees.map(employee => {
          return {
            tNumber: employee.tNumber,
            firstName: employee.firstName,
            lastName: employee.lastName,
            job: employee.job,
            employmentStatus: employee.employmentStatus,
            employmentDates: employee.employmentDates,
            salary: employee.salary,
            DOB: employee.DOB,
            SSN: employee.SSN,
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
      employmentDates: Date, salary: bigint, DOB: Date, SSN: string  }>('http://localhost:3000/api/employee/' + id);
  }


  addEmployee(
    tNumber:string,
    firstName:string,
    lastName:string,
    job:string,
    employmentStatus:string,
    employmentDates:Date,
    salary:bigint,
    DOB:Date,
    SSN:string) {
    const employee: Employee = { id: null, tNumber: tNumber.toUpperCase(), firstName: firstName, lastName: lastName, job: job,
                            employmentStatus: employmentStatus.toUpperCase(), employmentDates: employmentDates, salary: salary,
                            DOB: DOB, SSN: SSN };
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
      employmentDates:Date,
      salary:bigint,
      DOB:Date,
      SSN:string ) {
        const employee: Employee = {
          id: id,
          tNumber: tNumber.toUpperCase(),
          firstName: firstName,
          lastName: lastName,
          job: job,
          employmentStatus: employmentStatus.toUpperCase(),
          employmentDates: employmentDates,
          salary: salary,
          DOB: DOB,
          SSN: SSN
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


