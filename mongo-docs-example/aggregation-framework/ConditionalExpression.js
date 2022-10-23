db.companies.aggregate([
    {
        $project: {
            number_of_employees: { $ifNull: ["$number_of_employees", 0] },
            _id: 0,
        },
    },
]);

// $cond
db.companies.aggregate([
    {
        $project: {
            number_of_employees: 1,
            size_class: {
                $cond: {
                    if: { $gt: ["$number_of_employees", 10000] },
                    then: "large",
                    else: "not large",
                },
            },
        },
    },
]);

// $switch
db.companies.aggregate([
    {
        $project: {
            number_of_employees: 1,
            size_class: {
                $switch: {
                    branches: [
                        {
                            case: { $gt: ["$number_of_employees", 10000] },
                            then: "large",
                        },
                        {
                            case: { $gt: ["$number_of_employees", 1000] },
                            then: "mid-sized",
                        },
                    ],
                    default: "small",
                },
            },
        },
    },
]);

// on companies collection
// return "name field" and a new field that show number of offices for each company
// return only documents where number of offices is greater than 20
db.companies.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            no_of_offices: { $size: "$offices" },
        },
    },
    {
        $match: { no_of_offices: { $gt: 20 } },
    },
]);

// on zips collection, use $project and $switch
// Low --> population < 1000
// Mid --> >= 1000 && < 10000
// High --> >10000

db.zips.aggregate([
    {
        $project: {
            _id: 0,
            zip: 1,
            city: 1,
            pop: 1,
            "population class": {
                $switch: {
                    branches: [
                        {
                            case: {
                                $lt: ["$pop", 1000],
                            },
                            then: "low",
                        },
                        {
                            case: {
                                $gt: ["$pop", 10000],
                            },
                            then: "high",
                        },
                    ],
                    default: "mid",
                },
            },
        },
    },
]);
