<script lang="ts">
	export let name = 'test';
	export let scale: number = 1;
	export let style: string;

	let width = 1920 * scale;
	let height = 1080 * scale;

</script>

<iframe
	id="{name}-stream"
	title="{name}'s stream"
	src="http://207.171.252.31:8889/bsc/{name.replaceAll(" ", "-")}"
	{height}
	{width}
	frameborder="0"
	scrolling="no"
	class={style}
/>
