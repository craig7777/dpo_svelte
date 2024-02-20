    //@ts-nocheck
    // Import the necessary dependencies
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

// Create a writable store to hold the payment response
const paymentResponse = writable(null);

// onMount(async () => {
  // Function to initiate the payment request
  const initiatePayment = async () => {
    try {
      // Set up the request payload
      const payload = `<?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>B3F59BE7-0756-420E-BB88-1D98E7A6B040</CompanyToken>
        <Request>createToken</Request>
        <Transaction>
          <PaymentAmount>450.00</PaymentAmount>
          <PaymentCurrency>USD</PaymentCurrency>
          <CompanyRef>49FKEOA</CompanyRef>
          <RedirectURL>http://localhost:5173/success</RedirectURL>
          <BackURL>http://localhost:5173/ </BackURL>
          <CompanyRefUnique>0</CompanyRefUnique>
          <PTL>5</PTL>
        </Transaction>
        <Services>
          <Service>
            <ServiceType>85325-Test Service</ServiceType>
            <ServiceDescription>Accomodation Hospitality Package</ServiceDescription>
            <ServiceDate>2024/02/20 14:00</ServiceDate>
          </Service>
        </Services>
      </API3G>`;

      // Make the HTTP request to the DPO API endpoint 
      const response = await fetch('https://secure.3gdirectpay.com/API/v6/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Accept': 'application/xml',
          'Mode': 'no-cors',
        },
        body: payload,
      });

      // const response = await fetch('http://localhost:5173/dpo-api', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/xml',
      //     'Accept': 'application/xml',
      //   },
      //   body: payload,
      // });

      // Parse the XML response
      const xmlResponse = await response.text();

      // Convert the XML response to an object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');
      const resultNode = xmlDoc.getElementsByTagName('Result')[0];
      const resultExplanationNode = xmlDoc.getElementsByTagName('ResultExplanation')[0];

      // Extract the payment result and explanation from the XML response
      const paymentResult = resultNode.textContent;
      const paymentExplanation = resultExplanationNode.textContent;

      // Update the payment response store with the result and explanation
      paymentResponse.set({ result: paymentResult, explanation: paymentExplanation });
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Payment initiation failed:', error);
    }
  };

  // Call the initiatePayment function when the component is mounted
//   initiatePayment();
// });

// Export the payment response store for other components to use
export { paymentResponse, initiatePayment };
