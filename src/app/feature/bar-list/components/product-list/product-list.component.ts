import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input()
  productsList: any[] = [];

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  productForm = new FormGroup({
    products: new FormArray([])
  });

  displayedColumns: string[] = ['name', 'price', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  get products() {
    return (this.productForm.get('products') as FormArray);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productsList'] && changes['productsList'].currentValue) {
      const productsList = changes['productsList'].currentValue;
      this.products.patchValue([]);

      productsList.forEach((product: any) => {
        this.pushForm(product);
      });

      this.initTable();
    }
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.products.controls);
    this.dataSource.paginator = this.paginator!;
  }

  pushForm(product?: any) {
    this.products.push(
      new FormGroup({
        name: new FormControl(product ? product.name : null, Validators.required),
        price: new FormControl(product ? product.price : null, [Validators.required, Validators.min(0.01)]),
      })
    );
  }

  onAddClicked() {
    this.pushForm();
    this.initTable();
  }

  getErrorRequired(fc: FormControl) {
    return fc?.errors ? fc.errors!['required'] : null;
  }

  onCancelClicked(index: number) {
    this.products.removeAt(index);
    this.initTable();
  }

  onSubmit() {
    this.onSave.emit(this.products.value);
  }

}
