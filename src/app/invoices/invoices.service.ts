import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument } from '@angular/fire/firestore';
import { InvoiceModel } from './models/invoice.model';
import { ClientModel } from '../clients/models/client.model';


@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  collectionName = 'invoices';
  constructor(private readonly db: AngularFirestore) { }

  getInvoices(): Observable<InvoiceModel[]> {
    return this.db.collection(this.collectionName)
      .snapshotChanges()
      .pipe(
        map((data: DocumentChangeAction<any>[]) => {
          const ret: InvoiceModel[] = [];
          for (const invoiceDoc of data) {
            const invoice: InvoiceModel = {
              ...invoiceDoc.payload.doc.data(),
              id: invoiceDoc.payload.doc.id
            };

            ret.push(invoice);
          }
          return ret;
        }
        )
      );
  }

  getInvoice(id: string): Observable<InvoiceModel>{
    const ret: AngularFirestoreDocument<InvoiceModel> = this.db.doc<InvoiceModel>(this.collectionName + '/' + id);
    return ret.valueChanges()
    .pipe(
      map((data: any) => ({...data, id: id}))
    )
  }

  addInvoice(invoice: any): void{
    // console.log(invoice);

    this.db.collection(this.collectionName).add(invoice);
  }

  removeInvoice(id: string): void{
  this.db.doc(this.collectionName + '/' + id).delete();
  }

  updateClient(invoice: InvoiceModel, id: string){
    this.db.doc(this.collectionName + '/' + id).update(invoice);
  }




}
