<script>
    //@ts-nocheck
    // Import the paymentResponse store
    import { paymentResponse, initiatePayment } from '$lib/payWithDpo.js';

    // Access the payment result and explanation
    let paymentResult = null;
    let paymentExplanation = null;

    paymentResponse.subscribe((response) => {
        if (response) {
        paymentResult = response.result;
        paymentExplanation = response.explanation;
        }
    });
</script>

<div class="m-12">
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <h1 class="text-cyan-500 font-bold text-xl">
        Test Text
    </h1>

    <button class="text-white bg-slate-800 p-1 rounded-lg px-12" on:click={initiatePayment}>Initiate Payment</button>

    {#if paymentResult}
    <p>Payment Result: {paymentResult}</p>
    <p>Payment Explanation: {paymentExplanation}</p>
    {/if}

</div>