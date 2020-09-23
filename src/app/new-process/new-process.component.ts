import { Component, OnInit } from '@angular/core';
import { ApiProcessService } from '../api-process.service';
import { Process } from '../models/process';
import { ViaCepService } from '../via-cep.service';
import {formatDate, registerLocaleData} from '@angular/common';
import { Router } from '@angular/router';
import br from '@angular/common/locales/br';
import { Send } from '../models/send';
import { Files } from '../models/files';

registerLocaleData(br, 'pt-BR');
declare var UIkit: any;
@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.scss']
})
export class NewProcessComponent implements OnInit {
  public nameRequester;
  public zipCode;
  public street;
  public numHouse;
  public district;
  public dateProcess;
  public city;
  public document;
  //public uf;
  private process = {} as Process;
  private files = {} as Files;
  private send = {} as Send;
  public values = '';
  public addressResponse = {} as any;
  public file : any;
  selectedFiles: FileList;
  currentFile: File;
  constructor(private apiProcessService: ApiProcessService, private apiViaCep: ViaCepService, private router: Router) { }

  ngOnInit(): void {

  }

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  registerProcess(){
    //this.currentFile = this.selectedFiles.item(0);

    const name = this.nameRequester;
    const zipCode = this.zipCode;
    const street = this.street;
    const numHouse = this.numHouse;
    const district = this.district;
    const dateProcess = this.dateProcess;
    const city = this.city;
    //const document = this.document;
    const file = this.file;
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
    }else if(file == null || file.trim().length == 0 || file < 0){
      this.callAlert("Documento obrigatório.");
      return;
    }
    else{
      this.process.name_requester = name.trim();
      this.process.date_process = new Date(dateProcess);
      this.process.zip_code = zipCode.trim();
      this.process.street = street.trim();
      this.process.city = city.trim();
      this.process.num_house = numHouse.trim();
      this.process.district = district.trim();
      this.process.filename_process = file;
      
      //this.files.file = formData;

     /*  this.send.process = this.process;
      this.send.file = this.files; */
      //console.log(this.process)
      //console.log(this.files)
      this.callSendProcess(this.process);
      //this.callSendFileProcess(this.currentFile);
      
    }
  }

  callSendProcess(process: Process) {
    this.apiProcessService.postProcess(process).subscribe((data)=>{    
      UIkit.modal.alert("Processo adicionado com sucesso.").then(function () {       
      });
      this.router.navigate(['/process']);
    })
    
  }
  callSendFileProcess(file:File){
    this.apiProcessService.postProcessFile(file).subscribe((data)=>{    
      console.log(data);
    })
  }

  
  onKey(event: any) {
    this.values = event.target.value;
    if(this.values.trim().length == 8){
      this.apiViaCep.getAddress(this.values.trim()).subscribe((data) =>{
          this.addressResponse = data;
          this.street = this.addressResponse.logradouro;
          this.city = this.addressResponse.localidade;
          this.district = this.addressResponse.bairro;
      });
    }  
  }

  callAlert(msg : String){
    UIkit.modal.alert(msg).then(function () {
      console.log('Alert closed.')
    });
  }

}
