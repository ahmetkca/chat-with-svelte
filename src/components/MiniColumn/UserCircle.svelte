<style>

    .hide {
        display: none;
    }
</style>
<script>
    export let email;
    let isHide = true;

    function toggleHide() {
        isHide = !isHide
    }
</script>
<div class="relative flex items-center justify-center flex-shrink-0">
    <!-- User avatar button -->
    <div class="" >
      <button
        on:click={toggleHide}
        type="button"
        aria-haspopup="true"
        aria-expanded={isHide ? "false" : "true"}
        class="bg-white block transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
      >
        <span class="sr-only">User menu</span>
        <img
          class="w-10 h-10 rounded-full"
          src="https://avatars.dicebear.com/4.5/api/identicon/{email}.svg"
          alt="Ahmed Kamel"
        />
      </button>

      <!-- User dropdown menu -->
      <div
        class:hide={isHide}
        x-ref="userMenu"
        x-transition:enter="transition-all transform ease-out"
        x-transition:enter-start="-translate-y-1/2 opacity-0"
        x-transition:enter-end="translate-y-0 opacity-100"
        x-transition:leave="transition-all transform ease-in"
        x-transition:leave-start="translate-y-0 opacity-100"
        x-transition:leave-end="-translate-y-1/2 opacity-0"
        class="absolute w-56 py-1 mb-4 bg-white rounded-md shadow-lg min-w-max left-5 bottom-full ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none z-10"
        tabindex="-1"
        role="menu"
        aria-orientation="vertical"
        aria-label="User menu"
      >
        <a
          href="#"
          role="menuitem"
          class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-indigo-600"
        >
          Your Profile
        </a>
        <a
          href="#"
          role="menuitem"
          class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-indigo-600"
        >
          Settings
        </a>
        <a
          href="#"
          role="menuitem"
          class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-indigo-600"
        >
          Logout
        </a>
      </div>
    </div>
  </div>