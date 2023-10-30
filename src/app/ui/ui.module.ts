import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiRoutingModule } from './ui-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
import { LabelsComponent } from './labels/labels.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { ModalComponent } from './modal/modal.component';
import { PreloadersComponent } from './preloaders/preloaders.component';
import { ProgressbarsComponent } from './progressbars/progressbars.component';
import { TabsComponent } from './tabs/tabs.component';
import { TypographyComponent } from './typography/typography.component';
import { ChipsComponent } from './chips/chips.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { SimpleDialogComponent } from './modal/simpleDialog.component';
import { DialogformComponent } from './modal/dialogform/dialogform.component';
import { BottomSheetOverviewExampleSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
@NgModule({
  declarations: [
    AlertsComponent,
    BadgeComponent,
    ButtonsComponent,
    CardsComponent,
    DialogsComponent,
    HelperClassesComponent,
    LabelsComponent,
    ListGroupComponent,
    ModalComponent,
    PreloadersComponent,
    ProgressbarsComponent,
    TabsComponent,
    TypographyComponent,
    ChipsComponent,
    BottomSheetComponent,
    SnackbarComponent,
    ExpansionPanelComponent,
    SimpleDialogComponent,
    DialogformComponent,
    BottomSheetOverviewExampleSheetComponent,
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class UiModule {}
