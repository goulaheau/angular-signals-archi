import { StateStatus } from './state-status.enum';

export type State<T> = NotLoadedState | LoadingState | ErrorState | LoadedState<T>;

export interface NotLoadedState {
  status: StateStatus.NotLoaded;
}

export interface LoadingState {
  status: StateStatus.Loading;
}

export interface ErrorState {
  status: StateStatus.Error;
  error: unknown;
}

export interface LoadedState<T> {
  status: StateStatus.Loaded;
  data: T;
}
