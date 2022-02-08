import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RedditHot} from "./reddit-hot";

@Injectable({
  providedIn: 'any'
})
export class RedditService {

  constructor(private http: HttpClient) {
  }

  firstCall() {
    return this.http.get<RedditHot>('https://www.reddit.com/r/cumsluts/hot.json?after=&before=&count=0&limit=25&t=month&raw_json=1')
  }
}
