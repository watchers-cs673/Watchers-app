import { Component, Input } from "@angular/core";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
  })
export class ToolbarComponent {
    @Input() showProfileButton = true;
    @Input() showHomeLink = true;
}