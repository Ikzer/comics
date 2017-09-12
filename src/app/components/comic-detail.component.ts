import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Comic }        from '../data/comic';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'comic-detail',
  templateUrl: '../../templates/comic-detail.component.html',
  styleUrls: [ '../../styles/comic-detail.component.css' ]
})
export class ComicDetailComponent implements OnInit {
  comic: Comic;

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.comicService.getComic(+params.get('id')))
      .subscribe(comic => this.comic = comic);
  }

  save(): void {
    this.comicService.update(this.comic)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
