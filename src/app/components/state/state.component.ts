import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, contentChild, input } from '@angular/core';

import { StateStatus } from '../../shared/state-status.enum';
import { State } from '../../shared/state.model';
import { StateLoadedContext } from './state-loaded-context.model';
import { StateLoadedDirective } from './state-loaded.directive';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: 'state.component.html',
  styleUrl: 'state.component.scss'
})
export class StateComponent<T> {
  readonly $state = input.required<State<T>>({ alias: 'state' });

  protected readonly $templateRef = contentChild.required<
    StateLoadedDirective<T>,
    TemplateRef<StateLoadedContext<T>>
  >(StateLoadedDirective, { read: TemplateRef });

  protected readonly StateStatus = StateStatus;
}
