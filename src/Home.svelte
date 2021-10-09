<script>
    
    export let socket;
    // import './main.css';
    import RoomListContainer from './components/HomeRoomList/RoomListContainer.svelte';
    import SvelteLogo from './components/SvelteLogo.svelte';
    import {push} from 'svelte-spa-router';
    import {isAuthenticated} from './stores';
    import {onMount} from 'svelte';
    import { username } from './stores';
    
    onMount(() => {
        console.log("Home component mounted.");
        
    });
    $: console.log("Is user authenticated for room: " + $isAuthenticated)
    function handleJoinRoom() {
        push('/join');
    }

    function handleCreateRoom() {
        push('/createRoom');
    }

    
</script>

<style>

</style>

<div class=" max-w-screen-xl mx-auto px-4 bg-black container flex h-screen justify-center items-center shadow-2xl">
    <div class="grid grid-rows space-y-4">
        <SvelteLogo/>
        <div class="justify-items-center text-center">
            <!-- <img src="/logo.svg" class="App-logo" alt="logo" /> -->
            <p class="self-center text-orange text-3xl md:text-5xl font-mono subpixel-antialiased text-center">Chat With Svelte</p>
            <p class="self-center text-white text-1xl md:text-2xl font-mono text-center" >Hello, <span class="text-orange font-mono font-extrabold">{$username}</span></p>
        </div>
        <!-- <div class="grid grid-cols-2 gap-2 justify-items-center text-center"> -->
        <!-- <div class="flex flex-wrap justify-center px-0 py-0 mx-0 lg:mx-auto my-0 space-x-2 min-h-full " >
            <button on:click={handleJoinRoom} class="sm:w-2/6 md:w-2/5 w-5/12 h-full mx-2 transition-colors duration-150 text-white shadow-2xl rounded-lg bg-orange hover:bg-white hover:shadow-inner hover:text-black ">
                <p class="mx-1 text-xl sm:text-lg md:text-xl lg:text-2xl font-black font-mono select-none">Join a room</p>
            </button>
            <button on:click={handleCreateRoom} class="sm:w-2/6 md:w-2/5 w-5/12  h-full mx-2 transition-colors duration-150 text-white shadow-2xl rounded-lg bg-orange hover:bg-white hover:shadow-inner hover:text-black ">
                <p class="mx-1 text-xl sm:text-lg md:text-xl lg:text-2xl font-black font-mono select-none">Create a room</p>
            </button>
        </div> -->
        <div class="flex flex-wrap my-2 px-4 justify-center mx-auto max-w-md">
            <button on:click={handleJoinRoom} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 lg:w-32 md:w-2/5 bg-orange hover:bg-white hover:shadow-inner hover:text-black">
                <p class="text-lg md:text-2xl font-black font-mono select-none">Join a Room</p>
            </button>
            <button on:click={handleCreateRoom} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 lg:w-32 md:w-2/5 bg-orange hover:bg-white hover:shadow-inner hover:text-black">
                <p class=" text-lg md:text-2xl font-black font-mono select-none">Create a Room</p>
            </button>
        </div>

        <RoomListContainer />
    </div>
</div>