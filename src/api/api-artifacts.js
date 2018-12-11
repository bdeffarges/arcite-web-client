import axios from 'axios';

import { getUrl } from './api-utilities';
import Artifact from '../model/artifact';
// import GlobalArtifact from '../model/globalArtifact';
import { now } from '../utils/date-utils';

export function loadGlobalArtifacts() {
  // return axios.get(getUrl('/publish'))
  //   .then((res) => {
  //     const { data } = res;
  //     if (!data || !data.length) {
  //       return [];
  //     }
  //     return data.map((globalArtifact) => {
  //       const globalArtifactModel = new GlobalArtifact();
  //       globalArtifactModel.fromApi(globalArtifact);
  //       return globalArtifactModel;
  //     });
  //   });
  return new Promise((resolve) => { resolve({}); });
}

export function loadPublishedArtifacts(experimentId) {
  return axios.get(getUrl(`/experiment/${experimentId}/published`))
    .then((res) => {
      const { data } = res;
      if (!data || !data.length) {
        return [];
      }
      return data.map((artifact) => {
        const artifactModel = new Artifact();
        artifactModel.fromApi(artifact);
        return artifactModel;
      });
    });
}

export function publishArtifact(experimentId, transformId, description, artifact) {
  const postData = {
    transform: transformId,
    description,
    artifacts: [artifact],
  };

  return new Promise((resolve, reject) => {
    axios.post(getUrl(`/experiment/${experimentId}/publish`), postData).then(({ data }) => {
      const artifactModel = new Artifact();
      artifactModel.fromObject({
        id: data.uid,
        description,
        artifact,
        experimentId,
        transformId,
        publicationDate: now(),
      });
      resolve(artifactModel);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function unpublishArtifact(experimentId, artifactId) {
  return axios.delete(getUrl(`/experiment/${experimentId}/published/${artifactId}`));
}

export function publishArtifactGlobally(description, username, organization, artifact) {
  const postData = {
    description,
    owner: {
      organization,
      person: username,
    },
    items: [artifact],
  };

  return new Promise((resolve, reject) => {
    axios.post(getUrl('/publish'), postData).then(() => {
    }).catch((error) => {
      reject(error);
    });
  });
}

export function unpublishArtifactGlobally(artifactId) {
  return axios.delete(getUrl(`published/${artifactId}`));
}

export default {
  loadGlobalArtifacts,
  loadPublishedArtifacts,
  publishArtifact,
  publishArtifactGlobally,
  unpublishArtifact,
  unpublishArtifactGlobally,
};
