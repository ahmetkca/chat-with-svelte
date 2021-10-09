<script>
    import {toastList} from './stores';
    import {onMount, onDestroy} from 'svelte';
    import SvelteLogo from './components/SvelteLogo.svelte';
    import {replace, push} from "svelte-spa-router";
    import { fly } from 'svelte/transition';
    export let socket;
    import {username, currentRoom, isPasswordMatch} from "./stores";
    import PasswordField from './components/PasswordField.svelte';

    let mounted = false;
    $: disabled = false;
    let input = '';
    let roomPassword = '';
    
    let types = [
        {checked: true, value: 'Public'},
        {checked: false, value: 'Private'}
    ]
    let roomType = types[0].value;

    // let roomPasswordConfirm = '';
    // in the future implement confirm password
    // let passwordError = false;
    // $: if (roomPasswordConfirm !== roomPassword || roomPassword !== roomPasswordConfirm) {
    //     passwordError = true;
    // }
    // $: if (roomPasswordConfirm === roomPassword) {
    //     passwordError = false;
    // }
    function handleSubmit(e) {
        e.preventDefault();
        if (input.length <= 0) {
            toastList.push({
                variant: "error",
                message: 'invalid room name',
                duration: 3000,
            })
            console.log('Error: invalid room name');
            return;
        }

        if (roomType !== 'Private' && roomType !== 'Public') {
            console.error("Invalid room type!");
            toastList.push({
                variant: "error",
                message: "Invalid room type!",
                duration: 3000,
            })
            return;
        } else {
            if (roomType === "Private") {
                if (roomPassword.length < 8) {
                    toastList.push({
                        variant: "error",
                        message: "Password must have at least 8 characters!",
                        duration: 3000,
                    })
                    console.error("Error: Password must have at least 8 characters!");
                    return;
                }
            }
        }
        disabled = true;
        let createRoom = fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/createRoom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                room: {
                    id: input,
                    username: $username,
                    type: roomType,
                    password: roomPassword
                }
            })
        });

        createRoom.then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data.status === 'failed') {
                toastList.push({
                    variant: "error",
                    message: data.message,
                    duration: 3000,
                })
                
            } else if (data.status === 'success') {
                currentRoom.set(input);
                isPasswordMatch.set(true);
                setTimeout(() => {
                    toastList.push({
                        variant: "success",
                        message: data.message,
                        duration: 3000,
                    })
                    push(`/room/${input}`);
                }, 1000);
                
            }
        }).catch((err) => console.error(err));
        
        // socket.emit("create room", { "roomId": input, "username": $username, "type": roomType, "password": roomPassword});
        

    }

    // socket.on("create room", (response) => {
    //     if (response.status === "failed") {
    //         console.log(response.message);
    //         toastList.push({
    //             variant: "error",
    //             message: response.message,
    //             duration: 3000,
    //         })
    //         return;
    //     } else {
    //         console.log(response.message);
    //         currentRoom.set(input);
    //         isPasswordMatch.set(true);
    //         toastList.push({
    //             variant: "success",
    //             message: response.message,
    //             duration: 3000,
    //         })
    //         push(`/room/${input}`);
    //     }
    // })

    // $: console.log("Is there a password error? " + passwordError);
    function handleBack() {
        replace('/');
    }

    onMount(() => {
        mounted = true;
    })

    onDestroy(() => {
        mounted = false;
    })

    $: console.log("Room Password: " + roomPassword);

</script>

<div class="" >
    <form on:submit={handleSubmit} class="" autocapitalize="none" autocomplete="off">
        <div class="max-w-screen-xl mx-auto px-4 bg-black container flex h-screen justify-center items-center shadow-2xl">
            <div class="grid grid-rows md::w-1/3 ">
                <SvelteLogo/>
                <label for="room-id" class="text-3xl text-orange font-mono">Room name: </label>    
                <input autocomplete="off" id="room-id" type="text" bind:value={input} 
                    class="text-xl border-2 rounded w-full py-3 px-3 leading-tight
                         border-gray-300 bg-gray-100 text-gray-700 pr-16 font-mono" placeholder="Enter a room name" />
                
                <div class=" text-center flex flex-wrap justify-center justify-items-center">
                    {#each types as type}
                        <div class="flex flex-wrap justify-center mr-2 ml-2 my-1 p-0 text-xl text-white subpixel-antialiased self-center">
                            <input id="room-type-{type.value}" type="radio" bind:group={roomType}  class="hidden" value={type.value}/>
                            <label for="room-type-{type.value}" class="m-0 p-0 justify-items-center justify-center items-center cursor-pointer text-center">
                                <span class="w-4 h-4 inline-block mr-1 border border-grey"></span>
                                {type.value}
                            </label>
                            
                        </div>
                    {/each}
                </div>
                
                {#if roomType == "Private"}
                    <div class="grid grid-rows" in:fly="{{ x: 100, duration: 350 }}" out:fly="{{ x: 100, duration: 350 }}">
                        <label for="room-password" class="text-xl text-white font-mono">Room password: </label>
                        <PasswordField bind:roomPassword />
                        <!-- <input autocomplete=off id="room-password" type="password" bind:value={roomPassword} class=" border-2 rounded w-full py-2 px-2 leading-tight border-gray-300 bg-gray-100 placeholder-gray-400 placeholder-opacity-100 text-xl font-mono" placeholder="Enter a room password" > -->
                        <!-- <label for="room-password-confirm" class="text-xl text-white font-mono">Confirm password: </label> 
                        <input autocomplete=off id="room-password-confirm" type="password" bind:value={roomPasswordConfirm} class="border-2 rounded w-full py-2 px-2 leading-tight border-gray-300 bg-gray-100 placeholder-gray-400 placeholder-opacity-100 text-xl font-mono" placeholder="Enter the room password" > -->
                    </div>
                {/if}
                
                

                <div class="flex flex-wrap my-2 px-4 justify-items-center mx-auto max-w-sm">
                    <button on:click={handleBack} type="button" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded-lg h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black"
                    disabled="{disabled}">
                        <p class="text-2xl font-black font-mono select-none">Back</p>
                    </button>
                    <button type="submit" class="my-1 mr-2 ml-2 transition-colors duration-150 text-white shadow-2xl rounded-lg h-16 w-24 bg-orange hover:bg-white hover:shadow-inner hover:text-black"
                    disabled="{disabled}">
                        <p class="text-2xl font-black font-mono select-none">
                            {#if disabled}
                                <i class="fas fa-cog fa-spin block"/>
                            {:else}
                                Create
                            {/if}
                            
                        </p>
                    </button>
                </div>
            </div>


        </div>

    </form>
</div>

<style>
    input[type="radio"] + label span {
        transition: background 0.2s, transform 0.2s;
    }

    input[type="radio"] + label span:hover,
    input[type="radio"] + label:hover span {
        transform: scale(1.2);
    }

    input[type="radio"]:checked + label span {
        background-color: #fe3e00;
        box-shadow: 0px 0px 0px 2px white inset;
    }

    input[type="radio"]:checked + label {
        color: white;
    }

</style>