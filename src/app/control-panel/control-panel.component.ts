import { Component, OnDestroy, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ControlPanelComponent implements OnInit,OnDestroy {
  public classB;
  public classI;
  public classU;
  public boldSubscribe;
  public interlacedSubscribe;
  public underlineSubscribe;

  constructor(private _textService: TextService) { }

  ngOnInit() {
    this.getStyles();
  }
  ngOnDestroy() {
    this.boldSubscribe.unsubscribe();
    this.interlacedSubscribe.unsubscribe();
    this.underlineSubscribe.unsubscribe();
  }
  // On word select , check styles to highlight current styles applied
  getStyles(): void {
    this.boldSubscribe = this._textService.classBold.subscribe((data) => {
      this.classB = data;
    });
    this.interlacedSubscribe = this._textService.classItalic.subscribe((data) => {
      this.classI = data;
    });
    this.underlineSubscribe = this._textService.classUnderline.subscribe((data) => {
      this.classU = data;
    });
  };

  // Apply style to selected word
  saveClass(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    this._textService.tagName = target.textContent;
    this._textService.wrapText();
  }

}
