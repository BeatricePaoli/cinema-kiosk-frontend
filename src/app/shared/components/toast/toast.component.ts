import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export interface ToastInternal extends Toast {
  show: boolean;
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class ToastComponent {

  @Input()
  toast: Toast | null = null;

  toasts: ToastInternal[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['toast'] && changes['toast'].currentValue) {
      this.toasts.push({
        ...changes['toast'].currentValue,
        show: true,
      });
      setTimeout(() => this.dismiss(this.toasts.length - 1), 5000);
    }
  }

  getStatusClass(toast: Toast) {
    switch (toast.status) {
      case ToastStatus.SUCCESS:
        return 'success';
      case ToastStatus.ERROR:
        return 'error';
    }
  }

  getMatIcon(toast: Toast) {
    switch (toast.status) {
      case ToastStatus.SUCCESS:
        return 'check';
      case ToastStatus.ERROR:
        return 'priority_high';
    }
  }

  getTitle(toast: Toast) {
    switch (toast.status) {
      case ToastStatus.SUCCESS:
        return 'Successo';
      case ToastStatus.ERROR:
        return 'Errore';
    }
  }

  dismiss(i: number) {
    this.toasts[i].show = false;
    setTimeout(() => this.toasts.splice(i, 1), 1000); // wait for animation end before removal
  }

}
