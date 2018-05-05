import { Component, OnDestroy, OnInit } from '@angular/core';
import { synonymsService } from '../services/synonyms.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-synonym',
  templateUrl: './synonym.component.html',
  styleUrls: ['./synonym.component.css']
})

export class synonymComponent implements OnInit, OnDestroy {
  synonyms: string[];
  synonymsLength: number;
  popupShow = false;
  popupSubscribe = this._synonymsService.showPopup.subscribe(data => {
    this.popupShow = data;
  });

  constructor(private _synonymsService: synonymsService,
              private _textService: TextService) { }

  ngOnInit() {
    this.showsynonyms();
  }
  ngOnDestroy() {
    this.popupSubscribe.unsubscribe();
  }
  // Subscribe to synonym list changes
  showsynonyms() {
    this._synonymsService.addons.subscribe((data) => {
      this.synonyms = data;
      this.synonymsLength = data.length;
      this._synonymsService.showPopup.next(true);
    });
  }

  // Change word in text with selected synonym
  swapWord(event) {
    const word = event.target.innerHTML;
    const range = this._textService.windowSelection;
    const arr = this._textService.exposedClass;
    if (!arr.length) {
      const span = document.createElement('span');
      span.classList.add(...arr);
      span.textContent = word;
      range.deleteContents();
      range.insertNode(span);
    } else {
      range.deleteContents();
      range.insertNode(document.createTextNode(word));
    }
  }
}
