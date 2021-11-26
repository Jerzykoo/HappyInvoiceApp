import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import  { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditClientComponent } from './edit-client/edit-client.component';
@NgModule({
  declarations: [
    ClientsComponent,
    NewClientComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    
  ],
   exports:[ ClientsComponent ]
})
export class ClientsModule { }
