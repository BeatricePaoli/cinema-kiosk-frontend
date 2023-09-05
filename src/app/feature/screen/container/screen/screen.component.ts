import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent {

  screenId?: number;
  theaterId?: number;

  screen: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        this.theaterId = params.theaterId;
      }

      if (params && params.screenId) {
        const id = parseInt(params.screenId);
        if (!Number.isNaN(id)) {
          this.screenId = id;

          this.screen = {
            id: 1,
            name: "Sala a",
            emitterSerial: "ABCD1234",
            url: "assets/mocks/screen_test.json",
          };

        }
      }
    });
  }

  onSave(formValues: any) {
    console.log(formValues)
  }

}
