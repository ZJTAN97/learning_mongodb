# Data Modeling Introduction

-   Aim to record key points and good practices during my research and studying of MongoDB Data Modeling
-   Aim to find out the similarities between SQL and NoSQL when modelling data

<br>

# Embedded Data Models

-   These schema are generally known as "denormalized" models, taking advantage of MongoDB's rich documents.
-   In General use Embedded Data Models when
    -   "contains" relationships between entities, e.g. One-To-One
    -   you have one-to-many relationships between entities. In these relationships, the "many" or child documents always appear with or are viewed in the context of the "one" or parent documents.

<br>

### Subset Pattern

https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/#subset-pattern

<br>

# Embedding vs. Referencing

-   MongoDB schema design actually comes down to only two choices for every piece of data.
    -   Embed data directly
    -   Reference another piece of data using $lookup operator

<br>

### Embedding

Advantages

-   Retrieve all relevant information in a single query
-   Avoid implementing joins in application code or using $lookup
-   Update related information as a single atomic operation

Disadvantages

-   Large documents means more overhead
-   16-MB size limit in MongoDB

<br>

### Referencing

Advantages

-   Splitting up data results in smaller documents
-   Reduce the amount of duplication of data. However, it's important to note that data duplication should not be avoided if it results in a better schema.

<br>

Disadvantages

-   In order to retrieve all the data in the referenced documents, a minimum of two queries or
    $lookup required to retrieve all the information.

<br>

One-to-One - Prefer key value pairs within the document
One-to-Few - Prefer embedding
One-to-Many - Prefer embedding
One-to-Squillions - Prefer Referencing
Many-to-Many - Prefer Referencing
