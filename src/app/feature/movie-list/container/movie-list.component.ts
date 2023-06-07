import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  searchForm = new FormGroup({
    movie: new FormControl(''),
  });

  movies: any[] = [1,1,1,1,1,1,1];

  onSubmit() {
    console.log(this.searchForm.value);
  }
}
