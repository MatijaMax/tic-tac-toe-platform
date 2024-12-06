import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { AuthGuard } from "../auth/auth.guard";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/user-profile/user-profile.component";
import { HistoryTabsComponent} from "src/app/feature-modules/stakeholder/history-tabs/history-tabs.component";
import { PageNotFoundComponent } from "src/app/feature-modules/layout/page-not-found/page-not-found.component";
import { ManualComponent } from "src/app/feature-modules/layout/manual/manual.component";
import { LeaderboardComponent } from "src/app/feature-modules/stakeholder/leaderboard/leaderboard.component";
import { BoardComponent } from "src/app/feature-modules/stakeholder/board/board.component";
import { AiBoardComponent } from "src/app/feature-modules/stakeholder/ai-board/ai-board.component";
import { MpBoardComponent } from "src/app/feature-modules/stakeholder/mp-board/mp-board.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "manual", component: ManualComponent},
    { path: "login", component: LoginComponent },
    { path: "singleplayer", component: BoardComponent, canActivate: [AuthGuard]},
    { path: "multiplayer", component: MpBoardComponent, canActivate: [AuthGuard]},
    { path: "ai", component: AiBoardComponent, canActivate: [AuthGuard]},
    { path: "register", component: RegistrationComponent },
    { path: "", component: HomeComponent },
    { path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: "leaderboard", component: LeaderboardComponent, canActivate: [AuthGuard]},
    { path: "history-tabs", component: HistoryTabsComponent, canActivate: [AuthGuard]},
    { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
