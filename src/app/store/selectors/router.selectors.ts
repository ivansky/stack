import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouterState = createFeatureSelector<RouterReducerState>('router');
