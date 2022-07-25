import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // r4MaNe7RA9LjvMGwmkhHmm042WM__w
  login() {

    const params = new HttpParams()
      .set('client_id', 'r4MaNe7RA9LjvMGwmkhHmm042WM__w')
      .set('response_type', 'code')
      .set('state', 'test')
      .set('redirect_uri', 'https://datarx-15696.web.app/')
      .set('duration', 'permanent')
      .set('scope', 'mysubreddits')

    return this.http.get(`
    https://www.reddit.com/api/v1/authorize`, {params})
  }
}
