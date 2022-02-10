import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Minimus';
  public darkModeActive = false;
  public showMenu = false;


  public toggleMenu(): void{
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }

  public modeToggleSwitch(): void {
    this.darkModeActive = !this.darkModeActive;
  }
}

