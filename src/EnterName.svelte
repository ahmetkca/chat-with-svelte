<script>
    import RegisterView from './components/RegisterView.svelte';
    import LoginOption from './components/LoginOption.svelte';

    export let socket;

    import LoginAsGuest from './components/LoginAsGuest.svelte';
    import LoginView from './components/LoginView.svelte';

    let loginView = undefined;
    
</script>
<div class="max-w-full w-full bg-black container flex h-screen justify-center items-center shadow-2xl">
    {#if loginView === 'loginAsUser'}
        <LoginView bind:loginView {socket} />
    {:else if loginView === 'joinAsGuest'}
        <LoginAsGuest {socket} bind:loginView />
    {:else if loginView === 'register'}
        <RegisterView bind:loginView />
    {:else}
        <LoginOption bind:loginView />
    {/if}
</div>
