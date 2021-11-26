import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClientsService } from 'src/app/clients/clients.service';
import { ClientModel } from 'src/app/clients/models/client.model';
import { InvoicesService } from '../invoices.service';
import { InvoiceModel } from '../models/invoice.model';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {
  private _invoice!: InvoiceModel;
  editMode = false;
  @Input() set invoice(val: InvoiceModel){
    this._invoice = val;
    if(this._invoice != null){
      const {id,...data} = this._invoice;
      for(let i=0; i<data.items.length-1; i++){
        const newItem = this.createNewItemFG();
        (this.newInvoiceFG.controls['items'] as FormArray).push(newItem);
      }

      this.newInvoiceFG.setValue(data);
      this.editMode = true;
    }
  }

  get invoice(){
    return this._invoice;
  }

  @Output() invoiceUpdate = new EventEmitter<InvoiceModel>();



  constructor(private readonly fb: FormBuilder,private readonly invoicesService: InvoicesService,private readonly clientsService: ClientsService) { }

  newInvoiceFG!: FormGroup;
  clientsNames!: string[];
  vatOptions = [0, 0.05, 0.08, 0.23];
  invoiceToSave!: InvoiceModel;

  ngOnInit(): void {
    this.createNewFormGroup();
    this.getClientsNames();
  }
  getClientsNames(){
    this.clientsService.getClients()
    .subscribe( (clients: ClientModel[]) => {
      // this.clientsList = clients;
      this.clientsNames = clients.map(invoice => invoice.name);
      console.log(this.clientsNames);

    });
  }



  createNewFormGroup(): void{
    const itemFG = this.createNewItemFG();
    this.newInvoiceFG = this.fb.group({
      client: [],
      dateAdded: [],
      invoiceId: [],
      items: this.fb.array([
        itemFG
      ])
    });
  }

  createNewItemFG(): FormGroup{
    const invoiceItemFG = this.fb.group({
      name: [],
      count: [],
      netValue: [],
      vat: [],
      grossValue: []
    });

    invoiceItemFG.controls['netValue'].valueChanges.subscribe(val => {
      const vatValue = invoiceItemFG.controls['vat'].value;
      const grossValue = +val * vatValue + +val;
      invoiceItemFG.controls['grossValue'].setValue(grossValue);
    });
    invoiceItemFG.controls['vat'].valueChanges.subscribe(vat => {
      const nettoValue = invoiceItemFG.controls['netValue'].value;
      const grossValue = +nettoValue * vat + +nettoValue;
      invoiceItemFG.controls['grossValue'].setValue(grossValue);
    });

    return invoiceItemFG;
  }

  onItemAdd(): void{
    const newItem = this.createNewItemFG();
    (this.newInvoiceFG.controls['items'] as FormArray).push(newItem);
  }

  addInvoice(): void{
    console.log(this.newInvoiceFG.value);
    this.invoicesService.addInvoice(this.newInvoiceFG.value);
  }

  onInvoiceSave(): void{
    this.invoiceToSave = this.newInvoiceFG.value;
    this.newInvoiceFG.reset();

    if(!this.editMode){
      this.invoicesService.addInvoice(this.invoiceToSave);
    }else{
      console.log(';a');

      this.invoiceUpdate.emit(this.invoiceToSave)
    }

  }

}


