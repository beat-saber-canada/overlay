<script lang="ts">
	import PlayerInfo from './../../../lib/components/PlayerInfo.svelte';
	import MapCard from '$lib/components/MapCard.svelte';
	import StreamView from '$lib/components/StreamView.svelte';
	import { gqlClient } from '$lib/gql';
	import type { Match, Team } from '$lib/types';
	import { gql } from 'graphql-request';
	import { onDestroy, onMount } from 'svelte';
	import { TeamLookup } from '$lib/teams';

	const query = gql`
		query {
			page {
				page {
					data {
						key
						value
					}
				}
			}
		}
	`;

	const getMatchQuery = gql`
		query {
			state {
				matches {
					id
					players {
						id
						name
						userId
						playState
						downloadState
						team {
							id
							name
						}
						modList
						streamDelayMs
						streamSyncStartMs
					}
					teams {
						id
						name
					}
					coordinators {
						id
						name
						userId
						playState
						downloadState
						team {
							id
							name
						}
						modList
						streamDelayMs
						streamSyncStartMs
					}
					currentMap {
						id
						name
						difficulty
						modifiers
					}
					scores {
						ownerId
						score
						combo
						accuracy
						notesMissed
						badCuts
						bombHits
						wallHits
					}
				}
			}
		}
	`;

	let matchGuid: string;
	let match: Match;
	gqlClient.request(query).then((data: any) => {
		matchGuid =
			(<{ key: string; value: string }[]>data.page.page.data).find((d) => d.key == 'matchId')
				?.value ?? '';

		gqlClient.request(getMatchQuery).then((data: any) => {
			match = data.state.matches.find((m: Match) => m.id == matchGuid);
		});
	});

	let interval: number;
	onMount(() => {
		interval = setInterval(() => {
			gqlClient.request(getMatchQuery).then((data: any) => {
				match = data.state.matches.find((m: Match) => m.id == matchGuid);
				// team score
				match.teams.map((team: Team) => {
					team.avgScore = match.scores
						.filter((s) => match.players.find((p) => p.id == s.ownerId)?.team.id == team.id)
						.reduce((a, b) => a + b.score, 0);

					team.avgAccuracy =
						match.scores
							.filter((s) => match.players.find((p) => p.id == s.ownerId)?.team.id == team.id)
							.reduce((a, b) => a + b.accuracy, 0) /
						match.players.filter((p) => p.team.id == team.id).length;
				});
			});
		}, 1000);
	});

	$: {
		if (match) {
			console.log(match);
		}
	}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="h-screen w-screen flex flex-col font-bold text-[#ffffff] font-['Arial'] text-2xl m-[-2] items-center justify-center bg-[url('https://oh-no.icu/Vn12yXUMQ3.png?key=dIiF8yRZ0RjidY')]">
	{#if match}
		<div class="flex flex-row gap-5 items-center">
			<div class="flex flex-row gap-2 pt-2">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="rounded w-10 h-10" src="{TeamLookup.find((e) => e.name === match.teams[0].name)?.image}">
				<h3 class="text-2x pt-4">{match.teams[0].name}</h3>
				<div class="grid items-center justify-center ps-10">
					<p class="text-3xl">{((match.teams[0].avgAccuracy ?? 1) * 100).toFixed(2)}%</p>
					<p class="text-xl">{match.teams[0].avgScore ?? 0} </p>
				</div>
			</div>
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="w-10 h-10" src="https://oh-no.icu/VbfnMqxs6C.png?key=VSmlX5fYVL7HUL">
			<div class="flex flex-row gap-2 pt-2">
				<div class="grid items-center justify-center pe-10">
					<p class="text-3xl">{((match.teams[1].avgAccuracy ?? 1) * 100).toFixed(2)}%</p>
					<p class="text-xl">{match.teams[1].avgScore ?? 0} </p>
				</div>
				<h3 class="text-2x pt-4">{match.teams[1].name}</h3>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="rounded w-10 h-10" src="{TeamLookup.find((e) => e.name === match.teams[1].name)?.image}">
			</div>
		</div>
		{#each match.teams as team}
			<div class="flex flex-row h-full w-full" style="">
				{#each match.players.filter((p) => p.team.id === team.id) as player}
					<div class="w-full h-full m-2">
						<PlayerInfo {player} />
						<div class="w-[50%] h-[80%] pb-10">
							<StreamView name={player.name} scale={0.41} style="" />
							<div class="grid grid-flow-col">
								<p class="mt-auto ml-auto">
									{match.scores.find((s) => s.ownerId === player.id)?.score ?? 0}
								</p>
								<p class="mt-auto ml-auto">
									{(
										(match.scores.find((s) => s.ownerId === player.id)?.accuracy ?? 0) * 100
									).toFixed(2)}%
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
		<div class="mb-[26px]">
			<MapCard map={match.currentMap} />
		</div>
	{/if}
</div>
