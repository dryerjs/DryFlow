# mongo-flow

Effortlessly move data across MongoDB databases

## Template

This repo is created from the template [here](https://github.com/ryansonshine/typescript-npm-package-template)

### Sample APIs

#### Create a job

```bash
curl -X POST http://localhost:3000/v1/jobs \
    -H "Content-Type: application/json" \
    -d '{"source": "mongodb://localhost:27017/source", "destination": "mongodb://localhost:27017/destination", "collections": ["test"]}'
```

#### Get all jobs

```bash
curl http://localhost:3000/v1/jobs
```
