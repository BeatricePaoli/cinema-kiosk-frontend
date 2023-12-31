import { BarProduct } from "./bar";
import { Booking } from "./booking";

export interface DeviceFilterDto {
    theaterId: number;
    type: string;
}

export interface Device {
    id: number;
    contextBrokerId: string;
    isActive: boolean;
}

export enum DeviceType {
    SMARTBAND = "smartband",
    CASHREGISTER = "cash_register"
}

export interface DeviceActivity {
    id: number;
    tms: Date;
    emitterSerial: string;
    eventCode: DeviceActivityEvent;
    product: BarProduct;
    quantity: number;
    booking: Booking;
}

export enum DeviceActivityEvent {
    ENTERED_BAR = "ENTERED_BAR",
    ROOM_CHANGE = "ROOM_CHANGE",
    WRONG_ROOM = "WRONG_ROOM",
    BAR_PURCHASE = "BAR_PURCHASE",
    ACTIVATION = "ACTIVATION",
    DEACTIVATION = "DEACTIVATION",
}