let videobtn = document.querySelectorAll(".vid-btn");
let videoSlider = document.querySelector("#video-slider");
let currentIndex = 0;
let intervalId;
let videos = document.querySelectorAll(".vid-btn");

// Function to change video and update active state
function changeVideo(index) {
  document.querySelector(".controls .active").classList.remove("active");
  videobtn[index].classList.add("active");
  videoSlider.style.opacity = 0; // Fade out the video
  setTimeout(() => {
    videoSlider.src = videobtn[index].getAttribute("data-src");
    videoSlider.style.opacity = 1; // Fade in the new video
  }, 500); // Adjust timing to match transition duration
}

// Function to handle automatic video change
function startAutoChange() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % videobtn.length;
    changeVideo(currentIndex);
  }, 5000);
}

// Start automatic video change
startAutoChange();

// Event listener for manual video change
videobtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    clearInterval(intervalId); // Stop automatic change when manual change occurs
    currentIndex = index;
    changeVideo(currentIndex);
    startAutoChange(); // Restart automatic change
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const tourResults = document.getElementById("tourResults");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const searchParams = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `/api/v1/tours/search/getTourBySearch?${new URLSearchParams(searchParams)}`
      );
      const data = await response.json();

      if (data.success) {
        displayTourResults(data.data);
      } else {
        tourResults.innerHTML = "<p>No tours found.</p>";
      }
    } catch (error) {
      console.error("Error searching for tours:", error);
    }
  });

  function displayTourResults(tours) {
    tourResults.innerHTML = "";
    tours.forEach((tour) => {
      const tourCard = document.createElement("div");
      tourCard.classList.add("tour-card");
      tourCard.innerHTML = `
        <img src="${tour.photo}" alt="${tour.title}" />
        <div class="tour-details">
          <h3>${tour.title}</h3>
          <p>${tour.desc}</p>
          <p>City: ${tour.city}</p>
          <p>Distance: ${tour.distance} km</p>
          <p>Price: $${tour.price}</p>
          <p>Max Group Size: ${tour.maxGroupSize}</p>
          <button class="book-now-btn" data-tour="${tour.title}" data-max-group-size="${tour.maxGroupSize}">Book Now</button>
        </div>
      `;
      tourResults.appendChild(tourCard);
    });

   
    // Add event listeners to dynamically added book buttons
const bookButtons = document.querySelectorAll(".book-now-btn");
bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tourName = button.getAttribute("data-tour");
        const maxGroupSize = button.getAttribute("data-max-group-size"); // New line to get max group size
        localStorage.setItem("selectedTour", tourName); // Store selected tour name in localStorage
        localStorage.setItem("maxGroupSize", maxGroupSize); // Store max group size in localStorage
        window.location.href = "booking.html"; // Redirect to booking.html
    });
});

  }
});

