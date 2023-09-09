export interface Device {
    id: number;
    contextBrokerId: string;
    isActive: boolean;
}

export enum DeviceType {
    SMARTBAND = "smartband",
    CASHREGISTER = "cash_register"
}