<script>
    import {onMount, onDestroy} from 'svelte';
    import {toastList} from '../stores';
    export let variant = '';
    export let duration = null;
    export let id;
    export let message = '';
    export let customToast = null;
    let base = '';
    let iconstyle = '';
    let icon = '';
    let name = '';
    let durationTimeout = null;
    onMount(() => {
        switch(variant) {
            case 'info':
                base = 'bg-white border-blue-500';
                iconstyle = 'text-blue-500 ';
                icon = 'fa-info-circle';
                name = "Info"
                break;
            case 'error':
                base = 'bg-white border-red-500';
                iconstyle = 'text-red-500 ';
                icon = 'fa-exclamation-circle';
                name = "Error"
                break;
            case 'warning':
                base = 'bg-white border-yellow-500';
                iconstyle = 'text-yellow-500 ';
                icon = 'fa-exclamation-circle';
                name = "Warning"
                break;
            case 'success':
                base = 'bg-white border-green-500';
                iconstyle = 'text-green-500 ';
                icon = 'fa-check';
                name = "Success"
                break;
            default:
                break;
        }
        durationTimeout = setTimeout(() => {
            toastList.pop(id)
        }, duration);
    })

    onDestroy(() => {
        console.log(id + ' toast has been destroyed!');
        clearTimeout(durationTimeout);
    })

    function handleDismiss() {
        toastList.pop(id);
    }
</script>

{#if customToast}
<svelte:component this={customToast} on:dismiss={handleDismiss} />
{:else}
<div class={"flex w-full visible flex-row shadow-lg border-l-4 rounded-md duration-100 cursor-pointer transform transition-all hover:scale-105 " + base + " max-h-40"}
    
    >
    <div class="flex flex-row p-2 flex-no-wrap w-full">
        <div class={"flex items-center h-12 w-12 mx-auto text-xl select-none"}>
            <i class={"fas " + icon + " mx-auto " + iconstyle}></i>
        </div>

        <div class="flex flex-col flex-no-wrap px-1 w-full">
            <div class="flex my-auto font-bold select-none">{name}</div>
            <p class="-mt-0.5 my-auto break-all flex text-gray-600 text-sm">
                {message}
            </p>
        </div>

        <div class="w-10 h-12 mr-2 items-center mx-auto text-center leading-none text-lg">
            <i on:click={handleDismiss} class="fas fa-times mx-auto my-auto h-full text-center text-gray-600 cursor-pointer hover:scale-105 transform "></i>
        </div>
    </div>
</div>
{/if}