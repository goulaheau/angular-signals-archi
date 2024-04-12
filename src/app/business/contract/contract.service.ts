import { Injectable, Signal, computed } from '@angular/core';

import { StateStatus } from '../../shared/state-status.enum';
import { State } from '../../shared/state.model';
import { ContractDataAccess } from './contract.data-access';
import { Contract } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private readonly dataAccess: ContractDataAccess) {}

  getContractsState(): Signal<State<Contract[]>> {
    return this.dataAccess.getContractsState();
  }

  getContractTitlesState(): Signal<State<string[]>> {
    const $contractsState = this.getContractsState();

    return computed(() => {
      const contractsState = $contractsState();

      if (contractsState.status !== StateStatus.Loaded) {
        return contractsState;
      }

      const titles = contractsState.data.map(({ title }) => title);

      return {
        status: StateStatus.Loaded,
        data: titles
      };
    });
  }
}
