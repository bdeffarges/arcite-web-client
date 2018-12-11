import elasticlunr from 'elasticlunr';
import _ from 'lodash';

export function createIndex(ref, fields) {
  const index = elasticlunr(function init() {
    this.setRef(ref);
    _.each(fields, field => this.addField(field));
  });
  return index;
}

export function addDocs(index, data, mapFunction) {
  _.each(data, (d) => {
    if (mapFunction) {
      index.addDoc(mapFunction(d));
    } else {
      index.addDoc(d);
    }
  });
}

export function removeDoc(index, doc) {
  index.remove(doc);
}
