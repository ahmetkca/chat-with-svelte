<script>
    import {fade} from 'svelte/transition';
    export let user;
    export let type;
    export let message;
    export let time;
    import {onMount} from 'svelte';
    let msgDateTime;

    onMount(() => {
        console.log(time);
        msgDateTime = time.toLocaleString('en-CA', { hour12: true, hour: '2-digit', minute: '2-digit'});
    })
</script>

{#if type === "client"}
    <div class="clearfix " transition:fade>
        <div class="bg-white float-right mx-4 my-2 p-2 rounded-lg rounded-tr-none clearfix text-black text-sm lg:text-base font-mono w-5/6 max-w-max">
            <span class="font-bold">{user}</span>
            <p>{message}</p>
            <span class="my-1 text-xs float-right">{msgDateTime}</span>
        </div>
    </div>
{:else if type === "server"}
    <div class=" clearfix" transition:fade>
        <div class=" bg-orange float-left mx-4 my-2 p-2 rounded-lg rounded-tl-none clearfix text-white text-sm lg:text-base font-mono w-5/6 max-w-max">
            <span class="font-bold">{user}</span>
            <p>{message}</p>
            <span class="my-0.5 text-xs float-right">{msgDateTime}</span>
        </div>
        
    </div>
{:else if type === "general"}
    <div class="clearfix " transition:fade>
        <div class=" text-center mx-4 my-2 p-2 rounded-lg clearfix text-white text-lg font-mono">
            {message}
        </div>
    </div>
{/if}

<style>
</style>