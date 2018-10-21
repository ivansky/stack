import { AuthEffects } from '../../modules/auth/auth.effects';
import { StackEffects } from '../../modules/stack/stack.effects';

const rootEffects = [
  AuthEffects,
  StackEffects,
];

export default rootEffects;
