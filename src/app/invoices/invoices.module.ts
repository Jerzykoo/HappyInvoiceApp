import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import  { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InvoicesComponent } from './invoices/invoices.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    InvoicesComponent,
    NewInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule
  ]
})
export class InvoicesModule { }
