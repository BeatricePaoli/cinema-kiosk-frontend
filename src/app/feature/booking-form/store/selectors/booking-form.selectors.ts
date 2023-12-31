import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingForm from '../reducers/booking-form.reducer';

export const selectBookingFormState = createFeatureSelector<fromBookingForm.State>(
  fromBookingForm.bookingFormFeatureKey
);

export const selectToast = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.isLoading;
  }
);

export const selectTheaterFilter = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.filter;
  }
);

export const selectMovie = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.movie;
  }
);

export const selectShows = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.shows;
  }
);

export const selectTicketTypes = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.ticketTypes;
  }
);

export const selectSavedBookingId = createSelector(
  selectBookingFormState,
  (state: fromBookingForm.State) => {
    return state?.savedBookingId;
  }
);