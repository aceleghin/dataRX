import {Component, OnInit} from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

export class tokenresp {
  access_token = '';
  token_type = "bearer";
  expires_in: any;
  scope: string = '';
  refresh_token = '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dataRX';

  state: string = '';
  code: string = '';
  tokenResp = new tokenresp();

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.code = this.route.snapshot.queryParams['code'];
          this.state = this.route.snapshot.queryParams['state'];

          console.log(this.code, this.state)

          if (this.state) {
            this.auth.getToken(this.code).subscribe((res: tokenresp) => {
              this.tokenResp = res;

              this.auth.getSubreddits(res.access_token).subscribe(res => {
                console.log(res)
              })
            })
          }
        }
      }
    );

    // state=test&code=HJDDO_oqhI-JwIS6ZjMtvZ9N40IxYw#_


  }

  login() {

    let params = new HttpParams()
      .set('client_id', 'Oe50FeFo9UYAazJ_kgwcRA')
      .set('response_type', 'code')
      .set('state', 'test')
      .set('redirect_uri', 'https://datarx-15696.web.app/')
      .set('duration', 'permanent')
      .set('scope', 'mysubreddits')

    window.open('https://www.reddit.com/api/v1/authorize?' + params.toString());

    /* */
  }
}
