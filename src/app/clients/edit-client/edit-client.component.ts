import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../clients.service';
import { ClientModel } from '../models/client.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
  private readonly clientsService: ClientsService,
  private readonly router: Router) { }
  client!: ClientModel;
  clientId!: string;

  ngOnInit(): void {
    this.getClientData();
  }

  getClientData(){
      this.clientId = this.activatedRoute.snapshot.params.id;
      this.clientsService.getClient(this.clientId)
        .pipe(
          first()
        )
        .subscribe(
          (client: ClientModel) => {
            this.client = client;
          }
        )
        console.log(this.client);

    }

    onClientUpdate(client: ClientModel): void{
      this.clientsService.updateClient(client,this.clientId);
      this.router.navigate(['clients']);
    }



}
