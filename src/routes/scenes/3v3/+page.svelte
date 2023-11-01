<script lang="ts">
	import { gqlClient } from '$lib/gql';
	import type { Team } from '$lib/types';
	import { gql } from 'graphql-request';
	type Data = {
		state: {
			matches: [
				{
					id: string;
					players: {
						id: string;
						name: string;
						team: {
							id: string;
							name: string;
						};
					}[];
					currentMap: { id: string; name: string; difficulty: number; modifiers: unknown[] };
					scores: { ownerId: string; score: number }[];
				}
			];
		};
	};
	const query = gql`
		query {
			state {
				matches {
					id
					players {
						id
						name
						team {
							id
							name
						}
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
					}
				}
			}
		}
	`;

	let teams: Team[] = [
		{
			id: '1',
			name: 'TeamName1',
			players: [
				{
					name: 'Checksum',
					id: 'chksmd',
					score: 'x999 99.99%',
					streamUrl: ''
				},
				{
					name: 'Sargon64',
					id: 'sargon64',
					score: 'x999 99.99%',
					streamUrl: ''
				},
				{
					name: 'BlackDemonFire',
					id: 'blackdemonfire4',
					score: 'x999 99.99%',
					streamUrl: ''
				}
			]
		},
		{
			id: '2',
			name: 'TeamName2',
			players: [
				{
					name: 'Checksum',
					id: 'chksmd',
					score: 'x999 99.99%',
					streamUrl: ''
				},
				{
					id: 'sargon64',
					name: 'Sargon64',
					score: 'x999 99.99%',
					streamUrl: ''
				},
				{
					id: 'blackdemonfire4',
					name: 'BlackDemonFire',
					score: 'x999 99.99%',
					streamUrl: ''
				}
			]
		}
	];
	gqlClient.request<Data>(query).then((data: Data) => {
		const newTeams: Team[] = [];
		data.state.matches[0].players.forEach((player) => {
			if (!newTeams.some((t) => t.id === player.team.id))
				newTeams.push({
					...player.team,
					players: []
				});
		});
		data.state.matches[0].players.forEach((player) =>
			newTeams
				.find((team) => team.id === player.team.id)
				?.players.push({
					name: player.name,
					id: player.id,
					streamUrl: '',
					score:
						data.state.matches[0].scores
							.find((score) => score.ownerId === player.id)
							?.score.toString() ?? ''
				})
		);
		teams = newTeams;
	});
</script>

<div class="h-screen container mx-auto my-2 flex flex-col">
	{#each teams as team}
		<h3 class="text-2xl">{team.name}</h3>
		<div class="flex flex-row h-full">
			{#each team.players as player}
				<div class="w-full h-full m-2">
					<div class="flex flex-row">
						<img
							src="https://files.blackdemon.tech/enby_sword.png"
							alt={`${player.name}'s profile pic`}
							class="w-10 h-10"
							style="image-rendering: pixelated;"
						/>
						<h4 class="text-xl p-1">{player.name}</h4>
					</div>
					<div class="bg-fuchsia-700 my-1 h-4/6">
						<p class="mt-auto ml-auto">{player.score}</p>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
