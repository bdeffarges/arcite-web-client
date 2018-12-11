import { getMomentFromApi, formatNice } from '../utils/date-utils';

const map = new WeakMap();

const data = obj => map.get(obj);

class Artifact {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    data(this).id = apiObject.uid;
    data(this).publicationDate = getMomentFromApi(apiObject.date);
    data(this).artifact = apiObject.pubInfo.artifacts[0];
    data(this).description = apiObject.pubInfo.description;
    data(this).transformId = apiObject.pubInfo.transform;
    data(this).experimentId = apiObject.pubInfo.exp;
  }

  fromObject(object) {
    data(this).id = object.id;
    data(this).publicationDate = object.publicationDate;
    data(this).artifact = object.artifact;
    data(this).description = object.description;
    data(this).transformId = object.transformId;
    data(this).experimentId = object.experimentId;
  }

  get publicationDate() {
    return formatNice(data(this).publicationDate);
  }

  get key() {
    return `${this.transformId}-${this.artifact}`;
  }

  get id() {
    return data(this).id;
  }

  get artifact() {
    return data(this).artifact;
  }

  get description() {
    return data(this).description;
  }

  get transformId() {
    return data(this).transformId;
  }

  get experimentId() {
    return data(this).experimentId;
  }

  get published() {
    return !!this.id;
  }

  toJSON() {
    return {
      id: this.id,
      published: this.published,
      publicationDate: this.publicationDate,
      artifact: this.artifact,
      description: this.description,
      experimentId: this.experimentId,
      transformId: this.transformId,
    };
  }
}

export default Artifact;
