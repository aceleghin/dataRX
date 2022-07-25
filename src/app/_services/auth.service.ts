import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {tokenresp} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  getToken(code: string) {
    // grant_type=authorization_code&code=CODE&redirect_uri=URI

    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', 'https://datarx-15696.web.app/')

    return this.http.post<tokenresp>(`https://www.reddit.com/api/v1/access_token`, {params})
  }


  getSubreddits() {
    const params = new HttpParams()
      .set('after', '')
      .set('before', '')
      .set('count', 0)
      .set('limit', 10)

    return this.http.post<tokenresp>(`https://oauth.reddit.com/subreddits/mine/subscriber`, {params})
  }
}
