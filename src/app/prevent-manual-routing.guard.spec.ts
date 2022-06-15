import { TestBed } from '@angular/core/testing';

import { PreventManualRoutingGuard } from './prevent-manual-routing.guard';

describe('PreventManualRoutingGuard', () => {
  let guard: PreventManualRoutingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventManualRoutingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
