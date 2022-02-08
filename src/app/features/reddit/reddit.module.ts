import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RedditRoutingModule} from './reddit-routing.module';
import {RedditComponent} from './reddit.component';


@NgModule({
  declarations: [
    RedditComponent
  ],
  imports: [
    CommonModule,
    RedditRoutingModule
  ]
})
export class RedditModule {
}
