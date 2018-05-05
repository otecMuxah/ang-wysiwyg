import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TextService {
  tagName: string;
  exposedClass: any[];
  word: string;
  windowSelection;

  classBold = new Subject<number>();
  classUnderline = new Subject<any>();
  classItalic = new Subject<any>();

  // Expose selected word class names to rxjs Subject
  exposeClass() {
    const selectBox = (window.getSelection() as any).baseNode.parentNode;
    this.exposedClass = Array.from(selectBox.classList);

    if (this.exposedClass.indexOf('bold') > -1) {
      this.classBold.next(1);
    } else {
      this.classBold.next(0);
    }
    if (this.exposedClass.indexOf('underline') > -1) {
      this.classUnderline.next(1);
    } else {
      this.classUnderline.next(0);
    }
    if (this.exposedClass.indexOf('italic') > -1) {
      this.classItalic.next(1);
    } else {
      this.classItalic.next(0);
    }
  }

  // Combines text wrap and exposing class
  wrapText() {
    this.wrapSelectedText();
    this.exposeClass();
  }

  // wrap selected text with tag, or just add/remove class to tag of selected word
  wrapSelectedText() {
    if (this.tagName === 'B') {
      this.tagName = 'bold';
    } else if (this.tagName === 'U') {
      this.tagName = 'underline';
    } else if (this.tagName === 'I') {
      this.tagName = 'italic';
    }
    const selectBox = (window.getSelection() as any).baseNode.parentNode;
    if (selectBox.tagName === 'SPAN') {
      if (selectBox.classList.contains(this.tagName)) {
        selectBox.classList.remove(this.tagName);
      } else {
        selectBox.classList.add(this.tagName);
      }
      return;
    } else {
      const selection = window.getSelection().getRangeAt(0);
      const selectedText = selection.extractContents();
      const span = document.createElement('span');
      span.classList.add(this.tagName);
      span.appendChild(selectedText);
      selection.insertNode(span);
    }
  }

  // Remember selected word
  getSelectedWord() {
    this.windowSelection = window.getSelection().getRangeAt(0);
    this.word = window.getSelection().toString();
  }

  getMockText () {
  return new Promise<string>(function (resolve){
    resolve('A year ago I was in the audience at a gathering of designers in San Francisco. There were four designers on stage, and two ' +
      'of them worked for me. I was there to support them. The topic of design responsibility came up, possibly brought up by one of my d' +
      'esigners, I honestly don’t remember the details. What I do remember is that at some point in the discussion I raised my hand and s' +
      'uggested, to this group of designers, that modern design problems were very complex. And we ought to need a license to solve them.');
  });
  }

}
