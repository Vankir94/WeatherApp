import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModService } from './shared/services/darkmod.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  public title = 'Jupiter';
  public darkModeActive = false;
  public showMenu = false;

  public sub1!: Subscription;

  constructor(
    private darkmodService: DarkModService
  ) {}

  public toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  public modeToggleSwitch(): void {
    this.darkModeActive = !this.darkModeActive;
    this.darkmodService.sendValue(this.darkModeActive);
  }

  public ngOnDestroy(): void {
      this.sub1.unsubscribe();
  }
}

