import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from '../clients.service';
import { ClientModel } from '../models/client.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private readonly clientsService: ClientsService,
  private router: Router) { }

  clientsObs!: Observable<ClientModel[]>;

  ngOnInit(): void {
    this.clientsObs = this.clientsService.getClients();
  }

  onRemoveClick(clientId: string): void{
    this.clientsService.removeClient(clientId);
  }

  onEditClick(clientId: string){
    this.router.navigate(['/edit-client',clientId]);
  }

}
