import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';
import { By } from '@angular/platform-browser';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the rating', () => {
    component.rating = 3;
    fixture.detectChanges();
    expect(component.rating).toBe(3);
  });

  it('should highlight stars when hovered over', () => {
    const stars = fixture.debugElement.queryAll(By.css('.star'));
    stars[2].triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(component.filledStars).toBe(3);
  });

  it('should un-highlight stars when mouse leaves', () => {
    const stars = fixture.debugElement.queryAll(By.css('.star'));
    stars[2].triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(component.filledStars).toBe(component.rating);
  });

});
