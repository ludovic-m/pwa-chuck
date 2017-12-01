import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChuckSvcService implements OnInit {

  ngOnInit(): void {

  }

  constructor(private http: HttpClient) {
    this.http = http;
   }

  getFacts() {
    return this.http.get<Observable<any>>(environment.factsApi);
  }
}
