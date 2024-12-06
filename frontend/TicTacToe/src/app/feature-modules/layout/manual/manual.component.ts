import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/env/environment";

@Component({
  selector: 'xp-page-not-found',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent {
  gameFile = this.sanitizer.bypassSecurityTrustResourceUrl(environment.host + 'game.html');

  constructor(private sanitizer: DomSanitizer) {}
}
