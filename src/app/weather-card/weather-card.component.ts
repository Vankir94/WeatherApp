import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  public condition = 'Storm';
  public currentTemp = 12;
  public minTemp = 10;
  public maxTemp = 10;

  public darkMode = true;

  constructor() { }

  ngOnInit(): void {
  }


  public openDetails(): void{

  }
}
