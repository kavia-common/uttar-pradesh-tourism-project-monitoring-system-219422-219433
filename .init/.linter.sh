#!/bin/bash
cd /home/kavia/workspace/code-generation/uttar-pradesh-tourism-project-monitoring-system-219422-219433/project_monitoring_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

