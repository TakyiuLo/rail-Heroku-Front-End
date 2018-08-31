#!/bin/bash

curl "http://localhost:4741/bookmarks" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "bookmark": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESCRIPTION}"'",
      "url": "'"${URL}"'"
    }
  }'

echo
