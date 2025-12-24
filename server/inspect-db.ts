
import { db } from "./db";
import { blogPosts } from "../shared/schema";
import { count, eq } from "drizzle-orm";

async function inspect() {
    console.log("--- Database Inspection ---");
    try {
        const totalCount = await db.select({ value: count() }).from(blogPosts);
        console.log("Total posts in database:", totalCount[0].value);

        const allPosts = await db.select({
            id: blogPosts.id,
            title: blogPosts.title,
            status: blogPosts.status,
            publishedAt: blogPosts.publishedAt,
            slug: blogPosts.slug
        }).from(blogPosts);

        console.log("\nAll posts details:");
        allPosts.forEach(p => {
            console.log(`- [${p.status}] "${p.title}" (Slug: ${p.slug}, PublishedAt: ${p.publishedAt})`);
        });

        const publishedPosts = allPosts.filter(p => p.status === 'published');
        console.log("\nCount of 'published' posts:", publishedPosts.length);

        if (publishedPosts.length === 0) {
            console.log("\nWARNING: No posts found with status 'published'.");
            const draftPosts = allPosts.filter(p => p.status === 'draft');
            if (draftPosts.length > 0) {
                console.log(`Found ${draftPosts.length} posts with status 'draft'. Do you need to update them to 'published'?`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Inspection failed:", error);
        process.exit(1);
    }
}

inspect();
