import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";




@Injectable()
export class SharedService {
     baseUrl:string="";

    constructor(private http: HttpClient) {
        if(environment.production){
            this.baseUrl="https://my-json-server.typicode.com/dlngupta/my-json-server/signupusers";
        }
        else{
            this.baseUrl="http://localhost:3000/SignUpUsers";
        }
    }
    private isLoggedIn = new BehaviorSubject<boolean>(false);
    getUserList(): Observable<any> {
        return this.http.get(this.baseUrl).pipe(map(data => { return data }))
    }
    addUser(data: any) {
        return this.http.post(this.baseUrl, data);
    }
    getUser(data: any): Observable<any> {
        return this.http.get(this.baseUrl + data).pipe(map(data => {
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