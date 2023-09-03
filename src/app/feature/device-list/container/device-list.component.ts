import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  smartbands = [
    {
      id: 1,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand1",
      on: true,
    },
    {
      id: 2,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand2",
      on: true,
    },
    {
      id: 3,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand3",
      on: true,
    },
    {
      id: 4,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand4",
      on: true,
    },
    {
      id: 5,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand5",
      on: true,
    },
    {
      id: 6,
      contextBrokerId: "urn:ngsi:SmartBand:smartBand6",
      on: false,
    }
  ];

  cashRegisters = [
    {
      id: 1,
      contextBrokerId: "urn:ngsi:CashRegister:cashRegister1",
      on: true,
    },
    {
      id: 2,
      contextBrokerId: "urn:ngsi:CashRegister:cashRegister2",
      on: true,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onTurnOffBandClicked(device: any) {
    const index = this.smartbands.findIndex(t => t.id === device.id);
    if (index > -1) {
      this.smartbands[index].on = false;
      this.smartbands.splice(index, 1, this.smartbands[index]);
    }
  }

  onCancelBandClicked(device: any) {
    const index = this.smartbands.findIndex(t => t.id === device.id);
    if (index > -1) {
      this.smartbands.splice(index, 1);
      this.smartbands = [...this.smartbands];
    }
  }

  onCancelRegisterClicked(device: any) {
    const index = this.cashRegisters.findIndex(t => t.id === device.id);
    if (index > -1) {
      this.cashRegisters.splice(index, 1);
      this.cashRegisters = [...this.cashRegisters];
    }
  }

}
