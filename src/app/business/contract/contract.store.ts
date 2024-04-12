import { Injectable } from '@angular/core';

import { StateHelper } from '../../shared/state.helper';
import { Contract } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractStore {
  readonly $contractsState = this.stateHelper.createInitialState<Contract[]>();

  constructor(private readonly stateHelper: StateHelper) {}
}
