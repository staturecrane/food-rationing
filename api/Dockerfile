FROM python:3.7-slim

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD gunicorn main:app --workers 4 -b 0.0.0.0:8000