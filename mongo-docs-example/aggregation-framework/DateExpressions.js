// $month example

db.trips.aggregate([
    { $project: { "start time": 1, month_no: { $month: "$start time" } } },
]);
