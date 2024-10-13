# Используем официальный Node.js образ
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /frontend/

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

EXPOSE 80

# Запускаем сервер
CMD ["npm", "run", "preview"]
