 
import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeeService} from './app.service';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
 
@Component({selector: 'app-data', templateUrl: './app/app.component.html', styleUrls: ['./app/app.component.css']})

export class AppComponent implements OnInit {
    //1. Template Ref types 
    @ViewChild('readOnlyTemplate')readOnlyTemplate : TemplateRef < any >;
    @ViewChild('editTemplate')editTemplate : TemplateRef < any >;
    @ViewChild('addTemplate')addTemplate : TemplateRef < any >;

    //2. Other Variables
    message : string;
    employee : Employee;
    selemp : Employee;
    employees : Array < Employee >;
    isNewRecord : boolean;
    isSaved: boolean;
    statusMessage:string;
    //3. Constructor injected with the Service Dependency
    constructor(private serv : EmployeeService) {
        this.employees = new Array < Employee > ();
        this.message = 'Demo for Java Spring Requirement';
    }
//4. Load all Employees
    ngOnInit() {
        this.loadEmployee();
    }

    private loadEmployee() {
        this
            .serv
            .getEmployees()
            .subscribe((resp : Response) => {
                this.employees = resp.json();
                //console.log(JSON.stringify(resp.json()));    
            });
    }
    //5. Add Employee

    addEmp() {
        this.selemp =new Employee(0,'',0,'','', true); 
        this
            .employees
            .push(this.selemp);
        this.isNewRecord = true;
        this.isSaved = false;
        return this.addTemplate;
    }

//6. Edit Employee
    editEmployee(emp : Employee) {
        this.selemp = emp;
    }

//7. Load either Read-Onoy Template or EditTemplate
    loadTemplate(emp : Employee) {
        console.log("loadTemplate", this.selemp, emp, this.isNewRecord);
        if( this.isNewRecord){
            console.log("loadTemplate->isNewRecord:", this.selemp.id, emp.id, (this.selemp.notAdded == undefined));
            if (emp.notAdded == undefined) {
                return this.readOnlyTemplate;
            }
            else
                return this.addTemplate;
        } else if (this.selemp && this.selemp.id == emp.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
         
    }
    //8. Save Employee
    saveEmp() {
        console.log("saveEmp",this.isNewRecord);
        if(this.isNewRecord){
            //add a new Employee
             this.serv.addEmployee(this.selemp).subscribe((resp : Response) => {
                this.employee = resp.json(),
                this.statusMessage = 'Record Added Successfully.',
                 this.loadEmployee();
            });
            this.isNewRecord=false;
            this.selemp = null;
           
        }else{
            //edit the record
             this.serv.updateEmployee(this.selemp.id,this.selemp).subscribe((resp : Response) => {
                this.statusMessage = 'Record Updated Successfully.',
                 this.loadEmployee();
            });
            this.selemp = null;
            
        }
    }
    //9. Cancel edit
    cancel() {
        this.selemp = null;
        this
        .employees
        .pop();
    }
    //10 Delete Employee
    deleteEmp(emp:Employee){
         this.serv.deleteEmployee(emp.id).subscribe((resp : Response) => {
                this.statusMessage = 'Record Deleted Successfully.',
                 this.loadEmployee();
            });
           
    }

}