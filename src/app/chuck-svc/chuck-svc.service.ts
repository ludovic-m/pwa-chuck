import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ChuckSvcService implements OnInit {

  ngOnInit(): void {

  }

  constructor(private http: HttpClient) { }

  getFacts() {
    return this.http.get<Observable<any>>(environment.factsApi);
  }
}
