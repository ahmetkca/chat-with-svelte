<script>
    export let location = 'top-right';
    import {onMount, onDestroy} from 'svelte';
    import {toastList} from '../stores';
    import Toast from './Toast.svelte';
    import {fly} from 'svelte/transition';

    let locationClass = '';

    onMount(() => {
        switch(location) {
            case 'top-left':
                locationClass = 'top-0 left-0';
                break;
            case 'top-right':
                locationClass = 'top-0 right-0';
                break;
            case 'bottom-right':
                locationClass = 'bottom-0 right-0';
                break;
            case 'bottom-left':
                locationClass = 'bottom-0 left-0';
                break;
            case 'top-middle':
                locationClass = 'top-0 left-1/2 -translate-x-1/2 transform';
                break;
            case 'bottom-middle':
                locationClass = 'bottom-0 left-1/2 -translate-x-1/2 transform';
                break;
            default:
                locationClass = 'top-0 right-0';
                break;
        }
    })

    onDestroy(() => {
        // remove all the toasts from toast list
        toastList.reset()
    })
</script>

<div class={locationClass + ' fixed z-50 w-full md:max-w-sm p-4 md:p-4 max-h-screen overflow-hidden pointer-events-none'}>
    <div class="flex-1 flex-col w-full mr-8 justify-end pointer-events-none">
        {#each $toastList as toast (toast.id)}
            <div class="flex py-1 w-full pointer-events-auto"
                in:fly="{{ x: 250, duration: 1000}}"
                out:fly="{{ x: 250, duration: 1000}}"
                
                >
                <Toast {...toast} />
            </div>
        {/each}
    </div>
</div>