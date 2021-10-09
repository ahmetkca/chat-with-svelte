<script>
    import WhoIsTyping from './components/WhoIsTyping.svelte';
    import MessageBox from './components/MessageBox.svelte';
    import {onMount, onDestroy} from 'svelte';
    export let socket;
    import { replace } from 'svelte-spa-router';
    import {username, currentRoom, isPasswordMatch} from "./stores";
    import {fade} from 'svelte/transition';
    export let params = {}

    
    // let timeout = undefined;
    // let isTyping = false;
    // let textInputElem;
    let clearTypingTime = 1000;
    let delayedInput = '';
    let expTyping = false;
    let expTimeout = undefined;
    let input = '';
    let chatBox = []
    
    let scrollBoxObj;
    let mounted = false;
    let usersTypingList = [];
    let chatBoxHeight;

    $: if (mounted && chatBoxHeight >= scrollBoxObj.clientHeight) {
        scrollBoxObj.scrollTop = chatBoxHeight;
    }

    socket.on("left room", (response) => {
        chatBox = chatBox.concat({content: response.message, type: "general", user: response.username, time: new Date(response.time)});
    })

    socket.on("joined room", (response) => {
        chatBox = chatBox.concat({content: response.message, type: "general", user: response.username, time: new Date(response.time)});
    })

    socket.on("send message", (response) => {
        console.log(typeof response.time);
        console.log(response.time);
        chatBox = chatBox.concat({content: response.message, type: "server", user: response.username, time: new Date(response.time)});
    })

    socket.on('typing', (response) => {
        if (response.isTyping == true) {
            // add user to the typing list
            usersTypingList = [ ...usersTypingList, response.username];
        } else {
            if (usersTypingList.includes(response.username)) {
                // remove user from the typing list
                usersTypingList = usersTypingList.filter((el, i) => el !== response.username);
            }
        }
    })

    function handleExit() {

        replace('/');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length <= 0) {
            console.log("You cannot send empty message");
            return;
        }

        socket.emit("send message", { username: $username, roomId: params.roomid, message: input, time: new Date()});
        chatBox = chatBox.concat({content: input, type: "client", user: $username, time: new Date()});
        input = '';
        delayedInput = input;
    }
    onMount(() => {
        mounted = true;
        socket.emit("joined room", { user: $username, roomId: params.roomid, time: new Date()});
        chatBox = chatBox.concat({content: `${$username} joined the room`, type: "general", user: $username, time: new Date()});

    })
    onDestroy(() => {
        currentRoom.set(null);
        isPasswordMatch.set(null);
        mounted = false;
        console.log("Room component destroyed!");
        socket.emit("left room", { user: $username, roomId: params.roomid, time: new Date()});
        chatBox = chatBox.concat({content: `${$username} left the room`, type: "general", user: $username, time: new Date()});
    })

    // CHAT TYPING IMPLEMENTATION WITH ONKEYPRESS EVENT
    // BACKSPACE DOES NOT WORK (ERASING CHARACTER FROM TEXTBOX DOES NOT EMIT TYPING)
    // add the following to textbox on:keypress={handleKeypress} bind:this={textInputElem}
    //
    // $: console.log("isTyping: " +  isTyping);

    // function clearTyping() {
    //     isTyping = false;
    //     console.log("socket.emit('stop typing') FROM timeout.");
    // }

    // function handleKeypress(event) {
    //     if (event.keyCode !== 13) {
    //         if (isTyping == false) {
    //             isTyping = true;
    //             console.log("socket.emit('typing')");
    //             timeout = setTimeout(clearTyping, 5000);
    //         } else {
    //             clearTimeout(timeout);
    //             timeout = setTimeout(clearTyping, 5000);
    //         }
    //     } else {
    //         clearTimeout(timeout);
    //         isTyping = false;
    //         console.log("socket.emit('stop typing') BY pressing ENTER.");
    //     }
    // }

    // BETTER SOCKET.IO TYPING IMPLEMENTATION
    // WORKS WITH BACKSPACE
    // ALL DONE WITH SVELTE REACTIVITY
    //
    
    function expTm() {
        expTyping = false;
        // console.log("Svelte reactivity socket emit stop typing!!");
        socket.emit('typing', {username: $username, roomId: params.roomid, isTyping: false});
    }
    // $: console.log("expTyping: " + expTyping);
    
    $: if (delayedInput != input) {
        // console.log("Input: " + input);
        // console.log("Delayed Input: " + delayedInput);
        let bypass = false;
        if ((delayedInput.length - input.length) == 1 || (delayedInput.length - input.length) < 0) {
            bypass = false;
        } else {
            bypass = true;
        } 
        delayedInput = input;

        if (delayedInput.length != 0 && !bypass) {
            if (expTyping == false) {
                // delayedInput = input;
                console.log(input);
                expTyping = true;
                // console.log("Svelte reactivity socket emit typing...");
                socket.emit('typing', {username: $username, roomId: params.roomid, isTyping: true});
                expTimeout = setTimeout(expTm, clearTypingTime);
            } else {
                // delayedInput = input;
                clearTimeout(expTimeout);
                expTimeout = setTimeout(expTm, clearTypingTime);
            }
        }
    } else if (input.length == 0 && delayedInput == input && expTyping == true) {
        clearTimeout(expTimeout);
        expTimeout = setTimeout(expTm, 0);
    }
    // $: if (input.length == 0) {
    //     delayedInput = input;
    //     expTyping = false;
    //     clearTimeout(expTimeout)
    // }
