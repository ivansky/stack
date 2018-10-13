import { Actions as ActionsEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action, ActionCreator } from './makeAction';

export const makeRequestEffect = <RequestPayload, SuccessPayload, FailurePayload>(
  actions$: ActionsEffect,
  requestAction: string,
  requestFunction: (requestData?: RequestPayload) => Observable<SuccessPayload>,
  successActionCreator: ActionCreator<SuccessPayload>,
  failureActionCreator: ActionCreator<FailurePayload>,
): Observable<Action<SuccessPayload>> =>
  actions$.pipe(
    ofType(requestAction),
    mergeMap<Action<RequestPayload>, Action<SuccessPayload>>(({ payload: formData }) =>
      requestFunction(formData).pipe(
        map<SuccessPayload, Action<SuccessPayload>>(responseData => successActionCreator(responseData)),
        catchError((error) => of(failureActionCreator(error)))
      )
    )
  );
