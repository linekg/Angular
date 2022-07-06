import { Component,OnInit,TemplateRef} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GradeService} from './grade.service'
import {Grade} from './grade'
import { LessonService } from '../lessons/lesson.service';
import { Lesson } from '../lessons/lesson';
import { StudentService } from '../students/student.service';
import { Student } from '../students/student';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
  
@Component({
    selector: 'grade-app',
    templateUrl: `./grade.component.html`,
    providers: [GradeService, LessonService, StudentService]
})
export class GradeComponent implements OnInit{ 
     
    id: number | undefined;
    private subscription: Subscription;
    grade:Grade=new Grade();
    grades:Grade[];
    lessons:Lesson[];
    student?:Student;
    modalRef: BsModalRef;

    constructor(private activateRoute: ActivatedRoute, private dataService: GradeService, 
        private lessonService: LessonService, private studentervice: StudentService, private modalService: BsModalService){
         
        this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    }
    ngOnInit() {
        this.studentervice.getStudent(this.id).subscribe((data:Student)=>this.student=data);
        this.loadLessons();
        this.loadGrades();

    }
    loadGrades(){
        this.dataService.getGrades(this.id)
            .subscribe((data: Grade[]) => {
                this.grades = data;
            });
    }
    loadLessons() {
        this.lessonService.getLessons()
            .subscribe((data: Lesson[]) => {
                console.log(data);
                this.lessons = data;
            });
    }


    save() {
        if (this.grade.id == null) {
            this.dataService.createGrade(this.grade)
                .subscribe({next: (data:Grade)=>{
                    this.loadGrades();
                },
            error:error=>{
                
                console.error('There was an error!', error);
            }
            });
        } else {
            this.dataService.updateGrade(this.grade)
                .subscribe(data => {this.loadGrades(); });
        }
        
        this.modalRef.hide();
    }
    editGrade(tr: Grade, template: TemplateRef<any>) {
        this.grade = tr;
        this.modalRef = this.modalService.show(template);
    }
    cancel() {
        this.grade = new Grade();
        this.modalRef.hide();
        this.loadGrades();
    }
    delete(t: Grade) {
        this.dataService.deleteGrade(t.id)
            .subscribe(data => this.loadGrades());
    }
    create(template: TemplateRef<any>) {
        this.grade = new Grade();
        this.grade.studentID=this.id;
        this.modalRef = this.modalService.show(template);
      }
}