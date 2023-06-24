import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ActionModalData {
  title: string;
  content: string;
  backBtn?: string;
  confirmBtn?: string;
}

export interface ActionModalOutput {
  result: boolean;
}

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent {

  title: string;
  content: string;
  backBtn?: string;
  confirmBtn?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActionModalData, 
    public dialogRef: MatDialogRef<ActionModalComponent, ActionModalOutput>,
  ) {
    this.title = data.title;
    this.content = data.content;
    this.backBtn = data.backBtn;
    this.confirmBtn = data.confirmBtn;
  }

  onCancelClick(): void {
    this.dialogRef.close({ result: false });
  }

  onConfirmClick() {
    this.dialogRef.close({ result: true });
  };

}
