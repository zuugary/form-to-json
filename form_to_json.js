/**
 * Name is multiple?
 *
 * @param {string} val - element.name
 * @return {boolean} multiple = true
 */
const isMultipleName = val => {
  return !!val.match(/\[\]/);
};

/**
 * Remove bracket for name
 *
 * @param {string} val - element name
 * @return {string} remove bracket name
 */
const removeBracket = val => {
  return val.replace(/\[\]/, '');
};

/**
 * Get multiple element is
 *
 * @param {HTMLElement} $el - html elemnt
 * @return {boolean} multiple = true
 */
const isMultiSelect = $el => $el.options && $el.multiple;

/**
 * Element type is checkbox?
 *
 * @param {string} type - element.type
 * @return {boolean} checkbox = true
 */
const isCheckbox = type => type === 'checkbox';

/**
 * Get selected options from a multi-select as an array
 * @param {HTMLOptionsCollection} $options - options for the select
 * @return {array} an array of selected option values
 */
const getSelectedValues = $options => [].reduce.call($options, (arr, opt) => opt.selected ? arr.concat(opt.value) : arr, []);

/**
 * All elements data change to JSON
 * Not support: multi checkbox
 *
 * @param {array} elements - document.querySelector('form').elements
 * @return {object} JSON from parameter
 */
const toJSON = elements => [].reduce.call(elements, (data, element) => {
  const json = data;
  const name = element.name;
  const type = element.type;

  if (isMultipleName(name)) {
    const rmName = removeBracket(name);
    if (isCheckbox(type)) json[rmName] = (json[rmName] || []).concat(element.checked);
    else {
      const vals = Array.from(element.options).map((opt, i) => {
        if (opt.selected && opt.value !== '') return opt.value;
        return null;
      });
      const result = vals.filter(v => v !== null);
      json[rmName] = (json[rmName] || []).concat(result);
    }
  } else if (isMultiSelect(element)) {
    json[name] = getSelectedValues(element);
  } else if (isCheckbox(type)) {
    json[name] = element.checked;
  } else {
    json[name] = element.value;
  }

  return json;
}, {});

/**
 * Form element change to JSON
 *
 * @param {HTMLFormElement} $form - document.querySelector('form')
 * @return {object} form data change to JSON
 */
const formToJSON = ($form) => {
  const filtered = Array.from($form.elements).filter($el => $el.name !== '');
  const json = toJSON(filtered) || {};
  return json;
};

module.exports = formToJSON;
