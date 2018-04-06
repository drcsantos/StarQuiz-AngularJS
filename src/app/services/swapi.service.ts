import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class SwapiService {
  constructor(private http: Http) {}

  private _baseUrl = 'https://swapi.co/api/';

  // 'people': 'http://swapi.co/api/people/',
  // 'planets': 'http://swapi.co/api/planets/',
  // 'films': 'http://swapi.co/api/films/',
  // 'species': 'http://swapi.co/api/species/',
  // 'vehicles': 'http://swapi.co/api/vehicles/',
  // 'starships': 'http://swapi.co/api/starships/'
  getRoot(wookiee: boolean = false): Observable<any> {
    return this.get('', wookiee);
  }

  getPeople(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('people/', page, wookiee);
  }

  getPlanets(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('planets/', page, wookiee);
  }

  getFilms(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('films/', page, wookiee);
  }

  getSpecies(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('species/', page, wookiee);
  }

  getVehicles(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('vehicles/', page, wookiee);
  }

  getStarships(page: number = null, wookiee: boolean = false): Observable<any> {
    return this.getPaged('starships/', page, wookiee);
  }

  getPerson(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('people/' + id + '/', wookiee);
  }

  getPlanet(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('planets/' + id + '/', wookiee);
  }

  getFilm(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('films/' + id + '/', wookiee);
  }

  getSpecie(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('species/' + id + '/', wookiee);
  }

  getVehicle(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('vehicles/' + id + '/', wookiee);
  }

  getStarship(id: number, wookiee: boolean = false): Observable<any> {
    return this.get('starships/' + id + '/', wookiee);
  }

  getPersonSchema(): Observable<any> {
    return this.get('people/schema');
  }

  getPlanetSchema(): Observable<any> {
    return this.get('planets/schema');
  }

  getFilmSchema(): Observable<any> {
    return this.get('films/schema');
  }

  getSpecieSchema(): Observable<any> {
    return this.get('species/schema');
  }

  getVehicleSchema(): Observable<any> {
    return this.get('vehicles/schema');
  }

  getStarshipSchema(): Observable<any> {
    return this.get('starships/schema');
  }

  getPaged(
    url: string,
    page: number = null,
    wookiee: boolean = false
  ): Observable<any> {
    return this.get(page ? `${url}?page=${page}` : url, wookiee);
  }

  getMultiple(urls: string[], wookiee: boolean = false): any {
    const observableBatch = [];
    urls.forEach((url, key) => {
      observableBatch.push(this.get(url, wookiee));
    });
    return Observable.forkJoin(observableBatch);
  }

  get(url: string, wookiee: boolean = false) {
    let completeUrl = url.indexOf(this._baseUrl) === 0 ? url : `${this._baseUrl}${url}`;

    if (wookiee) {
      completeUrl += `${
        completeUrl.indexOf('?') >= 0 ? '&' : '?'
      }format=wookiee`;
    }

    console.log(completeUrl);
    return this.http
      .get(completeUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error._body}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
