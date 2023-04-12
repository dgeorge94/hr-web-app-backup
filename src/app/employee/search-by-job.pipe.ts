import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee.model";

@Pipe({ name: 'searchByJob'})
export class SearchByJob implements PipeTransform {
  transform(employees: Employee[], searchText: string) {
      return employees.filter(employee =>
        employee.job.indexOf(searchText) !== -1 );
    }
  }
