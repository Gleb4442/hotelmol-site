import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local FIRST before any other imports
config({ path: resolve(process.cwd(), '.env.local') });

async function addTestBlogPost() {
    try {
        // Dynamic imports after env vars are loaded
        const { db } = await import('../lib/db');
        const { blogPosts, authors } = await import('../shared/schema');

        console.log('📝 Adding test blog post...\n');

        // Check if db is available
        if (!db) {
            console.error('❌ Database connection not available. Check DATABASE_URL in .env.local');
            process.exit(1);
        }

        // Get first author
        const allAuthors = await db.select().from(authors);
        if (allAuthors.length === 0) {
            console.error('❌ No authors found. Please create an author first.');
            process.exit(1);
        }

        const author = allAuthors[0];
        console.log(`✅ Using author: ${author.name} (${author.id})\n`);

        // Check if test post already exists
        const existingPost = await db.query.blogPosts.findFirst({
            where: (posts: any, { eq }: any) => eq(posts.slug, 'test-blog-post'),
        });

        if (existingPost) {
            console.log('⚠️  Test post already exists with slug: test-blog-post');
            console.log('Deleting it first...\n');
            await db.delete(blogPosts).where((posts: any) => posts.slug === 'test-blog-post');
        }

        // Insert test blog post with multilingual content
        const newPost = await db.insert(blogPosts).values({
            // Ukrainian (default)
            title: 'Як штучний інтелект змінює готельний бізнес',
            slug: 'test-blog-post',
            content: `Штучний інтелект (AI) революціонізує готельну індустрію. Від автоматизації бронювань до персоналізації гостьового досвіду - AI відкриває нові можливості для готелів будь-якого розміру.

## Основні переваги AI в готелях

1. **Автоматизація рутинних процесів** - AI бере на себе повторювані задачі, звільняючи час персоналу для більш важливих справ.

2. **Персоналізація гостьового досвіду** - AI аналізує вподобання гостей та пропонує індивідуальні рекомендації.

3. **Оптимізація цін** - Динамічне ціноутворення на основі попиту допомагає максимізувати прибуток.

## Приклади використання

Сучасні готелі використовують AI-чатботів для відповідей на запитання гостей 24/7, системи розпізнавання обличь для безпеки та багато іншого.`,

            // Russian translation
            titleRu: 'Как искусственный интеллект меняет гостиничный бизнес',
            contentRu: `Искусственный интеллект (AI) революционизирует гостиничную индустрию. От автоматизации бронирований до персонализации гостевого опыта - AI открывает новые возможности для отелей любого размера.

## Основные преимущества AI в отелях

1. **Автоматизация рутинных процессов** - AI берет на себя повторяющиеся задачи, освобождая время персонала для более важных дел.

2. **Персонализация гостевого опыта** - AI анализирует предпочтения гостей и предлагает индивидуальные рекомендации.

3. **Оптимизация цен** - Динамическое ценообразование на основе спроса помогает максимизировать прибыль.

## Примеры использования

Современные отели используют AI-чатботов для ответов на вопросы гостей 24/7, системы распознавания лиц для безопасности и многое другое.`,

            // English translation
            titleEn: 'How Artificial Intelligence is Transforming the Hotel Industry',
            contentEn: `Artificial Intelligence (AI) is revolutionizing the hospitality industry. From automating bookings to personalizing guest experiences - AI opens new opportunities for hotels of any size.

## Key Benefits of AI in Hotels

1. **Automation of Routine Processes** - AI takes over repetitive tasks, freeing up staff time for more important matters.

2. **Guest Experience Personalization** - AI analyzes guest preferences and offers personalized recommendations.

3. **Price Optimization** - Dynamic pricing based on demand helps maximize profits.

## Use Cases

Modern hotels use AI chatbots to answer guest questions 24/7, facial recognition systems for security, and much more.`,

            // SEO metadata
            seoTitle: 'AI в готелях: Як технології змінюють індустрію гостинності',
            seoDescription: 'Дізнайтеся, як штучний інтелект допомагає готелям покращити сервіс, автоматизувати процеси та збільшити прибуток.',
            seoTitleRu: 'AI в отелях: Как технологии меняют индустрию гостеприимства',
            seoDescriptionRu: 'Узнайте, как искусственный интеллект помогает отелям улучшить сервис, автоматизировать процессы и увеличить прибыль.',
            seoTitleEn: 'AI in Hotels: How Technology is Transforming Hospitality',
            seoDescriptionEn: 'Discover how artificial intelligence helps hotels improve service, automate processes, and increase profits.',

            // Other fields
            authorId: author.id,
            status: 'published',
            category: 'AI & Technology',
            excerpt: 'Дізнайтеся, як AI змінює готельний бізнес та відкриває нові можливості',
            keywords: 'AI, штучний інтелект, готелі, автоматизація, гостинність',
            // tags will use default value []
            publishedAt: new Date(),
        }).returning();

        console.log('✅ Successfully created test blog post!\n');
        console.log('Post details:');
        console.log(`   Title: ${newPost[0].title}`);
        console.log(`   Slug: ${newPost[0].slug}`);
        console.log(`   Status: ${newPost[0].status}`);
        console.log(`   URL: http://localhost:3000/blog/${newPost[0].slug}`);
        console.log(`   Published: ${newPost[0].publishedAt}\n`);

    } catch (error) {
        console.error('❌ Error adding test blog post:', error);
        process.exit(1);
    }

    process.exit(0);
}

addTestBlogPost();
