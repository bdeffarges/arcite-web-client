 import FileType from './model/file_type';

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
export const API_BASE_URL = '/api/v1';

// -----------------------------------------------------------------------------
// DIRECT ROUTE
// -----------------------------------------------------------------------------
export const DIRECT_BASE_URL = '/api';

// -----------------------------------------------------------------------------
// FILE TYPES
// -----------------------------------------------------------------------------

export const FILE_TYPE_RAW_DATA = new FileType(
  'rawDataFile',
  'Raw Data File',
  '/user_raw',
  'raw',
);

export const FILE_TYPE_META_DATA = new FileType(
  'metaDataFile',
  'Meta Data File',
  '/user_meta',
  'meta',
);


// -----------------------------------------------------------------------------
// DATA TRANSFORM TYPES
// -----------------------------------------------------------------------------

export const RAW_DATA_DATA_TRANSFORM = 'Raw Data';
export const RUNNING_DATA_TRANSFORM = 'Running';
export const EXECUTED_DATA_TRANSFORM = 'Executed';
