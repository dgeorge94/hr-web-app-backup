import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'searchByEmploymentStatus'})
export class SearchByEmploymentStatus implements PipeTransform {
  transform(employees: Employee[], searchText: string) {
      return employees.filter(employee =>
        employee.employmentStatus.indexOf(searchText) !== -1 );
    }
  }
