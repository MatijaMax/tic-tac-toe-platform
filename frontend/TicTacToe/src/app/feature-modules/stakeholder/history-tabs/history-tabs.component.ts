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
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { GameRecord } from "../model/game-record.model";

enum Tab {
     Player1,
     Player2,
     Winner,
     WP,
     LP,
}
@Component({
    selector: "xp-notification-tabs",
    templateUrl: "./history-tabs.component.html",
    styleUrls: ["./history-tabs.component.css"],
})
export class HistoryTabsComponent implements OnInit {
    Tab = Tab;
    selectedTab: Tab = Tab.Player1;
    user: User;
    gameRecords: GameRecord[] = [];

    constructor(private authService: AuthService) {
        this.selectedTab = Tab.Player1;
    }

    ngOnInit(): void {

                // Dummy Game Records
                this.gameRecords = [
                    {
                        player1: "Alice",
                        player2: "Bob",
                        winner: "Alice",
                        winPoints: 10,
                        lossPoints: 5,
                    },
                    {
                        player1: "Alice",
                        player2: "Bob",
                        winner: "Alice",
                        winPoints: 10,
                        lossPoints: 5,
                    },
                    {
                        player1: "Alice",
                        player2: "Bob",
                        winner: "Alice",
                        winPoints: 10,
                        lossPoints: 5,
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
}
