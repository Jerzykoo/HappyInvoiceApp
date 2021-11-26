import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients/clients.component';
import { NewInvoiceComponent } from './invoices/new-invoice/new-invoice.component';
import { InvoicesComponent } from './invoices/invoices/invoices.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { MainComponent } from './main/main.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'new-client',
    component: NewClientComponent
  },
  {
    path: 'edit-client/:id',
    component: EditClientComponent
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'new-invoice',
    component: NewInvoiceComponent
  },
  {
    path: 'edit-invoice/:id',
    component: EditInvoiceComponent
  },
  {
    path: '',
    component: MainComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
