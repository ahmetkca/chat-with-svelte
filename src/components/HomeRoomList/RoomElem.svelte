<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import {fade} from 'svelte/transition';
    import {toastList} from '../../stores';
    import {currentRoom, isPasswordMatch} from '../../stores';
    import {push} from 'svelte-spa-router';
    import {joinRoom} from '../../_helpers/roomRequests';
    export let roomId;
    export let roomType;
    export let users;
    function handleClickJoin() {
        if (roomType === 'Private') {
            dispatch('toggleModal', {
                roomId: roomId,
            })
            return;
        }
        console.log(joinRoom('', ''));
        joinRoom(roomId, '')
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
            })
    }
</script>

<li class="border-gray-400 flex flex-row mb-1" in:fade>

    <div class="select-none flex flex-1 items-center  transition duration-500 ease-in-out transform hover:-translate-y-1 rounded-2xl border-2 p-5 hover:shadow-2xl border-orange">
        <div class="flex-1 pl-1 w-20 mr-4 truncate">
            <div class="font-medium text-xl">
                {roomId}
            </div>
        </div>
        <div class="flex-1 pl-1 mr-2 w-8">
            <div class="font-medium">
                {roomType}
            </div>
        </div>
        <div class="flex-1 pl-1 mr-2 w-8">
            <div class="font-medium">
                {users.length}
            </div>
        </div>
        <button class="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-orange justify-center items-center mr-2 p-2
            hover:bg-white hover:text-black font-mono font-bold text-lg"
            on:click={handleClickJoin}>
            Join
        </button >
    </div>

</li>