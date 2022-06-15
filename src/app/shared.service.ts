import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";




@Injectable()
export class SharedService {
    constructor(private http: HttpClient) {

    }
    private isLoggedIn = new BehaviorSubject<boolean>(false);
    getUserList(): Observable<any> {
        return this.http.get("http://localhost:3000/SignUpUsers").pipe(map(data => { return data }))
    }
    addUser(data: any) {
        return this.http.post("http://localhost:3000/SignUpUsers", data);
    }
    getUser(data: any): Observable<any> {
        return this.http.get("http://localhost:3000/SignUpUsers/" + data).pipe(map(data => {
            return data;
        }))
    }
    updateIsUserLoggedin(val){
        this.isLoggedIn.next(val);
    }
    getIsUserLoggedIn(){
        return this.isLoggedIn.asObservable();
    }

}