---
title: MongoDB Update Operators
---

- Can be used for all CRUD operations

## Comparision Operators

- `$gt/e`: Greater than
- `$lt/e: Less than
- `$ne`: Not equal to
- `$in`: Within values


## Element Operators

Filter by element meta data

- `$exists` - Filter for documents with value

```js
// Find document that contains value for `myField`.
{
    myField: {
        $exists: true
    }
}
```

- `$type` - Filter for documents with value type

```js
// Find document that contains value type `double` for `myField`.
{
    myField: {
        $type: "double"
    }
}
```

## Logical Operators

Apply mathematical logic to queries, such as `AND`, `OR`, etc.

- `$ne: null` matches keys that have value `null` and those that do not
  contain a value at all

- `$or`

```js
// Find documents that contain `tomato.meter` score greater than 95 OR
// metacritic score greater than 88.
{
    $or: [
        { "tomato.meter": { $gt: 95 } },
        { "metacritic": { $gt: 88 } }
    ]
}
```

- `$and`

```js
// Find documents where `metacritic` score is not `null` and value exists.
{
    $and: [
        { "metacritic": { $ne: null } },
        { "metacritic": { $exists: true } }
    ]
}
```

## Array Operators

- `$all`

Find documents against an array of values

```js
// Find all documents that contain `Comedy` and `Horror` under `genres`.
{
    genres: {
        $all: ["Comedy", "Horror"]
    }
}
```

- `$size`

Find documents based on length of array value.

```js
// Find documents with only one country.
{
    countries: { $size: 1 }
}
```

- `$elemMatch`

Find documents where array value matches criteria.

```js
// Find document where `boxOffice` contains an embedded document with both
// `country` `Germany` AND `revenue` greater than 18.
{
    boxOffice: {
        $elemMatch: [
            { country: "Germany" },
            { revenue: { $gt: 18 } }
        ]
    }
}
```

```js
// How many documents contain at least one score in the results array that is
// greater than or equal to 70 and less than 80?
{
  results: {
    $elemMatch: {
      $gte: 70,
      $lt: 80
    }
  }
}
```

## Evaluation Operators

- `$regex`

Find documents where a text fields matches a regular expression.


```js
// Find documents where `name` beings with "Chris". Matches documents where
// name value may be "Christopher" or "Christina".
{
    name: { $regex: /^Chris.*/ }
}
```


## Example Queries

```js
// How many movies match the following criteria? - The cast includes either of
// the following actors: "Jack Nicholson", "John Huston". - The viewerRating is
// greater than 7. - The mpaaRating is "R".
{
  cast: {
    $elemMatch: {
      $in: ["Jack Nicholson", "John Huston"]
    }
  },
  viewerRating: {
    $gt: 7
  },
  mpaaRating: "R"
}
```
