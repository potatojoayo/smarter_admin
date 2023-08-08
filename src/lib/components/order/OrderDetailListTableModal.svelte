<!-- Modal.svelte -->
<script>
    export let isOpen = false;
    export let title = '';
    export let content = '';
    
    const close = () => {
      isOpen = false;
    };
  </script>
  
  {#if isOpen}
    <div class="modal">
      <div class="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button on:click={close}>Close</button>
      </div>
    </div>
  {/if}