import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Device, DeviceType } from 'src/app/core/models/device';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Input()
  devices: Device[] = [];

  @Input()
  type: DeviceType = DeviceType.SMARTBAND;

  @Input()
  theaterId?: number;

  @Output()
  onTurnOff: EventEmitter<Device> = new EventEmitter<Device>();

  @Output()
  onDelete: EventEmitter<Device> = new EventEmitter<Device>();

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>([]);

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices'] && changes['devices'].currentValue) {
      this.initTable(changes['devices'].currentValue);
    }
  }

  ngAfterViewInit() {
    this.initTable(this.devices);
  }

  initTable(devices: Device[]) {
    this.dataSource = new MatTableDataSource(devices);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
    this.displayedColumns = this.type === DeviceType.SMARTBAND ? ['contextBrokerId', 'status', 'actions'] : ['contextBrokerId', 'status'];
  }

  getStatusLabel(isActive: boolean) {
    return isActive ? 'ATTIVO' : 'DISATTIVO';
  }

  onTurnOffClicked(device: any) {
    this.onTurnOff.emit(device);
  }

  onCancelClicked(device: Device) {
    this.dialog.open<ActionModalComponent, ActionModalData, ActionModalOutput>(ActionModalComponent, {
      height: '50vh',
      data: {
        title: "Conferma cancellazione",
        content: `Sei sicuro di voler cancellare il dispositivo ${device.contextBrokerId}?`,
        backBtn: "Annulla",
        confirmBtn: "Cancella",
      },
    }).afterClosed().pipe(take(1)).subscribe(output => {
      if (output?.result) {
        this.onDelete.emit(device);
      }
    });
  }

}
