import { Component, OnInit } from '@angular/core';
import { ApiProcessService } from '../api-process.service';
import { Search } from '../models/search';

declare var UIkit: any;
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  constructor(private apiProcessService: ApiProcessService) { }
  public process;
  public idDelete;
  public searchInput;
  public itemsPerPage;
  public askedPage;
  search = {
    search_criteria: "",
    items_per_page: 10,
    asked_page: 0
  } as Search;

  ngOnInit(): void {
    this.callProcess(this.search);
  }

  callProcess(search) {
    this.apiProcessService.getProcess(this.search).subscribe((data) => {
      this.process = data;
    });
  }


  searchProcess(){
    this.search.search_criteria = this.searchInput || "";
    this.search.asked_page = parseInt(this.askedPage) || 0;
    this.search.items_per_page = parseInt(this.itemsPerPage) || 10;
    this.callProcess(this.search);
  }

  removeProcess(idDelete){   
    this.apiProcessService.deleteProcess(idDelete).subscribe((data) => {
      UIkit.notification({message: "<span uk-icon='icon: check'></span> Removido com sucesso!", status: 'success'});
      this.callProcess(this.search);    
    });
  }




}
