# w3ctest

``` bash
curl -vX POST http://localhost:49624/api/forward -d @send.json --header "Content-Type: application/json"
```

``` json
[
  {
    "url": "http://localhost:49624/api/forward",
    "arguments": [
      {
        "url": "http://localhost:49624/api/forward",
        "arguments": [
          {
            "url": "http://localhost:49624/api/forward"
          }
        ]
      }
    ]
  }
]
```