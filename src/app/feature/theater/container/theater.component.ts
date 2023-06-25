import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {

  theaterId?: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        const id = parseInt(params.theaterId);
        if (!Number.isNaN(id)) {
          this.theaterId = id;
        }
      }
    })
  }

}
