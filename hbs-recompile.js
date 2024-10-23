import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllHbsFiles = (dirPath) => {
    let hbsFiles = [];

    // Читаем содержимое директории
    const files = fs.readdirSync(dirPath);

    // Проходим по каждому элементу директории
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        // Если это директория, рекурсивно продолжаем искать файлы
        if (fs.lstatSync(filePath).isDirectory()) {
            hbsFiles = hbsFiles.concat(getAllHbsFiles(filePath));
        } else if (filePath.endsWith('.hbs')) {
            // Если это .hbs файл, добавляем его в массив
            hbsFiles.push(filePath);
        }
    });

    return hbsFiles;
};

const recompileTemplates = () => {
    const hbsFiles = getAllHbsFiles(path.resolve(__dirname, 'components'));
    // Формируем команду для компиляции всех найденных файлов
    const hbsFilesCommand = hbsFiles.join(' '); // Собираем все файлы в строку для команды
    const command = `handlebars ${hbsFilesCommand} -f components/precompiled-templates.js`;

    // Выполняем команду для компиляции
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        if (stderr) {
            console.error(`Runtime error: ${stderr}`);
            return;
        }
        console.log(`Compiled templates successfully ${stdout}`);
    });
};

// Плагин для компиляции Handlebars-шаблонов
const handlebarsCompilePlugin = () => {
    return {
        name: 'handlebars-compile',
        handleHotUpdate({ file }) {
            if (file.endsWith('.hbs')) {
                recompileTemplates();
            }
        },
    };
};

export default handlebarsCompilePlugin;

// If file was executed directly
if (process.argv && process.argv[1] === fileURLToPath(import.meta.url)) {
    recompileTemplates();
}
