import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local FIRST before any other imports
config({ path: resolve(process.cwd(), '.env.local') });

async function checkBlogPosts() {
    try {
        // Dynamic imports after env vars are loaded
        const { db } = await import('../lib/db');
        const { blogPosts, authors } = await import('../shared/schema');

        console.log('🔍 Checking blog posts in database...\n');

        // Check if db is available
        if (!db) {
            console.error('❌ Database connection not available. Check DATABASE_URL in .env.local');
            process.exit(1);
        }

        // Fetch all blog posts
        const posts = await db.query.blogPosts.findMany({
            with: {
                author: true,
            },
        });

        console.log(`📊 Found ${posts.length} blog posts in database\n`);

        if (posts.length === 0) {
            console.log('⚠️  No blog posts found in the database!');
            console.log('This is why the blog page is empty.\n');
            console.log('To add blog posts, you need to:');
            console.log('1. Use an admin panel to create posts');
            console.log('2. Insert data directly into the database');
            console.log('3. Run a migration script with sample data\n');
        } else {
            console.log('Blog posts:');
            console.log('─'.repeat(80));
            posts.forEach((post: any, index: number) => {
                console.log(`\n${index + 1}. ${post.title}`);
                console.log(`   Slug: ${post.slug}`);
                console.log(`   Status: ${post.status}`);
                console.log(`   Published: ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}`);
                console.log(`   Author: ${post.author?.name || 'No author'}`);
                if (post.tags) {
                    console.log(`   Tags: ${Array.isArray(post.tags) ? post.tags.join(', ') : post.tags}`);
                }
                console.log(`   Has Russian translation: ${!!post.titleRu}`);
                console.log(`   Has English translation: ${!!post.titleEn}`);
                console.log(`   Has Polish translation: ${!!post.titlePl}`);
            });
        }

        // Check authors
        const allAuthors = await db.select().from(authors);
        console.log(`\n\n👥 Found ${allAuthors.length} authors in database`);
        if (allAuthors.length > 0) {
            allAuthors.forEach((author: any) => {
                console.log(`   - ${author.name} (${author.id})`);
            });
        }

    } catch (error) {
        console.error('❌ Error checking blog posts:', error);
        process.exit(1);
    }

    process.exit(0);
}

checkBlogPosts();
