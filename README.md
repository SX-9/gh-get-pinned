API avaible at: https://gh-get-pinned.cyclic.app/

Usage:
```
GET https://gh-get-pinned.cyclic.app/GITHUB_USERNAME
```

Response is an array of this object containing repo info:
```json
{
  "name": "Name-of-Repo",
  "desc": "Repo description",
  "stars": 69,
  "link": "https://github.com/user/repo",
  "lang": {
    "name": "Javascript",
    "color": "#00e1ff"
  }
}
```

If theres an error it will response with status code 400 and with an array of error objects:
```json
{
  "err": "NOT_FOUND",
  "msg": "Error message in detail here"
}
```