</script>


<!-- html goes here -->
<div class="m-0 w-full lg:mx-auto lg:w-7/12 flex flex-col container box-border h-screen 
    px-1 lg:px-2 border-4 border-orange bg-black rounded shadow-2xl">

    <div id="top-section" class="flex flex-row my-1">
        <button on:click={handleExit} type="button" class="text-base bg-orange text-white rounded h-12 w-1/6 md:1/4 lg:w-24 md:text-lg lg:text-xl font-mono font-black hover:bg-white hover:text-black transition-colors duration-150">Exit</button>        
        <p class="text-2xl md:text-4xl lg:text-4xl text-white mx-auto my-auto">{params.roomid} </p>
    </div>
    <div id="scrollBox" class="h-screen w-auto border border-orange rounded overflow-y-auto mostly-customized-scrollbar" bind:this={scrollBoxObj}>
        <div id="chat-box" class="m-0 p-0" bind:offsetHeight={chatBoxHeight}  >
            {#each chatBox as { user, content, type, time}}
                <MessageBox {user} message={content} {type} {time} />
            {/each}
        </div>
    </div>

    <!-- <div id="bottom-section" class="flex flex-row justify-between my-2"> -->
        <form on:submit={handleSubmit} class="flex flex-row justify-between my-1">
            <input bind:value={input} type="textarea" class="w-11/12 rounded h-12 placeholder-gray-500 placeholder-opacity-100 text-base lg:text-xl font-mono px-2" placeholder="Type a message">
            <button type="submit" class="bg-orange ml-2 text-white rounded text-base w-2/12 h-12 lg:h-12 lg:w-1/12 lg:text-xl font-mono font-medium hover:bg-white hover:text-black transition-colors duration-150">
                <i class="far fa-paper-plane fa-lg"></i>
            </button>
        </form>
    <!-- </div> -->
    <div transition:fade>
        <WhoIsTyping bind:usersTypingList />
    </div>
    <!-- {#if expTyping}
        <span class=" text-sm animate-bounce text-white text-opacity-75 my-0.5 " transition:fade><span class="animate-pulse">{$username} is typing...</span></span>
    {/if} -->
</div>

<style>
    /* .chat-box {
        overflow-y: auto;
    } */
    /* .no-scrollbar::-webkit-scrollbar {
        display: none;
    } */

    /* .no-scrollbar {
        -ms-overflow-style: none; 
        scrollbar-width: none;  
    } */

    .mostly-customized-scrollbar {
        /* scrollbar-color: #fe3e00 #000; */
        scrollbar-color: dark;
        scrollbar-width: auto;
    }

    .mostly-customized-scrollbar::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background-color: black; /* or add it to the track */
    }

    /* Add a thumb */
    .mostly-customized-scrollbar::-webkit-scrollbar-thumb {
        background: #fe3e00;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }

    .mostly-customized-scrollbar::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
    }
</style>