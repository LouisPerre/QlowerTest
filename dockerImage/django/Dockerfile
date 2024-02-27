FROM python:3.9.18-slim

RUN python -m pip install --upgrade pip

RUN apt-get update && \
    apt-get install -y libpq-dev gcc

COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt