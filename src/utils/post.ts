import type { CollectionEntry } from "astro:content";
import { fallbackLanguage, supportedLanguages } from "i18n";

export function sortMDByDate(posts: CollectionEntry<"post">[] = []) {
	return posts.sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf()
	);
}

export function getUniqueTags(posts: CollectionEntry<"post">[] = []) {
	const uniqueTags = new Set<string>();
	posts.forEach((post) => {
		post.data.tags.map((tag) => uniqueTags.add(tag));
	});
	return Array.from(uniqueTags);
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const runningTags: { [key: string]: number } = { ...prev };
		post.data.tags.forEach((tag) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});
}

export function getNonDraftPosts(posts: CollectionEntry<"post">[] = []) {
	return posts.filter((post) => !post.data.draft);
}

export function getLocaleFromPostId(id: string): string {
	const filename = id.split("/")[1];
	const fileinfo = filename.split(".");
	if (fileinfo.length < 3) {
		return fallbackLanguage;
	}
	const locale = fileinfo[1];
	return Object.hasOwn(supportedLanguages, locale) ? locale : fallbackLanguage;
}
