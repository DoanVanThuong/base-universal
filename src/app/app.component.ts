import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const KEY = makeStateKey('KEY');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  data: any = null;
  url = 'https://jsonplaceholder.typicode.com/todos/1';

  constructor(private _http: HttpClient, private _state: TransferState) {

  }
  ngOnInit() {
    this.data = this._state.get(KEY, null);
    if (!this.data) {
      this._http.get(this.url).toPromise().then(data => {
        this.data = data;
        this._state.set(KEY, this.data);
      });
    } else {
      return;
    }
    // firebase.initializeApp({
    //   apiKey: "AIzaSyBrkKleAX_8jHpPmTchVBmDD7Hkj8TT1VE",
    //   authDomain: "ng-recipe-book-3adbb.firebaseapp.com"
    // });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
