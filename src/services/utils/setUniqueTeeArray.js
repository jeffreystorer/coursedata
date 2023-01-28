import { teeValues } from '@/data/index';

import { set } from '@/utils/localStorage';

export default function setUniqueTeeArray(courseData) {
  let uniqueTeeArray = [];
  let courses = ['dc', 'mg', 'mw', 'or', 'pa', 'tp'];
  courses.forEach(createUniqueTeeArray);
  function createUniqueTeeArray(item) {
    const course = item;
    const courseIndex = courses.indexOf(course);
    const mTeeLabels = courseData[0][0][courseIndex];
    const mTeeValues = courseData[1][0][courseIndex];
    const wTeeLabels = courseData[0][1][courseIndex];
    const wTeeValues = courseData[1][1][courseIndex];
    const allTeeLabels = mTeeLabels.concat(wTeeLabels);
    let allReplacedTeeLabels = [];
    allTeeLabels.forEach(replaceShort);
    function replaceShort(item, index) {
      let replacements = {
        'Course Short': 'Short',
        'Short Course': 'Short',
      };
      allReplacedTeeLabels[index] = item.replace(
        /Short Course|Course Short/gi,
        function (matched) {
          return replacements[matched];
        }
      );
    }
    const uniqueLabels = [...new Set(allReplacedTeeLabels)];
    const allTeeValues = mTeeValues.concat(wTeeValues);
    const uniqueValues = [...new Set(allTeeValues)];
    let i;
    for (i = 0; i < uniqueValues.length; i++) {
      let obj = { value: uniqueValues[i], label: uniqueLabels[i] };
      uniqueTeeArray.push(obj);
    }
  }
  const finalArray = uniqueTeeArray.filter(function (obj) {
    const key = obj.value + '|' + obj.label;
    if (!this[key]) {
      this[key] = true;
      return true;
    }
  }, Object.create(null));

  const clonedFinalArray = JSON.parse(JSON.stringify(finalArray));
  /* clonedFinalArray.push(
    { value: 'NNN', label: 'New' },
    { value: 'XXX', label: 'More New' }
  ); */
  let newItems = [];
  clonedFinalArray.forEach(compare);
  function compare(item) {
    const teeObj = item;
    const value = teeObj.value;
    if (teeValues.indexOf(value) === -1) newItems.push(value);
  }
  set('newItems', newItems);

  const clonedTeeValues = JSON.parse(JSON.stringify(teeValues));
  //clonedTeeValues.push('OMT1', 'OMT2');
  let omittedItems = [];
  clonedTeeValues.forEach(compareOmitted);
  function compareOmitted(item) {
    const aTeeValue = item;
    const found = finalArray.find((obj) => obj.value === aTeeValue);
    if (!found) omittedItems.push(aTeeValue);
  }
  set('omittedItems', omittedItems);
  console.log('😊😊 finalArray', finalArray);

  set('uniqueTeeArray', finalArray);
}
