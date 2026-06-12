# EDU MOST

## Lesson Creation Guide v1

### Главный принцип

При создании нового урока нельзя менять:

* index.html
* style.css
* script.js

Меняется только:

* lessonData.js
* картинки
* иконки

Движок должен оставаться единым для всех уроков курса.

---

# Структура урока

Каждый урок состоит из массива:

const lesson = {

```
title: "...",

slides: []
```

}

---

# Поддерживаемые типы слайдов

story
quiz
info
map
summary
finish

---

# STORY

Используется для:

* истории
* объяснения совы
* открытия темы

Пример:

{
type: "story",

```
title: "👋 Hello!",

image: "assets/images/slide1.png",

help: "Przeczytaj uważnie.",

uaMeaning: `
Українське пояснення.
`,

text: `
Hello!
Welcome to English Adventure.
`
```

}

---

# QUIZ

Используется каждые 2–3 слайда.

Пример:

{
type: "quiz",

```
title: "❓ Jak myślisz?",

question: "What does Hello mean?",

answers: [
    "Cześć",
    "Kot",
    "Szkoła"
],

correct: 0,

uaMeaning: `
Спробуй обрати правильну відповідь.
`
```

}

---

# INFO

Используется для правил и открытий.

Пример:

{
type: "info",

```
title: "💡 New Word",

image: "assets/images/slide5.png",

content: `
Hello means:
PL: Cześć
UA: Привіт
`,

uaMeaning: `
Нове слово уроку.
`
```

}

---

# MAP

Используется для:

* путешествия
* карты мира
* переходов между разделами

Пример:

{
type: "map",

```
title: "🗺️ English Adventure",

image: "assets/images/map.png",

text: `
Przed nami nowe przygody.
`,

uaMeaning: `
Попереду нові пригоди.
`
```

}

---

# SUMMARY

Используется для подведения итогов.

Пример:

{
type: "summary",

```
title: "🏆 Podsumowanie",

image: "assets/images/summary.png",

uaMeaning: `
Що ми сьогодні вивчили.
`,

items: [

    "Hello",

    "My name is...",

    "Goodbye"
]
```

}

---

# FINISH

Всегда последний слайд.

Пример:

{
type: "finish",

```
title: "🎉 Gratulacje!",

image: "assets/images/finish.png",

uaMeaning: `
Вітаємо!
`,

message: `
Ukończyłeś lekcję.
`
```

}

---

# Правило украинской поддержки

Каждый слайд обязан содержать:

uaMeaning

Это не перевод.

Это короткое пояснение сути.

---

# Правило картинок

Каждый сюжетный слайд обязан иметь:

image

Формат:

assets/images/slideX.png

Пример:

slide1.png
slide2.png
slide3.png

---

# Правило вопросов

После каждых 2–3 информационных слайдов
должен идти quiz.

Нельзя делать длинные блоки текста подряд.

---

# Правило текста

Максимум:

3–5 коротких предложений на слайд.

Текст должен помещаться на экран телефона без прокрутки.

---

# Правило финала

Каждый урок обязан заканчиваться:

summary
↓
finish

На finish запускается салют.

---

# Формула нового урока

1. Придумать сюжет.
2. Разбить на 10–13 слайдов.
3. Подготовить картинки.
4. Заполнить lessonData.js.
5. Проверить на телефоне.
6. Опубликовать на GitHub Pages.

Движок не изменяется.
Изменяется только контент урока.
