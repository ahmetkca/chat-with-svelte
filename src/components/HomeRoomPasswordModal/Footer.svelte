<script>
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher();

    function toggleHidden() {
        dispatch('toggleHidden', {});
    }

    function handleJoin() {
        dispatch('handleJoinPrivate', {});
    }
</script>

<button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-md px-4 py-2 bg-orange text-base font-medium text-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
    on:click={handleJoin}>
    Join
  </button>
  <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-200 shadow-md px-4 py-2 bg-white text-base font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    on:click={toggleHidden}>
    Cancel
</button>