import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { User } from '../Models/user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    usersCollectionRef: AngularFirestoreCollection<User>;
    constructor(public auth: AngularFireAuth,public ngZone: NgZone,public router: Router,public afs: AngularFirestore, private stateService:StateService){
        this.usersCollectionRef = this.afs.collection<User>('users');
    }


    SignIn(email:string, password:string) {
        return this.auth.signInWithEmailAndPassword(email, password)
          .then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['profil']);
            });
            this.stateService.changeLoginMessage(true);
            console.log(result);
            var user = this.mapUser(result,"");
            localStorage.setItem('userDetails', JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(result.user));
          }).catch((error) => {
            window.alert(error.message)
          })
      }

      logOut() {
        return this.auth.signOut().then(() => {
            this.stateService.changeLoginMessage(false);
            localStorage.removeItem('user');
            localStorage.removeItem('userDetails');
            this.router.navigate(['log-in']);
          })
      }
      get isStudent():boolean {
        return (JSON.parse(localStorage.getItem('userDetails') as string) as User)?.isStudent ?? false;
      }
      get isLoggedIn(): boolean {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') as string);
        const user = JSON.parse(localStorage.getItem('user') as string);
        if(!userDetails || !user){
          return false;
        }
        return (user !== null && userDetails !== null) ? true : false;
      }

      Register(data:any){
        return this.auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          this.SetUserData(this.mapUser(result, data));
          this.stateService.changeLoginMessage(true);
          this.ngZone.run(() => {
            this.router.navigate(['profil']);
        });
        }).catch((error) => {
          window.alert(error.message)
        })
      }

      SetUserData(user:User) {
          console.log(user);
          if(this.getUser(user.uid) == null){
            console.log("No User")
            this.usersCollectionRef.add(user)
            .then(e => {
                console.log("New user saved");
            })
            .catch(error => {
                console.log(error);
              });
          }else{
              return;
          }
      }
    
      getUser(uid?:string){
        var user = this.afs.collection('users', ref => ref.where('uid', '==', uid).limit(1))
        .get().pipe(map(querySnapshot => {
            return querySnapshot.docs.map(u => {
                let user = u.data() as User;
                return user;
            })
        }))
      }

      mapUser(result:any, data:any){
        var user : User = {
            uid : result.user?.uid,
            email : result.user?.email,
            nume :  data.nume,
            prenume : data.prenume,
            photoURL : "https://bootdey.com/img/Content/avatar/avatar7.png",
            emailVerified : result.user?.emailVerified
        };
        return user;
      }
}