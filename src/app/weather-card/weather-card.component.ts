import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModService } from '../shared/services/darkmod.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  public condition = 'Storm';
  public currentTemp = 12;
  public minTemp = 10;
  public maxTemp = 10;

  public sub1!: Subscription;

  public darkMode!: boolean;

  public constructor(
    private darkmodService: DarkModService
  ) { }

  public ngOnInit(): void {
    this.sub1 = this.darkmodService.passValue$.subscribe(isValue => this.darkMode = isValue);
  }

  public ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  public openDetails(): void{

  }
}
