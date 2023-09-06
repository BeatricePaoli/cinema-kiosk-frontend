import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Theater } from 'src/app/core/models/theater';

export const TheaterListActions = createActionGroup({
  source: 'TheaterList',
  events: {
    'Load TheaterList': emptyProps(),
    'Load TheaterList Success': props<{ response: Theater[] }>(),
    'Load TheaterList Failure': emptyProps(),

    'Delete Theater': props<{ id: number }>(),
    'Delete Theater Success And Reload': emptyProps(),
    'Delete Theater Success': emptyProps(),
    'Delete Theater Failure': emptyProps(),
  }
});
