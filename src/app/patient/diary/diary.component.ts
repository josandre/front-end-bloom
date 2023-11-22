import {Component, OnInit, ViewChild} from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {DiaryService} from "./service/diary.service";
import {Diary} from "./model/diary";
import {Entry} from "./model/entry";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  @ViewChild('editor')
  public Editor: any;
  editorContent: string;
  editorHidden: boolean;

  diary: Diary;
  diaryId: number;
  entries?: Entry[];
  entryId: number;

  loading: boolean;

  constructor(
    public diaryService: DiaryService) {
    this.Editor = ClassicEditor;
    this.editorHidden = true;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getDiary();
  }

  getDiary(): void {
    this.diaryService.getDiaryByUser()
      .subscribe(
        (data) => {
          this.diary = data;
          this.diaryId = this.diary.id;
          this.entries = this.diary.entries;

          this.loading = false;
        },
        error => {
          console.log(error.status);
        });
  }

  addEntry() {
    this.diaryService.createEntry(this.diaryId)
      .subscribe(
        (response) => {
          console.log(response);
        },
        error => {
          switch (error.status) {
            case -1: {
              //this.openSnackBar("Something went wrong while trying to register anxiety type", "Try again");
              break;
            }
          }
        });
  }

  setEditorContent(entry: Entry) {
    this.editorHidden = false;
    this.editorContent = `<p>${entry.content}</p>`;
    console.log(this.Editor.editorInstance.getData());
  }

  closeEditor() {
    this.editorHidden = true;
  }
}
