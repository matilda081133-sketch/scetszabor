// Schema for global settings (Phone, Links, etc.)
export const siteSettings = {
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'telegramUrl', title: 'Ссылка на Telegram', type: 'url' },
    { name: 'maxUrl', title: 'Ссылка на Макса', type: 'url' },
    { name: 'heroTitle', title: 'Главный заголовок (Home)', type: 'text' },
    { name: 'heroSubtitle', title: 'Подзаголовок (Home)', type: 'text' },
    { name: 'aboutTitle', title: 'Заголовок "О компании"', type: 'string' },
    { name: 'aboutText', title: 'Текст "О компании"', type: 'text' },
    { name: 'footerText', title: 'Текст в подвале (под лого)', type: 'text' },
  ]
};

// Schema for Products (Fences)
export const product = {
  name: 'product',
  title: 'Заборы и услуги',
  type: 'document',
  fields: [
    { name: 'title', title: 'Название категории/услуги', type: 'string' },
    { name: 'slug', title: 'ID (slug) — ДОЛЖЕН совпадать с адресом страницы', type: 'slug', options: { source: 'title' } },
    { name: 'price', title: 'Цена от (руб)', type: 'number' },
    { name: 'heroTitle', title: 'Заголовок на странице категории', type: 'string' },
    { name: 'mainImage', title: 'Главное фото (Баннер)', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Краткое описание (в каталоге)', type: 'text' },
    { name: 'fullContent', title: 'Полный текст на странице', type: 'text' },
    { name: 'gallery', title: 'Галерея работ', type: 'array', of: [{ type: 'image' }] },
  ]
};

// Schema for Reviews
export const review = {
  name: 'review',
  title: 'Отзывы',
  type: 'document',
  fields: [
    { name: 'author', title: 'Имя клиента', type: 'string' },
    { name: 'text', title: 'Текст отзыва', type: 'text' },
    { name: 'rating', title: 'Оценка (1-5)', type: 'number' },
    { name: 'date', title: 'Дата', type: 'date' },
    { 
      name: 'source', 
      title: 'Источник отзыва', 
      type: 'string',
      options: {
        list: [
          { title: 'Telegram', value: 'telegram' },
          { title: 'Avito', value: 'avito' },
          { title: 'Сайт', value: 'site' },
        ]
      },
      initialValue: 'telegram'
    },
    { name: 'sourceUrl', title: 'Ссылка на оригинал (напр. на Авито)', type: 'url' },
    { name: 'videoUrl', title: 'Ссылка на видео (ВК, YouTube и др.)', type: 'url' },
    { name: 'avatar', title: 'Фото клиента или скриншот', type: 'image' },
  ]
};

// Schema for Calculator Settings
export const calcSettings = {
  name: 'calcSettings',
  title: 'Настройки калькулятора',
  type: 'document',
  fields: [
    {
      name: 'prices',
      title: 'Цены на конструкции',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Технический ID (не менять)', type: 'string', readOnly: true },
            { name: 'label', title: 'Название в калькуляторе', type: 'string' },
            { name: 'price', title: 'Цена (за м.п. или за шт)', type: 'number' },
          ]
        }
      ]
    },
    {
      name: 'heights',
      title: 'Коэффициенты высоты',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Отображение (напр. 1,5 м)', type: 'string' },
            { name: 'value', title: 'Высота (число, напр. 1.5)', type: 'number' },
            { name: 'k', title: 'Коэффициент (напр. 0.9)', type: 'number' },
          ]
        }
      ]
    }
  ]
};
