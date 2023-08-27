import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Observable, Subscription, of } from 'rxjs';
import { BookingCompact, BookingStatus } from 'src/app/core/models/booking';
import { Toast } from 'src/app/core/models/toast';
import { BookingValidatorActions } from '../store/actions/booking-validator.actions';
import * as BookingValidatorSelectors from '../store/selectors/booking-validator.selectors';


@Component({
  selector: 'app-booking-validator',
  templateUrl: './booking-validator.component.html',
  styleUrls: ['./booking-validator.component.scss']
})
export class BookingValidatorComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ZXingScannerComponent) scanner?: ZXingScannerComponent;

  booking: BookingCompact | null = null;

  allowedFormats = [BarcodeFormat.QR_CODE];
  scannerEnabled: boolean = true;
  permission: boolean = true;
  qrCodeError: boolean = false;

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(BookingValidatorSelectors.selectIsLoading);
    this.toast$ = this.store.select(BookingValidatorSelectors.selectToast);

    this.subs.push(this.store.select(BookingValidatorSelectors.selectBooking).subscribe(booking => {
      if (this.booking && booking) {
        this.booking.status = booking?.status;
      }
    }))
  }

  ngAfterViewInit(): void {
    this.scanner?.askForPermission();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  enableScanner() {
    this.scannerEnabled = true;
    this.qrCodeError = false;
    this.booking = null;
    this.store.dispatch(BookingValidatorActions.resetBooking());
  }

  onPermissionResponse(permission: boolean) {
    this.permission = permission;
  }

  scanSuccessHandler(event: any) {
    if (this.scannerEnabled) {
      try {
        this.booking = JSON.parse(event);
        this.store.dispatch(BookingValidatorActions.loadBooking({ id: this.booking!.id }));

        this.scannerEnabled = false;
        this.qrCodeError = false;
      } catch (error) {
        console.log(error);
        this.qrCodeError = true;
      }
    }
  }

  // TODO: gestione created vs paid
  getStatusLabel(status: BookingStatus) {
    switch (status) {
      case BookingStatus.CREATED: return 'Creata';
      case BookingStatus.PAID: return 'Pagata';
      case BookingStatus.CHECKEDIN: return 'Validata';
      case BookingStatus.CANCELED: return 'Cancellata';
    }
  }

  getStatusColor(status: BookingStatus) {
    switch (status) {
      case BookingStatus.CREATED: return { color: "#ffbe48" };
      case BookingStatus.PAID: return { color: "#ffbe48" };
      case BookingStatus.CHECKEDIN: return { color: "#76c500" };
      case BookingStatus.CANCELED: return { color: "#ff2020" };
    }
  }

  onConfirmClicked() {
    this.store.dispatch(BookingValidatorActions.validateBooking({ id: this.booking!.id }))
  }

}
