import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { shareReplay } from 'rxjs/operators';
import { user } from "../interface/user";
import { LoginResult } from "../interface/login-result";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }
    /*
    login(username:string, password:string ) {
        return this.http.post<LoginResult>('https://localhost:3000/api/v1/auth/login', {username, password})
        .pipe(map((authResult) => {
            console.log("creating session")
            const expiresAt = moment().add(authResult.expiresIn,'second');

            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        }))
    };*/

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("admin");
        localStorage.removeItem("username");
        return "Success"
    }

    public isLoggedInAdmin(): boolean {
        if (this.isLoggedIn() && localStorage.getItem("admin") == 'true'){
            return true;
        }
        else{
            return false;
        }
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() { 
        let item = localStorage.getItem("expires_at") as string
        const expiresAt = JSON.parse(item); // json or null
        return moment(expiresAt);
    }    
}