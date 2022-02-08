import {Component, OnInit} from '@angular/core';
import {RedditService} from "./reddit.service";
import {RedditHot, RedditVideoPreview} from "./reddit-hot";

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss']
})
export class RedditComponent implements OnInit {
  first: any;

  videos: RedditVideoPreview[] = [];

  opened = false;

  i = 0;

  constructor(private s: RedditService) {
  }

  ngOnInit(): void {
    this.s.firstCall().subscribe((res: RedditHot) => {
      this.first = res.data.children[1].data?.preview?.images[0].variants.mp4?.source.url;
      // @ts-ignore
      const images: RedditVideoPreview[] = res.data.children.filter(d => d.data?.preview?.images !== undefined).map(e => e.data.preview?.reddit_video_preview);
      // @ts-ignore
      console.log(images)
      const a: RedditVideoPreview[] = images.filter(s => s?.fallback_url !== undefined)
      console.log(a)
      this.videos = images;
    })
  }

}
