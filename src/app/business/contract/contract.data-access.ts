import { Injectable, Signal } from '@angular/core';
import { Observable, map } from 'rxjs';

import { StateHelper } from '../../shared/state.helper';
import { State } from '../../shared/state.model';
import { ContractClient } from './contract.client';
import { ContractMapper } from './contract.mapper';
import { Contract } from './contract.model';
import { ContractStore } from './contract.store';

@Injectable({ providedIn: 'root' })
export class ContractDataAccess {
  // On peut sortir le state dans un "Store" si on doit le réutiliser entre
  // plusieurs DataAccesses, mais ce n'est pas obligatoire.
  private readonly $contractsState = this.store.$contractsState;

  constructor(
    private readonly client: ContractClient,
    private readonly store: ContractStore,
    private readonly stateHelper: StateHelper,
    private readonly mapper: ContractMapper
  ) {}

  getContractsState(): Signal<State<Contract[]>> {
    const { status } = this.$contractsState();
    const shouldFetch = this.stateHelper.shouldFetch(status);

    if (shouldFetch) {
      return this.stateHelper.fetch(this.$contractsState, this.fetchContracts());
    }

    return this.$contractsState;
  }

  private fetchContracts(): Observable<Contract[]> {
    return this.client.getContracts().pipe(map(response => this.mapper.mapContracts(response)));
  }
}
