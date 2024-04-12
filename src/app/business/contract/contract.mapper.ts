import { Injectable } from '@angular/core';

import { ApiContract } from './api-contract.model';
import { Contract } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractMapper {
  mapContracts(response: ApiContract[]): Contract[] {
    // Devrait être un vrai mapping.
    return response.map(contracts => contracts);
  }
}
