import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { User } from "../models/user";

@Injectable()
export class AccountService {
    
    constructor(private http: HttpClient) { }

    //registerUser(user: User): Observable<User> {
    //    return this.http.post<User>('');
    // }

    //login(user: User): Observable<User> {
    //    return this.http.post<User>('');
    //}
}