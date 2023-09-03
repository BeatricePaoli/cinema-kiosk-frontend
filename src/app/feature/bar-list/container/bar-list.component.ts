import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';


@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss']
})
export class BarListComponent {

  theaterId?: number;
  theater: any = {
    id: 1,
    name: "Cinema 1",
  };

  bars: any[] = [
    {
      id: 1,
      name: "Bar principale",
      emitterSerial: "ABCD1234"
    }
  ];

  products: any[] = [
    {
      id: 1,
      name: "Coca Cola",
      price: 5
    },
    {
      id: 2,
      name: "Popcorn",
      price: 6
    }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        this.theaterId = params.theaterId;
      }
    });
  }

  onBarsSubmit(formValues: any) {
    console.log(formValues);
  }

  onProductsSubmit(formValues: any) {
    console.log(formValues);
  }

}
