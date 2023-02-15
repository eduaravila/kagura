---
import PageLayout from "@/layouts/Base";

const meta = {
	title: "About",
	description: "Eduardo avila about",
};
---

<PageLayout meta={meta}>
	<div class="space-y-6">
		<h1 class="title">About</h1>
		<p>
			Welcome to Eduardo Avila's personal blog, where technology and life intersect! Follow along as he delves into the exciting world of web and mobile development, with the occasional foray into other captivating subjects. Don't be shy, hit him up on Twitter & Github and join the conversation!
		</p>
		<p>Here are my some of my awesome built in features:</p>
		<ul class="list-inside list-disc">
			<li>I'm ultra fast as I'm a static site</li>
			<li>I'm fully responsive</li>
			<li>I come with a light and dark mode</li>
			<li>I'm easy to customise and add additional content</li>
			<li>I have Tailwind CSS styling</li>
			<li>Shiki code syntax highlighting</li>
			<li>Satori for auto generating OG images for blog posts</li>
		</ul>
	</div>
</PageLayout>
