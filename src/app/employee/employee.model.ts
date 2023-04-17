export interface Employee {
  id: string;
  tNumber:string;
  firstName:string;
  lastName:string;
  job:string;
  employmentStatus:string;
  employmentStartDate: Date;
  employmentTerminationDate: Date;
  salary:bigint;
  DOB:Date;
  SSN:string;
  contractLength:number;
  // details?: details[] | MatTableDataSource<details>
}
