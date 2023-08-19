import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { Observable, Subscription, of, take } from 'rxjs';
import { CollapseAnimation } from 'src/app/core/animations/collapse.animation';
import { Booking, BookingStatus } from 'src/app/core/models/booking';
import { Toast } from 'src/app/core/models/toast';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';
import { BookingListActions } from '../store/actions/booking-list.actions';
import * as BookingListSelectors from '../store/selectors/booking-list.selectors';

const moment = _moment;


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  animations: [CollapseAnimation],
})
export class BookingListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  bookings: Booking[] = [];

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  dataSource: MatTableDataSource<Booking> = new MatTableDataSource<Booking>([]);
  columnsToDisplay = ['date', 'movie', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Booking | null = null;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(BookingListActions.loadBookingLists());

    this.isLoading$ = this.store.select(BookingListSelectors.selectIsLoading);
    this.toast$ = this.store.select(BookingListSelectors.selectToast);

    this.subs.push(this.store.select(BookingListSelectors.selectBookings).subscribe(bookings => {
      this.bookings = bookings;
      this.initTable();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator!;
  }

  canBeDeleted(booking: Booking) {
    const splittedTime = booking.startTime.split(":");
    const showTime = moment(booking.date).hour(+splittedTime[0]).minute(+splittedTime[1]);
    return booking.status !== BookingStatus.CHECKEDIN && moment().isSameOrBefore(showTime);
  }

  onCancelClicked(booking: Booking) {
    const formattedDate = moment(booking.date).format("DD/MM/YYYY");
    this.dialog.open<ActionModalComponent, ActionModalData, ActionModalOutput>(ActionModalComponent, {
      height: '50vh',
      data: {
        title: "Conferma cancellazione",
        content: `Sei sicuro di voler cancellare la prenotazione per ${booking.movie.name} del ${formattedDate}?`,
        backBtn: "Annulla",
        confirmBtn: "Cancella",
      },
    }).afterClosed().pipe(take(1)).subscribe(output => {
      if (output?.result) {
        this.store.dispatch(BookingListActions.deleteBooking({ id: booking.id }));
      }
    });
  }

}
