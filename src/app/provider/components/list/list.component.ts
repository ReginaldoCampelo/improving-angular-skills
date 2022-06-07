import { Component, OnInit } from '@angular/core';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public providers: Provider[];
  errorMessage: string;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.providerService.getAll()
    .subscribe(
      providers => this.providers = providers,
      error => this.errorMessage);
  }
}
