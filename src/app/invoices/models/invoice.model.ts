export class InvoiceModel{
  id?:string;
  client!: string;
  dateAdded!: string;
  invoiceId!: string;
  items!: Items[];
}

export class Items{
      name!: string;
      count!: string;
      netValue!: string;
      vat!: string;
      grossValue!: string;
}
