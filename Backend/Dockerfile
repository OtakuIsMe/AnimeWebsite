FROM python:3.10-slim

# Bước cài đặt Oracle Client, wget, và unzip
RUN apt-get update && apt-get install -y libaio1 wget unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /opt/oracle \
    && cd /opt/oracle \
    && wget https://download.oracle.com/otn_software/linux/instantclient/1914000/instantclient-basic-linux.x64-19.14.0.0.0dbru.zip \
    && unzip instantclient-basic-linux.x64-19.14.0.0.0dbru.zip \
    && rm instantclient-basic-linux.x64-19.14.0.0.0dbru.zip \
    && echo /opt/oracle/instantclient_19_14 > /etc/ld.so.conf.d/oracle-instantclient.conf \
    && ldconfig

WORKDIR /AnimeWeb/backend

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Backend.wsgi:application"]