#!/bin/sh

# Fetch secrets from Google Secret Manager
export NODE_ENV=$(gcloud secrets versions access latest --secret="NODE_ENV")
export DATABASE_USER=$(gcloud secrets versions access latest --secret="DATABASE_USER")
export DATABASE_HOST=$(gcloud secrets versions access latest --secret="DATABASE_HOST")
export DATABASE_NAME=$(gcloud secrets versions access latest --secret="DATABASE_NAME")
export DATABASE_PASS=$(gcloud secrets versions access latest --secret="DATABASE_PASS")
export DATABASE_PORT=$(gcloud secrets versions access latest --secret="DATABASE_PORT")
export JWT_SECRET=$(gcloud secrets versions access latest --secret="JWT_SECRET")

# Jalankan aplikasi
exec "$@"