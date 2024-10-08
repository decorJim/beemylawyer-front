import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beemylawyer-front';

  constructor() {
    
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}
}
