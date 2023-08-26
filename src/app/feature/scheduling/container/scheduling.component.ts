import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { Observable, map, startWith } from 'rxjs';
import { ProjectionType } from 'src/app/core/models/tickets';
import { customTimepickerTheme } from 'src/app/core/timepicker.theme';
import { AutocompleteValidator } from 'src/app/core/validators/autocomplete.validator';
import { ErrorListModalComponent, ErrorListModalData } from '../components/error-list-modal/error-list-modal.component';

const moment = _moment;


@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  theater: any = {
    id: 1,
    name: "Cinema 1",
    screens: [
      {
        id: 1,
        name: "Sala a",
        totalSeats: 140
      },
      {
        id: 2,
        name: "Sala b",
        totalSeats: 245
      }
    ],
  };

  searchForm = new FormGroup({
    start: new FormControl(moment().startOf('day')),
    end: new FormControl(moment().endOf('day')),
  });

  schedulingList: any[] = [
    {
      date: moment().toISOString(),
      movie: {
        id: 1,
        name: "Spider-man: Across the Spiderverse",
      },
      screen: {
        id: 1,
        name: "Sala a"
      },
      projectionType: ProjectionType.is2D,
      language: "Italiano",
      shows: ['17:30', '20:30']
    }
  ];

  schedulingForm = new FormGroup({
    schedulings: new FormArray([])
  });

  movies: any[] = [
    {
      id: 1,
      name: "Spider-man: Across the Spiderverse",
    },
    {
      id: 2,
      name: "Elemental"
    },
  ];
  filteredMovies: Observable<any[]>[] = [];

  screens: any[] = [
    {
      id: 1,
      name: "Sala a",
      totalSeats: 140
    },
    {
      id: 2,
      name: "Sala b",
      totalSeats: 245
    }
  ];

  projTypes = Object.values(ProjectionType);

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['date', 'movie', 'screen', 'projectionType', 'language', 'shows', 'actions'];

  customTheme = customTimepickerTheme;

  get schedulings() {
    return (this.schedulingForm.get('schedulings') as FormArray);
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initSearchForm();

    this.schedulingList.forEach((ticket: any) => {
      this.pushForm(ticket);
    });

    this.initTable();
  }

  private autoCompletefilter(value: any, list: any[]): any[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  initSearchForm() {
    const changeDay = 4; // giovedì
    const today = moment().isoWeekday();

    if (today <= changeDay) {
      this.searchForm.patchValue({
        start: moment().isoWeekday(changeDay).subtract(1, 'weeks').startOf('day'),
        end: moment().isoWeekday(changeDay).endOf('day'),
      });
    } else {
      this.searchForm.patchValue({
        start: moment().add(1, 'weeks').isoWeekday(changeDay).subtract(1, 'weeks').startOf('day'),
        end: moment().add(1, 'weeks').isoWeekday(changeDay).endOf('day'),
      });
    }
    console.log(this.searchForm.value.start?.format('DD/MM/YYYY'), this.searchForm.value.end?.format('DD/MM/YYYY'))
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.schedulings.controls);
    this.dataSource.paginator = this.paginator!;
  }

  pushForm(scheduling?: any) {
    this.schedulings.push(
      new FormGroup({
        date: new FormControl(scheduling ? scheduling.date : null, Validators.required),
        movieId: new FormControl(scheduling ? scheduling.movie.id : null, [Validators.required, AutocompleteValidator.validOption(this.movies.map(m => m.id))]),
        screenId: new FormControl(scheduling ? scheduling.screen.id : null, Validators.required),
        projectionType: new FormControl(scheduling ? scheduling.projectionType : ProjectionType.is2D, Validators.required),
        language: new FormControl(scheduling ? scheduling.language : null, Validators.required),
        shows: new FormArray(scheduling
          ? scheduling.shows.map((s: any) => {
            return new FormGroup({
              show: new FormControl(s, Validators.required),
            });
          })
          : [
            new FormGroup({
              show: new FormControl(null, Validators.required),
            })
          ])
      })
    );

    this.addMovieFilter();
  }

  addMovieFilter() {
    const length = this.schedulings.controls.length;
    this.filteredMovies.push(this.schedulings.controls[length - 1].get('movieId')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const objVal = this.movies.find(m => m.id === value) ?? '';
        const name = typeof objVal === 'string' ? objVal : objVal?.name;
        return name !== '' ? this.autoCompletefilter(name as string, this.movies) : this.movies.slice();
      }),
    ));
  }

  displayMovieAutoFn(movieId: number): string {
    const movie = this.movies.find(m => m.id === movieId);
    return movie && movie.name ? movie.name : '';
  }
  boundDisplayMovieAutoFn = this.displayMovieAutoFn.bind(this);

  onPreviousClicked() {
    const { start, end } = this.searchForm.value;
    this.searchForm.patchValue({
      start: moment(start).subtract(1, 'weeks'),
      end: moment(end).subtract(1, 'weeks'),
    });

    this.onSearch();
  }

  onNextClicked() {
    const { start, end } = this.searchForm.value;
    this.searchForm.patchValue({
      start: moment(start).add(1, 'weeks'),
      end: moment(end).add(1, 'weeks'),
    });

    this.onSearch();
  }

  onSearch() {
    const values = this.searchForm.value;
    console.log(values);
  }

  onApplyDateRange() {
    this.searchForm.patchValue({
      end: this.searchForm.value.end?.endOf('day')
    });

    this.onSearch();
  }

  onAddClicked() {
    this.pushForm();
    this.initTable();
  }

  addShow(fc: FormArray) {
    fc.push(
      new FormGroup({
        show: new FormControl(null, Validators.required),
      })
    );
  }

  deleteShow(fc: FormArray, index: number) {
    fc.removeAt(index);
  }

  getErrorRequired(fc: FormControl) {
    return fc?.errors ? fc.errors!['required'] : null;
  }

  getErrorValidOption(fc: FormControl) {
    return fc?.errors ? fc.errors!['validOption'] : null;
  }

  onCancelClicked(index: number) {
    this.schedulings.removeAt(index);
    this.filteredMovies.splice(index, 1);
    this.initTable();
  }

  onSaveClicked(index: number) {
    console.log(this.schedulings.value[index]);

    this.dialog.open<ErrorListModalComponent, ErrorListModalData>(ErrorListModalComponent, {
      data: {
        schedulings: [
          {
            date: moment().toISOString(),
            movie: {
              id: 1,
              name: "Spider-man: Across the Spiderverse",
            },
            screen: {
              id: 1,
              name: "Sala a"
            },
            projectionType: ProjectionType.is2D,
            language: "Italiano",
            shows: ['17:30', '20:30']
          },
          {
            date: moment().toISOString(),
            movie: {
              id: 1,
              name: "Spider-man: Across the Spiderverse",
            },
            screen: {
              id: 1,
              name: "Sala a"
            },
            projectionType: ProjectionType.is2D,
            language: "Italiano",
            shows: ['17:30']
          }
        ]
      },
    })
  }

}
