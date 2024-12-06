import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MaterialModule } from "src/app/infrastructure/material/material.module";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ManualComponent } from "./manual/manual.component";

@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        PageNotFoundComponent,
        ManualComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FontAwesomeModule,
        MatDialogModule,
        SharedModule,
        BrowserAnimationsModule,
    ],
    exports: [
        NavbarComponent,
        HomeComponent,
        FooterComponent,
    ],
})
export class LayoutModule {}
