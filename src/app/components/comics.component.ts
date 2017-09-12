import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Comic }                from '../data/comic';
import { ComicService }          from '../services/comic.service';

@Component({
  selector: 'my-comics',
  templateUrl: '../../templates/comics.component.html',
  styleUrls: [ '../../styles/comics.component.css' ]
})
export class ComicsComponent implements OnInit {
  comics: Comic[];
  selectedComic: Comic;

  constructor(
    private comicService: ComicService,
    private router: Router) { }

  getComics(): void {
    this.comicService
        .getComics()
        .then(comics => this.comics = comics);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.comicService.create(name)
      .then(comic => {
        this.comics.push(comic);
        this.selectedComic = null;
      });
  }

  delete(comic: Comic): void {
    this.comicService
        .delete(comic.id)
        .then(() => {
          this.comics = this.comics.filter(c => c !== comic);
          if (this.selectedComic === comic) { this.selectedComic = null; }
        });
  }

  ngOnInit(): void {
    this.getComics();
  }

  onSelect(comic: Comic): void {
    this.selectedComic = comic;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedComic.id]);
  }
}
