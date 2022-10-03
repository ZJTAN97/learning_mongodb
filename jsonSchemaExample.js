// applying JSON Schema Validation
db.runCommand({
  collMod: "peaks",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Document describing mounain peak",
      required: ["name", "height", "location"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string and required",
        },
        height: {
          bsonType: "number",
          description: "Height must be a number and required",
          minimum: 100,
          maximum: 10000,
        },
        location: {
          bsonType: "array",
          description: "Location must be an array of strings",
          minItems: 1,
          uniqueItems: true,
          items: {
            bsonType: "string",
          },
        },
        ascents: {
          bsonType: "object",
          description: "Ascent attempts information",
          required: ["total"],
          properties: {
            total: {
              bsonType: "number",
              description: "Total number of ascents must be more than 0",
              minimum: 0,
            },
          },
        },
      },
    },
  },
  // strict: MongoDB applies validation rules to all inserts and updates
  // moderate: MongoDB applies validation rules to inserts and to updates on existing documents that already fufill the validation criteria.
  // Updates to existing documents taht do not fufill the validation criteria are not checked for validation.
  validationLevel: "moderate",
  // error: MongoDB rejects any insert or update that violates the validation criteria
  // warn: MongoDB logs any violations but allows the insertion or update to proceed
  validationAction: "warn",
});

// Applying many to test JSON Schema Validation Behaviour
db.peaks.insertMany([
  {
    name: "Bukit Timah Hill",
    height: 400,
    location: ["Singapore"],
    ascents: {
      first: {
        year: 1953,
      },
      first_winter: {
        year: 1980,
      },
      total: 5656,
    },
  },
  {
    name: "Manaslu",
    height: 8163,
    location: "Nepal",
    ascents: {
      first: {
        year: 1953,
      },
      first_winter: {
        year: 1980,
      },
      total: 5656,
    },
  },
  {
    name: "Mount Biang",
    height: 1000,
    location: ["Brunei"],
    ascents: {
      first: {
        year: 1953,
      },
      first_winter: {
        year: 1980,
      },
      total: 5656,
    },
  },
]);

const sample = {
  validator: {
    $jsonSchema: {
      // almost always object at the root level
      bsonType: "object",
      // Optional description
      description: "Document describing a mountain peak",
      // Only accept array containing list of document fields that must be present in every document in the collection
      required: ["name"],
      // You can also define fields that are not in the required array
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string and is required",
        },
      },
    },
    // strict: MongoDB applies validation rules to all inserts and updates
    // moderate: MongoDB applies validation rules to inserts and to updates on existing documents that already fufill the validation criteria.
    // Updates to existing documents taht do not fufill the validation criteria are not checked for validation.
    validationLevel: "moderate",
    // error: MongoDB rejects any insert or update that violates the validation criteria
    // warn: MongoDB logs any violations but allows the insertion or update to proceed
    validationAction: "warn",
  },
};

db.zips.aggregate([
  {
    $match: {
      city: "HOUSTON",
      pop: {
        $gt: 40000
      }
    },
  },
  {
    $project: {
        "_id": 0,
        "zip": 1,
        "pop": 1
    }
  }
]);
