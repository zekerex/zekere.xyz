//tag colour script
// Define the colors corresponding to the rainbow
const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'blue', 'pink', 'purple'];

// Function to assign colors to tags within each section
function assignColorsToTags(section) {
    // Select all the tags in this specific section (whether it's nested or not)
    const tags = section.querySelectorAll('.tag');

    // Iterate over the tags and assign a color based on their index within this section
    tags.forEach((tag, index) => {
        const colorIndex = index % colors.length;  // Ensures colors cycle through the array
        tag.classList.add(colors[colorIndex]);
    });
}

// Select all top-level sections (ul or details) and apply color assignment
const sections = document.querySelectorAll('ul, details'); // Select both ul and details sections
sections.forEach(section => {
    assignColorsToTags(section);  // Apply color assignment to each section individually
});