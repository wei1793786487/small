export function checkPhone(data) {
  if ((/^1[3456789]\d{9}$/.test(data))) {
    return true;
  }
}