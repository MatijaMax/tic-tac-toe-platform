import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { TokenStorage } from "./jwt/token.service";
import { environment } from "src/env/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Login } from "./model/login.model";
import { AuthenticationResponse } from "./model/authentication-response.model";
import { User } from "./model/user.model";
import { Registration } from "./model/registration.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    user$ = new BehaviorSubject<User>({
        id: "",
        username: "",
        password: "",
        streak: 0,
        points: 0,
        inQueue: false,
        name: "",
        surname: "",
    });

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage,
        private router: Router,
    ) {}
    
    login(login: Login): Observable<AuthenticationResponse> {
        return this.http
            .post<AuthenticationResponse>(
                environment.apiHost + "Auth/login",
                login,
            )
            .pipe(
                tap(authenticationResponse => {
                    this.tokenStorage.saveAccessToken(
                        authenticationResponse.accessToken,
                    );
                    this.user$.next({
                        id: "",
                        username: login.username,
                        password: "",
                        streak: 0,
                        points: 0,
                        inQueue: false,
                        name: "",
                        surname: "",
                    });
                }),
            );
    } 

    register(registration: Registration): Observable<any> {
        return this.http.post<any>(
            environment.apiHost + "User",
            registration,
        );
    }
    
    logout(): void {
        this.tokenStorage.clear();
        this.router.navigate([""]);
        this.user$.next({
            id: "",
            username: "",
            password: "",
            streak: 0,
            points: 0,
            inQueue: false,
            name: "",
            surname: "",
        });
    } 

    getCurrentUserId(): number {
        const jwtHelperService = new JwtHelperService();
        const accessToken = this.tokenStorage.getAccessToken() || "";
        const decodedToken = jwtHelperService.decodeToken(accessToken);

        return decodedToken.id;
    }

}
