import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Comic } from '../data/comic';

@Injectable()
export class ComicService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private comicsUrl = 'json/comics.json';  // URL to web api

  constructor(private http: Http) { }

  getComics(): Promise<Comic[]> {
    return this.http.get(this.comicsUrl)
               .toPromise()
               .then(response => response.json().data as Comic[])
               .catch(this.handleError);
  }


  getComic(id: number): Promise<Comic> {
    const url = `${this.comicsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Comic)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.comicsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Comic> {
    return this.http
      .post(this.comicsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Comic)
      .catch(this.handleError);
  }

  update(comic: Comic): Promise<Comic> {
    const url = `${this.comicsUrl}/${comic.id}`;
    return this.http
      .put(url, JSON.stringify(comic), {headers: this.headers})
      .toPromise()
      .then(() => comic)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

