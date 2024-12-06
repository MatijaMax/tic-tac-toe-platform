import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipModule } from "primeng/tooltip";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        TooltipModule,
        MatDialogModule,
    ],
    exports: [
    ],
})
export class SharedModule {}
