import {Component, OnInit, ViewChild} from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {DiaryService} from "./service/diary.service";
import {Diary} from "./model/diary";
import {Entry} from "./model/entry";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from '@ngx-translate/core';
import * as moment from "moment/moment";

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
    currentEntry?: Entry;
    entryWasCreated: boolean;

    generatingPrompt: boolean;
    loading: boolean;

    constructor(
        public diaryService: DiaryService,
        public snackBar: MatSnackBar,
        public translate: TranslateService) {
        this.Editor = ClassicEditor;
        this.editorHidden = true;
    }

    ngOnInit(): void {
        this.loading = true;
        this.getDiary();
    }

    getDiary(): void {
        this.diaryService.getDiaryByUser()
            .subscribe({
                next: (data => {
                    this.diary = data;
                    this.diaryId = this.diary.id;
                    this.entries = this.diary.entries;

                    this.loading = false;
                }),
                error: (error => {
                    this.openSnackBar('DIARY_ENTRY.GET.ERROR', 'DIARY_ENTRY.ACTIONS.CLOSE');

                    console.log(error.status);
                })
            });
    }

    addEntry(): void {
        this.entryWasCreated = false;
        this.currentEntry = undefined;

        this.editorContent = "<p></p>";
        this.editorHidden = false;

        const entry: Entry = new Entry({
            content: this.editorContent,
        });

        this.diaryService.createEntry(this.diaryId, entry)
            .subscribe({
                next: (data => {
                    this.currentEntry = data;
                    this.entries?.unshift(this.currentEntry);
                    this.entryWasCreated = true;

                    this.openSnackBar('DIARY_ENTRY.ADD.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                }),
                error: (error => {
                    switch (error.status) {
                        case null: {
                            this.openSnackBar('DIARY_ENTRY.ADD.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                            this.closeEditor();
                            break;
                        }
                    }
                })
            });
    }

    saveEntry(): void {
        if (this.currentEntry) {
            this.currentEntry.content = this.Editor.editorInstance.getData();

            const entryUpdate: Entry = new Entry({
                id: this.currentEntry.id,
                content: this.Editor.editorInstance.getData(),
            });

            this.diaryService.updateEntry(entryUpdate)
                .subscribe({
                    next: (response => {
                        console.log(response);
                        this.openSnackBar('DIARY_ENTRY.SAVE.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                        this.refreshEntries();
                    }),
                    error: (error => {
                        console.log(error);
                        this.openSnackBar('DIARY_ENTRY.SAVE.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                    })
                });
        }
    }

    deleteEntry(): void {
        this.editorHidden = true;
        this.entries = this.entries?.filter((entry) => entry.id !== this.currentEntry?.id);

        this.diaryService.deleteEntry(this.currentEntry!.id)
            .subscribe({
                next: (response => {
                    console.log(response);
                    this.closeEditor();
                    this.openSnackBar('DIARY_ENTRY.DELETE.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                }),
                error: (error => {
                    console.log(error);
                    this.refreshEntries();
                    this.openSnackBar('DIARY_ENTRY.DELETE.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                })
            });
    }

    setEditorContent(entry: Entry) {
        this.Editor.editorInstance.setData("<p></p>");
        this.editorHidden = false;
        this.editorContent = entry.content;

        this.currentEntry = entry;
        this.entryWasCreated = true;
    }

    generateJournalPrompt() {
        this.generatingPrompt = true;

        this.diaryService.generateJournalPrompt(this.translate.currentLang)
            .subscribe({
                next: (data => {
                    this.editorContent = `<strong>${data}</strong><br>${this.editorContent}`;
                    this.generatingPrompt = false;
                }),
                error: (error => {
                    console.log(error);
                    this.generatingPrompt = false;
                })
            })
    }

    generatePreview(content: string, maxLengthPerLine: number): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        const elements = Array.from(doc.body.children);

        elements.forEach((element, index) => {
            if (index >= 3) {
                element.remove();
            } else {
                const textContent = element.textContent || '';

                element.innerHTML = textContent.length > maxLengthPerLine ? textContent.substring(0, maxLengthPerLine) + '...' : textContent;
            }
        });

        return doc.body.innerHTML;
    }

    refreshEntries() {
        this.diaryService.getEntriesByDiary(this.diaryId)
            .subscribe({
                next: (data => {
                    this.entries = data;
                }),
                error: (error => {
                    console.log(error.status);
                })
            });
    }

    closeEditor() {
        this.editorHidden = true;
        this.editorContent = "<p></p>";

        this.currentEntry = undefined;
        this.entryWasCreated = false;
    }

    getFormattedWeekDay(date?: Date): string {
        moment.locale(this.translate.currentLang);
        if (date) {
            return moment(date).format("ddd");
        }
        return '';
    }

    openSnackBar(message: string, action: string) {
        this.translate.get([message, action]).subscribe((translations: any) => {
            this.snackBar.open(translations[message], translations[action], {
                verticalPosition: 'top',
                horizontalPosition: 'end',
                duration: 4000
            })
        });
    }
}
