import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() userImg:string;
  @Input() userName:string;
  @Input() date:string;
  @Input() postTitle:string;
  @Input() postContent:string;

  constructor() { }

  ngOnInit(): void {
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
    return;
  }

}
