import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {tokenresp} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  getToken(code: string) {
    // grant_type=authorization_code&code=CODE&redirect_uri=URI
    // const basic = base64.encode(data.client_id + ':')
    const user = 'Oe50FeFo9UYAazJ_kgwcRA';
    const password = 'r4MaNe7RA9LjvMGwmkhHmm042WM__w'


    const headers = new HttpHeaders()

      .set('Content-Type', `application/x-www-form-urlencoded`)
      .set('Authorization', `Basic ${window.btoa(user + ':' + password)}`)

    return this.http.post<tokenresp>(`https://www.reddit.com/api/v1/access_token`, {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://datarx-15696.web.app/'
    }, {headers})
  }


  getSubreddits(token: string) {
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`)
    const params = new HttpParams()
      .set('after', '')
      .set('before', '')
      .set('count', 0)
      .set('limit', 10)

    return this.http.get<tokenresp>(`https://oauth.reddit.com/subreddits/mine/subscriber`, {headers, params})
  }
}
