import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'searchByFirstName'})
export class SearchByFirstName implements PipeTransform {
  transform(employees: Employee[], searchText: string) {
      return employees.filter(employee =>
        employee.firstName.indexOf(searchText) !== -1 );
    }
  }
