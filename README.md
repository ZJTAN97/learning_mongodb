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
