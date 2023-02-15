import siteMeta from "@/site-config";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get = async () => {
	const posts = await getCollection("post");

	return rss({
		title: siteMeta.title,
		description: siteMeta.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: post.slug,
		})),
	});
};
