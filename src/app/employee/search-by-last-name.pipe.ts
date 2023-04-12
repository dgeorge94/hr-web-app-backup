import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'searchByLastName'})
export class SearchByLastName implements PipeTransform {
  transform(employees: Employee[], searchText: string) {
      return employees.filter(employee =>
        employee.lastName.indexOf(searchText) !== -1 );
    }
  }
