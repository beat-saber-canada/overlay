<script lang="ts">
	import type ButtonDef from "$lib";

    let buttonDef: ButtonDef[] = [
        {
            name: "3v3",
            goto: "/scenes/3v3",
            data: null
        },
        {
            name: "bracket",
            goto: "/scenes/bracket",
            data: null
        },
        {
            name: "pool",
            goto: "/scenes/pool",
            data: null
        },
        {
            name: "waiting",
            goto: "/scenes/waiting",
            data: null
        }
    ]
</script>

<div class="flex flex-row bg-stone-800 w-[100vw] h-[100vh] justify-center items-center">
    <div class="flex flex-col w-screen h-screen justify-center items-center">
        <div class="grid grid-flow-col col-auto gap-3">
            {#each buttonDef as def}
                <div class="bg-red-600 m-3 rounded-xl text-white text-2xl">
                    {def.name}
                </div>
            {/each}
        </div>
    </div>
</div>