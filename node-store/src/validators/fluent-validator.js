'use-strict'

let errors = [];

function ValidationContrat() {
  errors = [];
}

ValidationContrat.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) errors.push({ message: message });
}

ValidationContrat.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min) errors.push({ message: message });
}

ValidationContrat.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) errors.push({ message: message });
}

ValidationContrat.prototype.isFixedLen = (value, len, message) => {
  if (!value.length != len) errors.push({ message: message });
}

ValidationContrat.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)'@\w+([-.]\w+)*\.\w+([-.]\w+)'$/)
  if (!reg.test(value)) errors.push({ message: message });
}

ValidationContrat.prototype.errors = () => {
  return errors;
}

ValidationContrat.prototype.clear = () => {
  errors = [];
}

ValidationContrat.prototype.isValid = () => {
  return errors.length == 0;
}

module.exports = ValidationContrat
