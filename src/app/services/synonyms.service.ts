import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class synonymsService {
  public config;
  public url = `https://api.datamuse.com/words?rel_syn=`;
  public addons = new Subject<any>();
  public showPopup = new Subject<any>();

  getsynonyms(word: string): Observable<any> {
    return this.http.get(`${this.url}${word}`);
  }

  // Parsing API request to rxjs Subject
  reqParse(word: string) {
    this.getsynonyms(word)
      .subscribe((data) => {
        const tempText: string[] = [];
        this.config = Array.from(JSON.parse(data['_body']));
        this.config.forEach((item) => {
          tempText.push(item['word']);
        });
        this.addons.next(tempText);
      });
  }

  constructor(
    private http: Http) { }
}
