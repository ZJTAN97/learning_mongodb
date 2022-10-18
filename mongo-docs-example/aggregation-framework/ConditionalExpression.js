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
