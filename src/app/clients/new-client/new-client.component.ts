import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { ClientModel } from '../models/client.model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  private _client!: ClientModel;
  editMode = false;

  @Input() set client(val: ClientModel){
    this._client = val;
    if(this._client != null){
      console.log(this._client);

      const {id,...data} = this._client;
      // console.log(data);

      this.newClientFG.setValue(data);
      console.log('wjebalem sie tu');

      this.editMode = true;
    }
  }
  get client(){
    return this._client;
  }

  @Output() clientUpdate = new EventEmitter<ClientModel>();

  newClientFG!: FormGroup;
  clientToSave!: ClientModel;

  constructor(private readonly formBuilder: FormBuilder, private readonly clientsService: ClientsService) { }

  ngOnInit(): void {
    this.createNewFormGroup();
  }

  createNewFormGroup(): void{
    this.newClientFG = this.formBuilder.group({
      name: ['', Validators.required],
      nip: [''],
      city: ['', Validators.minLength(2)],
      postcode: ['', Validators.minLength(2)],
      address: ['', Validators.required],
    });
  }

  onClientSave(): void{
    this.clientToSave = this.newClientFG.value;
    this.newClientFG.reset();
    if(!this.editMode){
      this.clientsService.addClient(this.clientToSave);
      console.log('tryb dodawania');

    }else{
      this.clientUpdate.emit(this.clientToSave)
      console.log('tryb edycji');
    }

  }

}
