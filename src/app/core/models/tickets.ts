export enum ProjectionType {
    is2D = "2D",
    is3D = "3D"
}

export enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export interface TicketType {
    id: number;
    name: string;
    price: number;
    projectionType: ProjectionType;
    availableOnline: boolean;
    days: string[];
}