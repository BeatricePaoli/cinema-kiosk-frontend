import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/shared/animations/slide-in-out.animation';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [SlideInOutAnimation]
})
export class MovieListComponent {

  searchForm = new FormGroup({
    movie: new FormControl(''),
    city: new FormControl(''),
    cinema: new FormControl('')
  });

  cities: string[] = ['One', 'Two', 'Three'];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  cinemas: string[] = ['One', 'Two', 'Three'];
  filteredCinemas: Observable<string[]> = new Observable<string[]>;

  animationState = 'out';

  movies: any[] = [1, 1, 1, 1, 1, 1, 1];

  slideConfig = {
    slidesToShow: 5,
    swipeToSlide: true,
    dots: false,
    infinite: false,
    prevArrow: '<img class="slick-left" src="assets/images/icons/chevron_left.svg">',
    nextArrow: '<img class="slick-right" src="assets/images/icons/chevron_right.svg">',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  };

  ngOnInit() {
    this.filteredCities = this.searchForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cities)),
    );

    this.filteredCinemas = this.searchForm.get('cinema')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cinemas)),
    );
  }

  private autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onToggleAccordion() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }
}
