<script>
    import {onMount} from 'svelte';
    let passwordToggle;
    let passwordLabel;
    export let password;
    let passwordInput;

    export let label = "Password";
    export let placeholder = "Enter your password";
    onMount(() => {
        passwordToggle.addEventListener('change', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordLabel.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                passwordLabel.innerHTML = '<i class="fas fa-eye"></i>';
            }

            passwordInput.focus();
        })
    })

</script>

<label class="block mb-2 text-black font-mono font-bold text-base" for="password">{label}</label>
<div class="relative w-full">
    
    <div class="absolute top-1.5 right-0.5 flex items-center ">
      <input class="hidden" bind:this={passwordToggle} id="toggle" type="checkbox" />
      <label bind:this={passwordLabel} class="bg-orange hover:bg-black hover:text-white rounded px-1 py-1 text-sm text-white font-mono cursor-pointer " for="toggle"><i class="fas fa-eye"></i></label>
    </div>
    <input placeholder={placeholder} autocomplete="off" bind:value={password} bind:this={passwordInput} 
        class="w-full p-2 mb-6 text-gray-800 border-b-2 border-orange outline-none bg-gray-200" id="password" type="password" required/>
</div>