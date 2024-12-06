import { Component, OnInit } from "@angular/core";
import {
    faMapMarker,
    faBuilding,
    faTriangleExclamation,
    faSearch,
    faShoppingCart,
    faMoneyBill,
    faCoins,
    faUsers,
    faPercentage,
    faUser,
    faTrophy,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { DummyUser } from "../model/dummy-user.model";

enum Tab {
     Username,
     Points,
     Streak,
}
@Component({
    selector: "xp-notification-tabs",
    templateUrl: "./leaderboard.component.html",
    styleUrls: ["./leaderboard.component.css"],
})
export class LeaderboardComponent implements OnInit {
    Tab = Tab;
    selectedTab: Tab = Tab.Username;
    user: User;
    board: DummyUser[] = [];

    constructor(private authService: AuthService) {
        this.selectedTab = Tab.Username;
    }

    ngOnInit(): void {

                // Dummy Game Records
                this.board = [
                    {
                        name: 'John',
                        surname: 'Doe',
                        username: 'john_doe',
                        points: 1500,
                        streak: 5
                    },
                    {
                        name: 'John',
                        surname: 'Doe',
                        username: 'john_doe',
                        points: 1500,
                        streak: 5
                    },
                    {
                        name: 'John',
                        surname: 'Doe',
                        username: 'john_doe',
                        points: 1500,
                        streak: 5
                    },
                ];

        this.authService.user$.subscribe(user => {
            this.user = user;
        });
    }

    setActiveTab(tab: Tab, el: HTMLElement): void {
        this.selectedTab = tab;
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1);
    }

    //icons
    faMapMarker = faMapMarker;
    faBuilding = faBuilding;
    faTriangleExclamation = faTriangleExclamation;
    faSearch = faSearch;
    faShoppingCart = faShoppingCart;
    faMoneyBill = faMoneyBill;
    faCoins = faCoins;
    faUsers = faUsers;
    faPercentage = faPercentage;
    faUser = faUser;
    faTrophy = faTrophy;
    faStar = faStar;
}
