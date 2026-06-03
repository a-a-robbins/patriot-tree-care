import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, US_STATES } from './address.component';

function createGroup() {
  return new FormGroup({
    address1: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address2: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    state: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    zipcode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)],
    }),
  });
}

describe('Address', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Address],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Address);
    fixture.componentRef.setInput('group', createGroup());
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders all five address fields', () => {
    const fixture = TestBed.createComponent(Address);
    fixture.componentRef.setInput('group', createGroup());
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input');
    const selects = fixture.nativeElement.querySelectorAll('select');

    expect(inputs.length).toBe(4);
    expect(selects.length).toBe(1);
  });

  it('renders all US states in the dropdown', () => {
    const fixture = TestBed.createComponent(Address);
    fixture.componentRef.setInput('group', createGroup());
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('select option');
    expect(options.length).toBe(US_STATES.length + 1);
  });

  it('shows validation error for address1 when touched and empty', () => {
    const fixture = TestBed.createComponent(Address);
    fixture.componentRef.setInput('group', createGroup());
    fixture.detectChanges();

    const group = fixture.componentInstance.group;
    group.controls.address1.markAsTouched();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.field-error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('street address');
  });

  it('shows required indicator for required fields', () => {
    const fixture = TestBed.createComponent(Address);
    fixture.componentRef.setInput('group', createGroup());
    fixture.detectChanges();

    const spans = fixture.nativeElement.querySelectorAll('label span');
    const texts = Array.from(spans).map((s) => (s as HTMLElement).textContent);

    expect(texts).toContain('Address *');
    expect(texts).toContain('City *');
    expect(texts).toContain('ZIP *');
    expect(texts).toContain('Address 2 (optional)');
  });
});
