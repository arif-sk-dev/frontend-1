    // Mock order data simulating a backend response
    const mockOrders = {
      'A1011': {
        status: 'Delivered',
        steps: ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']
      },
      'B2022': {
        status: 'Out for Delivery',
        steps: ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery']
      },
      'C3033': {
        status: 'Processing',
        steps: ['Order Placed', 'Processing']
      },
      'D4044': {
        status: 'Processing',
        steps: ['Order Placed', 'Processing', 'Shipped']
      }
    };

    // Main function to track order based on input
    function trackOrder() {
      // Get the input value and normalize it
      const orderId = document.getElementById('orderId').value.trim().toUpperCase();
      // Get references to status and timeline elements
      const statusBox = document.getElementById('statusBox');
      const timeline = document.getElementById('timeline');
      // Clear previous results
      timeline.innerHTML = '';
      statusBox.textContent = '';

      // Validate input
      if (!orderId) {  // while empty id input
        statusBox.textContent = 'Please enter a valid Order ID !';
        return;
      }

      // Check if order exists in mock data
      const order = mockOrders[orderId]; // while wrong id input
      if (!order) {
        statusBox.textContent = 'Order not found! Please check your Order ID.';
        return;
      }

      statusBox.textContent = `Current Status: ${order.status}`; // Display current status
      order.steps.forEach((step, index) => {  // Render completed steps
        const li = document.createElement('li');
        li.textContent = step;
        li.className = 'completed';
        timeline.appendChild(li);
      });

      // Render remaining steps as pending
      const remainingSteps = ['Shipped', 'Out for Delivery', 'Delivered'];
      remainingSteps.forEach(step => {
        if (!order.steps.includes(step)) {
          const li = document.createElement('li');
          li.textContent = step;
          timeline.appendChild(li); // No class means default/pending style
        }
      });
    }
    
    // Allow Enter key to trigger tracking
    document.getElementById('orderId').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        trackOrder();
      }
    });
