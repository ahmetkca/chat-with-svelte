<script>
    import {toastList} from '../../stores';
    import {currentRoom, isPasswordMatch} from '../../stores';
    import {push} from 'svelte-spa-router';
    import {joinRoom} from '../../_helpers/roomRequests';
    import ModalComponent from '../Modal/ModalComponent.svelte';
    import Footer from '../HomeRoomPasswordModal/Footer.svelte';
    import Main from '../HomeRoomPasswordModal/Main.svelte';
    import RoomElem from './RoomElem.svelte';
    import {onMount} from 'svelte';
    let rooms = {};
    let isHidden = true;
    let currentClickedRoom;
    let roomPassword = '';
    let isRefresh = false;
    onMount(() => {
        isRefresh = true;
        getAllRooms().then(function(res) {
            return res.json();
        }).then(function(data) {
            console.log(data);
            if (data) {
                rooms = data;
            }
            // isRefresh = false;
        }).catch((err) => {
            console.log(err);
            // isRefresh = false;
        })
        setTimeout(() => {
            isRefresh = false
        }, 1000);

    })
    $: console.log('RoomListContainer.svelte -> ', roomPassword);
    async function getAllRooms() {
        const res = fetch(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/rooms`, {
            method: "GET",
        })
        return res;
    }

    function toggleHidden(event) {
        isHidden = !isHidden
        roomPassword = '';
    }

    function handleToggleModal(event) {
        currentClickedRoom = event.detail.roomId;
        toggleHidden();
    }

    function handleJoinPrivate(event) {
        joinRoom(currentClickedRoom, roomPassword)
            .then(function(res) {return res.json()})
            .then(function(data) {
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
            }).catch((err) => {
                toastList.push({
                    variant: 'error',
                    message: err,
                    duration: 4000,
                })
            });
        console.log(`joinRoom("${currentClickedRoom}", "${roomPassword}")`);
    }

    async function refreshRooms() {
        isRefresh = true;
        await getAllRooms().then(function(res) {
            return res.json();
        }).then(function(data) {
            console.log(data);
            if (data) {
                rooms = data;
            }
            // isRefresh = false;
        }).catch((err) => {
            console.log(err);
            // isRefresh = false;
        })
        setTimeout(() => {
            isRefresh = false
        }, 1000);
    }
    $: console.log(isRefresh);
</script>

<!-- <div class="m-0 p-0"> -->



<p class=" text-2xl text-center mb-2 text-white font-mono font-bold">Browse Rooms
    <button on:click={refreshRooms} class="focus:outline-none ml-4 ">
        <i class:fa-spin={isRefresh} class="fas fa-sync text-base transition-colors border border-orange p-1.5 rounded-3xl hover:border-white bg-orange text-white hover:bg-white hover:text-black" ></i>
    </button>
</p>
<ul class="flex flex-col text-white m-0 p-2 overflow-y-auto example"
class:max-h-72={Object.keys(rooms).length > 0}>
    {#if Object.keys(rooms).length <= 0}
        <p class="text-base text-white font-mono font-bold text-center">No room found...</p>
    {:else}         
        {#each Object.keys(rooms) as roomId (roomId)}
            <RoomElem {roomId} roomType={rooms[roomId].type} users={rooms[roomId].users} on:toggleModal={handleToggleModal}/>
        {/each}
    {/if}
    
</ul>
<p class="text-xl text-center mb-2 text-white font-mono" class:hidden={!(Object.keys(rooms).length > 3)}>scroll down <i class="fas fa-angle-double-down animate-bounce"></i></p>

<ModalComponent bind:isHidden={isHidden} >
    <div slot="header-title"><p class="text-xl font-mono font-bold text-orange">{currentClickedRoom}</p></div>
    <div slot="main" class="w-3/4">
        <Main bind:password={roomPassword}  />
    </div>
    <div slot="footer">
        <Footer on:toggleHidden={toggleHidden} on:handleJoinPrivate={handleJoinPrivate} />
    </div>
</ModalComponent>

<style>

     /* Hide scrollbar for Chrome, Safari and Opera */
    .example::-webkit-scrollbar {
    display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .example {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    } 
</style>