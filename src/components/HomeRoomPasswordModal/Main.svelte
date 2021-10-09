<script>
    import CustomPasswordField from '../CustomPasswordField.svelte';
    export let password;
    // $: console.log('Main.svelte -> ', password);

</script>

<!-- <div class=""> -->
<CustomPasswordField bind:password={password} label="Room Password" placeholder="Enter the room password" />
<!-- </div> -->

