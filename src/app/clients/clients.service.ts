import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ClientModel } from './models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  collectionName = 'clients';
  constructor(private readonly db: AngularFirestore) { }

  getClients(): Observable<ClientModel[]> {
    return this.db.collection(this.collectionName)
      .snapshotChanges()
      .pipe(
        map((data: DocumentChangeAction<any>[]) => {
          const ret: ClientModel[] = [];
          for (const clientDoc of data) {
            const client: ClientModel = {
              ...clientDoc.payload.doc.data(),
              id: clientDoc.payload.doc.id
            };


            ret.push(client);
          }
          return ret;
        }
        )
      );
  }

  getClient(clientId: string): Observable<ClientModel> {
    const ret: AngularFirestoreDocument<ClientModel> = this.db.doc<ClientModel>(this.collectionName + '/' + clientId);
    return ret.valueChanges()
    .pipe(
      map(
        (data: any) =>  ({...data, id: clientId}) )
        // (data: ClientModel) =>{ return {...data, id: clientId}} )
    );
  }

  addClient(client: ClientModel): void{
    console.log(client);

    this.db.collection(this.collectionName).add(client);
  }

  removeClient(id: string): void{
  this.db.doc(this.collectionName + '/' + id).delete();
  }

  updateClient(client: ClientModel, id: string){
    this.db.doc(this.collectionName + '/' + id).update(client);
  }


}
