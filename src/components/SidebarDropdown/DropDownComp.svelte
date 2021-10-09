<style>
    .hide {
        display: none;
    }
</style>

<script>

    let isHide = true;

    function toggleHide() {
        isHide = !isHide;
    }
</script>

<div >
    <!-- active & hover classes 'bg-indigo-100 dark:bg-indigo-600' -->
    <a
      href="#"
      on:click="{toggleHide}"
      class="flex items-center p-2 text-white transition-colors rounded-md dark:text-light hover:bg-white hover:text-black dark:hover:bg-indigo-600"
      role="button"
      aria-haspopup="true"
      aria-expanded={isHide ? 'false' : 'true'}
    >
      <span aria-hidden="true">
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </span>
      <span class="ml-2 text-sm"> Rooms </span>
      <span class="ml-auto" aria-hidden="true">
        <!-- active class 'rotate-180' -->
        <svg
          class="w-4 h-4 transition-transform transform"
          class:rotate-180={!isHide}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </a>
    <div role="menu" class:hidden={isHide} class="mt-2 space-y-2 px-7" aria-label="Dashboards">
      <!-- active & hover classes 'text-gray-700 dark:text-light' -->
      <!-- inActive classes 'text-gray-400 dark:text-gray-400' -->
      <a
        href="#"
        role="menuitem"
        class="block p-2 text-sm text-white transition-colors duration-200 rounded-md dark:text-gray-400 dark:hover:text-light hover:text-gray-700"
      >
        Browse Rooms
      </a>
      <a
        href="#"
        role="menuitem"
        class="block p-2 text-sm text-white transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
      >
        Join a Room
      </a>
      <a
        href="#"
        role="menuitem"
        class="block p-2 text-sm text-white transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
      >
        Create a Room
      </a>
    </div>
  </div>