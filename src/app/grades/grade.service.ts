import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Grade } from './grade'
 
@Injectable()
export class GradeService {
 
    private url = "http://localhost:5093/api/Grades";
    constructor(private http: HttpClient) {
    }
 
    getGrades(id:number) {
        return this.http.get(this.url + "/GetStudentGrades/"+id);
    }
     
    getGrade(id: number) {
        return this.http.get(this.url + '/Get/' + id);
    }
     
    createGrade(grade: Grade) {
        return this.http.post<any>(this.url + "/Create", grade);
    }
    updateGrade(grade: Grade) {
  
        return this.http.put<any>(this.url+"/Update", grade);
    }
    deleteGrade(id: number) {
        return this.http.delete(this.url + '/Delete/' + id);
    }
}