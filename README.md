# Lyra Impact supercharged 🌍☄

[https://lyra-impact-supercharged.vercel.app](https://lyra-impact-supercharged.vercel.app)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## APIs

This project exposes one single API in POST method:

```bash
/api/impact
``` 

The payload accepted is the following parameters:

```json
{
  "endpoint": "string",
  "term": "string",
  "property?": "string",
  "fetcher?": "string",
  "query?": "string", // required only with GraphQL fetcher
}
```

**Example**

```json
{
  "endpoint": "https://raw.githubusercontent.com/LyraSearch/lyra/main/examples/with-vue/public/pokedex.json",
  "property": "pokemon",
  "term": "pika"
}
```

**GraphQL example**

```json
{
    "endpoint": "https://rickandmortyapi.com/graphql",
    "fetcher": "graphql",
    "property": "characters.results",
    "query": "{characters { results { type status species name id gender } } }",
    "term": "morty"
}
```
