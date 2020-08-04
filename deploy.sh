#!/bin/bash

if [[ "$1" != "" ]]; then
    DOMAIN_NAME="$1"
else
    echo ERROR: Please provide domain name, e.g. mywebsite.com
    exit 1
fi

echo Deploying the build to $DOMAIN_NAME

# deploy with 24 hour cache expiry
aws s3 sync build s3://$DOMAIN_NAME --delete --cache-control max-age=86400,public

# disable caching for service worker and index.html to ensure users get updates immediately
aws s3 cp s3://$DOMAIN_NAME/service-worker.js s3://$DOMAIN_NAME/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
aws s3 cp s3://$DOMAIN_NAME/index.html s3://$DOMAIN_NAME/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read

# invalidate cloudfront distribution
CF_DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[].{Id: Id, OriginDomainName: Origins.Items[0].Id}[?OriginDomainName=='$DOMAIN_NAME'] | [0].Id" | tr -d \")
echo Invalidating CloudFront distribution $CF_DISTRIBUTION_ID
aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths /\*

echo Done!
