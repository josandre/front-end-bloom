import {Component, OnInit, ViewChild} from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {DiaryService} from "./service/diary.service";
import {Diary} from "./model/diary";
import {Entry} from "./model/entry";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    entryCanBeSaved: boolean;

    loading: boolean;

    constructor(
        public diaryService: DiaryService,
        public snackBar: MatSnackBar) {
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

    addEntry(): void {
        this.entryCanBeSaved = false;
        this.editorHidden = false;
        this.editorContent = "";
        this.currentEntryId = undefined;

        const entry: Entry = new Entry({
            content: ""
        });

        this.diaryService.createEntry(this.diaryId, entry)
            .subscribe(
                (data) => {
                    console.log(data);
                    this.openSnackBar("Entry can now be saved", "Close");
                    this.currentEntryId = data;
                    this.refreshEntries();
                    this.entryCanBeSaved = true;
                },
                error => {
                    switch (error.status) {
                        case -1: {
                            this.openSnackBar("Something went wrong while trying to register anxiety type", "Try again");
                            break;
                        }
                    }
                });
    }

    saveEntry(): void {
        const entry: Entry = new Entry({
            content: this.Editor.editorInstance.getData(),
        });

        console.log(this.Editor.editorInstance.getData())

        this.diaryService.updateEntry(this.currentEntryId!, entry)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.openSnackBar("Entry has been saved", "Close");
                    this.refreshEntries();
                },
                error => {
                    console.log(error);

                    this.openSnackBar("Something went wrong while trying to save entry", "Try again");
                });
    }

    setEditorContent(entry: Entry) {
        this.editorHidden = false;
        this.currentEntryId = entry.id;
        this.editorContent = entry.content;
        this.entryCanBeSaved = true;
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
        this.entryCanBeSaved = false;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {verticalPosition: 'top', horizontalPosition: 'end', duration: 3000});
    }
}
