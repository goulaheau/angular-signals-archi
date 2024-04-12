import { Injectable, Injector, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';

import { StateStatus } from './state-status.enum';
import { State } from './state.model';

const shouldFetchStatuses = [StateStatus.NotLoaded, StateStatus.Error];

@Injectable({ providedIn: 'root' })
export class StateHelper {
  constructor(private readonly injector: Injector) {}

  createInitialState<T>(): WritableSignal<State<T>> {
    return signal({ status: StateStatus.NotLoaded });
  }

  fetch<T>(state: WritableSignal<State<T>>, data$: Observable<T>): Signal<State<T>> {
    const fetch$ = of(void 0).pipe(
      tap(() => state.set({ status: StateStatus.Loading })),
      switchMap(() => data$),
      tap(data => state.set({ status: StateStatus.Loaded, data })),
      catchError(error => {
        state.set({ status: StateStatus.Error, error });

        return of(void 0);
      }),
      map(() => state()),
      finalize(() => {
        if (state().status === StateStatus.Loading) {
          state.set({ status: StateStatus.NotLoaded });
        }
      })
    );

    return toSignal(fetch$, {
      initialValue: { status: StateStatus.Loading },
      injector: this.injector
    });
  }

  shouldFetch(status: StateStatus): boolean {
    return shouldFetchStatuses.includes(status);
  }
}
