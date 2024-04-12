import { Directive, input } from '@angular/core';

import { RecordHelper } from '../../shared/record.helper';
import { State } from '../../shared/state.model';
import { StateLoadedContext } from './state-loaded-context.model';

@Directive({
  selector: '[appStateLoaded]',
  standalone: true
})
export class StateLoadedDirective<T> {
  // Used to get the generic type from the value passed.
  readonly $state = input.required<State<T>>({ alias: 'state' });

  static ngTemplateContextGuard<T>(
    _directive: StateLoadedDirective<T>,
    context: unknown
  ): context is StateLoadedContext<T> {
    return new RecordHelper().isObjectContaining(context, 'data');
  }
}
