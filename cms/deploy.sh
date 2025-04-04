#! /bin/bash

DISTRIBUTION=E3O2M8Z4GO377G
RNF_FRONTEND=~/rnf/main
cp data/* $RNF_FRONTEND/payload-exports/

cd $RNF_FRONTEND

NODE_ENV=production
npm run build

# Copy the built files to AWS S3 bucket
source ../cms/.env
S3_BUCKET="rwandanurture.org"
aws s3 sync ./out s3://$S3_BUCKET --delete

# Invalidate cache to see new frontend
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION \
    --paths "/*"
