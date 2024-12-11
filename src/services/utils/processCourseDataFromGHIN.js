import { set } from '@/utils/localStorage';
import { setCourseData } from '@/services/utils';

export default function processCourseDataFromGHIN(data) {
  let courses = ['dc', 'mg', 'mw', 'or', 'pa', 'tp'];
  let courseReplacements = {
    'Deer Creek': 'Course',
    Magnolia: 'Course',
    Marshwood: 'Course',
    Oakridge: 'Course',
    Palmetto: 'Course',
    Point: 'Course',
  };
  let teeReplacements = {
    Championship: 'CH',
    Tournament: 'T',
    Club: 'C',
    Medal: 'M',
    Short: 'SCRS',
    Course: 'CRS',
    Island: 'ISL',
    Skidaway: 'SK',
  };
  let courseData = [];

  courses.forEach(addData);

  function addData(item, index) {
    let course = item;
    let teeSets = data[index].TeeSets;
    teeSets.forEach(buildArray);
    function buildArray(item) {
      switch (item.Gender) {
        case 'Male':
          pushData('m');
          break;
        case 'Female':
          pushData('w');
          break;
        default:
          break;
      }
      function pushData(gender) {
        let ratingArray = [];
        let slopeArray = [];
        let parArray = [];
        let mF = item.Gender;
        let rating = 'rating';
        let slope = 'slope';
        let par = 'par';
        let teeName = item.TeeSetRatingName;
        let newTeeName = teeName.replace(
          /Deer Creek|Magnolia|Marshwood|Oakridge|Palmetto|Point/gi,
          function (matched) {
            return courseReplacements[matched];
          }
        );
        let editedNewTeeName = newTeeName.replace('Course Island / Combo', 'Course/Island')
        let tee = editedNewTeeName.replace(
          /Championship|Tournament|Club|Medal|Course|Island|Skidaway/gi,
          function (matched) {
            return teeReplacements[matched];
          }
        );
        let ratingType = course + gender + rating;
        let slopeType = course + gender + slope;
        let parType = course + gender + par;
        let ratingValue = item.Ratings[0].CourseRating;
        let slopeValue = item.Ratings[0].SlopeRating;
        let parValue = 72;
        ratingArray.push(
          mF,
          course,
          ratingValue,
          rating,
          tee,
          ratingType,
          ratingValue,
          editedNewTeeName
        );
        slopeArray.push(
          mF,
          course,
          ratingValue,
          slope,
          tee,
          slopeType,
          slopeValue,
          editedNewTeeName
        );
        parArray.push(
          mF,
          course,
          ratingValue,
          par,
          tee,
          parType,
          parValue,
          editedNewTeeName
        );
        courseData.push(ratingArray, slopeArray, parArray);
      }
    }
  }

  let arrayTypes = ['rating', 'slope', 'par'];
  let genders = ['m', 'w'];
  let allCourseData = [];

  courses.forEach(createArrays);

  let allCourses = [];

  function createArrays(item) {
    let course = item;
    genders.forEach(createArray);

    function createArray(item) {
      let gender = item;
      let aCourseData = [];
      function create(dataType) {
        let data = courseData.filter((item) => item[1] === course);
        let filterText = `${course}${gender}${dataType}`;
        let arrays = data.filter((item) => item[5] === filterText);
        let array = arrays.map((item) => item[6]);
        array.sort(function (a, b) {
          return b - a;
        });
        aCourseData.push(array);
        array.unshift(filterText);
        allCourseData.push(array);
      }
      function createTees() {
        let data = courseData.filter((item) => item[1] === course);
        let arrays = data.filter(
          (item) => item[5] === `${course}${gender}rating`
        );
        arrays.sort(function (a, b) {
          return b[2] - a[2];
        });
        let array = arrays.map((item) => item[4]);
        aCourseData.push(array);
        array.unshift(`${course}${gender}tee`);
        allCourseData.push(array);
      }
      function createNames() {
        let data = courseData.filter((item) => item[1] === course);
        let arrays = data.filter(
          (item) => item[5] === `${course}${gender}rating`
        );
        arrays.sort(function (a, b) {
          return b[2] - a[2];
        });
        let array = arrays.map((item) => item[7]);
        aCourseData.push(array);
        array.unshift(`${course}${gender}teeName`);
        allCourseData.push(array);
      }

      createNames();
      createTees();
      create('rating');
      create('slope');
      create('par');
    }
  }
  set('allCourseData', allCourseData);
  setCourseData(allCourseData);
}
