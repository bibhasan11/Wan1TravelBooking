document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const tourNameInput = document.getElementById('tourName');
    const guestSizeInput = document.getElementById('guestSize');
    
    // Retrieve values from localStorage
    const selectedTour = localStorage.getItem('selectedTour');
    const maxGroupSize = localStorage.getItem('maxGroupSize');
    
    // Set values in input fields
    if (selectedTour) {
        tourNameInput.value = selectedTour;
    }
    if (maxGroupSize) {
        guestSizeInput.value = maxGroupSize;
    }
    
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const requestBody = {};
        
        formData.forEach((value, key) => {
            requestBody[key] = value;
        });
        
        try {
            const response = await fetch('/api/v1/payment/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (response.ok) {
                const data = await response.json();
                const options = {
                    "key": data.key_id,
                    "amount": data.amount,
                    "currency": "INR",
                    "name": data.product_name,
                    "description": data.description,
                    "order_id": data.order_id,
                    "handler": function (response) {
                        // Payment successful, now create booking
                        fetch('/api/v1/booking', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestBody)
                        }).then(bookingResponse => bookingResponse.json())
                          .then(bookingData => {
                              console.log(bookingData.message); // Log success message
                              // Redirect user or show success message
                          }).catch(error => console.error('Booking Error:', error));
                    },
                    "prefill": {
                        "name": data.name,
                        "email": data.email,
                        "contact": data.contact
                    }
                };
                const rzp1 = new Razorpay(options);
                rzp1.open();
            } else {
                const errorData = await response.json();
                console.error(errorData.message); // Log error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
