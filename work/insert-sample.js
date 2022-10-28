// Insert Into Collection 1
db.person.insertMany([
  {
    _id: 1,
    name: "Admin John Doe",
    age: 20,
    hobbies: ["programming", "sleeping"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    // problem document
    _id: 2,
    name: "Admin Docker Desktop",
    age: 10,
    hobbies: ["programming", "devops"],
    education: "intermediate",
  },
  {
    _id: 3,
    name: "Admin MongoDB Compass",
    age: 20,
    hobbies: ["programming", "databasing"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 4,
    name: "Admin Node",
    age: 20,
    hobbies: ["programming", "sleeping"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    // problem document
    _id: 5,
    name: "Admin JDK",
    age: 10,
    hobbies: ["programming", "devops"],
    education: "intermediate",
  },
  {
    _id: 6,
    name: "Admin Spring",
    age: 20,
    hobbies: ["programming", "databasing"],
    education: "intermediate",
    isEngineer: true,
  },
]);

// Insert Into Collection 2
db.user.insertMany([
  {
    _id: 1,
    name: "John Doe",
    age: 20,
    hobbies: ["exercise"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 2,
    name: "Docker Desktop",
    age: 10,
    hobbies: ["exercise"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 3,
    name: "MongoDB Compass",
    age: 20,
    hobbies: ["exercise"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 4,
    name: "Node",
    age: 20,
    hobbies: ["programming", "sleeping"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 5,
    name: "JDK",
    age: 10,
    hobbies: ["programming", "devops"],
    education: "intermediate",
    isEngineer: true,
  },
  {
    _id: 6,
    name: "Spring",
    age: 20,
    hobbies: ["programming", "databasing"],
    education: "intermediate",
    isEngineer: true,
  },
]);
