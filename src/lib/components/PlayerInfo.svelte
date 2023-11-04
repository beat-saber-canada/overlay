<script lang="ts">
    import type { User } from "$lib/types";

    export let player: User;

    let playerIcon: string | undefined;

    fetch(`https://skillsaber.vercel.app/api/player?id=${player.userId}`)
        .then((res) => res.json())
        .then((data) => {
            playerIcon = data.profilePicture;
        });
</script>

<div class="flex flex-row pb-2">
    <img
        src={playerIcon ?? "https://oh-no.icu/NGsWonASM8.png?key=jzTalfxePenwl2"}
        alt={`${player.name}'s profile pic`}
        class="w-10 h-10 rounded"
        style="image-rendering: pixelated;"
    />
    <h4 class="text-xl p-1">{player.name}</h4>
</div>