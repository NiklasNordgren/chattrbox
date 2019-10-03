class Store {
  constructor(storageApi) {
    this.api = storageApi;
  }
  get() {
    return this.api.getItem(this.key);
  }
  set(value) {
    this.api.setItem(this.key, value);
  }
}

export class UserStore extends Store {
  constructor(key) {
    super(sessionStorage);
    this.key = key;
  }
}

//Silver Challenge: Caching Messages
export class MessageStore extends Store {
  constructor(key) {
    super(localStorage);
    this.key = key;
  }

  set(message) {
    let messages = JSON.parse(super.get()) || [];
    messages.push(message);
    super.set(JSON.stringify(messages));
  }

  get() {
    return JSON.parse(super.get());
  }

}
