<script lang="ts">
	import { gqlClient } from '$lib/gql';
	import { gql } from 'graphql-request';

	// let buttonDef: ButtonDef[] = [
	// 	{
	// 		display_text: '3v3',
	// 		page: {
	// 			path: '/scenes/3v3',
	// 			data: []
	// 		}
	// 	},
    //     {
    //         display_text: 'Pool',
    //         page: {
    //             path: '/scenes/pool',
    //             data: []
    //         }
    //     },
	// 	{
	// 		display_text: 'Bracket',
	// 		page: {
	// 			path: '/scenes/bracket',
	// 			data: []
	// 		}
	// 	},
	// 	{
	// 		display_text: 'Waiting',
	// 		page: {
	// 			path: '/scenes/waiting',
	// 			data: []
	// 		}
	// 	}
	// ];

	// const changeServerPage = (page: OverlayPage) => {
	// 	let mutation =  gql`
	// 			mutation updatePage($page: InputPage!) {
	// 				updatePage(page: $page) {
	// 					page {
	// 						path
	// 					}
	// 				}
	// 			}
	// 		`;
    //         let vars =  {
    //             "page": {
    //                 "path": page.path,
    //                 "data": <any>page.data
    //             }
    //         }
		
	// 	gqlClient.request(mutation, vars).then((data: any) => {
	// 		console.log(data);
	// 	});
	// };
</script>

<div class="flex flex-row bg-stone-800 w-[100vw] h-[100vh] justify-center items-center">
	<div class="flex flex-col w-screen h-screen justify-center items-center">
		<div class="grid grid-flow-col col-auto gap-3">
			<!-- {#each buttonDef as def}
				<div
					role="button"
					tabindex="0"
					class="bg-red-600 m-3 rounded-xl text-white text-2xl select-none p-2"
					on:click={() => changeServerPage(def.page)}
					on:keydown={(e) => {
						if (e.key === 'Enter') changeServerPage(def.page);
					}}
				>
					{def.display_text}
				</div>
			{/each} -->
			<div
				role="button"
				tabindex="0"
				class="bg-red-600 m-3 rounded-xl text-white text-2xl select-none p-2"
				on:click={() => window.location.href = '/modview/3v3'}
				on:keydown={(e) => {
					if (e.key === 'Enter') window.location.href = '/modview/3v3';
				}}
			> 
				3v3
			</div>
		</div>
	</div>
</div>
