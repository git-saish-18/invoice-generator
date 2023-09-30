import React, { useState } from "react";

function Demo() {
  const [postalCode, setPostalCode] = useState("");
  const [isValidPostalCode, setIsValidPostalCode] = useState(true);

  const handlePostalCodeChange = (event) => {
    const newPostalCode = event.target.value;
    setPostalCode(newPostalCode);

    // Validate the postal code when the input changes.
    setIsValidPostalCode(validatePostalCode(newPostalCode));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the postal code is valid before proceeding with form submission.
    if (isValidPostalCode) {
      // Handle form submission here.
    } else {
      // Display an error message or provide feedback to the user.
    }
  };
  // Create a utility function to validate postal codes.
  function validatePostalCode(postalCode) {
    // Define a regular expression pattern for your specific country's postal codes.
    // Replace this pattern with the one a  pplicable to your country.
    const postalCodePattern = /^[0-9]{6}(?:-[0-9]{4})?$/;

    return postalCodePattern.test(postalCode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Postal Code:
        <input
          type="text"
          value={postalCode}
          onChange={handlePostalCodeChange}
        />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default Demo;
