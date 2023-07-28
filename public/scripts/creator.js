const apiBase = "https://api-bondscape.testnet.desmos.network";

const values = {
  place_id: "",
};

// Initialize the Google Places Autocomplete service for the specific input field
function initAutocomplete() {
  const input = document.getElementById("place");
  const options = {
    types: ["geocode"], // Restrict results to geocoding (place name or address)
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // Listen for the "place_changed" event to get the selected place details
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (place && place.place_id) {
      values.place_id = place.place_id;
      console.log("Selected Place ID:", values.place_id);
      // You can use the placeId variable to perform further actions with the selected place.
    }
  });
}

// --------------------------------------------------------------------------------------------------------------------
// --- Utils
// --------------------------------------------------------------------------------------------------------------------

// Split a string into an array of items
function splitItems(value) {
  return value.split(",").map((item) => item.trim());
}

// Format a date value to ISO 8601 format
function formatDate(value) {
  const dateValue = new Date(value);
  if (!isNaN(dateValue)) {
    return dateValue.toISOString();
  }
  return null;
}

function createQRCode(text) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();

  // Create an image tag for the QR code
  return qr.createImgTag(6, 16);
}

// --------------------------------------------------------------------------------------------------------------------
// --- Messages
// --------------------------------------------------------------------------------------------------------------------

function showLoadingIndicator() {
  hideSuccessMessage();
  hideErrorMessage()
  document.getElementById("loadingIndicator").classList.remove("hidden");
}

function hideLoadingIndicator() {
  document.getElementById("loadingIndicator").classList.add("hidden");
}

function setLoadingText(text) {
  document.getElementById("loadingText").innerText = text;
}

function setEventID(text) {
  hideLoadingIndicator();
  document.getElementById("eventID").innerText = text;
  document.getElementById("successIndicator").classList.remove("hidden");
}

function setDetailsQRCode(qrCode) {
  document.getElementById("detailsQRCode").innerHTML = qrCode;
}

function setJoinQRCode(qrCode) {
  document.getElementById("joinQRCode").innerHTML = qrCode;
}

function hideSuccessMessage() {
  document.getElementById("successIndicator").classList.add("hidden");
}

function setErrorMessage(text) {
  hideLoadingIndicator();
  document.getElementById("errorMessage").innerText = text;
  document.getElementById("errorIndicator").classList.remove("hidden");
}

function hideErrorMessage() {
  document.getElementById("errorIndicator").classList.add("hidden");
}

// --------------------------------------------------------------------------------------------------------------------
// --- Form submission
// --------------------------------------------------------------------------------------------------------------------

// Upload a picture to the API
async function uploadPicture(elementID, adminKey) {
  const fileInput = document.getElementById(elementID);
  const files = fileInput.files;

  // Check if any files were selected
  if (files.length === 0) {
    return "";
  }

  // Create a FormData object and append the file data to it
  const formData = new FormData();
  formData.append("file", files[0]);

  // Set up the headers with the "Authorization" Bearer token
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${adminKey}`);

  // Send the form data to your API endpoint using fetch API with await
  const response = await fetch(`${apiBase}/media`, {
    method: "POST", body: formData, headers: headers,
  });

  if (response.ok) {
    const returnedData = await response.json();
    return returnedData.url;
  } else {
    console.error("Upload failed:", response.statusText);
  }

  return "";
}

// Handle the form submission
async function handleFormSubmission(event) {
  // Get form input values
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const website = document.getElementById("website").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const placeID = values.place_id;
  const tags = document.getElementById("tags").value;
  const organizers = document.getElementById("organizers").value;
  const adminKey = document.getElementById("adminKey").value;

  // Upload the picture
  setLoadingText("Uploading cover picture...");
  const pictureUrl = await uploadPicture("coverPicture", adminKey)

  // Build the data to be sent
  const data = {
    name: name,
    description: description,
    cover_picture_url: pictureUrl,
    website: website,
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
    place_id: placeID,
    tags: splitItems(tags),
    organizers: splitItems(organizers),
  }

  try {
    // Set up the headers with the "Authorization" Bearer token
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${adminKey}`);
    headers.append("Content-Type", "application/json");

    // Perform the API call
    setLoadingText("Uploading data...");
    const response = await fetch(`${apiBase}/events`, {
      method: "POST", headers: headers, body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();


      setLoadingText("Generating QR codes...");

      const detailsQRCode = createQRCode(responseData.event_details_link);
      setDetailsQRCode(detailsQRCode);

      const joinQRCode = createQRCode(responseData.event_join_link);
      setJoinQRCode(joinQRCode);

      setEventID(responseData.event_id);
    } else {
      const responseData = await response.text();
      setErrorMessage(`Error while creating event: ${responseData}`);
    }
  } catch (error) {
    setErrorMessage(`Error while creating event: ${error}`);
  }
}

// --------------------------------------------------------------------------------------------------------------------
// --- Page setup
// --------------------------------------------------------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("eventCreationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    showLoadingIndicator();

    setTimeout(handleFormSubmission, 2000);
  });
});