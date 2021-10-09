<script>
    import {onMount} from 'svelte';
    let passwordToggle;
    let passwordLabel;
    export let roomPassword;
    let passwordInput;
    onMount(() => {
        passwordToggle.addEventListener('change', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordLabel.innerHTML = 'hide';
            } else {
                passwordInput.type = 'password';
                passwordLabel.innerHTML = "show";
            }

            passwordInput.focus();
        })
    })
    $: console.log("PasswordField: roomPassword => " + roomPassword);
</script>

<div class="relative w-full">
    <div class="absolute inset-y-0 right-0 flex items-center px-2">
      <input class="hidden" bind:this={passwordToggle} id="toggle" type="checkbox" />
      <label bind:this={passwordLabel} class="bg-orange hover:bg-black hover:text-white rounded px-2 py-1 text-sm text-white font-mono cursor-pointer " for="toggle">show</label>
    </div>
    <input placeholder="Must have at least 8 characters" autocomplete="off" bind:value={roomPassword} bind:this={passwordInput} 
        class=" border-2 rounded w-full py-3 px-3 leading-tight
             border-gray-300 bg-gray-100 text-gray-700 pr-16 font-mono text-xl" id="password" type="password"/>
</div>