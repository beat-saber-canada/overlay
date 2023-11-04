<script lang="ts">
	import type { Song } from "$lib/types";

    export let map: Song | undefined;

    let difficulties = ["Easy", "Normal", "Hard", "Expert", "ExpertPlus"];
</script>

<div class="grid grid-flow-col bg-grey-800">
    <p>{map?.name ?? "No Map Selected"} - {difficulties[map?.difficulty ?? 0]}</p>
</div>