import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl });

async function run() {
    const queries = [

        'ALTER TABLE "cookie_consents" ADD COLUMN IF NOT EXISTS "consented_at" timestamp DEFAULT now()',
        'ALTER TABLE "cookie_consents" ADD COLUMN IF NOT EXISTS "language" text DEFAULT \'en\'',
        'ALTER TABLE "cookie_consents" ADD COLUMN IF NOT EXISTS "categories" jsonb DEFAULT \'{}\'::jsonb',
        'ALTER TABLE "cookie_consents" ADD COLUMN IF NOT EXISTS "ip_hash" text',
        'CREATE TABLE IF NOT EXISTS "lead_submissions" ( "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, "type" text NOT NULL, "name" text NOT NULL, "email" text, "phone" text, "role" text, "property" text, "property_size" text, "comment" text, "data_processing" boolean DEFAULT false NOT NULL, "marketing" boolean DEFAULT false NOT NULL, "language" text DEFAULT \'en\', "utm_source" text, "utm_medium" text, "utm_campaign" text, "referrer" text, "mailchimp_status" text, "created_at" timestamp DEFAULT now() NOT NULL )',
        'CREATE TABLE IF NOT EXISTS "site_settings" ( "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, "key" text NOT NULL, "value" text NOT NULL, "updated_at" timestamp DEFAULT now() NOT NULL, CONSTRAINT "site_settings_key_unique" UNIQUE("key") )',
        'CREATE TABLE IF NOT EXISTS "waitlist_submissions" ( "id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, "name" text NOT NULL, "phone" text NOT NULL, "budget" text NOT NULL, "hotel_name" text, "language" text DEFAULT \'en\', "created_at" timestamp DEFAULT now() NOT NULL )'
    ];

    for (const q of queries) {
        try {
            console.log(`Executing: ${q.substring(0, 50)}...`);
            await pool.query(q);
            console.log('OK');
        } catch (e) {
            console.error('Error:', e.message);
        }
    }
    await pool.end();
    console.log('All migrations completed.');
    process.exit(0);
}

run();
