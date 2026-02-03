# JobHunter – Dashboard (React / TypeScript)

## What this is
The JobHunter dashboard is the UI for viewing job scores and managing configuration that controls how jobs are evaluated.

## Responsibilities
- Display analyzed jobs and scoring results
- Manage configuration:
  - Job statuses
  - search rules  
  - AI prompt / system instruction  
  - user profile context  
- Trigger re-analysis of existing jobs when configuration changes

## How it fits in the system
Dashboard → Java API (query / config / re-analysis) → PostgreSQL  
Slack notifications are triggered server-side from analysis results.

## Tech
React • TypeScript • Vite 

- Architecture: https://github.com/iamvusumzi/jobhunter-system  
- Ingestion Service: https://github.com/iamvusumzi/jobhunter-ingestor  
- Analysis & API Service: https://github.com/iamvusumzi/jobhunter-api  
