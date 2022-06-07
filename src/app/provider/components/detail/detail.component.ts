import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../../shared/models/provider';
import { ProviderService } from '../../shared/service/provider.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  provider: Provider = new Provider();

  constructor(private route: ActivatedRoute, private providerService: ProviderService) {
    this.providerService.getById(route.params['id'])
    .subscribe(provider => this.provider = provider);
  }
}
