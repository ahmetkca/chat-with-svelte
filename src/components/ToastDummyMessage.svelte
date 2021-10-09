<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function handleDismiss() {
        dispatch('dismiss');
    }
</script>

<div class="flex flex-col h-full">
    <div class="flex flex-row py-2 space-x-5 items-center mx-2">
      <div
        class={
          "flex flex-col relative py-2 text-base" +
          "justify-start w-14 "
        }
      >
        <div
          class={
            "flex flex-col uppercase mx-auto text-white" +
            "select-none my-auto"
          }
        >
          <img src="https://avatars2.githubusercontent.com/u/54806834?s=60&v=4" class="w-full h-full rounded-full" alt="User avatar" />
        </div>

        <div
          class={
            "flex px-2 mx-auto items-center justify-center text-center " +
            "bottom-0 justify-center py-0.5 bg-gray-500 text-white rounded-full" + 
            "break-normal text-xs leading-none mt-3 font-bold" + 
            "flex -mt-2 text-xs "
          }
        >
          Dalibor
        </div>
      </div>
      <div class="flex flex-col text-gray-500 ">
        <span class="font-semibold">This is custom toast</span>
        <p class="mt-1">Builded by using React hooks and context API</p>
      </div>
      <div class="w-10 h-12 mr-2 items-center mx-auto text-center leading-none text-lg">
        <i on:click={handleDismiss} class="fas fa-times mx-auto my-auto h-full text-center text-gray-600 cursor-pointer hover:scale-105 transform "></i>
    </div>
    </div>
  </div>