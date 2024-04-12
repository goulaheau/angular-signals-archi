import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contract } from './contract.model';

@Injectable({ providedIn: 'root' })
export class ContractClient {
  private readonly endpoint = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private readonly httpClient: HttpClient) {}

  getContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.endpoint);
  }
}
