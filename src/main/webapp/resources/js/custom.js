// Function to show or hide the input field based on radio button selection
window.onload = function () {

    toggleTransactionManagementField();
    toggleIsReferredField();
    toggleIsLeadReferralInput();

    function toggleTransactionManagementField() {
        // Get references to the radio buttons and the phone number input div
        var yesRadio = document.getElementById("isTransactionManagedYes");
        var noRadio = document.getElementById("isTransactionManagedNo");
        var phoneNumberInput = document.getElementById("clientPhoneNumber");


        phoneNumberInput = findParentDiv(phoneNumberInput, "adldfieldhld");

        // Add event listeners to the radio buttons
        yesRadio.addEventListener("change", function () {
            showInputField(phoneNumberInput);
        });

        noRadio.addEventListener("change", function () {
            hideInputField(phoneNumberInput);
        });


        //checking initial state
        console.log(yesRadio.checked);
        console.log(noRadio.checked);
        if (yesRadio.checked) {
            phoneNumberInput.style.display = "block";
        } else {
            phoneNumberInput.style.display = "none";
        }

    }

    function toggleIsReferredField() {
        // Get references to the radio buttons and the phone number input div
        var yesRadio = document.getElementById("isReferredYes");
        var noRadio = document.getElementById("isReferredNo");
        var referralAgentName = document.getElementById("referralAgentName");
        var referralFirm = document.getElementById("referralFirm");
        var referralFee = document.getElementById("referralFee");

        referralAgentName = findParentDiv(referralAgentName, "adldfieldhld");
        referralFirm = findParentDiv(referralFirm, "adldfieldhld");
        referralFee = findParentDiv(referralFee, "adldfieldhld");

        // Add event listeners to the radio buttons
        yesRadio.addEventListener("change", function () {
            showInputField(referralAgentName);
            showInputField(referralFirm);
            showInputField(referralFee);
        });

        noRadio.addEventListener("change", function () {
            hideInputField(referralAgentName);
            hideInputField(referralFirm);
            hideInputField(referralFee);
        });


        //checking initial state
        console.log(yesRadio.checked);
        console.log(noRadio.checked);
        if (yesRadio.checked) {
            referralAgentName.style.display = "block";
            referralFirm.style.display = "block";
            referralFee.style.display = "block";
        } else {
            referralAgentName.style.display = "none";
            referralFirm.style.display = "none";
            referralFee.style.display = "none";
        }

    }

    function toggleIsLeadReferralInput() {
        // Get references to the radio buttons and the phone number input div
        var yesRadio = document.getElementById("isLeadReferralYes");
        var noRadio = document.getElementById("isLeadReferralNo");
        var leadReferralType = document.getElementsByName("leadReferralType");

        leadReferralType = findParentDiv(leadReferralType[0], "adldfieldhld");

        // Add event listeners to the radio buttons
        yesRadio.addEventListener("change", function () {
            showInputField(leadReferralType);
        });

        noRadio.addEventListener("change", function () {
            hideInputField(leadReferralType);
        });


        //checking initial state
        console.log(yesRadio.checked);
        console.log(noRadio.checked);
        if (yesRadio.checked) {
            leadReferralType.style.display = "block";
        } else {
            leadReferralType.style.display = "none";
        }

    }

    function findParentDiv(inputField, className) {
        // get dynamic field reference
        var parentDiv = inputField;
        if (parentDiv) {
            // Call the recursive function to find the parent div with the specified class name
            parentDiv = findParentDivWithClass(parentDiv, className);

            if (parentDiv) {
                // Now, you have a reference to the parent div with the specified class name
                console.log("Parent Div with Class " + className + ":", parentDiv);
            } else {
                console.log("Parent div with class " + className + ": not found.");
            }
        } else {
            console.log("Input field with ID " + inputField + " not found.");
        }
        return parentDiv;
    }

    function showInputField(inputField) {
        console.log("Showing", inputField.className);
        inputField.style.display = "block";
    }

    function hideInputField(inputField) {
        console.log("Hiding", inputField.className);
        inputField.style.display = "none";
    }

    function findParentDivWithClass(element, className) {
        // Base case: If the element is null or we've reached the top of the DOM tree, return null
        if (!element || element === document.documentElement) {
            return null;
        }

        // Check if the current element has the desired class name
        if (element.classList.contains(className)) {
            return element;
        }

        // Recursively call the function with the parent element
        return findParentDivWithClass(element.parentElement, className);
    }

}
