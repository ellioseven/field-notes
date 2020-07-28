---
title: MongoDB Aggregation
date: "2020-07-12T00:00:00.000Z"
description: "Field notes on MongoDB aggregation."
author: "Elliot Mitchum"
---
Aggregation is essentially a pipeline of transformations. It works in stages
to build a particular output. It accepts a list of objects "stage" with objects
that describes the transformation. It also accepts options.

Aggregation is used when imperatively transforming data becomes inefficient
or cumbersome, particular when operating on large sets of data. Aggregation
provides a concise mechanism to group and transform that data, while using
less computer resources.

```js
db.solarSystem.aggregate([
  {
    // Match stage. Finds documents that meets `atmosphericComposition`
    // and `meanTemperature` conditions. $match is a "aggregation operator",
    // `$in`, `$gte` and `$lte` are "query operators".
    $match: {
      atmosphericComposition: {
        $in: [/02/]
      },
      meanTemperature: {
        $gte: -40,
        $lte: 40
      }
    }
  },
  // Project stage. Transforms documents and transforms new value.
  $project: {
    _id: 0,
    name: 1,
    // $gt Is an expression with array arguments, that produces a value.
    // $numberOfMoons is a field path expression.
    hasMoons: {
      $gt: ["$numberOfMoons", 0]
    }
  }
], {
  // Options.
  allowDiskUse: true
})
```

- `allowDiskUse` enables queries to manage operations on very large data sets,
  as (sort operation) RAM is limited to 100MB by default.

## `$match`

The `$match` operator filters documents. It uses standard MongoDB query
operators, such as `$in` and `$gt`. When used in the first stage, it uses
indexes, increasing query speed. Should come early in pipelines.

```js
// Finds documents that are not of `star` type and counts the results.
db.solarSystem.aggregate([
  {
    $match: {
      type: {
        $ne: "Star"
      }
    }
  },
  {
    $count: "planets"
  }
])
```

- You cannot use `$where` with `$match`
- Uses the same syntax query as `$find`
- Aggregation expressions cannot be used

```js
// Find movies with the following criteria:
// `imdb.rating` is at least 7
// `genres` does not contain "Crime" or "Horror"
// `rated` is either "PG" or "G"
// `languages` contains "English" and "Japanese"
{
  $match: {
    "imdb.rating": { $gte: 7 },
    genres: {
      $elemMatch: {
        $not: { $in: ["Crime", "Horror"] }
      }
    },
    rated: {
      $in: ["G", "PG"]
    },
    languages: {
      $all: ["English", "Japanese"]
    }
  }
}
```

## `$project`

- Selectively remove and retain fields
- Re-assign existing values and derive new fields
- Very similar to `map` in functional programming

```js
// Create documents from name.
{
  $project: {
    _id: 0, // Remove
    name: 1 // Retain
  }
}
```

```js
// Create a new field `myWeight`, which computes the gravity ratio for the
// document, then multiplies it by the weight 86.
{
  $project: {
    myWeight: {
      $multiply: [
        { $divide: [ "$gravity.value", 9.8 ] },
        86
      ]
    }
  }
}
```

```js
// Match documents where title is a single word.
[
  {
    $project: {
      titleParts: {
        $split: ["$title", " "]
      }
    }
  },
  {
    $match; {
      titleParts: {
        $size: 1
      }
    }
  }
]
```

## `$limit`, `$skip`, `$sort`, `$count`

Use of cursor functions can be used as cursor-like stages:

```js
// Display `name` and `numberOfMoons` in descending order of moons, skip the
// first result and limit selection to 5.
[
  {
    $project: {
      _id: 0,
      name: 1,
      numberOfMoons: 1
    }
  },
  { $sort: { numberOfMoons: -1 } },
  { $skip: 1 },
  { $limit: 5 }
]
```

## `$group`

- Groups data to find unique field values
- Groups can use "accumulator expressions"

```js
// Groups fields by `year` field, accumulates each match by 1 (with the `$sum`
// accumulator expression) to find count.
{
  $group: {
    _id: "year",
    fieldsYear: { $sum: 1 }
  }
}
// Sample output:
// { _id: 2019, fieldsYear: 1 }
// { _id: 2018, fieldsYear: 20 }
// { _id: 2017, fieldsYear: 14 }
```

