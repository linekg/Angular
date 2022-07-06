import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
    modalRef: BsModalRef;
    constructor(private dataService: StudentService, private modalService: BsModalService) { }
 
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
        if (this.student.id == null) {
            this.dataService.createStudent(this.student)
                .subscribe({next: (data:Student)=>{
                    this.students.push(data)
                },
            error:error=>{
                
                console.error('There was an error!', error);
            }
            });
        } else {
            this.dataService.updateStudent(this.student)
                .subscribe(data => {this.loadStudents(); });
        }
        
        this.modalRef.hide();
    }
    editStudent(tr: Student, template: TemplateRef<any>) {
        this.student = tr;
        this.modalRef = this.modalService.show(template);
    }
    cancel() {
        this.student = null;
        this.modalRef.hide();
        this.loadStudents();
    }
    delete(t: Student) {
        this.dataService.deleteStudent(t.id)
            .subscribe(data => this.loadStudents());
    }
    createStudent(template: TemplateRef<any>) {
        this.student = new Student();
        
        this.modalRef = this.modalService.show(template);
      }
}