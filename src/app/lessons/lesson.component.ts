import { Component, OnInit } from '@angular/core';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson';
import { Teacher } from '../teachers/teacher';
import { TeacherService } from '../teachers/teacher.service';
 
@Component({
    selector: 'lesson-app',
    templateUrl: './lesson.component.html',
    providers: [LessonService, TeacherService]
})
export class LessonComponent implements OnInit {
 
    lesson: Lesson = new Lesson();   // изменяемый товар
    lessons: Lesson[];    
    teachers: Teacher[];            // массив товаров
    tableMode: boolean = true;          // табличный режим
 
    constructor(private dataService: LessonService, private teacherService: TeacherService) { }
 
    ngOnInit() {
        this.loadLessons();
        this.loadTeachers();   // загрузка данных при старте компонента  
    }
    loadTeachers(){
        this.teacherService.getTeachers()
            .subscribe((data: Teacher[]) => {
                console.log(data);
                this.teachers = data;
            });
    }
    // получаем данные через сервис
    loadLessons() {
        this.dataService.getLessons()
            .subscribe((data: Lesson[]) => {
                console.log(data);
                this.lessons = data;
            });
    }
    // сохранение данных
    save() {
        console.warn(this.lesson);

        if (this.lesson.id == null) {
            this.dataService.createLesson(this.lesson)
                //.subscribe((data: Teacher) => this.teachers.push(data));
                .subscribe({next: data=>{
                    this.lessons.push(data)
                },
            error:error=>{
                
                console.error('There was an error!', error);
            }
            });
        } else {
            this.dataService.updateLesson(this.lesson)
                .subscribe(data => this.loadLessons());
        }
        this.cancel();
    }
    editLesson(tr: Lesson) {
        this.lesson = tr;
    }
    cancel() {
        this.lesson = new Lesson();
        this.tableMode = true;
    }
    delete(t: Lesson) {
        this.dataService.deleteLesson(t.id)
            .subscribe(data => this.loadLessons());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}