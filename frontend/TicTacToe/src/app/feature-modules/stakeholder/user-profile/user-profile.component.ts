import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { StakeholderService } from "../stakeholder.service";
import { marked } from "marked";
import { DummyUser } from "../model/dummy-user.model";


@Component({
    selector: "xp-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
    editing = false;
    userD: User;
    user: User;

    constructor(
        private authService: AuthService,
        private service: StakeholderService,
        private router: Router,
        public dialog: MatDialog,
    ) {}


    ngOnInit(): void {
        const md = marked.setOptions({});
        this.userD = {
            id: "",
            username: "TEST",
            password: "",
            streak: 6,
            points: 212,
            inQueue: false,
            name: "Bob",
            surname: "Ross",
        };
        this.authService.user$.subscribe(user => {
            this.user = user;
            if (!user.username) return;
            this.service.getByUsername(this.user.username).subscribe(result => {
                this.user = result;
                //this.user = this.userD;
                console.log(this.userD);
            });
        });
    }
    navigateToHistory() {
        this.router.navigate(['/history-tabs']);
      }
}
