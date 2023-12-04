import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Diary} from "../../model/diary";
import {DiaryService} from "../../service/diary.service";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-title-dialog',
    templateUrl: './title-dialog.component.html',
    styleUrls: ['./title-dialog.component.scss']
})
export class TitleDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<TitleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Diary,
        public diaryService: DiaryService,
        public snackBar: MatSnackBar,
        public translate: TranslateService
    ) {
    }

    updateTitle(): void {
        const diary: Diary = new Diary({
            title: this.data.title,
        });

        this.diaryService.updateDiary(this.data.id, diary)
            .subscribe({
                next: (response => {
                    switch (response) {
                        case "200": {
                            this.openSnackBar('DIARY_ENTRY.ADD.SUCCESS', 'DIARY_ENTRY.ACTIONS.CLOSE');
                            break;
                        }
                    }
                }),
              error: (error => {
                console.log(error);
              })
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
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
