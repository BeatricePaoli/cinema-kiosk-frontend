import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Toast } from './core/models/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toast$: Observable<Toast | null> = of(null);
}
