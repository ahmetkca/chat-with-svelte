<script>
    import {fade} from 'svelte/transition';
    export let usersTypingList;
    let whoIsTyping = '';

    $: console.log("FROM WhoIsTyping component" + usersTypingList);
    $: if (usersTypingList.length == 0) {
        whoIsTyping = '';
    } else if (usersTypingList.length == 1) {
        whoIsTyping = `<span class="font-extrabold">${usersTypingList[0]}</span> is typing...`;
    } else if (usersTypingList.length == 2) {
        whoIsTyping = `<span class="font-extrabold">${usersTypingList[0]}</span> and <span class="font-extrabold">${usersTypingList[1]}</span> are typing...`;
    } else if (usersTypingList.length == 3) {
        whoIsTyping = `<span class="font-extrabold">${usersTypingList[0]}</span>, <span class="font-extrabold">${usersTypingList[1]}</span> and <span class="font-extrabold">${usersTypingList[2]}</span> are typing...`;
    } else if (usersTypingList.length > 3) {
        whoIsTyping = 'Several people are typing...';
    } else {
        whoIsTyping = '';
    }
</script>

<!-- {#if usrList.length == 1}
{:else if usrList.length == 2}
{:else if usrList.length == 3}
{:else if usrList.length > 3}
{/if} -->
<div class=" text-sm animate-bounce text-white text-opacity-75 my-0.5 " transition:fade>
    <span class="animate-pulse font-mono">{@html whoIsTyping}</span>
</div>