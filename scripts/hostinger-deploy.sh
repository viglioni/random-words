#!/bin/bash

# For local deploys
[ -f ".env" ] && source .env

if [ $(rsync -avzhe "ssh -p 65002" ./out/* $RSYNC_ADDRESS) ]
then
		echo "deployed"
else
		echo "something went wrong"
		exit 1
fi
