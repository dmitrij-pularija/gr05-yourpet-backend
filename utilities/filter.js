const moment = require('moment');

const filterNotices = ({ _id, category, search, age, gender }) => {
  const conditions = {};
  if (category === "own") conditions.owner = _id;
  if (category === "favorite") conditions.favorite = { $in: [_id] };
  if (!_id) conditions.category = category;

  if (search) {
    conditions.$or = [
      { title: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { name: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { breed: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { comments: { $regex: new RegExp(decodeURIComponent(search), "i") } },
    ];
  }

  // if (age) {
  //   const today = new Date();

  //   if (age === "1") {
  //     conditions.birthday = {
  //       $gte: new Date(
  //         today.getFullYear() - 2,
  //         today.getMonth(),
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //       $lt: new Date(
  //         today.getFullYear() - 1,
  //         today.getMonth(),
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //     };
  //   } else if (age === "2") {
  //     conditions.birthday = {
  //       $gte: new Date(
  //         today.getFullYear() - 3,
  //         today.getMonth(),
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //       $lt: new Date(
  //         today.getFullYear() - 2,
  //         today.getMonth(),
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //     };
  //   } else if (age === "3-12") {
  //     conditions.birthday = {
  //       $gte: new Date(
  //         today.getFullYear(),
  //         today.getMonth() - 12,
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //       $lt: new Date(
  //         today.getFullYear(),
  //         today.getMonth() - 3,
  //         today.getDate()
  //       ).toLocaleDateString("ru-RU"),
  //     };
  //   }
  // }
  if (gender) conditions.sex = gender;
console.log(age, gender);


if (age) {
  const currentDate = moment();
  conditions.$expr = { $or: [] };
  let startDateString, endDateString;
  const selectedAges = age.split(",");
console.log("selectedAges", selectedAges);

//     const today = new Date();
// let startDateString = '';
// let endDateString = '';

//     if (age === "1") {
//       startDateString = new Date(
//           today.getFullYear() - 2,
//           today.getMonth(),
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//         endDateString = new Date(
//           today.getFullYear() - 1,
//           today.getMonth(),
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//     } 
//     if (age === "2") {
//         startDateString = new Date(
//           today.getFullYear() - 3,
//           today.getMonth(),
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//         endDateString = new Date(
//           today.getFullYear() - 2,
//           today.getMonth(),
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//     } 
//     if (age === "3-12") {
//       startDateString = new Date(
//           today.getFullYear(),
//           today.getMonth() - 12,
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//       endDateString = new Date(
//           today.getFullYear(),
//           today.getMonth() - 3,
//           today.getDate()
//         ).toLocaleDateString("ru-RU");
//       };

  for (const selectedAge of selectedAges) {
    let startAge, endAge, type;

    if (selectedAge === '1') {
      startAge = 1;
      endAge = 2;
      type = 'years';
    }
    
    if (selectedAge === '2') {
      startAge = 2;
      endAge = 3;
      type = 'years';
    }
    
    if (selectedAge === '3-12') {
      startAge = 3;
      endAge = 12;
      type = 'months';
    }


    const startDate = currentDate.clone().subtract(endAge, type).startOf('day');
      const endDate = currentDate.clone().subtract(startAge, type).endOf('day');

    if (!startDateString || startDate.isBefore(startDateString)) startDateString = startDate.format('DD.MM.YYYY');
    if (!endDateString || endDate.isAfter(endDateString)) endDateString = endDate.format('DD.MM.YYYY');

   console.log(startDateString, endDateString);
   const condition = {
    $and: [
      {
        $gte: [
          { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
          { $dateFromString: { dateString: startDate.format('DD.MM.YYYY'), format: '%d.%m.%Y' } }
        ]
      },
      {
        $lte: [
          { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
          { $dateFromString: { dateString: endDate.format('DD.MM.YYYY'), format: '%d.%m.%Y' } }
        ]
      },
      {
        $regexMatch: {
          input: '$birthday',
          regex: /^\d{2}\.\d{2}\.\d{4}$/
        }
      }
    ]
  };
  conditions.$expr.$or.push(condition);
  }
};

console.log(conditions);

// conditions.$expr = {
//   $and: [
//     {
//       $gte: [
//         { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
//         { $dateFromString: { dateString: startDateString, format: '%d.%m.%Y' } }
//       ]
//     },
//     {
//       $lte: [
//         { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
//         { $dateFromString: { dateString: endDateString, format: '%d.%m.%Y' } }
//       ]
//     },
//     {
//       $regexMatch: {
//         input: '$birthday',
//         regex: /^\d{2}\.\d{2}\.\d{4}$/
//       }
//     }
//   ]
// };

// const con = {
//   $expr: {
//     $and: [
//       {
//         $gte: [
//           { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
//           { $dateFromString: { dateString: '23.05.2021', format: '%d.%m.%Y' } }
//         ]
//       },
//       {
//         $lte: [
//           { $dateFromString: { dateString: '$birthday', format: '%d.%m.%Y' } },
//           { $dateFromString: { dateString: '23.05.2022', format: '%d.%m.%Y' } }
//         ]
//       },
//       {
//         $regexMatch: {
//           input: '$birthday',
//           regex: /^\d{2}\.\d{2}\.\d{4}$/
//         }
//       }
//     ]
//   }
// };

// console.log(con);
  return conditions;
};

module.exports = filterNotices;