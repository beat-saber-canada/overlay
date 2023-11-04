<script lang="ts">
	import type { Song } from "$lib/types";

    export let map: Song | undefined;

    let difficulties = ["Easy", "Normal", "Hard", "Expert", "ExpertPlus"];

    let mapIcon: string | undefined;

    fetch(`https://api.beatsaver.com/maps/hash/${map?.id.split("_")[2]}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            mapIcon = data.versions[0].coverURL;
        });
</script>

<div class="grid grid-flow-col bg-grey-800">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="rounded w-10 h-10 me-2" src={mapIcon}>
    <p>{map?.name ?? "No Map Selected"} - {difficulties[map?.difficulty ?? 0]}</p>
</div>