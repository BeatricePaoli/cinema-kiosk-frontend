import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BookingCompact, BookingStatus } from 'src/app/core/models/booking';


@Component({
  selector: 'app-booking-validator',
  templateUrl: './booking-validator.component.html',
  styleUrls: ['./booking-validator.component.scss']
})
export class BookingValidatorComponent implements AfterViewInit {

  @ViewChild(ZXingScannerComponent) scanner?: ZXingScannerComponent;

  booking: BookingCompact | null = null;

  allowedFormats = [BarcodeFormat.QR_CODE];
  scannerEnabled: boolean = true;
  permission: boolean = true;
  qrCodeError: boolean = false;

  ngAfterViewInit(): void {
    this.scanner?.askForPermission();
  }

  enableScanner() {
    this.scannerEnabled = true;
    this.qrCodeError = false;
    this.booking = null;
  }

  onPermissionResponse(permission: boolean) {
    this.permission = permission;
  }

  scanSuccessHandler(event: any) {
    if (this.scannerEnabled) {
      try {
        this.booking = JSON.parse(event);
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
    console.log("conferma");
    this.booking!.status = BookingStatus.CHECKEDIN;
  }

}
