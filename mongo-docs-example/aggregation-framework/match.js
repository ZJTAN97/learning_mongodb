/**
 * This file contains example for $match
 * Please use the companies.json and grades.json file to apply the following code
 */

// Filter based on founded_year between 2005 and 2010
db.companies.aggregate([
    { $match: { founded_year: { $gte: 2005, $lte: 2010 } } },
]);

db.companies.aggregate([
    { $match: { founded_year: { $in: [2005, 2006, 2007, 2008, 2009, 2010] } } },
]);

// Filter grades that class_id = 116
db.grades.aggregate([{ $match: { class_id: 116 } }]);

db.grades.find({ class_id: 116 });

// Using $elemMatch (used to query arrays in MQL)
// Filter grades based on type exam above the score of 85
db.grades.aggregate([
    {
        $match: {
            scores: { $elemMatch: { type: "exam", score: { $gt: 85 } } },
        },
    },
]);
