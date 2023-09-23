import hmac
import hashlib
import sys
import requests
import json

def get_url(endpoint):
    dev_id = 3054321 # replace this by the "User Id" you've received by mail
    api_key = '2b7df1de-3d95-2507-0abd-045b563799dd' # replace this with the "API Key" you've received by mail

    pathname = f"{endpoint}{'&' if '?' in endpoint else '?'}devid={dev_id}"
    signature = hmac.new(api_key.encode('utf-8'), pathname.encode('utf-8'), hashlib.sha1).hexdigest()

    return f'https://timetableapi.ptv.vic.gov.au{pathname}&signature={signature}' # http:// also works

url = get_url('/v3/route_types')

print("URL:", file=sys.stderr)
print(url, file=sys.stderr)

response = requests.get(url)

if response.status_code == 200:
    print("RESPONSE:", file=sys.stderr)
    print(json.dumps(response.json(), indent=4))
else:
    print("ERROR: Failed to retrieve data from the URL", file=sys.stderr)
