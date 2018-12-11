import { API_BASE_URL } from '../constants';

export function getUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

export function getArtifactUrl(artifact) {
  return `${API_BASE_URL}/download/experiment/${artifact.experimentId}/transform/${artifact.transformId}/${artifact.artifact}`;
}

export function getGlobalArtifactUrl(globalArtifact) {
  // todo remove
  return `${API_BASE_URL}/publish/${globalArtifact.id}`;
}

export default {
  getUrl,
};
