import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'searchBytNumber'})
export class SearchBytNumber implements PipeTransform {
  transform(employees: Employee[], searchText: string) {
      return employees.filter(employee =>
        employee.tNumber.indexOf(searchText) !== -1 );
    }
  }
