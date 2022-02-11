import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  public getCityWeatherByName$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub$ = new Subject<string>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
      .subscribe(
        (data: any) => dataSub$.next(data['weather']),
        err => console.log(err)
      );
    return dataSub$;
  }

  public getCitiesWeathersByNames$(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject$ = new Subject();
    cities.forEach(city => {
      citiesSubject$.next(this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`))
    });
    return citiesSubject$;
  }

  public getWeatherState$(city: string): Subject<string> {
    const dataSubject$ = new Subject<string>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
      .subscribe((data: any) => dataSubject$.next(data['weather'][0].main));
    return dataSubject$;
  }

  public getCurrentTemp$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject$ = new Subject<number>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
      .subscribe((weather: any) => {
        dataSubject$.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject$;
  }

  public getCurrentHum$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject$ = new Subject<number>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
    .subscribe((weather: any) => {
      dataSubject$.next(weather.main.humidity);
    });
    return dataSubject$;
  }

  public getCurrentWind$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject$ = new Subject<number>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
    .subscribe((weather: any) => {
      dataSubject$.next(Math.round(Math.round(weather.wind.speed)));
    })
    return dataSubject$;
  }

  public getMaxTemp$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject$ = new Subject<number>();
    let max: number;
    this.http.get( `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
    .subscribe((weather: any) => {
      max = weather.list[0].main.temp;
      weather.list.forEach((value: any) => {
        if (max < value.main.temp) {
          max = value.main.temp;
        }
      });
      dataSubject$.next(Math.round(max));
    })
    return dataSubject$;
  }

  public getMinTemp$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject$ = new Subject<number>();
    let min: number;
    this.http.get( `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
    .subscribe((weather: any) => {
      min = weather.list[0].main.temp;
      weather.list.forEach((value: any) => {
        if (min > value.main.temp) {
          min = value.main.temp;
        }
      });
      dataSubject$.next(Math.round(min));
    })
    return dataSubject$;
  }

  public getForecast$(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>> {
    const dataSubject$ = new Subject<Array<any>>();
    this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=1b7440a5b9075c861b6670f5ae1334bd`)
    .subscribe((weather: any) => {
      dataSubject$.next(weather.list);
    });
    return dataSubject$;
  }
}
