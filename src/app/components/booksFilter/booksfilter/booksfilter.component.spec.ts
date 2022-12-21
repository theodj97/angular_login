import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksfilterComponent } from './booksfilter.component';

describe('BooksfilterComponent', () => {
  let component: BooksfilterComponent;
  let fixture: ComponentFixture<BooksfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksfilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
