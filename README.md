Create a Service
```
serverless create --template aws-nodejs --path my-service
```

Deploy a Service
```
serverless deploy -v
```

Deploy the Function
```
serverless deploy function -f hello
```

Examples
```
curl -v -H "Content-Type: application/json" -X POST -d '{"name":"dan"}' https://zihsgtfn23.execute-api.eu-west-2.amazonaws.com/dev/metadata
```