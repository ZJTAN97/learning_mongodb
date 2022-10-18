// Project start station name in uppercase
db.trips.aggregate([
    { $project: { "start station name": { $toUpper: "$start station name" } } },
]);

// Project station name and have a field that denotates if theres Howard
db.trips.aggregate([
    {
        $project: {
            "start station name": 1,
            howard_flag: {
                $regexMatch: { input: "$start station name", regex: "Howard" },
            },
        },
    },
]);

// concat start and end station name
db.trips.aggregate([
    {
        $project: {
            "start station name": 1,
            journey: {
                $concat: [
                    "$start station name",
                    " ----> ",
                    "$end station name",
                ],
            },
        },
    },
]);
