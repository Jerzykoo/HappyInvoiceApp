import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoicesService } from '../invoices.service';
import { InvoiceModel } from '../models/invoice.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private readonly invoicesService: InvoicesService,
    private router: Router ) { }
  invoices!: Observable<InvoiceModel[]>;

  ngOnInit(): void {
    this.invoices = this.invoicesService.getInvoices();
  }
  onRemoveClick(invoiceId: string):void{
    console.log(invoiceId);
    this.invoicesService.removeInvoice(invoiceId);
  }

  onEditClick(invoiceId: string): void{
    this.router.navigate(['/edit-invoice',invoiceId])
  }
}
