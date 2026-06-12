БД отдельно от движка.
Один универсальный движок.
Урок = данные в JSON.
Нет localStorage.
Есть English Book.
Слова имеют уникальные коды.
Фразы имеют уникальные коды.
Грамматика имеет уникальные коды.
Уроки добавляют знания в English Book.
Движок сам собирает урок из БД.

Я бы зафиксировал это как главный документ проекта.

EduMost English
Lesson Creation Guide v2
1. Общая идея

EduMost English строится как:

English Data Base
        ↓
Lesson Engine
        ↓
Interactive Lesson
        ↓
English Book

Урок не хранит слова.

Урок не хранит фразы.

Урок не хранит грамматику.

Урок хранит только ссылки на них через коды.

2. Структура базы
EduMost-English-Data

curriculum/
grammar/
lessons/
phrases/
vocabulary/
3. Кодировка
Слова
VOC-GREET-A1-001

Расшифровка:

VOC     Vocabulary
GREET   Category
A1      Level
001     Number
Фразы
PHR-GREET-A1-001
Грамматика
GR-BE-A1-001
Урок
ENG-A1-002
4. Один объект = одна запись

Пример слова:

{
  "code":"VOC-GREET-A1-001",
  "english":"hello",
  "polish":"cześć",
  "ukrainian":"привіт"
}

Пример фразы:

{
  "code":"PHR-GREET-A1-001",
  "english":"Hello!",
  "polish":"Cześć!",
  "ukrainian":"Привіт!"
}
5. Урок хранит только ссылки

Пример:

{
  "code":"ENG-A1-002",

  "title":"Hello!",

  "newVocabulary":[
    "VOC-GREET-A1-001",
    "VOC-GREET-A1-002",
    "VOC-GREET-A1-003"
  ],

  "newPhrases":[
    "PHR-GREET-A1-001",
    "PHR-GREET-A1-002",
    "PHR-GREET-A1-003"
  ],

  "newGrammar":[],

  "dependencies":[]
}
6. Зависимости уроков

Каждый урок обязан содержать:

"dependencies":[]

Пример:

"dependencies":[
  "ENG-A1-002"
]

Это означает:

Для прохождения урока
желательно знать урок 002
7. Структура уроков

Уроки строятся по одному шаблону.

Слайд 1
Cover
Название урока

Что изучим

Цель урока
Слайд 2
New Vocabulary

Показ новых слов.

Карточки.

Не список.

Слайд 3
Vocabulary Practice

Мини-игра.

Выбор ответа.

Клик.

Тап.

Без drag&drop.

Слайд 4
New Phrases

Показ новых фраз.

Карточки.

Слайд 5
Phrase Practice

Мини-игра.

Слайд 6
Mini Dialogue

Короткий диалог с использованием слов и фраз урока.

Слайд 7
English Book

Показываем что добавилось:

Vocabulary

Phrase Book

Grammar Book
Слайд 8
Summary
I can...

✓ ...
✓ ...
✓ ...
8. Правила словаря

Каждое слово имеет одну категорию.

Правильно:

happy → FEEL
mother → FAM
apple → FOOD
blue → COL

Нельзя хранить одно слово в нескольких категориях.

9. English Book

English Book — главный результат обучения.

Состоит из:

Vocabulary Book
Phrase Book
Grammar Book

Каждый урок добавляет записи в книгу.

10. Правила движка

Движок:

Загружает Lesson JSON
↓
Загружает Vocabulary
↓
Загружает Phrases
↓
Загружает Grammar
↓
Строит урок автоматически

HTML уроки вручную не создаются.

Создаются только JSON-файлы.

11. Главное правило проекта

Если для создания нового урока нужно менять HTML или JS движка — архитектура неправильная.

Для нового урока должен создаваться только новый JSON-файл урока и новые записи в базе знаний.