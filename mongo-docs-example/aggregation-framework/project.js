/**
 * This file contains example for $project
 * Please use the companies.json, grades.json, zips.json and trips.json file to apply the following code
 */

// Filter based on founded_year between 2005 and 2010
// Project only "founded_year" and "category_code"
db.companies.aggregate([
    { $match: { founded_year: { $gte: 2005, $lte: 2010 } } },
    { $project: { founded_year: 1, category_code: 1, _id: 0 } },
]);

// Project only external_url in companies
// which is nested within external_links
db.companies.aggregate([
    { $project: { "external_links.external_url": 1, _id: 0 } },
]);

// creating a new field based on existing field
db.companies.aggregate([
    {
        $project: {
            number_of_employees: 1,
            _id: 0,
            number_of_employees_K: { $divide: ["$number_of_employees", 1000] },
        },
    },
]);

// combining $match and $project
db.trips.aggregate([
    { $match: { "stop time": { $gt: ISODate("2016-01-05") } } },
]);

db.trips.aggregate([
    {
        $project: {
            "start station location": "$start station location.coordinates",
            "end station location": "$end station location.coordinates",
            _id: 0,
        },
    },
]);

db.zips.aggregate([
    { $match: { pop: { $gt: 40000 } } },
    { $project: { _id: 0, zip: 1, pop: 1 } },
]);
