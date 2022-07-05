import { Component, OnInit } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher';
 
@Component({
    selector: 'teacher-app',
    templateUrl: './teacher.component.html',
    providers: [TeacherService]
})
export class TeacherComponent implements OnInit {
 
    teacher: Teacher = new Teacher();   // изменяемый товар
    teachers: Teacher[];                // массив товаров
    tableMode: boolean = true;          // табличный режим
 
    constructor(private dataService: TeacherService) { }
 
    ngOnInit() {
        this.loadTeachers();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadTeachers() {
        this.dataService.getTeachers()
            .subscribe((data: Teacher[]) => {
                console.log(data);
                this.teachers = data;
            });
    }
    // сохранение данных
    save() {
        console.warn(this.teacher);

        if (this.teacher.id == null) {
            this.dataService.createTeacher(this.teacher)
                //.subscribe((data: Teacher) => this.teachers.push(data));
                .subscribe({next: data=>{
                    this.teachers.push(data)
                },
            error:error=>{
                
                console.error('There was an error!', error);
            }
            });
        } else {
            this.dataService.updateTeacher(this.teacher)
                .subscribe(data => this.loadTeachers());
        }
        this.cancel();
    }
    editTeacher(tr: Teacher) {
        this.teacher = tr;
    }
    cancel() {
        this.teacher = new Teacher();
        this.tableMode = true;
    }
    delete(t: Teacher) {
        this.dataService.deleteTeacher(t.id)
            .subscribe(data => this.loadTeachers());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}