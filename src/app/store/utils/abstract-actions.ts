export abstract class AbstractAction<Payload> {
  payload: Payload;

  constructor(payload?: Payload) {
    if (payload) {
      this.payload = payload;
    }
  }
}
