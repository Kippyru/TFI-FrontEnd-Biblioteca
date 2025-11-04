import { TestBed } from '@angular/core/testing';

import { ListLibrosService } from './list-libros';

describe('ListLibros', () => {
  let service: ListLibrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListLibrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
