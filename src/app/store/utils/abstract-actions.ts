export abstract class AbstractAction<Payload = undefined, ParentPayload = undefined> {
  payload?: Payload;
  parentPayload?: ParentPayload;

  constructor(payload?: Payload, parentPayload?: ParentPayload) {
    if (payload) {
      this.payload = payload;
    }

    if (parentPayload) {
      this.parentPayload = parentPayload;
    }
  }
}
