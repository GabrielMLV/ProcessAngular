import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiProcessService } from '../api-process.service';
import { Process } from '../models/process';
import { DatePipe, registerLocaleData } from '@angular/common'
import {formatDate} from '@angular/common';
import br from '@angular/common/locales/br';
import { ViaCepService } from '../via-cep.service';

registerLocaleData(br, 'pt-BR');
declare var UIkit: any;
@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.scss']
})
export class EditProcessComponent implements OnInit {
  private id;
  public details = {} as any;
  public nameRequesterEdit;
  public zipCodeEdit;
  public streetEdit;
  public numHouseEdit;
  public districtEdit;
  public dateProcessEdit;
  public cityEdit;
  public documentEdit;
  private process = {} as Process;
  public values = '';
  public addressResponse = {} as any;
  constructor(private apiProcessService: ApiProcessService, private _Activatedroute: ActivatedRoute, private router: Router, private apiViaCep: ViaCepService) { }
  sub;
 
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (parseInt(this.id) <= 0) {
        //this.router.navigate(['/process']);
      } else {
        this.getSingleProcess(this.id);
      }
    });
  }

  getSingleProcess(idProcess){
    this.apiProcessService.getByIdProcess(idProcess).subscribe((data) => {
      this.details = data;
      this.details.date_process = formatDate(new Date(this.details.date_process), 'yyyy-MM-dd', 'pt-BR'); //formatando data para exibição 
    });
  }

  editProcess(){
    console.log(this.streetEdit);
    const name =  this.nameRequesterEdit || this.details.name_requester;
    const zipCode =  this.zipCodeEdit || this.details.zip_code;
    const street =  this.streetEdit || this.details.street;
    const numHouse = this.numHouseEdit || this.details.num_house;
    const district =  this.districtEdit || this.details.district ;
    const dateProcess =  this.dateProcessEdit || this.details.date_process;
    const city =  this.cityEdit || this.details.city ;
    const document = this.documentEdit || this.details.filename_process ;
    if(name == null || name.trim().length == 0){
      this.callAlert("Nome do solicitante obrigatório.");
      return;
    }if(name.length > 70){
      this.callAlert("Nome do solicitante não pode ter mias que 70 caracteres.");
      return;
    }else if(dateProcess == null || dateProcess.trim().length == 0){
      this.callAlert("Data do processo obrigatório.");
      return;
    }else if(zipCode == null || zipCode.trim().length == 0 || zipCode < 0){
      this.callAlert("CEP obrigatório.");
      return;
    }else if(street == null || street.trim().length == 0 || street < 0){
      this.callAlert("Rua obrigatório.");
      return;
    }else if(district == null || district.trim().length == 0 || district < 0){
      this.callAlert("Bairro obrigatório.");
      return;
    }else if(city == null || city.trim().length == 0 || city < 0){
      this.callAlert("Cidade obrigatória.");
      return;
    }else if(document == null || document.trim().length == 0 || document < 0){
      this.callAlert("Documento obrigatório.");
      return;
    }else{
      this.process.name_requester = name.trim();
      this.process.date_process = new Date(formatDate(dateProcess, 'yyyy-MM-dd HH:mm:ss', 'pt-BR'));
      this.process.zip_code = zipCode.trim();
      this.process.street = street.trim();
      this.process.city = city.trim();
      this.process.num_house = numHouse.trim();
      this.process.district = district.trim();
      this.process.filename_process = document;
      
      this.callUpdateProcess(this.process);
      
    }
  }

  callUpdateProcess(process: Process) {
    const idProcess = this.id;
    this.apiProcessService.putProcess(idProcess, process).subscribe((data)=>{    
      UIkit.modal.alert("Processo Atualizado com sucesso.").then(function () {       
      });
      this.router.navigate(['/process']);
    })
  }

  onKey(event: any) {
    this.values = event.target.value;
    if(this.values.trim().length == 8){
      this.apiViaCep.getAddress(this.values.trim()).subscribe((data) =>{
          this.addressResponse = data;
          this.streetEdit = this.addressResponse.logradouro;
          this.cityEdit = this.addressResponse.localidade;
          this.districtEdit = this.addressResponse.bairro;
      });
    }  
  }

  callAlert(msg : String){
    UIkit.modal.alert(msg).then(function () {
      console.log('Alert closed.')
    });
  }


}
