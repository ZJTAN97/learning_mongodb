// return trips with duration > 100mins
// note that for aggregation $match, you have to use $expr for expression operators
db.trips.aggregate([{ $match: { $expr: { $gt: ["$tripduration", 100] } } }]);

// $project do not need $exper for expression operators
db.trips.aggregate([
    {
        $project: {
            tripduration: 1,
            over100flag: { $gt: ["$tripduration", 100] },
        },
    },
]);
