/**
 * Format date in a specific format, used for rendering
 * 
 * @param {Date|Object|number} rawDate - Can be either:
 *                                         - a date, 
 *                                         - a BigNumber Object
 *                                         - an epoch number
 * @return {string} - A formatted date string DD/MM/YYYY - HH:MM
 *                    Example: If the Date oject represent 
 *                    the 10th of november, 2000, at 10:00am, the
 *                    function will return `10/08/2000 - 10:00`
 */
function formatDate(rawDate) {
  const date = new Date(maybeConvertToNumber(rawDate));
  return (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes();
}

/**
 * Retrieve and parse a JSON object stored on a remote server
 * 
 * @param {string} fileName - Either the filename or relative path to the file
 * @return {Object} - Return a promise with the JSON object
 */
function getJSON(fileName) {
  return new Promise((resolve, reject) => {
    $.getJSON(fileName)
    .done((data) => {
      resolve(data);
    })
    .fail((error) => {
      reject(error);
    });
  });
}

/**
 * Convert a BigNumber instance to a number. Pass-through number if number is given.
 * 
 * @param {Object|number} number - BigNumber instance or a number
 * @return {number}
 */
function maybeConvertToNumber(number) {
  return (number.constructor.name === 'BigNumber') ?  number.toNumber() : number;
}

export {formatDate, getJSON, maybeConvertToNumber};