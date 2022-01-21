import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CrudService } from '../crud.service';
import { EmployeeModel } from './employee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.sass']
})
export class EmployeeDashboardComponent implements OnInit {
  
  formValue !:FormGroup;
  employeemModelObj : EmployeeModel = new EmployeeModel();
  employeeData !:any
  showAdd!:boolean
  showUpdate !:boolean
  constructor(private formbuilder:FormBuilder,private crudservice:CrudService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee()
  }
 clickAddEmployee(){
   this.formValue.reset();
   this.showAdd = true;
   this.showUpdate = false;
 }
  postEmployeeDetails(){
    this.employeemModelObj.firstName = this.formValue.value.firstName;
    this.employeemModelObj.lastName = this.formValue.value.lastName;
    this.employeemModelObj.email = this.formValue.value.email;
    this.employeemModelObj.mobile = this.formValue.value.mobile;
    this.employeemModelObj.salary = this.formValue.value.salary;

    this.crudservice.postEmployee(this.employeemModelObj).subscribe(res=>{
      console.log(res);
      alert('Employee Added successfully')
      let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    error=>
    alert('something went wrong'))
}  
getAllEmployee(){
  this.crudservice.getEmployee().subscribe(res=>{
     this.employeeData = res;
  })
}
deleteemployee(row:any){
  this.crudservice.deleteEmployee(row.id).subscribe(res=>{
    alert("Employee Deleted");
    this.getAllEmployee();
  })
}
onEdit(row:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeemModelObj.id = row.id;
this.formValue.controls['firstName'].setValue(row.firstName)
this.formValue.controls['lastName'].setValue(row.lastName)
this.formValue.controls['email'].setValue(row.email)
this.formValue.controls['mobile'].setValue(row.mobile)
this.formValue.controls['salary'].setValue(row.salary)
}
updateEmployeeDetails(){
  this.employeemModelObj.firstName = this.formValue.value.firstName;
  this.employeemModelObj.lastName = this.formValue.value.lastName;
  this.employeemModelObj.email = this.formValue.value.email;
  this.employeemModelObj.mobile = this.formValue.value.mobile;
  this.employeemModelObj.salary = this.formValue.value.salary;

  this.crudservice.updateEmployee(this.employeemModelObj,this.employeemModelObj.id).subscribe(res=>{
    alert("Updated successfully")
    let ref =document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
  }
  )
}
}
