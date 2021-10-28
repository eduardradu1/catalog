import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StateService {
    private loginSubject = new BehaviorSubject(false);
    loginSubjectMessage = this.loginSubject.asObservable();

    constructor() { }

    changeLoginMessage(isLoggedIn:boolean){
        this.loginSubject.next(isLoggedIn);
    }

}