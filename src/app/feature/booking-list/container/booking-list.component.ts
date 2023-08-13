import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { CollapseAnimation } from 'src/app/core/animations/collapse.animation';
import { Booking } from 'src/app/core/models/booking';
import { Toast } from 'src/app/core/models/toast';
import { BookingListActions } from '../store/actions/booking-list.actions';
import * as BookingListSelectors from '../store/selectors/booking-list.selectors';

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

  constructor(private store: Store) {}

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

}
