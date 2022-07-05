import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student';
 
@Component({
    selector: 'student-app',
    templateUrl: './student.component.html',
    providers: [StudentService]
})
export class StudentComponent implements OnInit {
 
    student: Student = new Student();   // изменяемый товар
    students: Student[];                // массив товаров
    tableMode: boolean = true;          // табличный режим
 
    constructor(private dataService: StudentService) { }
 
    ngOnInit() {
        this.loadStudents();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadStudents() {
        this.dataService.getStudents()
            .subscribe((data: Student[]) => {
                console.log(data);
                this.students = data;
            });
    }
    // сохранение данных
    save() {
        console.warn(this.student);

        if (this.student.id == null) {
            this.dataService.createStudent(this.student)
                //.subscribe((data: Teacher) => this.teachers.push(data));
                .subscribe({next: data=>{
                    this.students.push(data)
                },
            error:error=>{
                
                console.error('There was an error!', error);
            }
            });
        } else {
            this.dataService.updateStudent(this.student)
                .subscribe(data => this.loadStudents());
        }
        this.cancel();
    }
    editStudent(tr: Student) {
        this.student = tr;
    }
    cancel() {
        this.student = new Student();
        this.tableMode = true;
    }
    delete(t: Student) {
        this.dataService.deleteStudent(t.id)
            .subscribe(data => this.loadStudents());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}