import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movie: any = {
    id: 1,
    name: "Spider-man: Across the Spiderverse",
    img: "https://cinemaadriano.it/images/locandine_film/spider.jpg",
    releaseDate: "01/06/2023",
    duration: 140,
    score: 4.5,
    genres: ["Animazione", "Azione", "Avventura"],
    plot: "Spider-Man: Across the Spider-Verse, film diretto da Joaquim Dos Santos, Kemp Powers e Justin K. Thompson, vede ancora una volta protagonista Miles Morales, ormai adulto e studente al college. Dopo essersi riunito con Gwen Stacy, l'amichevole Spider-Man di quartiere di Brooklyn viene trasportato nel Multiverso. Qui Mike incontra una squadra di Spider-Eroi, che ha il compito di proteggere l'esistenza. Ma quando gli eroi si ritrovano a dover affrontare una nuova e pericolosa minaccia, si ritrovano in disaccordo sul da farsi, arrivando perfino a scontrarsi. In quest'occasione Miles si ritrova contro tutti gli altri \"Ragni\" e dovrà ridefinire cosa significa per lui essere un eroe per poter salvare le persone che ama di più.",
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
