import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { ThemeService } from "../../../infrastructure/theme/theme.service";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { LoginComponent } from "src/app/infrastructure/auth/login/login.component";
import { RegistrationComponent } from "src/app/infrastructure/auth/registration/registration.component";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import {
    faChevronDown,
    faPhone,
    faGear,
    faQuestionCircle,
    faSun,
    faMoon,
    faGlobe,
    faEuroSign,
    faUser,
    faRightFromBracket,
    faMountainCity,
    faTriangleExclamation,
    faStar,
    faHotel,
    faNewspaper,
    faSearch,
    faHeart,
    faShield,
    faPersonHiking,
    faUsers,
    faEnvelope,
    faPlus,
    faShoppingCart,
    faBell,
    faLanguage,
    faCircleQuestion,
    faPercent,
    faCoins,
    faMapLocationDot,
    faFlag,
    faMoneyBills,
    faBoxOpen,
    faBarChart,
    faCheckSquare,
    faGamepad,
    faRobot,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { StakeholderService } from "../../stakeholder/stakeholder.service";
import { interval, Subscription } from "rxjs";
//import { } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "xp-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    user: User | undefined;
    isHome: boolean = false;
    notificationNumber: number = 0;
    checkNotifications: Subscription;
    source = interval(2 * 60 * 1000);

    @Output() show: EventEmitter<any> = new EventEmitter();

    constructor(
        private authService: AuthService,
        private themeService: ThemeService,
        private router: Router,
        private stakeholderService: StakeholderService,
        public dialogRef: MatDialog,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (event.url !== "" && event.url !== "/") {
                    this.isHome = false;
                } else {
                    this.isHome = true;
                }
            }
        });
    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
        // this.getUnseenNotifications();
    }



    showCart() {
        this.show.emit();
    }

    onLogin(): void {
        this.dialogRef.open(LoginComponent);
    }

    onRegister(): void {
        this.dialogRef.open(RegistrationComponent);
    }

    onLogout(): void {
       // this.unsubscribe();
        this.authService.logout();
        this.router.navigate([""]);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    getTheme(): string {
        return this.themeService.getTheme();
    }

    onRateApp(){
        
    }


    ngOnDestroy() {
        //this.unsubscribe();
    }

    unsubscribe() {
        if (this.user?.id !== "") {
            // console.log("destroyed");
            this.checkNotifications.unsubscribe();
        }
    }

    faChevronDown = faChevronDown;
    faQuestionCircle = faQuestionCircle;
    faPhone = faPhone;
    faGear = faGear;
    faSun = faSun;
    faMoon = faMoon;
    faGlobe = faGlobe;
    faEuroSign = faEuroSign;
    faLanguage = faLanguage;
    faUser = faUser;
    faRightFromBracket = faRightFromBracket;
    faMountainCity = faMountainCity;
    faTriangleExclamation = faTriangleExclamation;
    faStar = faStar;
    faHotel = faHotel;
    faNewspaper = faNewspaper;
    faSearch = faSearch;
    faHeart = faHeart;
    faShield = faShield;
    faPersonHiking = faPersonHiking;
    faUsers = faUsers;
    faEnvelope = faEnvelope;
    faFolderClosed = faFolderClosed;
    faPlus = faPlus;
    faShoppingCart = faShoppingCart;
    faBell = faBell;
    faCircleQuestion = faCircleQuestion;
    faPercent = faPercent;
    faCoins = faCoins;
    faMapLocationDot = faMapLocationDot;
    faFlag = faFlag;
    faMoneyBills = faMoneyBills;
    faBoxOpen = faBoxOpen;
    faBarChart = faBarChart;
    faCheckSquare = faCheckSquare;
    faGamepad = faGamepad;
    faRobot = faRobot;
    faTrophy = faTrophy;
}
