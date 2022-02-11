import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModService } from '../shared/services/darkmod.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit, OnDestroy {

  public darkMode!: boolean;
  public sub1!: Subscription;

  public constructor(
    private darkModService: DarkModService
  ) { }

  public ngOnInit(): void {
    this.sub1 = this.darkModService.passValue$.subscribe(isValue => this.darkMode = isValue);
  }

  public ngOnDestroy(): void {
      this.sub1.unsubscribe();
  }
}
