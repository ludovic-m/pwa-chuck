import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

import { ConfigService } from './../config.service';
import { PushService } from './../push.service';
import { SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-control-push',
  providers: [],
  templateUrl: './control-push.component.html',
  styleUrls: ['./control-push.component.css']
})
export class ControlPushComponent implements OnInit {
  private snackBarDuration = 2000;

  private VAPID_PUB_KEY: string;

  constructor(private pushService: PushService, private configService: ConfigService, private swPush: SwPush,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.VAPID_PUB_KEY = this.configService.get('VAPID_PUB_KEY');
  }

  subscribeToPush() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUB_KEY
    }).then(pushSubcription => {
      console.log(pushSubcription);
      this.pushService.addSubscriber(pushSubcription).subscribe(
        res => {
          console.log('Subscriber request answer', res);

          let snackBarRef = this.snackBar.open('Subscription completed', null, {
            duration: this.snackBarDuration
          });
        },
        err => {
          console.log('Subscription failed', err);
        }
      );
    });
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription[0]
      .subscribe(pushSubscription => {

        console.log('[App] pushSubscription', pushSubscription);

        // Delete the subscription from the backend
        this.pushService.deleteSubscriber(pushSubscription)
          .subscribe(

          res => {
            console.log('[App] Delete subscriber request answer', res);

            let snackBarRef = this.snackBar.open('Now you are unsubscribed', null, {
              duration: this.snackBarDuration
            });

            // Unsubscribe current client (browser)
            pushSubscription.unsubscribe()
              .then(success => {
                console.log('[App] Unsubscription successful', success);
              })
              .catch(err => {
                console.log('[App] Unsubscription failed', err);
              });

          },
          err => {
            console.log('[App] Delete subscription request failed', err);
          }

          );

      });
  }

  showMessages() {
    this.swPush.messages
    .subscribe(message => {

      console.log('[App] Push message received', message);

      let notification = message['notification'];

    });
  }
}
