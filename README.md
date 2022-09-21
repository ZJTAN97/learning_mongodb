## To use with Docker

```

# to access mongosh
docker run -it --network learning_mongodb_default --rm mongo mongosh --host learning_mongodb_mongo_1 test

```

## Documents

-   Documents are polymorphic, do not have a fixed structure
-   Changes can be made easily to an individual document structure, e.g. new field value pairs can be added
-   Uses JSON format
-   "\_id" field is auto populated
-   Can have nested documents --> which looks like a nested JSON

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

-   Can have different key value pair on each document in a single collection
-   But must ensure consistent field names across documents

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
