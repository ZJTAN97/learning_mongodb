/**
 * This file contains example for Arithmetic Operators
 * Refer to documentation for better info and examples
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/
 * Please use the companies.json, grades.json, zips.json and trips.json file to apply the following code
 */

// Project new field based tripduration in hours with 1 decimal place
// using $divide and $round
db.trips.aggregate([
    {
        $project: {
            tripduration: 1,
            tripduration_hours: {
                $round: [{ $divide: ["$tripduration", 60] }, 1],
            },
        },
    },
]);

// return tripduration 3x the birth year
db.trips.aggregate([
    { $match: { birth_year: { $gt: { $multiply: ["$tripduration", 3] } } } },
]); // wont work, need $expr

db.trips.aggregate([
    {
        $match: {
            $expr: {
                $gt: [{ $multiply: ["$tripduration", 3] }, "$birth_year"],
            },
        },
    },
]);

// use $divide and $subtract on trips collection
// return difference between "start time" and "stop time" fields in minutes
// $subtract on two dates --> returns difference in milliseconds
db.trips.aggregate([
    {
        $project: {
            _id: 0,
            "tripduration": 1,
            "journey time": {
                $divide: [{ $subtract: ["$stop time", "$start time"] }, 1000],
            },
        },
    },
]);
