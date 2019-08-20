import { NgModule } from '@angular/core';
import {
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSelectModule,
  NbDatepickerModule,
  NbTabsetModule,
  NbSidebarModule,
  NbCardModule,
  NbStepperModule,
  NbRadioModule,
  NbListModule,
  NbSpinnerModule,
  NbLayoutModule,
  NbTooltipModule,
  NbMenuModule,
  NbIconModule
} from '@nebular/theme';

@NgModule({
  exports: [
    NbInputModule,
    NbListModule,
    NbStepperModule,
    NbRadioModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbLayoutModule,
    NbMenuModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbSidebarModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule
  ]
})
export class NbModule {}
