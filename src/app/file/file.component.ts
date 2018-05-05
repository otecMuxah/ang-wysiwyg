import { Component, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { ViewEncapsulation } from '@angular/core';
import { synonymsService } from '../services/synonyms.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileComponent implements OnInit {
  public text = '';

  constructor(
    private _textService: TextService,
    private _synonymsService: synonymsService) {}

  ngOnInit() {
    this._textService.getMockText().then((result) => {
      this.text = result;
    });
  }
  // Actionos to be done after word selected (remeber css classes, word , and get API request )
  public exposeClass() {
    this._textService.exposeClass();
    this._textService.getSelectedWord();
    this._synonymsService.reqParse(this._textService.word);
  }

  public resetClass() {
    this._textService.exposedClass = [''];
    this._synonymsService.showPopup.next(false);
  }
}
