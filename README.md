# Task Tracker

Веб-приложение для управления задачами с фильтрацией и категориями.
Позволяет создавать задачи, отмечать их выполненными, удалять и
фильтровать по статусу.

## Стек

- Python 3.10+
- FastAPI 0.111
- SQLAlchemy 2.0
- Pydantic 2.7
- SQLite
- HTML, CSS, JavaScript (Fetch API)

## Структура проекта

    task-tracker/
    ├── main.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── requirements.txt
    ├── README.md
    └── static/
        ├── index.html
        ├── style.css
        └── app.js

## Установка и запуск

1. Клонировать репозиторий:

       git clone https://github.com/<ваш-username>/task-tracker.git
       cd task-tracker

2. Создать виртуальное окружение:

       python -m venv venv
       source venv/bin/activate      # Linux / macOS
       venv\Scripts\activate         # Windows

3. Установить зависимости:

       pip install -r requirements.txt

4. Запустить приложение:

       uvicorn main:app --reload

5. Открыть в браузере: http://127.0.0.1:8000

База данных `tasks.db` создаётся автоматически при первом запуске.

## API

| Метод  | Endpoint        | Описание                          |
|--------|-----------------|-----------------------------------|
| GET    | /               | Главная страница (HTML)           |
| GET    | /tasks          | Список всех задач                 |
| POST   | /tasks          | Создать задачу                    |
| PATCH  | /tasks/{id}     | Переключить статус выполнения     |
| DELETE | /tasks/{id}     | Удалить задачу                    |

Автоматическая документация Swagger доступна по адресу
http://127.0.0.1:8000/docs

### Пример POST-запроса

    curl -X POST http://127.0.0.1:8000/tasks \
      -H "Content-Type: application/json" \
      -d '{"title": "Сделать проект", "category": "работа"}'

## Возможные доработки

- Аутентификация пользователей
- Редактирование задач
- Дедлайны и напоминания
- Сортировка по категории и статусу
- Тёмная тема
- Экспорт задач в CSV / JSON

## Лицензия

MIT
