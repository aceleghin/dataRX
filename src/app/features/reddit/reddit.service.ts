import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RedditHot} from "./reddit-hot";

@Injectable({
  providedIn: 'any'
})
export class RedditService {

  api = 'https://www.reddit.com/r/porninfifteenseconds.json';

  // https://www.reddit.com/r/cumsluts/hot.json?after=&before=&count=0&limit=25&t=month&raw_json=1
  constructor(private http: HttpClient) {
  }

  firstCall(subreddit: string, after: string) {
    let params = new HttpParams();
    if (after) {
      params = params.set('after', after);
    }
    return this.http.get<RedditHot>(this.getApi(subreddit), {params});
  }

  getApi(subreddit: string) {
    return `https://www.reddit.com/r/${subreddit}.json`;
  }
}
