import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/shared/schema";
import { desc, eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://hotelmol.com";

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/solutions`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/roomie`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookies`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Dynamic routes: Blog Posts
    // Fetch all published posts
    const posts = await db.query.blogPosts.findMany({
        where: eq(blogPosts.status, "published"),
        orderBy: [desc(blogPosts.publishedAt)],
    });

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
}
