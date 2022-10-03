## To use with Docker

```

# to access mongosh
docker run -it --network learning_mongodb_default --rm mongo mongosh --host learning_mongodb_mongo_1 test

docker run -it --network learning_mongodb_default --rm mongo mongosh --host mongo-db

```

## Documents

- Documents are polymorphic, do not have a fixed structure
- Changes can be made easily to an individual document structure, e.g. new field value pairs can be added
- Uses JSON format
- "\_id" field is auto populated
- Can have nested documents --> which looks like a nested JSON

```

{
    "_id": "100001",
    "customer_name": "Frank",
    "phone": [1000,10000],
    "address": {
        "street": "55 Nice Street",
        "town": "Nicetown",
        "postcode": "55555"
    }
}


```

- Can have different key value pair on each document in a single collection
- But must ensure consistent field names across documents

<br>
<hr>
<br>

## Mongo Query Language

```
# To show all available Databases
show dbs

# To use a particular db
use <db_name>

# To show all collections
show collections


# Find one
# Return one document
# Return first document if found multiple
db.<collection_name>.findOne(query, projection)


# Find
# default returns 20 documents
db.<collection_name>.find(query, projection)

# query will be in JSON format as well, example below
# find all documents where class_id === 419
db.grades.find({"class_id": 419})
# find all documents where class_id === 419 && student_id === 1
db.grades.find({"class_id": 419, "student_id": 1})


# Use of $ in MQL,
# Precedes operators in MQL
# Precedes field values
# Aggregation Pipeline

$eq # Equal to
$ne # Not Equal to
$gt # Greater Than
$lt # Less Than
$in # in array of values

# Example of Less than $50000 salary
{"salary": {$lt: 50000}}
{field: {operator: value}}


```

Logical Operators

```

$and # Returns all the documents that matches all conditions
$or # Returns all documents that match any of the conditions
$nor # Returns all documents that fail all of the conditions
$not # Returns all documents that do not match the expression


```

Sorting

```

# sort users by name (asc) and then age (desc)
db.users.find().sort({ name:1, age:-1 })


```

Example of using $in operator and $or operator

```

db.inspections.find("result":{$in:["Unable to Locate", "Violation issued"]}})

===

db.inspections.find({$or:[{"result":"Violation issued"},{"result":"Unable to Locate"}]})

```

<br>
<hr>
<br>

## Something to note about $and operator

```

# if same field, have to use and gate to chain else the 2nd comparison will overwrite 1st one
# only if two fields are different, it will be implicitly known as and $and operation
($and: [{"age": {$lt: 200}}, {"age": {$gt: 100}}])

# alternatively can be like this
{"age": {$lt: 200, $gt: 100}}

```

<br>
<hr>
<br>

## $expr operator

- Can achieve something like: show me all documents where value of "field1" is same as the value of "field2"
- good for comparing 2 fields in the document

```

{$expr: {operator: [field, value]}}


# Example query trip duration > 400

# Normally
{"tripduration": {$gt: 400}}

# expr
{$expr: {$gt: ["$tripduration", 400]}}



# Return same start and end locations in routes

db.routes.find($expr: {$eq:["$src": $dst]})

```

<br>
<hr>
<br>

## Element Operators

$exists --> Returns documents that contain the specified field

$type --> Returns fields that contain values of a specific data type

```
# return persons that has school fields
db.person.find({"school": {$exists: true}})

```

<br>
<hr>
<br>

## Cursors methods

<br>

Count --> Returns number of documents in the result set

Sort --> Orders the documents based on specified fields

Limit --> Limits the number of documents returned

Skip --> Skips the first X number of documents

Size --> Used when you applied skip or limit to your records

<br>
<hr>
<br>

## Projection

- if nothing specified, means all fields will be displayed by default

```
# return data with fields name and founded_year only
db.inspections.find({},{"name": 1, "founded_year": 1})

```

<br>
<hr>
<br>

## Querying embedded document

```

# Example, how to query address

{
  _id: ObjectId("56d61033a378eccde8a8354f"),
  id: '10021-2015-ENFO',
  certificate_number: 9278806,
  business_name: 'ATLIXCO DELI GROCERY INC.',
  date: 'Feb 20 2015',
  result: 'No Violation Issued',
  sector: 'Cigarette Retail Dealer - 127',
  address: { city: 'RIDGEWOOD', zip: 11385, street: 'MENAHAN ST', number: 1712 }
}

db.inspections.find({"address.zip": 11385})


```

<br>
<hr>
<br>

## Querying arrays

Refer to this docs if you really need some starter idea

https://www.mongodb.com/docs/manual/reference/operator/query/

```

# Example

  {
    _id: ObjectId("50ab0f8cbcf1bfe2536dc78d"),
    tags: [
      'current',  'quartz',
      'textbook', 'bus',
      'roof',     'lentil',
      'flute',    'mile',
      'spain',    'sagittarius'
    ]
  }


db.posts.find({"tags": "roof"}) # find tags that contain item only roof

db.posts.find({"tags": {$all: ["current"]}}, {"tags": 1}) # find tags that has current, note the difference from the top example

```

Query by Size

```

db.posts.find("tags": {$size: 10}) # find tags that has array size of 10

db.grades.find({"scores.type": "exam"})

```

elemMatch

```

db.grades.find({"scores": {$elemMatch: {"type": "exam", "score": {$gt: 80}}}})

```

<br>
<hr>
<br>

## Aggregation Framework

```

db.collection.aggregate([{stage 1}, {stage 2}, ...{stage N}], {options})

```

$match

- like a filter based on the specific condition
- only those who meet the condition get passed on the next stage of the pipeline

```
db.companies.aggregate([{$match: {"founded_year": {$gte: 2005, $lte:2010}}}])
db.grades.aggregate([{$match: {"class_id": 116}}])

```

<br>

$project

```

```

<br>
<hr>
<br>

## Schema Validation

- Schema validation is most useful for an established application where you have a good sense of how to organize our data.
- Schema validation allows you to apply constraints on your document's structure.

<br>

Example

1. For a users collection, ensure the `password` field is stored as string. This validation prevents users from saving password as an unexpected data type.
2. For a sales collection, ensure that the `item` field belongs to a list of items that your store sells. This validation prevents a user from accidentally misspelling an item name when entering sales data.

<br>

When does MongoDB checks validation?

- During creation of a new collection with schema validation, MongoDB checks validation during `updates` and `inserts` in that collection.
- This means documents that already exists are not checked for validation until they are modified.

<br>

```

# Example JSON Schema for the following document

db.peaks.insertOne(
    {
        "name": "Everest",
        "height": 8848,
        "location": ["Nepal", "China"],
        "ascents": {
            "first": {
                "year": 1953
            },
            "first_winter": {
                "year": 1980
            },
            "total": 5656
        }
    }
)


# Json Schema

$:jsonSchema: {
  # almost always object at the root level
  "bsonType": "object",
  # Optional description
  "description": "Document describing a mountain peak",
  # Only accept array containing list of document fields that must be present in every document in the collection
  "required": ["name"],
  # You can also define fields that are not in the required array
  "properties": {
      "name": {
        "bsonType": "string",
        "description": "Name must be a string and is required"
      }
  }
}

```
