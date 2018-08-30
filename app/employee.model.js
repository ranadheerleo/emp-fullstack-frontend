System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Employee;
    return {
        setters: [],
        execute: function () {
            Employee = (function () {
                function Employee(id, name, salary, deptartment, designation, notAdded) {
                    this.id = id;
                    this.name = name;
                    this.salary = salary;
                    this.deptartment = deptartment;
                    this.designation = designation;
                    this.notAdded = notAdded;
                }
                return Employee;
            }());
            exports_1("Employee", Employee);
        }
    };
});
