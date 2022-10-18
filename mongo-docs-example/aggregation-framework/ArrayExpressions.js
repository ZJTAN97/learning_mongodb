// $isArray
db.posts.aggregate([
    { $project: { tags: 1, _id: 0, isArray: { $isArray: "$tags" } } },
]);

// $first
db.posts.aggregate([
    { $project: { tags: 1, _id: 0, firstElemArray: { $first: "$tags" } } },
]);

// return a selected element
db.posts.aggregate([
    {
        $project: {
            tags: 1,
            _id: 0,
            thirdItem: { $arrayElemAt: ["$tags", 2] },
        },
    },
]);

// retun only third element array is daisy
db.posts.aggregate([
    { $project: { tags: 1, _id: 0 } },
    { $match: { $expr: { $eq: [{ $arrayElemAt: ["$tags", 2] }, "daisy"] } } },
]);

// $map example
// x is the variable after the map
// Note the $$, it means iterate through each element in the array
db.posts.aggregate([
    {
        $project: {
            tags: 1,
            tags_upper: {
                $map: { input: "$tags", as: "x", in: { $toUpper: "$$x" } },
            },
        },
    },
]);
