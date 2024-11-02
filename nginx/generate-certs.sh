#!/bin/bash

# Установка OpenSSL, если он не установлен
if ! command -v openssl &> /dev/null; then
    echo "OpenSSL не найден. Устанавливаем..."
    apt update && apt install -y openssl
else
    echo "OpenSSL уже установлен."
fi

# Папка для хранения сертификатов
CERT_DIR="/etc/nginx/ssl"

# Проверка наличия сертификата и ключа
if [[ ! -f "$CERT_DIR/pootnick.crt" || ! -f "$CERT_DIR/pootnick.key" ]]; then
    echo "Сертификаты не найдены, создаются самоподписанные сертификаты..."

    # Создание самоподписанного сертификата
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$CERT_DIR/pootnick.key" \
        -out "$CERT_DIR/pootnick.crt" \
        -subj "/C=RU/ST=Moscow/L=City/O=Organization/OU=Unit/CN=localhost"

    echo "Самоподписанные сертификаты созданы."
else
    echo "Сертификаты найдены, продолжаем запуск Nginx."
fi

# Запуск Nginx
nginx -g 'daemon off;'
