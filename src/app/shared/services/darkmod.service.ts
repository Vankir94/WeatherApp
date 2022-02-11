import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModService {

  private control$ = new Subject();

  constructor() { }

  public sendValue(isValue: boolean): void {
    this.control$.next(isValue);
  }

  public get passValue$(): Observable<any> {
    return this.control$.asObservable();
  }

}
