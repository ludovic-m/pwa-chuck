import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ConfigService } from './config.service';
import { ChuckSvcService } from './chuck-svc/chuck-svc.service';
import { Observable } from 'rxjs/Observable';
import { PushService } from './push-svc/push-svc.service';
import { HttpClient } from '@angular/common/http';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ChuckSvcService, PushService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA Chuck !';
  facts: Observable<any>;
  isNotificationEnabled: boolean;

  private VAPID_PUB_KEY: string;

  constructor(private _swPush: SwPush, private configService: ConfigService,
    private _chuckSvc: ChuckSvcService, private pushService: PushService, private http: HttpClient) {

  }

  ngOnInit() {
    this.VAPID_PUB_KEY = this.configService.get('VAPID_PUB_KEY');
    this.GetFacts();
    this.isNotificationEnabled = this._swPush.subscription != null;

    if (this._swPush) {
      this._swPush.messages
        .subscribe(message => {
          this.GetFacts();
          console.log('[App] Push message received', message);
        });
    }
  }

  notificationChange(event: MatSlideToggleChange) {

    console.log('Nofications enabled: ' + event.checked);
    if (event.checked) {
      this.subscribeToPush();
    } else {
      this.unsubscribeFromPush();
    }
  }

  GetFacts() {
    this._chuckSvc.getFacts().subscribe((result) => {
      this.facts = result;
    });
  }

  subscribeToPush() {
    console.log('request subscription');
    console.log(this.VAPID_PUB_KEY);

    this._swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUB_KEY
    }).then(pushSubcription => {
      console.log(pushSubcription);

      this._swPush.messages
        .subscribe(message => {
          this.GetFacts();
          console.log('[App] Push message received', message);
        });

      this.pushService.addSubscriber(pushSubcription).subscribe(
        res => {
          console.log('Subscriber request answer', res);

          // let snackBarRef = this.snackBar.open('Subscription completed', null, {
          //   duration: this.snackBarDuration
          // });
        },
        err => {
          console.log('Subscription failed', err);
        }
      );

    }).catch(error => console.log(error));
  }

  unsubscribeFromPush() {
    console.log('unsubscribe' + this._swPush.subscription);
    // Get active subscription
    this._swPush.unsubscribe();
  }
}
