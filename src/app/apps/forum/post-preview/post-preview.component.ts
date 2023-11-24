import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { UploadFileService } from 'app/global/upload-file/upload-file.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  @Input() userImage:string;
  @Input() userName:string;
  @Input() date:string;
  @Input() postTitle:string;
  @Input() postContent:string;

  constructor(private readonly uploadFileService:UploadFileService) { }

  ngOnInit(): void {
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
    return;
  }

  getUserImageStyle() {
    return {
      backgroundImage: 'url(' + this.uploadFileService.getUserPhoto(this.userImage) + ')'
    };
  }
}
