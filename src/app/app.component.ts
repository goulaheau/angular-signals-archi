import { Component } from '@angular/core';

import { ContractService } from './business/contract/contract.service';
import { StateLoadedDirective } from './components/state/state-loaded.directive';
import { StateComponent } from './components/state/state.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [StateComponent, StateLoadedDirective]
})
export class AppComponent {
  protected readonly $contractsState = this.service.getContractsState();
  protected readonly $contractTitlesState = this.service.getContractTitlesState();

  constructor(private readonly service: ContractService) {}
}
