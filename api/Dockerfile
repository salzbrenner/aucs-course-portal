FROM python:3.7

MAINTAINER evan.salzbrenner@gmail.com

RUN pip install pipenv

RUN pipenv install --system --deploy

COPY . /app
WORKDIR /app

EXPOSE 5000

CMD ["python", "run.py"]