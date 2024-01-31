# Grafana-Alert-Notifier

Send webhook to traQ when alert received from Grafana

## Props

`WEBHOOK_SECRET`: traQ webhook secret

## Deploy

Push the commit to the main branch, tag it and deploy.

However, we need to revalidate the access token 6 months after the last deploy:

1. install clasp with `npm i @google/clasp -g`.
1. run `clasp login` and log in with a browser
1. Copy your saved credentials.
1. Paste it into the repo secret `CLASPRC`.
