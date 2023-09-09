import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Theater } from 'src/app/core/models/theater';

export const TheaterActions = createActionGroup({
  source: 'Theater',
  events: {
    'Load Theater': props<{ id: number }>(),
    'Load Theater Success': props<{ response: Theater }>(),
    'Load Theater Failure': emptyProps(),

    'Save Theater': props<{ theater: Theater }>(),
    'Save Theater Success': props<{ response: number }>(),
    'Save Theater Failure': emptyProps(),

    'Reset Saved Theater Id': emptyProps(),
  }
});
