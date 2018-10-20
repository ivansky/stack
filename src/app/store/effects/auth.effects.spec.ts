import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthEffects } from './auth.effects';
import { Subject, of, throwError, ReplaySubject } from 'rxjs';
import * as authActions from '../actions/auth.actions';
import { ApiService } from '../../api/api.service';
import { LoginData, User } from '../../models/auth.models';

describe('Auth Effects', () => {
  let effects: AuthEffects;
  let actions: Subject<any>;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        AuthEffects,
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('apiService', ['login'])
        },
        provideMockActions(() => actions),
        // other providers
      ],
    });

    effects = TestBed.get(AuthEffects);
    service = TestBed.get(ApiService);
  });

  describe('login$ effect', () => {
    const loginData: LoginData = {
      email: 'email',
      password: 'password',
    };


    beforeEach(() => {
      actions = new ReplaySubject(1);
    });

    it('should handle success request', () => {
      const user: User = {
        stackId: 'stackId',
        email: 'email',
        name: 'name',
        avatar: 'avatar',
      };
      const successAction = authActions.loginSuccess(user);

      service.login.and.returnValue(of(user));
      actions.next(authActions.login(loginData));

      effects.login$.subscribe(result => {
        expect(result).toEqual(successAction);
      });
    });

    it('should catch request error', () => {
      const error: any = {
        message: 'fail',
      };
      const failureAction = authActions.loginFailure(error);

      service.login.and.returnValue(throwError(error));

      effects.login$.subscribe(result => {
        expect(result).toEqual(failureAction);
      });
    });
  });
});
