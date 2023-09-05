import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { take } from 'rxjs';
import { Days, ProjectionType } from 'src/app/core/models/tickets';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { customTimepickerTheme } from 'src/app/core/timepicker.theme';


const moment = _moment;

interface DayLabeled {
  value: Days,
  label: string;
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  theaterId?: number;
  theater: any = {
    id: 1,
    name: "Cinema 1",
  };

  ticketsList: any[] = [
    {
      id: 1,
      name: "Adulti",
      price: 9,
      projectionType: "2D",
      availableOnline: true,
      days: [0, 1, 2, 3, 4, 5, 6, 7],
      fromTime: "14:00",
      toTime: "23:59"
    },
    {
      id: 2,
      name: "Bambini",
      price: 7,
      projectionType: "2D",
      availableOnline: true,
      days: [0, 1, 2, 3, 4, 5, 6, 7],
      fromTime: "14:00",
      toTime: "23:59"
    },
    {
      id: 3,
      name: "Sconto a",
      price: 4.5,
      projectionType: "2D",
      availableOnline: false,
      days: [2],
      fromTime: "14:00",
      toTime: "19:00"
    }
  ];

  ticketForm = new FormGroup({
    tickets: new FormArray([])
  });

  projTypes = Object.values(ProjectionType);
  days: DayLabeled[] = this.getDaysList();

  displayedColumns: string[] = ['name', 'price', 'projectionType', 'availableOnline', 'days', 'fromTime', 'toTime', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  customTheme = customTimepickerTheme;

  get tickets() {
    return (this.ticketForm.get('tickets') as FormArray);
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        this.theaterId = params.theaterId;

        // this.tickets.patchValue([]);

        this.ticketsList.forEach((ticket: any) => {
          this.pushForm(ticket);
        });

        this.initTable();
      }
    });
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.tickets.controls);
    this.dataSource.paginator = this.paginator!;
  }

  pushForm(ticket?: any) {
    this.tickets.push(
      new FormGroup({
        name: new FormControl(ticket ? ticket.name : null, Validators.required),
        price: new FormControl(ticket ? ticket.price : null, [Validators.required, Validators.min(0.01)]),
        projectionType: new FormControl(ticket ? ticket.projectionType : ProjectionType.is2D, Validators.required),
        availableOnline: new FormControl(ticket ? ticket.availableOnline : false, Validators.required),
        days: new FormControl(ticket ? ticket.days : [], Validators.minLength(1)),
        fromTime: new FormControl(ticket ? ticket.fromTime : '12:00', Validators.required),
        toTime: new FormControl(ticket ? ticket.toTime : '23:59', Validators.required),
      })
    );
  }

  onAddClicked() {
    this.pushForm();
    this.initTable();
  }

  getDaysList() {
    const date = moment('2023-06-26', 'YYYY-MM-DD');
    return Object.values(Days).filter(d => !isNaN(parseInt(d as string))).map((day, i) => {
      return {
        value: day as Days,
        label: moment(date).add(i, 'days').format('dddd'),
      }
    });
  }

  getErrorRequired(fc: FormControl) {
    return fc?.errors ? fc.errors!['required'] : null;
  }

  onCancelClicked(index: number) {
    this.tickets.removeAt(index);
    this.initTable();
  }

  onSubmit() {
    console.log(this.tickets.value);
  }
}
