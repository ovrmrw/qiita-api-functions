import * as functions from "firebase-functions";
import axios from "axios";
import { URL } from "whatwg-url";
import { URL as _URL } from "url";

interface SecretKeys {
  qiita: {
    accessToken: string;
  };
}

const secretKeys: SecretKeys = require("../secretKeys.json");

export const qiitaItems = functions.https.onRequest((request, response) => {
  const { title, tag, code, body, user, likes, stocks } = request.body;
  const token = secretKeys.qiita.accessToken;
  console.log({ token, title, tag, code, body, likes, stocks });
  const url = new URL("https://qiita.com/api/v2/items") as _URL;
  const conditions: string[] = [];
  if (title) {
    conditions.push("title:" + title);
  }
  if (tag) {
    conditions.push("tag:" + tag);
  }
  if (code) {
    conditions.push("code:" + code);
  }
  if (body) {
    conditions.push("body:" + body);
  }
  if (user) {
    conditions.push("user:" + user);
  }
  if (likes && Number(likes) > 0) {
    conditions.push("likes:>" + likes);
  }
  if (stocks && Number(stocks) > 0) {
    conditions.push("stocks:>" + stocks);
  }
  url.searchParams.set("query", conditions.join(" "));
  url.searchParams.set("page", "1");
  url.searchParams.set("per_page", "10");
  axios
    .get(url.href, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      console.log(res);
      res.data;
      response.status(200).send(res.data);
    })
    .catch(e => {
      console.error(e);
      response.status(500).send("Qiita Request Error");
    });
});
