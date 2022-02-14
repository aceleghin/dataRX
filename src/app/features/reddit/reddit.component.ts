import {Component, OnInit} from '@angular/core';
import {RedditService} from "./reddit.service";
import {DataPreview, RedditHot} from "./reddit-hot";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

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

  selectedSubreddits: string[] = [];
  subredditList: string[] = [];
  subredditForm = new FormControl();

  constructor(private s: RedditService) {
  }

  ngOnInit(): void {
    this.subredditForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(res => {
      this.s.getSubreddits(res).subscribe(r => {
        const children = r.data.children;
        const d = children.map((e: { data: { display_name: string } }) => e.data.display_name)
        this.subredditList = d;
      });
    })

    if (localStorage.getItem('subreddits')) {
      this.selectedSubreddits = (localStorage.getItem('subreddits') ?? '').split(',');
    }
  }

  addSubreddits(a: string) {
    this.selectedSubreddits.push(a)
  }

  resetSubs() {
    this.selectedSubreddits = [];
    localStorage.removeItem('subreddits');
  }

  loadSubReddits() {
    this.s.firstCall(this.selectedSubreddits.join('+'), this.after).subscribe((res: RedditHot) => {
      this.after = res.data.after;
      localStorage.setItem('subreddits', this.selectedSubreddits.toString());
      // @ts-ignore
      const medias: { title: string, preview: DataPreview }[] = res.data.children.map(el => {
        return {title: el.data.title, preview: el.data.preview}
      });
      this.medias.push(...medias.map(e => {
        return {
          name: e.title,
          video: e.preview?.reddit_video_preview?.fallback_url,
          img: e.preview?.images[0].source?.url?.replace('amp;', '')
        }
      }));
      this.opened = true;
    })
  }


  openModal() {
    this.medias = [];
    this.after = '';
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
