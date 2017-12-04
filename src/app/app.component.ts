import { Component } from '@angular/core';
import { ChuckSvcService } from './chuck-svc.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  providers: [ChuckSvcService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chuck Norris Facts';
  facts: Observable<any>;
  private _chuckSvc: ChuckSvcService;

  constructor(private chuckSvc: ChuckSvcService) {
    this._chuckSvc = chuckSvc;
  }
  ngOnInit(): void {
    this.GetFacts();
  }
  GetFacts() {
    this._chuckSvc.getFacts().subscribe((result) => {
      this.facts = result;
    });
  }
}
