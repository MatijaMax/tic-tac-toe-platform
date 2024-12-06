import { Component, OnInit } from "@angular/core";
import { AuthService } from "./infrastructure/auth/auth.service";
import { User } from "./infrastructure/auth/model/user.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "Tic Tac Toe";
    sideBar: boolean = false;
    user: User;

    constructor(
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
    }
}
