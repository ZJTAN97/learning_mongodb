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
