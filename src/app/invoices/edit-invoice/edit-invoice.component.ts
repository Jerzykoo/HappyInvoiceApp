import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { InvoicesService } from '../invoices.service';
import { InvoiceModel } from '../models/invoice.model';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  constructor(private readonly invoicesService: InvoicesService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router) { }

  invoice!: InvoiceModel;
  id!: string;

  ngOnInit(): void {
    this.getInvoiceData();


}

getInvoiceData(){
  this.id = this.activatedRoute.snapshot.params.id;
  console.log(this.id);
  this.invoicesService.getInvoice(this.id)
  .pipe(
    first()
  )
  .subscribe(
    (invoice: InvoiceModel) => {
      this.invoice = invoice;
    }
  );
  console.log(this.invoice);
}

onInvoiceUpdate(invoice: InvoiceModel){
  this.invoicesService.updateClient(invoice,this.id);
  this.router.navigate(['invoices']);
}


}

