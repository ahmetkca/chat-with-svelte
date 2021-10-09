<script>
    import {fade} from 'svelte/transition';
    let isOpen = false;

    function handleIsOpen() {
        isOpen = !isOpen;
    }
    function handleKeydown(e) {
        if(e.key === "Escape") {
            // write your logic here.
            if (isOpen) { isOpen = false; }
        }
    }
</script>
<svelte:window on:keydown={handleKeydown} />
<nav
    class="flex fixed w-full items-center justify-between px-6 h-16 bg-black text-white border-b border-orange z-10"
  >
    <div class="flex items-center">
        <button class="mr-2" aria-label="Open Menu" on:click="{() => handleIsOpen()}">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
    </div>
    <div class="flex items-center">
        <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
            <button
              title="Wishlist"
              class="flex items-center p-3 font-medium mr-2 text-center bg-orange text-white rounded  hover:bg-white hover:text-black focus:ring-3"
            >
              <span>Wishlist</span>
            </button>
        </div>
    </div>

    {#if isOpen}
        <div
            class="z-10 fixed inset-0 transition-opacity"
            transition:fade
        >
            <div
            on:click="{() => handleIsOpen()}"
            
            class="absolute inset-0 bg-black opacity-80"
            tabindex="0"
            ></div>
        </div>
    {/if}
    
    
    <aside
      class={"transform top-0 left-0 w-64 bg-black text-white fixed h-full border-r border-orange overflow-auto ease-in-out transition-all duration-300 z-30" + (isOpen ? ' translate-x-0' : ' -translate-x-full')}
        transition:fade
      >
      <span
        class="flex w-full items-center border-b border-white"
      >
        <p class="text-center text-2xl">Chat With</p>
        <p class="text-center text-2xl">Svelte</p>
      </span>
    </aside>
</nav>

<style>
</style>
