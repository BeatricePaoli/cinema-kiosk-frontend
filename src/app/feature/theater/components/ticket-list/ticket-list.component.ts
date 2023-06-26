import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Days, ProjectionType } from 'src/app/core/models/tickets';


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
export class TicketListComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input()
  ticketsList: any[] = [];

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  ticketForm = new FormGroup({
    tickets: new FormArray([])
  });

  projTypes = Object.values(ProjectionType);
  days: DayLabeled[] = this.getDaysList();

  displayedColumns: string[] = ['name', 'price', 'projectionType', 'availableOnline', 'days', 'fromTime', 'toTime', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#b8838b'
    },
    dial: {
      dialBackgroundColor: '#b8838b',
    },
    clockFace: {
      clockHandColor: '#b8838b',
    }
  };

  get tickets() {
    return (this.ticketForm.get('tickets') as FormArray);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketsList'] && changes['ticketsList'].currentValue) {
      const ticketsList = changes['ticketsList'].currentValue;
      this.tickets.patchValue([]);

      ticketsList.forEach((ticket: any) => {
        this.pushForm(ticket);
      });

      this.initTable();
    }
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
    this.onSave.emit(this.tickets.value);
  }

}
