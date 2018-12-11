import _ from 'lodash';

import Sample from './sample';

const map = new WeakMap();

const data = obj => map.get(obj);

class Design {
  constructor(description) {
    map.set(this, {
      description,
      samples: [],
    });
  }

  toApi() {
    const samples = _.flatMap(this.samples, (sample) => {
      const conditions = _.values(sample.conditions).map(condition => (
        {
          category: condition.name,
          name: condition.value,
          description: condition.description,
        }
      ));
      return {
        conditions,
      };
    });

    return {
      description: this.description,
      samples,
    };
  }

  get description() {
    return data(this).description;
  }

  set description(description) {
    data(this).description = description;
  }

  get samples() {
    return data(this).samples;
  }

  addSample(sample) {
    if (sample instanceof Sample) {
      if (!this.samples) {
        data(this).samples = [sample];
      } else {
        data(this).samples.push(sample);
      }
    }
  }

  removeSample(sample) {
    if (sample instanceof Sample) {
      if (this.samples) {
        const idx = this.samples.indexOf(sample);
        if (idx < 0) {
          return;
        }
        this.samples.splice(idx, 1);
      }
    }
  }

  getConditionNames() {
    return _.uniq(
            _.values(
              _.flatMap(
                this.samples, sample => _.values(sample.conditions)
              )
            )
            .map(
              condition => condition.name
            )
          );
  }

  getConditionValues(conditionName) {
    return _.uniq(
            _.values(
              _.flatMap(
                this.samples, sample => _.values(sample.conditions)
              )
            )
            .filter(
              condition => condition.name === conditionName
            )
            .map(
              condition => condition.value)
            );
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      samples: JSON.stringify(this.samples),
    };
  }
}

export default Design;
