<style>
    .App-logo {
        height: 22vmin;
        pointer-events: none;
        margin-bottom: 1.5rem;
        animation: App-logo-pulse infinite 1.6s ease-in-out alternate;
        object-fit: center;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    @keyframes App-logo-pulse {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.06);
        }
    }
</style>

<script>
  export let width;
  export let height;
</script>

{#if width && height}
  <img style src="/logo.svg" 
    class='{typeof width !== undefined && typeof height !== undefined ? `w-${width} h-${height} App-logo`: "App-logo"}' alt="logo" />
{:else}
<img style src="/logo.svg" 
  class="App-logo" alt="logo" />
{/if}


