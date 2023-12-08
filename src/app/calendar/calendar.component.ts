import {Component, OnInit, ViewChild} from '@angular/core'
import {CalendarOptions, EventClickArg, EventInput,} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {CalendarEvent} from './model/calendar.model';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {CalendarService} from './service/calendar.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {UnsubscribeOnDestroyAdapter} from '@shared';
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
    extends UnsubscribeOnDestroyAdapter
    implements OnInit {
    @ViewChild('calendar', {static: false})
    calendar: CalendarEvent | null;
    public addCusForm: FormGroup;
    dialogTitle: string;
    calendarData!: CalendarEvent;
    filterItems: string[] = [
        'WORK',
        'PERSONAL',
        'IMPORTANT',
    ];

    calendarEvents?: EventInput[];

    public filters: Array<{ name: string; value: string; checked: boolean }> = [
        {name: 'WORK', value: 'Work', checked: true},
        {name: 'PERSONAL', value: 'Personal', checked: true},
        {name: 'IMPORTANT', value: 'Important', checked: true},
    ];

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        public calendarService: CalendarService,
        private translate: TranslateService,
        private snackBar: MatSnackBar
    ) {
        super();
        this.calendarEvents = [];
        this.dialogTitle = 'Add New Event';
        const blankObject = {} as CalendarEvent;
        this.calendar = new CalendarEvent(blankObject);
        this.calendarData = new CalendarEvent(blankObject);
        this.addCusForm = this.createCalendarForm(this.calendar);
    }

    public ngOnInit(): void {
        this.getEvents();
    }

    private getEvents(): void {
        this.calendarService.getEvents().subscribe({
            next: (events => {
                events.forEach((event) => {
                    const startDate = new Date(event.startDate + "Z")
                    const endDate = new Date(event.endDate + "Z")

                    this.calendarEvents?.push({
                        id: `${event.id}`,
                        title: event.title,
                        start: startDate,
                        end: endDate,
                        className: this.getClassNameValue(event.category),
                        groupId: event.category,
                        details: event.details,
                        time: event.time,
                        notificationTime: event.notificationTime
                    })
                });

                this.calendarOptions.events = this.calendarEvents;
            }),
            error: (error => {
                console.log(error);
                // snackbar
            })
        })
    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        timeZone: 'local',
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
    };

    handleDateSelect() {
        this.addNewEvent();
    }

    addNewEvent() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                calendar: this.calendar,
                action: 'add',
            },
        });

        this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
            if (result === 'submit') {
                this.calendarData = this.calendarService.getDialogData();

                this.createEvent();

                this.calendarEvents = this.calendarEvents?.concat({

                    id: this.calendarData.id,
                    title: this.calendarData.title,
                    start: this.calendarData.startDate,
                    end: this.calendarData.endDate,
                    className: this.getClassNameValue(this.calendarData.category),
                    groupId: this.calendarData.category,
                    details: this.calendarData.details,
                    time: this.calendarData.time,
                    notificationTime: this.calendarData.notificationTime
                });

                this.calendarOptions.events = this.calendarEvents;
                this.addCusForm.reset();
                this.showNotification(
                    'snackbar-success',
                    'Add Record Successfully...!!!',
                    'bottom',
                    'center'
                );
            }
        });
    }

    private createEvent() {

        this.calendarService.createEvent(this.calendarData)
            .subscribe({
                next: (response => {
                    switch (response) {
                        case "200": {
                            //snackbar
                            break;
                        }
                    }
                }),
                error: (error => {
                    console.log(error);
                    //snackbar
                })
            });
    }

    changeCategory(event: MatCheckboxChange, filter: { name: string }) {
        if (event.checked) {
            this.filterItems.push(filter.name);
        } else {
            this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
        }
        this.filterEvent(this.filterItems);
    }

    filterEvent(element: string[]) {
        this.calendarOptions.events = this.calendarEvents?.filter((x) =>
            element.map((y?: string) => y).includes(x.groupId)
        );
    }

    handleEventClick(clickInfo: EventClickArg) {
        this.eventClick(clickInfo);
    }

    eventClick(row: EventClickArg) {

        const calendarData = {
            id: row.event.id,
            title: row.event.title,
            category: row.event.groupId,
            startDate: row.event.start,
            endDate: row.event.end,
            details: row.event.extendedProps['details'],
            time: row.event.extendedProps['time'],
            notificationTime: row.event.extendedProps['notificationTime']


        };


        const dialogRef = this.dialog.open(FormDialogComponent, {
            data: {
                calendar: calendarData,
                action: 'edit',
            },
        });

        this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
            if (result === 'submit') {
                this.calendarData = this.calendarService.getDialogData();
                this.calendarEvents?.forEach((element, index) => {
                    if (this.calendarData.id === element.id) {
                        this.editEvent(index, this.calendarData);
                    }
                }, this);
                this.showNotification(
                    'black',
                    'Edit Record Successfully...!!!',
                    'bottom',
                    'center'
                );
                this.addCusForm.reset();
            } else if (result === 'delete') {
                this.calendarData = this.calendarService.getDialogData();

                this.deleteEvent(Number(calendarData.id));

                this.calendarEvents?.forEach((element) => {
                    if (this.calendarData.id === element.id) {
                        row.event.remove();
                    }
                }, this);

                this.showNotification(
                    'snackbar-danger',
                    'Delete Record Successfully...!!!',
                    'bottom',
                    'center'
                );
            }
        });
    }

    editEvent(eventIndex: number, calendarData: CalendarEvent) {
        const calendarEvents = this.calendarEvents!.slice();
        const singleEvent = Object.assign({}, calendarEvents[eventIndex]);

        singleEvent.id = calendarData.id;
        singleEvent.title = calendarData.title;
        singleEvent.start = calendarData.startDate;
        singleEvent.end = calendarData.endDate;
        singleEvent.className = this.getClassNameValue(calendarData.category);
        singleEvent.groupId = calendarData.category;
        singleEvent['details'] = calendarData.details;
        calendarEvents[eventIndex] = singleEvent;

        this.updateEvent(calendarData);

        this.calendarEvents = calendarEvents; // reassign the array

        this.calendarOptions.events = calendarEvents;
    }

    private updateEvent(calendarData: CalendarEvent) {
        this.calendarService.updateEvent(Number(calendarData.id), calendarData)
            .subscribe({
                next: (response => {
                    switch (response) {
                        case "200": {
                            //snackbar
                            break;
                        }
                    }
                }),
                error: (error => {
                    console.log(error);
                    //snackbar
                })
            });
    }

    private deleteEvent(eventId: number) {
        this.calendarService.deleteEvent(eventId)
            .subscribe({
                next: (response => {
                    switch (response) {
                        case "200": {
                            //snackbar
                            break;
                        }
                    }
                }),
                error: (error => {
                    console.log(error);
                    //snackbar
                })
            });
    }

    createCalendarForm(calendar: CalendarEvent): FormGroup {
        return this.fb.group({
            id: [calendar.id],
            title: [
                calendar.title,
                [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
            ],
            category: [calendar.category],
            startDate: [calendar.startDate, [Validators.required]],
            endDate: [calendar.endDate, [Validators.required]],
            details: [
                calendar.details,
                [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
            ],
        });
    }

    showNotification(
        colorName: string,
        text: string,
        placementFrom: MatSnackBarVerticalPosition,
        placementAlign: MatSnackBarHorizontalPosition
    ) {
        this.snackBar.open(text, '', {
            duration: 2000,
            verticalPosition: placementFrom,
            horizontalPosition: placementAlign,
            panelClass: colorName,
        });
    }

    getClassNameValue(category: string) {
        let className;

        if (category === 'WORK') className = 'fc-event-primary';
        else if (category === 'PERSONAL') className = 'fc-event-info';
        else if (category === 'IMPORTANT') className = 'fc-event-danger';

        return className;
    }
}
