-- Миграция для добавления мультиязычности в блог
-- Добавляем колонки для переводов на русский, английский и польский

ALTER TABLE blog_posts 
ADD COLUMN title_ru TEXT,
ADD COLUMN content_ru TEXT,
ADD COLUMN title_en TEXT,
ADD COLUMN content_en TEXT,
ADD COLUMN title_pl TEXT,
ADD COLUMN content_pl TEXT;

-- Комментарии для документации
COMMENT ON COLUMN blog_posts.title IS 'Заголовок (украинский - основной)';
COMMENT ON COLUMN blog_posts.content IS 'Содержание (украинский - основной)';
COMMENT ON COLUMN blog_posts.title_ru IS 'Заголовок на русском';
COMMENT ON COLUMN blog_posts.content_ru IS 'Содержание на русском';
COMMENT ON COLUMN blog_posts.title_en IS 'Title in English';
COMMENT ON COLUMN blog_posts.content_en IS 'Content in English';
COMMENT ON COLUMN blog_posts.title_pl IS 'Tytuł po polsku';
COMMENT ON COLUMN blog_posts.content_pl IS 'Treść po polsku';
