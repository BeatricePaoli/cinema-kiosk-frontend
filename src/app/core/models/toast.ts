export interface Toast {
    message: string;
    status: ToastStatus;
}

export enum ToastStatus {
    SUCCESS,
    ERROR,
}