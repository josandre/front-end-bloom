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

    private getDiary(): void {
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

    public addEntry(): void {
        this.deselectEntry();

        this.setEditorData("<p></p>");
        this.showEditor();

        const entry: Entry = new Entry({
            content: this.getEditorData(),
        });

        this.diaryService.createEntry(this.diaryId, entry)
            .subscribe({
                next: (data => {
                    this.currentEntry = data;
                    this.entryWasCreated = true;

                    this.addEntryToList();

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

    public saveEntry(): void {
        if (this.currentEntry) {
            const entryToUpdate = this.currentEntry;
            this.currentEntry.content = this.getEditorData();

            const entryUpdate: Entry = new Entry({
                id: entryToUpdate.id,
                content: this.getEditorData(),
            });

            this.diaryService.updateEntry(entryUpdate)
                .subscribe({
                    next: (response => {
                        console.log(response);
                        this.refreshEntries();
                        this.openSnackBar('DIARY_ENTRY.SAVE.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                    }),
                    error: (error => {
                        console.log(error);
                        this.refreshEntries();
                        this.openSnackBar('DIARY_ENTRY.SAVE.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                    })
                });
        }
    }

    public deleteEntry(): void {
        if (this.currentEntry) {
            const entryId = this.currentEntry.id;
            this.removeEntryFromList(entryId);

            this.closeEditor();

            this.diaryService.deleteEntry(entryId)
                .subscribe({
                    next: (response => {
                        console.log(response);
                        this.openSnackBar('DIARY_ENTRY.DELETE.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                    }),
                    error: (error => {
                        console.log(error);
                        this.refreshEntries();
                        this.openSnackBar('DIARY_ENTRY.DELETE.ERROR', 'DIARY_ENTRY.ACTIONS.TRY_AGAIN');
                    })
                });
        }
    }

    public setEditorContent(entry: Entry) {
        this.cleanEditor();
        this.showEditor();
        this.setEditorData(entry.content);

        this.currentEntry = entry;
        this.entryWasCreated = true;
    }

    public generateJournalPrompt() {
        this.generatingPrompt = true;

        this.diaryService.generateJournalPrompt(this.translate.currentLang)
            .subscribe({
                next: (data => {
                    this.editorContent = `<strong>${data}</strong><br> ${this.getEditorData()}`;
                    this.stopGeneratingPrompt();
                }),
                error: (error => {
                    console.log(error);
                    this.stopGeneratingPrompt();
                })
            })
    }

    public generateEntryPreview(content: string, maxLengthPerLine: number): string {
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

    private refreshEntries() {
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

    private cleanEditor() {
        this.setEditorData("<p></p>");
    }

    private showEditor() {
        this.editorHidden = false;
    }

    private hideEditor() {
        this.editorHidden = true;
    }

    private addEntryToList() {
        if (this.currentEntry) {
            this.entries?.unshift(this.currentEntry);
        }
    }

    private removeEntryFromList(entryToRemoveId: number) {
        this.entries = this.entries?.filter((entry) => entry.id !== entryToRemoveId);
    }

    private setEditorData(data: string) {
        this.Editor.editorInstance.setData(data);
    }

    private getEditorData(): string {
        return this.Editor.editorInstance.getData();
    }

    private stopGeneratingPrompt() {
      this.generatingPrompt = false;
    }

    private deselectEntry() {
        this.currentEntry = undefined;
        this.entryWasCreated = false;
    }

    public closeEditor() {
        this.hideEditor();
        this.cleanEditor();

        this.deselectEntry();

        this.stopGeneratingPrompt();
    }

    public getFormattedWeekDay(date?: Date): string {
        moment.locale(this.translate.currentLang);
        if (date) {
            return moment(date).format("ddd");
        }
        return '';
    }

    private openSnackBar(message: string, action: string) {
        this.translate.get([message, action]).subscribe((translations: any) => {
            this.snackBar.open(translations[message], translations[action], {
                verticalPosition: 'top',
                horizontalPosition: 'end',
                duration: 4000
            })
        });
    }
}
