export interface Employee {
    id: string;
    tNumber:string;
    firstName:string;
    lastName:string;
    job:string;
    employmentStatus:string;
    employmentDates:Date;
    salary:bigint;
    DOB:Date;
    SSN:string;
    // details?: details[] | MatTableDataSource<details>
}
