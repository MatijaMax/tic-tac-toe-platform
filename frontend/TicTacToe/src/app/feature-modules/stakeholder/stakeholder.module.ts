import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HistoryTabsComponent} from "./history-tabs/history-tabs.component";
import { SharedModule } from "src/app/shared/shared.module";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { AiBoardComponent } from "./ai-board/ai-board.component";
import { MpBoardComponent } from "./mp-board/mp-board.component";
import { GameService } from "./game.service";

@NgModule({
    declarations: [
        UserProfileComponent,
        HistoryTabsComponent,
        LeaderboardComponent,
        SquareComponent,
        BoardComponent,
        AiBoardComponent,
        MpBoardComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
    ],
    providers: [GameService],
    exports: [
        UserProfileComponent,
        HistoryTabsComponent,
        LeaderboardComponent,
    ],
})
export class StakeholderModule {}
