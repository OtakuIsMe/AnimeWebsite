# Sử dụng image chính thức của Python làm base image
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

# Tạo và sử dụng thư mục làm việc /app
WORKDIR /AnimeWeb/backend

# Sao chép file requirements.txt vào container
COPY requirements.txt ./

# Cài đặt các Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Sao chép toàn bộ mã nguồn của dự án vào container
COPY . .

# Chạy lệnh collectstatic và migrate
RUN python manage.py collectstatic --noinput

# Run the Django application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Backend.wsgi:application"]