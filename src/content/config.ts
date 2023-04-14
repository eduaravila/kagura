import { rssSchema } from "@astrojs/rss";
import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: z.object({
		title: z.string().max(150),
		description: z.string().min(50),
		publishDate: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		draft: z.boolean().default(false),
		ogImage: z.string().optional(),
	}),
});

const rss = defineCollection({
	schema: rssSchema,
});

export const collections = { post, rss };
