FROM python:3.7

MAINTAINER evan.salzbrenner@gmail.com

COPY . /app
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy

EXPOSE 5000

CMD ["python", "run.py"]