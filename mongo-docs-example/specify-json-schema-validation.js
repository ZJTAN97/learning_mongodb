// example collection with schema validation
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Student Object Validation",
      required: ["address", "name", "year", "major"],
      properties: {
        name: {
          bsonType: "string",
          description: "'name' must be a string and is required",
        },
        year: {
          bsonType: "int",
          minimum: 2017,
          maximum: 3017,
          description:
            "'year' must be an integer in [ 2017, 3017 ] and is required",
        },
        gpa: {
          bsonType: ["double"],
          description: "'gpa' must be a double if the field exists",
        },
        major: {
          enum: ["Computer Science", "Aerospace"],
        },
      },
    },
  },
});

// Example insert
db.students.insertOne({
  name: "Alice",
  year: NumberInt(2019),
  major: "Aerospace",
  gpa: Double(5.0),
  address: {
    city: "NYC",
    street: "33rd Street",
  },
});

// Example of combining Json Schema Validation with query operator validation
db.createCollection("sales", {
  validator: {
    $and: [
      {
        $expr: {
          $lt: ["$discountedPrice", "$price"],
        },
      },
      {
        $jsonSchema: {
          required: ["discountedPrice", "price"],
          properties: {
            discountedPrice: {
              bsonType: "number",
            },
            price: {
              bsonType: "number",
            },
          },
        },
      },
    ],
  },
});

db.sales.insert({
  discountedPrice: 20,
  price: 15,
});

// Creating a collection with validation containing enum
db.createCollection("shipping", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Shipping Country Validation",
      required: ["item", "country"],
      properties: {
        item: {
          bsonType: "string",
        },
        country: {
          enum: ["Singapore", "New Zealand", "Sweden", "Japan"],
        },
      },
    },
  },
});

// Validation for null values
