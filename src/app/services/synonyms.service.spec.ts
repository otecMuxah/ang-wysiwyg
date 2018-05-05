/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { synonymsService } from './synonyms.service';

describe('synonymsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [synonymsService]
    });
  });

  it('should ...', inject([synonymsService], (service: synonymsService) => {
    expect(service).toBeTruthy();
  }));
});
