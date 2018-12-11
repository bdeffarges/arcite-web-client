// Takes file size in bytes and formats it nicely.
const fileSizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
export function formatFileSize(size) {
  let newSize = size;
  let steps = 0;
  while (newSize >= 1024) {
    newSize = Math.round(newSize / 1024);
    steps += 1;
  }

  return `${newSize}${fileSizeUnits[steps]}`;
}

export default {
  formatFileSize,
};
