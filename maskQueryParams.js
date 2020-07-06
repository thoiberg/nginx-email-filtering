// based off of https://gist.githubusercontent.com/nginx-gists/8202a6872e9ec784ce14b1a63564a39d/raw/a7df30f7c594e4e0ac20a98047efa003e2188d4c/mask_ip_uri.js

function maskQueryParams(request) {
    var queryString = request.variables.query_string;
    
    if (queryString.length) {
        var queryParams = queryString.split('&');
        
        // TODO: Check this chonky boi meets what we need for email validation
        var emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        // iterate queryParams
        var filteredQueryParams = queryParams.map(queryParam => {
            // URI decode value
            var kv = queryParam.split('=');
            var key = kv[0];
            var value = kv [1];
            var decodedValue = decodeURIComponent(value);
            // check value
            // if value matches regex string for email addresses
            if (emailRegexp.test(decodedValue)) {
                // replace/construct with [EMAIL FILTERED]
                value = '[EMAIL FILTERED]'
            }

            return `${key}=${value}`
        })

        return request.uri + "?" + filteredQueryParams.join('&');
    }

    return request.uri;
}