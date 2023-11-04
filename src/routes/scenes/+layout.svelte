<script lang="ts">
	import { goto } from '$app/navigation';
	import { gqlClient } from '$lib/gql';
	import type { OverlayPage } from '$lib/types';
	import { gql } from 'graphql-request';
	import { onDestroy, onMount } from 'svelte';

	const query = gql`
		query {
			page {
				page {
					path
				}
			}
		}
	`;

	let currentRelayPage: OverlayPage;

	$: {
		if (currentRelayPage) {
			goto(currentRelayPage.path);
		}
	}
	
	gqlClient.request(query).then((data: any) => {
		currentRelayPage = data.page.page;
	});

	// let currentHref = window.location.href.split('/').slice(-2)
	// console.log(currentHref);
	let interval: ReturnType<typeof setInterval>;
	onMount(() => {
		interval = setInterval(() => {
			gqlClient.request(query).then((data: any) => {
				if (data.page.page.path != currentRelayPage.path) {
					currentRelayPage = data.page.page;
				}
			});
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<slot />

