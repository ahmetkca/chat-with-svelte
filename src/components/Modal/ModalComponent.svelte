<script>
    import fadeScale from '../../transitions/svelte-transitions-fade-scale';
    import { cubicInOut } from 'svelte/easing';
    import { fade, scale, fly } from 'svelte/transition';
    export let isHidden = true;
    import {onMount} from 'svelte';
    onMount(() => {
        
    })
    // $: toggle = !isHidden
    function toggleHidden() {
        isHidden = !isHidden
    }
    // $: console.log(toggle)
</script>

<style>

</style>

{#key isHidden}
<div
      class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto"
      class:hidden={isHidden}
      in:fade
    >
    
      <div class="relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100 border border-orange rounded-lg">
        {#key isHidden}
        <div
          class="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
          class:hidden={isHidden}
          in:fadeScale={{
            delay: 200,
            duration: 750,
            easing: cubicInOut,
            baseScale: 0.5
            }}
        >
          <header class="flex items-center justify-between p-2">
            <slot name="header-title"></slot>
            <button class="focus:outline-none p-2 " on:click={toggleHidden}>
              <svg class="fill-current " xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                ></path>
              </svg>
            </button>
          </header>
          <main class="flex place-content-center">
            <slot name="main">
            </slot>
          </main>
          <footer class="flex justify-center p-2 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="footer">
            </slot>
          </footer>
        </div>
        {/key}
      </div>
    </div>
{/key}