import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { DeactivateGuardService } from './deactivate-guard.service';

export class CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

describe('DeactivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeactivateGuardService = TestBed.get(DeactivateGuardService);
    expect(service).toBeTruthy();
  });
});
