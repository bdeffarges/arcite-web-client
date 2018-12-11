import { getMomentFromApi, formatNice } from '../utils/date-utils';

const map = new WeakMap();

const data = obj => map.get(obj);

class GlobalArtifact {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    data(this).id = apiObject.uid;
    data(this).publicationDate = getMomentFromApi(apiObject.date);
    data(this).description = apiObject.globalPubInf.description;
    data(this).artifact = apiObject.globalPubInf.items[0];
    data(this).user = apiObject.globalPubInf.owner.person;
    data(this).organization = apiObject.globalPubInf.owner.organization;
  }

  get publicationDate() {
    return formatNice(data(this).publicationDate);
  }

  get id() {
    return data(this).id;
  }

  get key() {
    return data(this).id;
  }

  get artifact() {
    return data(this).artifact;
  }

  get description() {
    return data(this).description;
  }

  get user() {
    return data(this).user;
  }

  get organization() {
    return data(this).organization;
  }

  static get global() {
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      key: this.key,
      publicationDate: this.publicationDate,
      artifact: this.artifact,
      description: this.description,
      user: this.user,
      organization: this.organization,
      global: this.global,
    };
  }
}

export default GlobalArtifact;
