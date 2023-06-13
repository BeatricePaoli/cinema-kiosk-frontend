import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movie: any = {
    cast: [
      {
        name: "Tizio Caio Cesare",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      },
      {
        name: "Tizio",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      },
      {
        name: "Tizio",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      },
      {
        name: "Tizio",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      },
      {
        name: "Tizio",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      },
      {
        name: "Tizio",
        img: "https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration.jpg"
      }
    ]
  };

  slideConfig = {
    // slidesToShow: 5,
    swipeToSlide: true,
    dots: false,
    infinite: false,
    variableWidth: true,
    prevArrow: '<img class="slick-left" src="assets/images/icons/chevron_left.svg">',
    nextArrow: '<img class="slick-right" src="assets/images/icons/chevron_right.svg">',
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 4,
    //     }
    //   },
    //   {
    //     breakpoint: 992,
    //     settings: {
    //       slidesToShow: 3,
    //     }
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //     }
    //   },
    // ]
  };
}
