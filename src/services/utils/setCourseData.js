import { setUniqueTeeArray } from '@/services/utils';
import { set } from '@/utils/localStorage';

export default function setCourseData(values) {
  let mTeeLabels = [];
  let mTeeValues = [];
  let mRatings = [];
  let mSlopes = [];
  let mPars = [];
  let wTeeLabels = [];
  let wTeeValues = [];
  let wRatings = [];
  let wSlopes = [];
  let wPars = [];

  let arrays = {
    0: mTeeLabels,
    1: mTeeValues,
    2: mRatings,
    3: mSlopes,
    4: mPars,
    5: wTeeLabels,
    6: wTeeValues,
    7: wRatings,
    8: wSlopes,
    9: wPars,
  };

  values.forEach(pushToArray);
  function pushToArray(item, index) {
    item.splice(0, 1);
    arrays[index % 10].push(item);
  }
  const teeLabels = [mTeeLabels, wTeeLabels];
  const teeValues = [mTeeValues, wTeeValues];
  const ratings = [mRatings, wRatings];
  const slopes = [mSlopes, wSlopes];
  const pars = [mPars, wPars];
  const courseData = [teeLabels, teeValues, ratings, slopes, pars];
  set('courseData', courseData);
  setUniqueTeeArray(courseData);
}
