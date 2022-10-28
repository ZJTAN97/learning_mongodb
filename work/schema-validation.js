db.person.aggregate(
  [
    {
      $merge: {
        into: "user",
        on: "_id",
        whenMatched: "replace",
        whenNotMatched: "insert",
      },
    },
  ],
  {
    comment: "failingDocumentId",
  }
);

// Flagging out records
try {
  db.person.aggregate(
    [
      {
        $merge: {
          into: "user",
          on: "_id",
          whenMatched: "replace",
          whenNotMatched: "insert",
        },
      },
    ],
    {
      bypassDocumentValidation: false,
    }
  );
} catch (error) {
  console.log("[ERROR]");
  console.log(error);
}

// Retrieve the current validator for the "user" collection
var schema = db.getCollectionInfos({ name: "user" })[0].options.validator;

// Find any documents not matching the schema
db.students.find({ $nor: [schema] });

db.person.aggregate([
  {
    $match: {
      $or: [schema],
    },
  },
  {
    $merge: {
      into: "user",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
]);

db.person.aggregate([
  {
    $match: {
      $nor: [schema],
    },
  },
  {
    $out: {
      db: "practice",
      coll: "users_dump",
    },
  },
]);
