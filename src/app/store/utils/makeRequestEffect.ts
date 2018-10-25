import { Actions as ActionsEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

type ActionWithPayload<P, D = any> = Action & { payload?: P; parentPayload?: D; };

interface ActionWithPayloadClass<P, D = any> {
  new (payload?: P, parentPayload?: D): ActionWithPayload<P, D>;
}

export const makeRequestEffect = <RequestPayload, SuccessPayload, FailurePayload>(
  actions$: ActionsEffect,
  requestActionType: string,
  requestFunction: (requestData?: RequestPayload) => Observable<SuccessPayload>,
  SuccessActionCreator: ActionWithPayloadClass<SuccessPayload, RequestPayload>,
  FailureActionCreator: ActionWithPayloadClass<FailurePayload, RequestPayload>,
): Observable<Action> => {
  return actions$.pipe(
    ofType(requestActionType),
    mergeMap<ActionWithPayload<RequestPayload>, ActionWithPayload<SuccessPayload, RequestPayload>>(
      ({ payload: requestPayload }) =>
        requestFunction(requestPayload).pipe(
          map<SuccessPayload, ActionWithPayload<SuccessPayload>>(
            responseData => new SuccessActionCreator(responseData, requestPayload)
          ),
          catchError(
            error => of(new FailureActionCreator(error, requestPayload))
          )
        )
    )
  );
};
