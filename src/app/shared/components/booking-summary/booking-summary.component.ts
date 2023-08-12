import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImgSanitizerService } from 'src/app/core/services/img-sanitizer.service';


@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnChanges {

  @Input()
  booking: any;

  @Input()
  toComplete: boolean = false;

  constructor(private imgSanitizer: ImgSanitizerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['booking'] && changes['booking'].currentValue) {
      const b = changes['booking'].currentValue;
      this.booking = {
        ...b,
        movie: {
          id: b.movie.id,
          name: b.movie.name,
          img: this.imgSanitizer.sanitizeImg(b.movie.img.toString()),
        }
      }
    }
  }

}
