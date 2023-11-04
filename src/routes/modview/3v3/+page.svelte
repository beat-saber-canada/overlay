<script lang="ts">
	import { gqlClient } from '$lib/gql';
	import { gql } from 'graphql-request';

	let getTaMatches = gql`
		query {
			state {
				matches {
					id
                    coordinators {
                        id
                        name
                    }
					players {
						name
						id
					}
				}
			}
		}
	`;

    type Match = {
        id: string;
        coordinators: {
            id: string;
            name: string;
        }[];
        players: {
            name: string;
            id: string;
        }[];
    }

    let eMatches: Match[] = [];

	gqlClient.request(getTaMatches).then((data: any) => {
		console.log(JSON.stringify(data.state.matches));
        eMatches = data.state.matches; 
	});

    const selectMatch = (guid: string) => {
        console.log(guid);

        let mutation =  gql`
                mutation updatePage($page: InputPage!) {
                    updatePage(page: $page) {
                        page {
                            path
                        }
                    }
                }
            `;
            let vars =  {
                "page": {
                    "path": "/scenes/3v3",
                    "data": {
                        "key": "matchId",
                        "value": guid
                    }
                }
            }
        
        gqlClient.request(mutation, vars).then((data: any) => {
            console.log(data);
        });
    }
</script>

<div class="flex flex-col text-secondary">
	<div class="items-center justify-center text-white text-2xl font-bold">
		<table class="table-auto">
			<thead>
				<tr>
					<th class="px-4 py-2">Match ID</th>
					<th class="px-4 py-2">Coordinator</th>
					<th class="px-4 py-2">Players</th>
					<th class="px-4 py-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if eMatches.length === 0}
					<tr>
						<td class="border px-4 py-2 text-center" colspan="4">No Matches</td>
					</tr>
				{:else}
					{#each eMatches as match}
						<tr>
							<td class="border px-4 py-2 text-center">{match.id}</td>
							<td class="border px-4 py-2 text-center">{match.coordinators[0].name}</td>
							<td class="border px-4 py-2 text-center text-ellipsis">
								{match.players}
								{JSON.stringify(match)}
							</td>
							<td>
								<button
									id={match.id}
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
									on:click={() => {selectMatch(match.id)}}
								>
									Select Match
								</button>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
