const moment = require("moment");

const ageOptions = {
  1: {
    startAge: 1,
    endAge: 2,
    type: "years",
  },
  2: {
    startAge: 2,
    endAge: 3,
    type: "years",
  },
  "3-12": {
    startAge: 3,
    endAge: 12,
    type: "months",
  },
};

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

  if (gender) conditions.sex = gender;

  if (age) {
    const currentDate = moment();
    conditions.$expr = { $or: [] };
    const selectedAges = age.split(",");

    for (const selectedAge of selectedAges) {
      const { startAge, endAge, type } = ageOptions[selectedAge];
      const startDate = currentDate
        .clone()
        .subtract(endAge, type)
        .startOf("day");
      const endDate = currentDate.clone().subtract(startAge, type).endOf("day");
      const condition = {
        $and: [
          {
            $gte: [
              {
                $dateFromString: {
                  dateString: "$birthday",
                  format: "%d.%m.%Y",
                },
              },
              {
                $dateFromString: {
                  dateString: startDate.format("DD.MM.YYYY"),
                  format: "%d.%m.%Y",
                },
              },
            ],
          },
          {
            $lte: [
              {
                $dateFromString: {
                  dateString: "$birthday",
                  format: "%d.%m.%Y",
                },
              },
              {
                $dateFromString: {
                  dateString: endDate.format("DD.MM.YYYY"),
                  format: "%d.%m.%Y",
                },
              },
            ],
          },
          {
            $regexMatch: {
              input: "$birthday",
              regex: /^\d{2}\.\d{2}\.\d{4}$/,
            },
          },
        ],
      };
      conditions.$expr.$or.push(condition);
    }
  }

  return conditions;
};

module.exports = filterNotices;