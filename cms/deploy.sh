#! /bin/bash

cp data/* $RNF_MAIN_DIR/payload-exports/

cd $RNF_MAIN_DIR

NODE_ENV=production
npm run build

# Copy the built files to AWS S3 bucket
source ../cms/.env
S3_BUCKET="rwandanurture.org"
aws s3 sync ./out s3://$S3_BUCKET --delete
