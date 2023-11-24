import {Component, OnInit, ViewChild} from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {DiaryService} from "./service/diary.service";
import {Diary} from "./model/diary";
import {Entry} from "./model/entry";
import {MatSnackBar} from "@angular/material/snack-bar";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-diary',
    templateUrl: './diary.component.html',
    styleUrls: ['./diary.component.scss'],
})

export class DiaryComponent implements OnInit {
    @ViewChild('editor')
    public Editor: any;
    editorContent: string;
    editorHidden: boolean;

    diary: Diary;
    diaryId: number;

    entries?: Entry[];
    currentEntryId?: number;
    entryWasCreated: boolean;

    loading: boolean;

    constructor(
        public diaryService: DiaryService,
        public snackBar: MatSnackBar,
        private translate: TranslateService) {
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
                    this.openSnackBar('DIARY_ENTRY.GET.ERROR', 'DIARY_ENTRY.ACTIONS.CLOSE');

                    console.log(error.status);
                });
    }

    addEntry(): void {
        this.entryWasCreated = false;
        this.editorHidden = false;
        this.editorContent = "";
        this.currentEntryId = undefined;

        const entry: Entry = new Entry({
            content: "<p></p>"
        });

        this.diaryService.createEntry(this.diaryId, entry)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.openSnackBar('DIARY_ENTRY.ADD.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                    this.currentEntryId = data;
                    this.entryWasCreated = true;
                    this.refreshEntries();
                },
                error => {
                    switch (error.status) {
                        case -1: {
                            this.openSnackBar('DIARY_ENTRY.ADD.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                            break;
                        }
                    }
                });
    }

    saveEntry(): void {
        const entry: Entry = new Entry({
            content: this.Editor.editorInstance.getData(),
        });

        this.diaryService.updateEntry(this.currentEntryId!, entry)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.openSnackBar('DIARY_ENTRY.SAVE.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                    this.refreshEntries();
                },
                error => {
                    console.log(error);

                    this.openSnackBar('DIARY_ENTRY.SAVE.SUCCESS', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                });
    }

    deleteEntry(): void {
        this.editorHidden = true;
        this.editorContent = "";
        this.entries = this.entries?.filter((entry) => entry.id !== this.currentEntryId);

        this.diaryService.deleteEntry(this.currentEntryId!)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.currentEntryId = undefined;
                    this.openSnackBar( 'DIARY_ENTRY.DELETE.SUCCESS',  'DIARY_ENTRY.ACTIONS.CLOSE');
                    this.refreshEntries();
                },
                error => {
                    console.log(error);
                    this.openSnackBar('DIARY_ENTRY.DELETE.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                });
    }

    setEditorContent(entry: Entry) {
        this.editorHidden = false;
        this.currentEntryId = entry.id;
        console.log(entry.id);
        this.editorContent = entry.content;
        console.log(this.editorContent);
        this.entryWasCreated = true;
    }

    generatePreview(content: string, maxLengthPerLine: number): string {
        const lines = content.match(/<h1>.*?<\/h1>|<h2>.*?<\/h2>|<h3>.*?<\/h3>|(<p>(?!&nbsp;<\/p>).*?<\/p>)|/g) || [];

        const truncatedLines = lines
            .slice(0, 3)
            .map((line) => (line.length > maxLengthPerLine ? line.substring(0, maxLengthPerLine) + '...' : line));

        return truncatedLines.join('\n');
    }

    refreshEntries() {
        this.diaryService.getEntriesByDiary(this.diaryId)
            .subscribe(
                (data) => {
                    this.entries = data;
                },
                error => {
                    console.log(error.status);
                });
    }

    closeEditor() {
        this.editorHidden = true;
        this.currentEntryId = undefined;
        this.entryWasCreated = false;
    }

    openSnackBar(message: string, action: string) {
        this.translate.get([message,action]).subscribe((translations: any) => {
          this.snackBar.open(translations[message], translations[action], { verticalPosition: 'top', horizontalPosition: 'end',duration: 4000 })
        });
      }
}
