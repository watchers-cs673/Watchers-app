import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class MyComponent { }
