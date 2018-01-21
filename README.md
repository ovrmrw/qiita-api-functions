# qiita-api-functions

This repository is just for checking Qiita API.

## API

url: `https://us-central1-qiita-api-functions.cloudfunctions.net/qiitaItems`

method: POST

request body:
```
{
    title: string;
    tag: string;
    code: string;
    body: string;
    user: string;
    likes: number > 0;
    stocks: number > 0;
}
```
