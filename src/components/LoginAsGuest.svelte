<script>
    import {toastList} from '../stores';
    import {replace} from "svelte-spa-router";
    import SvelteLogo from './SvelteLogo.svelte';
    export let socket;
    import {username} from '../stores';

    export let loginView;
    let submitButton;
    let backButton;
    function handleLoginView() {
        loginView = '';
    }
    let input = '';

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length === 0) {
            console.log("username is invalid!");
            toastList.push({
                variant: 'error',
                message: "Username is invalid!",
                duration: 6000,
            })
            return;
        }
        console.log(input);
        
        let joinAsGuest = fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/joinAsGuest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: input,
                socketId: socket.id
            })
        });

        joinAsGuest.then(function(response) {
            return response.json();
        }).then(function(response) {
            if (response.status === 'failed') {
                toastList.push({
                    variant: 'error',
                    message: response.message,
                    duration: 3000,
                })
                return;
            } else {
                username.set(input);
                console.log(response.message);
                toastList.push({
                    variant: 'success',
                    message: response.message,
                    duration: 3000,
                })
                replace('/')
            }
        })

    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            submitButton.focus();
        } else if (e.key === 'Escape') {
            backButton.focus();
            handleLoginView();
        }
    }

</script>

<svelte:window on:keydown="{handleKeyDown}" />

<div>

    <form on:submit={handleSubmit}>
        <div class="max-w-screen-xl mx-auto px-4 bg-black container flex h-screen justify-center items-center shadow-2xl">
            <div class="grid grid-rows ">
                <SvelteLogo/>
                
                <label for="room-id" class="text-3xl text-orange font-mono">Username: </label>
                <input id="room-id" type="text" bind:value={input} class="border-2 rounded w-full py-2 px-2 leading-tight border-gray-300 bg-gray-100 placeholder-gray-500 placeholder-opacity-100 text-xl font-mono" placeholder="Enter your Username" >
                

                <div class="flex flex-wrap my-2 px-4 justify-items-center mx-auto max-w-sm">
                    <button bind:this={backButton} on:click={() => handleLoginView()} class="m-1 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black self-center">
                        <p class="text-2xl font-black font-mono select-none">Back</p>
                    </button>
                    <button bind:this={submitButton} type="submit" class="m-1 transition-colors duration-150 text-white shadow-2xl rounded h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black self-center">
                        <p class="text-2xl font-black font-mono select-none">Enter</p>
                    </button>
                </div>
            </div>


        </div>

    </form>
</div>