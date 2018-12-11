const map = new WeakMap();

const data = obj => map.get(obj);

class User {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    this.id = apiObject.uid;
    this.username = apiObject.username;
    this.organization = apiObject.organization;
  }

  get id() {
    return data(this).id;
  }

  set id(id) {
    data(this).id = id;
  }

  get username() {
    return data(this).username;
  }

  set username(username) {
    data(this).username = username;
  }

  get organization() {
    return data(this).organization;
  }

  set organization(organization) {
    data(this).organization = organization;
  }

  toApi() {
    return {
      uid: this.id,
      username: this.username,
      organization: this.organization,
    };
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      organization: this.organization,
    };
  }
}

export default User;