```js
// Display `numDirectors` as size of `directors` or 0, with film count and
// average metacritic score (null will be present on documents without or
// unexpected `metacritic` field)
[
  {
    $group: {
      _id: {
        numDirectors: {
          $cond: [
            { $isArray: "$directors" },
            { $size: "$directors" },
            0
          ]
        }
      },
      { numFilms: { $sum: 1 } },
      { averageMetacritic: { $avg: "$metacritic" } }
    }
  },
  {
    $sort: {
      '_id.numDirectors': -1
    }
  }
]
```

```js
// Display average or metacritic of documents that have a metacritic score.
[
  {
    $match: {
      metacritic: { $gte: 0 }
    }
  },
  {
    $group: {
      _id: null,
      averageMetacritic: { $avg: "$metacritic" }
    }
  }
]
```

- Accumulator expressions will ignore unexpected value types or missing values
  and will result in null

## Accumulator Expression - `$max`, `$min`, `$sum`, `$avg`

- Used to compute a value across documents
- Does not have memory between documents

```js
// Get the lowest value in `trends` sub documents.
{
  $project: {
    _id: 0,
    max_low: {
      $min: { "$trends.avg_low_temp" }
    }
  }
}
```

### `$map`, `$reduce`

- Complex but useful expressions to built complex computations

```js
// `$max` implementation with `$reduce`.
{
  $project: {
    _id: 0,
    max_high: {
      $reduce: {
        // Target `trends` subdocument array.
        input: "$trends",
        // Initial acc. value to lowest possible.
        initialValue: -Infinity,
        in: {
          $cond: [
            // If iterator value is greater than accumulator value, set
            // accumulator value to iterator, otherwise, leave as acc. value.
            { $gt: ["$$this.avg_high_tmp", "$$value"] },
            "$$this.avg_high_tmp",
            "$$value"
          ]
        }
      }
    }
  }
}
```

## `$unwind`

Used to flatten array values in documents, like so:

```js
{ name: "Joe", foods: ["Banana", "Apple"] },
{ name: "Jane", foods: ["Orange", "Pear"] }
// Transforms to:
{ name: "Joe", foods: "Banana" }
{ name: "Joe", foods: "Apple" }
{ name: "Jane", foods: "Orange" }
{ name: "Jane", foods: "Pear" }
```

```js
// Get best rated genre by year, with average rating.
[
  {
    $match: {
      "imdb.rating": { $gt: 0 },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 }
    }
  },
  {
    $unwind: "$genres"
  },
  {
    $group: {
      _id: {
        year: "$year",
        genre: "$genres"
      },
      average_rating: { $avg: "$imdb.rating" }
    }
  },
  {
    $sort: {
      "_id.year": -1,
      average_rating: -1
    }
  },
  {
    $group: {
      _id: "$_id.year",
      genre: { $first: "$_id.genre" },
      average_rating: { $first: "$average_rating" }
    }
  },
  {
    $sort: { _id: -1 }
  }
]
```

```js
// Let's use our increasing knowledge of the Aggregation Framework to explore
// our movies collection in more detail. We'd like to calculate how many movies
// every cast member has been in and get an average imdb.rating for each cast member.
//
// What is the name, number of movies, and average rating (truncated to one
// decimal) for the cast member that has been in the most number of movies
// with English as an available language?
//
// Provide the input in the following order and format
//
// { "_id": "First Last", "numFilms": 1, "average": 1.1 }

const foo = [
  {
    $match: {
      "imdb.rating": { $gt: 0 },
      languages: { $all: ["English"] }
    }
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average: { $avg: "$imdb.rating" }
    }
  },
  {
    $sort: { numFilms: -1 }
  }
]
```

## `$lookup`

Populates values into a document depending on a relationship constraint. A
collection to join is specified with `from` and matched with `localField` on
the input document to `foreignKey` on the joined/from document.

```js
{
  $lookup: {
    from "air_airlines",
    localField: "airlines",
    foreignKey: "name",
    as: "airlines"
  }
}
```

- `from` collection cannot be sharded
- `from` collection must be in the same database
- `localField` and `foreignKey` values are matched on equality
- `as` can be any name, but will overwrite existing

## Useful Aggregation Operators

- `$redact` - Restrict access to a collection or fields
- `$out` - Put output into collection (overwrite)
- `$merge` - Put output into a new or existing collection

## Further Reading

- https://medium.com/@paulrohan/aggregation-in-mongodb-8195c8624337
