#!/bin/bash

# For local deploys
[ -f ".env" ] && source .env

(rsync -avzhe "ssh -p 65002" ./out/* $RSYNC_ADDRESS) && echo "deployed" || echo "something went wrong"
