import { Actions as ActionsEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

type ActionWithPayload<P> = Action & { payload?: P };

interface ActionWithPayloadClass<P> {
  new (payload?: P): ActionWithPayload<P>;
}

export const makeRequestEffect = <RequestPayload, SuccessPayload, FailurePayload>(
  actions$: ActionsEffect,
  requestActionType: string,
  requestFunction: (requestData?: RequestPayload) => Observable<SuccessPayload>,
  SuccessActionCreator: ActionWithPayloadClass<SuccessPayload>,
  FailureActionCreator: ActionWithPayloadClass<FailurePayload>,
): Observable<Action> => {
  return actions$.pipe(
    ofType(requestActionType),
    mergeMap<ActionWithPayload<RequestPayload>, ActionWithPayload<SuccessPayload>>(({ payload: formData }) =>
      requestFunction(formData).pipe(
        map<SuccessPayload, ActionWithPayload<SuccessPayload>>(responseData => new SuccessActionCreator(responseData)),
        catchError((error) => of(new FailureActionCreator(error)))
      )
    )
  );
};
