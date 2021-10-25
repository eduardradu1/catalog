import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { Grade, StudentGrade } from "./Models/student-grade.model";
import { User } from "./Models/user.model";



@Injectable({
    providedIn: 'root'
  })
  export class StudentService {


    apiURL:string = "https://us-central1-catalog-332ed.cloudfunctions.net/webApi/api"
    usersCollectionRef: AngularFirestoreCollection<User>;
    constructor(public afs: AngularFirestore, private httpClient: HttpClient){
        this.usersCollectionRef = this.afs.collection<User>('users');
    }
    SaveStudentGrades(grade:any) {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Access-Control-Allow-Methods', 'OPTIONS')
        .append('Access-Control-Allow-Origin', '*');
        console.log(JSON.stringify(grade));
        return this.httpClient.post(this.apiURL + '/grades', grade,{headers})
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
  
    getAllStudentGrades(userList:string[], materie?:string):Observable<Grade[]> {
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Access-Control-Allow-Methods', 'OPTIONS')
        .append('Access-Control-Allow-Origin', '*');
        console.log(userList);

        return this.httpClient.post<Grade[]>(this.apiURL + '/grades-list', {materie:materie,userList: userList},{headers})
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
      }
    GetProfile(uid:string) : Observable<User[]>{
        return  this.afs.collection('users', ref => ref.where('uid', '==', uid).limit(1))
        .get().pipe(map(querySnapshot => {
            return querySnapshot.docs.map(u => {
                let user = u.data() as User;
                return user;
            })
        }))
    }
    GetAllStudents() : Observable<User[]> {
        return  this.usersCollectionRef
        .snapshotChanges().pipe(map(querySnapshot => {
            return querySnapshot.map(u => {
                let user = u.payload.doc.data() as User;
                return user;
            })
        }))
      }
    getStudentGrades(uid:string):Observable<StudentGrade[]>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Headers', 'Content-Type')
        .append('Access-Control-Allow-Methods', 'OPTIONS')
        .append('Access-Control-Allow-Origin', '*');
        
        return this.httpClient.get<StudentGrade[]>(this.apiURL + '/students/' + uid, {headers})
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    handleError(error:any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
     }
  }