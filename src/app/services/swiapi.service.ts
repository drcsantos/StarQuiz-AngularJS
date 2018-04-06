import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SwiapiService {
  constructor(private http: Http) {}

  private _baseUrl = 'http://swimageapi.whgt6hmsep.sa-east-1.elasticbeanstalk.com/';

  getPeopleImages() {
    return this.get('people');
  }

  getPersonImage(id: number) {
    return this.get(`people/${id}/`);
  }

  get(url: string) {
    const completeUrl =
      url.indexOf(this._baseUrl) === 0 ? url : `${this._baseUrl}${url}`;

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
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error._body}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
