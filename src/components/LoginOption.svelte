<script>
    export let loginView;

     function handleLoginView(lv) {
        loginView = lv;
     }
</script>

<div class="w-full max-w-xs m-auto rounded p-2 font-mono">
    <!-- <div class="flex flex-col items-center">
        <button on:click={() => handleLoginView('joinAsGuest')} class="bg-orange text-white hover:bg-white hover:text-black w-2/4 h-1/4 mt-1 mb-1 rounded-lg p-2">
            <p class="text-2xl font-black ">Join as Guest</p>
        </button>
        <button on:click={() => handleLoginView('loginAsUser')} class="bg-orange text-white hover:bg-white hover:text-black w-2/4 h-1/4 mt-1 mb-1 rounded-lg p-2">
            <p class="text-2xl font-black">Login as User</p>
        </button>
    </div> -->
    <div class="flex flex-wrap my-2 px-4 justify-center mx-auto max-w-md">
        <button on:click={() => handleLoginView('joinAsGuest')} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 lg:w-32 md:w-2/5 bg-orange hover:bg-white hover:shadow-inner hover:text-black">
            <p class="text-lg md:text-2xl font-black font-mono select-none">Login as Guest</p>
        </button>
        <button on:click={() => handleLoginView('loginAsUser')} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 lg:w-32 md:w-2/5 bg-orange hover:bg-white hover:shadow-inner hover:text-black">
            <p class=" text-lg md:text-2xl font-black font-mono select-none">Login as User</p>
        </button>
    </div>
</div>