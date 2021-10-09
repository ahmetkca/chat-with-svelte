<script>
    import {toastList} from './stores';
    import {fly} from 'svelte/transition';
    import PasswordField from './components/PasswordField.svelte';
    import SvelteLogo from './components/SvelteLogo.svelte';
    import {username, currentRoom, isPasswordMatch} from './stores';
    export let socket;
    import {push, replace} from 'svelte-spa-router';
    let input = '';
    let roomProtected = false;
    let roomType = undefined;
    let roomPassword = '';
    import {onDestroy} from 'svelte';
    onDestroy(() => {
        input = '';
        roomProtected = null;
        roomType = null;
        roomPassword = '';
    })

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length <= 0) {
            console.log('enter a valid room id');
            toastList.push({
                variant: 'error',
                message: 'Enter a valid room id',
                duration: 2000
            })
            return;
        }

        const joinRoom = fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/joinRoom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomId: input,
                roomPassword: roomPassword
            })
        })

        joinRoom.then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.status === 'success') {
                currentRoom.set(data.roomId);
                isPasswordMatch.set(data.passwordMatch);
                console.log(data.message);
                toastList.push({
                    variant: 'success',
                    message: data.message,
                    duration: 4000,
                })
                push(`/room/${data.roomId}`);
            } else if (data.status === 'failed') {
                if (data.reason === 'protected') {
                    roomProtected = true;
                    roomType = "Private";
                    toastList.push({
                        variant: 'warning',
                        message: data.message,
                        duration: 4000,
                    })
                    return;
                } else if (data.reason === 'incorrect password') {
                    toastList.push({
                        variant: 'error',
                        message: data.message,
                        duration: 4000,
                    })
                    return;
                } else if (data.reason === "room doesn't exists") {
                    toastList.push({
                        variant: 'error',
                        message: data.message,
                        duration: 4000,
                    })
                    return;
                }
            }
        })

    }

    function handleBack() {
        push('/');
    }
</script>

<div class="" >
    <form on:submit={handleSubmit} class="">
        <div class="max-w-screen-xl mx-auto px-4 bg-black container flex h-screen justify-center items-center shadow-2xl">
            <div class="grid grid-rows md::w-1/3">
                <SvelteLogo/>
                <label for="room-id" class="text-3xl text-orange font-mono">Room ID: </label>
                <input id="room-id" type="text" bind:value={input} 
                    class="text-xl border-2 rounded w-full py-3 px-3 leading-tight
                        border-gray-300 bg-gray-100 text-gray-700 pr-16 font-mono" placeholder="Enter a room id" >
                
                {#if roomProtected && roomType === "Private"}
                    <div class="grid grid-rows" in:fly="{{ x: 100, duration: 750 }}" out:fly="{{ x: 100, duration: 400 }}">
                        <label for="room-password" class="text-xl text-white font-mono">Room password: </label>
                        <PasswordField id="room-password" bind:roomPassword />
                    </div>
                {/if}
                <div class="flex flex-wrap mt-4 px-4 justify-center mx-auto max-w-sm">
                    <button on:click={handleBack} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded-lg h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black self-center">
                        <p class="text-2xl font-black font-mono select-none">Back</p>
                    </button>
                    <button type="submit" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded-lg h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black self-center">
                        <p class="text-2xl font-black font-mono select-none">Join</p>
                    </button>
                </div>
            </div>
            
            
        </div>
        
    </form>
</div>

<style>

</style>