#!/bin/bash

aws s3 cp ~/rnf/cms/db/rnf.db s3://rwanda-nurture-foundation/db_backups/$(date +"%Y/%m/%d")/rnf.db
