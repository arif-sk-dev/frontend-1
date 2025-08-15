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

    function trackOrder() {
      const orderId = document.getElementById('orderId').value.trim().toUpperCase();
      const statusBox = document.getElementById('statusBox');
      const timeline = document.getElementById('timeline');
      timeline.innerHTML = '';
      statusBox.textContent = '';

      if (!orderId) {  // while empty id input
        statusBox.textContent = 'Please enter a valid Order ID !';
        return;
      }

      const order = mockOrders[orderId]; // while wrong id input
      if (!order) {
        statusBox.textContent = 'Order not found! Please check your Order ID.';
        return;
      }

      statusBox.textContent = `Current Status: ${order.status}`;
      order.steps.forEach((step, index) => {
        const li = document.createElement('li');
        li.textContent = step;
        li.className = 'completed';
        timeline.appendChild(li);
      });

      const remainingSteps = ['Shipped', 'Out for Delivery', 'Delivered'];
      remainingSteps.forEach(step => {
        if (!order.steps.includes(step)) {
          const li = document.createElement('li');
          li.textContent = step;
          timeline.appendChild(li);
        }
      });
    }
    
    // keyboard "Enter" button press function
    document.getElementById('orderId').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        trackOrder();
      }
    });
