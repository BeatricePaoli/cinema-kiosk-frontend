import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { Theater } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';
import { TheaterListActions } from '../store/actions/theater-list.actions';
import * as TheaterListSelectors from '../store/selectors/theater-list.selectors';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.scss']
})
export class TheaterListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  theaters: Theater[] = [];

  displayedColumns: string[] = ['name', 'address', 'actions'];
  dataSource: MatTableDataSource<Theater> = new MatTableDataSource<Theater>([]);

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TheaterListActions.loadTheaterList());

    this.isLoading$ = this.store.select(TheaterListSelectors.selectIsLoading);
    this.toast$ = this.store.select(TheaterListSelectors.selectToast);

    this.subs.push(this.store.select(TheaterListSelectors.selectTheaters).subscribe(theaters => {
      this.theaters = theaters;
      this.initTable();
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.theaters);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  onCancelClicked(theater: Theater) {
    this.dialog.open<ActionModalComponent, ActionModalData, ActionModalOutput>(ActionModalComponent, {
      height: '50vh',
      data: {
        title: "Conferma cancellazione",
        content: `Sei sicuro di voler cancellare il cinema ${theater.name}?`,
        backBtn: "Annulla",
        confirmBtn: "Cancella",
      },
    }).afterClosed().pipe(take(1)).subscribe(output => {
      if (output?.result) {
        this.store.dispatch(TheaterListActions.deleteTheater({ id: theater.id! }));
      }
    });
  }

}
