// Collection 1
db.createCollection("person", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Person schema",
      required: ["name", "age", "hobbies", "education"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "number" },
        hobbies: {
          bsonType: "array",
          minItems: 1,
          uniqueItems: true,
          items: { bsonType: "string" },
        },
        education: {
          enum: ["basic", "intermediate", "advanced"],
        },
      },
    },
  },
});

// Collection 2
db.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Person schema",
      required: ["name", "age", "hobbies", "education", "isEngineer"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "number" },
        hobbies: {
          bsonType: "array",
          minItems: 1,
          uniqueItems: true,
          items: { bsonType: "string" },
        },
        education: {
          enum: ["basic", "intermediate", "advanced"],
        },
        isEngineer: {
          bsonType: "bool",
        },
      },
    },
  },
});
