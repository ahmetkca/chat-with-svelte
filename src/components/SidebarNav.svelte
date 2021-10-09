<style>

    .hideSideBar {
        display: none;
    }

</style>

<script>
    import {fly} from 'svelte/transition';
    import {loggedUser} from '../stores';
    import DropDownComp from './SidebarDropdown/DropDownComp.svelte';
    import {onMount} from 'svelte';
    import UserCircle from './MiniColumn/UserCircle.svelte';
    
    let email = $loggedUser?.email;

    $: if ($loggedUser) {
      email = $loggedUser.email;
    }
    let innerWidth;
    let isHideBar = innerWidth >= 1024 ? false : true;
    $: if (innerWidth <= 1024) {
      isHideBar = true;
    }
    $: if (innerWidth >= 1024) {
      isHideBar = false;
    }
    $: console.log(innerWidth)

    onMount(() => {
      isHideBar = innerWidth >= 1024 ? false : true;
    })

    function toggleSideBar() {
        isHideBar = !isHideBar;
    }

</script>

<svelte:window bind:innerWidth="{innerWidth}" />


<div class="flex h-screen antialiased  dark:bg-dark dark:text-light"> <!--text-white bg-black-->
    <!-- Sidebar -->
    <!-- Backdrop -->
    <div
      class:hideSideBar={isHideBar}
      on:click={toggleSideBar}
      class="fixed inset-0 z-10 bg-black bg-opacity-75 lg:hidden"
      style="opacity: 0.5"
      aria-hidden="true"
      in:fly="{{ y: 200, duration: 2000 }}"
    ></div>
    {#key isHideBar}
    <aside
      class:hideSideBar={isHideBar}
      transition:fly="{{ x: -150, duration: 500 }}"
      x-ref="sidebar"
      tabindex="-1"
      class="fixed inset-y-0 z-10 flex flex-shrink-0 overflow-hidden bg-black border-r border-orange lg:static dark:border-indigo-800 dark:bg-darker focus:outline-none"
    >
        <div class="flex flex-col flex-shrink-0 h-full px-2 py-4 border-r border-orange dark:border-indigo-800">
            <!-- Brand -->
            <div class="flex-shrink-0">
            <a
                href="#"
                class="inline-block text-xl font-bold tracking-wider text-orange uppercase dark:text-light"
            >
                CWS
            </a>
            </div>
            <div class="flex flex-col items-center justify-center flex-1 space-y-4">
            <!-- Notification button -->
            <button
                
                class="p-2 text-white transition-colors duration-200 rounded-full bg-orange hover:text-black hover:bg-white dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
            >
                <span class="sr-only">Open Notification panel</span>
                <svg
                class="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
                </svg>
            </button>

            <!-- Search button -->
            <button
                
                class="p-2 text-white transition-colors duration-200 rounded-full bg-orange hover:text-black hover:bg-white dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
            >
                <span class="sr-only">Open search panel</span>
                <svg
                class="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
            </button>

            <!-- Settings button -->
            <button
                
                class="p-2 text-white transition-colors duration-200 rounded-full bg-orange hover:text-black hover:bg-white dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:bg-indigo-100 dark:focus:bg-indigo-700 focus:ring-indigo-800"
            >
                <span class="sr-only">Open settings panel</span>
                <svg
                class="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                </svg>
            </button>
            </div>
            <!-- Mini column footer -->
            <UserCircle bind:email={email} />
        </div>
        <nav aria-label="Main" class="flex-1 w-48 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
            <DropDownComp />
        </nav>
    </aside>
    {/key}
    <div class="fixed flex items-center space-x-4 top-5 right-10 lg:hidden">
        <button
          on:click={toggleSideBar}
          class="p-1 text-indigo-400 transition-colors duration-200 rounded-md bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:ring"
        >
          <span class="sr-only">Toggle main manu</span>
          <span aria-hidden="true">
            <svg
              class:hideSideBar={!isHideBar}
              class="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class:hideSideBar={isHideBar}
              class="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
    </div>

    <!-- Main content -->
    <main class="flex-1 max-w-full w-full">
        <div
          class="flex flex-col  flex-1 h-full min-h-screen overflow-x-hidden overflow-y-auto max-w-full w-full"
        >
          <slot></slot>
        </div>
    </main>
</div>

