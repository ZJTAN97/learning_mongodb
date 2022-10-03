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
    location: ["Nepal"],
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
