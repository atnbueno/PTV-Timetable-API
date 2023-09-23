<?php
function get_url($endpoint) {
    $dev_id = 3054321; // replace this with your User Id
    $api_key = '2b7df1de-3d95-2507-0abd-045b563799dd'; // replace this with your API Key

    $pathname = $endpoint . (strpos($endpoint, '?') !== false ? '&' : '?') . 'devid=' . $dev_id;
    $signature = hash_hmac('sha1', $pathname, $api_key);

    return 'https://timetableapi.ptv.vic.gov.au' . $pathname . '&signature=' . $signature;
}

$url = get_url('/v3/route_types');

// Set the "text/plain" content type header
header('Content-Type: text/plain');

echo "URL:\n";
echo $url . "\n\n";

$response = file_get_contents($url);

if ($response !== false) {
    echo "RESPONSE:\n";
    echo json_encode(json_decode($response), JSON_PRETTY_PRINT) . "\n";
} else {
    echo "ERROR: Failed to retrieve data from the URL\n";
}
?>
