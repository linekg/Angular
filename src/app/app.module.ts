import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
 
import { AppComponent }   from './app.component';
import { HomeComponent }   from './home/home.component';
import { TeacherComponent }   from './teachers/teacher.component';
import { LessonComponent }   from './lessons/lesson.component';
import { StudentComponent }   from './students/student.component';
import { NotFoundComponent }   from './not-found.component';
 
// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'teachers', component: TeacherComponent},
    { path: 'lessons', component: LessonComponent},
    { path: 'students', component: StudentComponent},
    { path: '**', component: NotFoundComponent}
];
 
@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule],
    declarations: [ AppComponent, HomeComponent, TeacherComponent, LessonComponent, StudentComponent, NotFoundComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }