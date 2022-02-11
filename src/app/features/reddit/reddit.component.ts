import {Component, OnInit} from '@angular/core';
import {RedditService} from "./reddit.service";
import {DataPreview, RedditHot, RedditVideoPreview} from "./reddit-hot";

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss']
})
export class RedditComponent implements OnInit {

  medias: { name: string, video: string | undefined, img: string }[] = [];

  opened = false;
  after = '';

  i = 0;

  subreddit: string = 'porninfifteenseconds';

  constructor(private s: RedditService) {
  }

  ngOnInit(): void {

  }

  loadSubReddits() {
    this.s.firstCall(this.subreddit, this.after).subscribe((res: RedditHot) => {
      this.after = res.data.after;
      // @ts-ignore
      const medias: { title: string, preview: DataPreview }[] = res.data.children.map(el => {
        return {title: el.data.title, preview: el.data.preview}
      });
      this.medias.push(...medias.map(e => {
        return {name: e.title, video: e.preview?.reddit_video_preview?.fallback_url, img: e.preview?.images[0].source?.url?.replace('amp;','')}
      }));
      this.opened = true;
    })
  }


  openModal(subreddit: string) {
    this.medias = [];
    this.after = '';
    this.subreddit = subreddit;
    this.loadSubReddits();
  }

  goBack() {
    console.log(this.medias[this.i - 1])
    if (this.medias[this.i - 1]) {
      this.i = this.i - 1;
    }
  }

  goNext() {
    this.i = this.i + 1;
    if ((this.i + 3) === this.medias.length) {
      this.loadSubReddits();
    }
  }
}
