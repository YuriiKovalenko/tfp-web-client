import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbModule } from './nb.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NbModule],
  exports: [
    AutocompleteComponent,
    FormsModule,
    ReactiveFormsModule,
    NbModule,
    RouterModule
  ]
})
export class SharedModule {}
