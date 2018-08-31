#!/bin/bash

curl "http://localhost:4741/bookmarks" \
  --include \
  --request GET \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json"

echo
