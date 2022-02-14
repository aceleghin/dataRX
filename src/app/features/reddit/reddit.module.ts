import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RedditRoutingModule} from './reddit-routing.module';
import {RedditComponent} from './reddit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TitlePipe} from './title.pipe';


@NgModule({
  declarations: [
    RedditComponent,
    TitlePipe
  ],
  imports: [
    CommonModule,
    RedditRoutingModule,
    ReactiveFormsModule
  ]
})
export class RedditModule {
}
