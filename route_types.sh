#!/bin/bash

# openssl, curl and jq are assumed to be in available via $PATH

dev_id=3054321 # replace this with your User Id
api_key='2b7df1de-3d95-2507-0abd-045b563799dd' # replace this with your API Key

get_url() {
    endpoint="$1"
    pathname="${endpoint}?devid=${dev_id}"
    signature=$(echo -n "$pathname" | openssl dgst -sha1 -hmac "$api_key" | cut -d' ' -f2)
    echo "https://timetableapi.ptv.vic.gov.au${pathname}&signature=${signature}"
}

url=$(get_url '/v3/route_types')

echo "URL: $url" >&2

response=$(curl -s "$url")

if [[ $? -eq 0 ]]; then
    echo "RESPONSE:" >&2
    echo "$response" | jq .
else
    echo "ERROR: Failed to retrieve data from the URL" >&2
fi
