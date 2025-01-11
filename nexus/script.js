// Store the original positions and dimensions of the windows (initial state)
const initialPositions = {
    window1: { top: 30, left: 50, width: 200, height: 600 },
    window2: { top: 30, right: 50, width: 1200, height: 750 }
};

// Function to apply initial positions and sizes
function applyInitialPositions() {
    const window1 = document.getElementById('window1');
    const window2 = document.getElementById('window2');

    // Apply initial size and position for window1
    window1.style.width = `${initialPositions.window1.width}px`;
    window1.style.height = `${initialPositions.window1.height}px`;
    window1.style.top = `${initialPositions.window1.top}px`;
    window1.style.left = `${initialPositions.window1.left}px`;

    // Apply initial size and position for window2
    window2.style.width = `${initialPositions.window2.width}px`;
    window2.style.height = `${initialPositions.window2.height}px`;
    window2.style.top = `${initialPositions.window2.top}px`;

    // If window2 has 'right' in the initial position, calculate left position to align it to the right
    if (initialPositions.window2.right) {
        const rightPosition = initialPositions.window2.right;
        window2.style.left = `calc(100% - ${rightPosition}px - ${initialPositions.window2.width}px)`;
    } else {
        window2.style.left = `${initialPositions.window2.left}px`;
    }
}

// Apply the initial positions on page load
window.onload = applyInitialPositions;

// Make the window draggable
function makeDraggable(windowElement, headerElement, iframeElement) {
    let isDragging = false;
    let offsetX, offsetY;

    headerElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;

        // Disable pointer events on iframe during dragging
        iframeElement.style.pointerEvents = 'none';

        document.body.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            windowElement.style.left = `${newLeft}px`;
            windowElement.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';

        // Re-enable pointer events on iframe after dragging
        iframeElement.style.pointerEvents = 'auto';
    });
}

// Make the window resizable with different min/max sizes for each window
function makeResizable(windowElement, resizeHandle, iframeElement, minWidth, maxWidth, minHeight, maxHeight) {
    let isResizing = false;
    let initialWidth, initialHeight, initialX, initialY;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        initialX = e.clientX;
        initialY = e.clientY;
        initialWidth = windowElement.offsetWidth;
        initialHeight = windowElement.offsetHeight;
        document.body.style.cursor = 'se-resize';

        // Disable pointer events on iframe during resizing
        iframeElement.style.pointerEvents = 'none';

        // Prevent text selection and highlighting outside the window during resizing
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (isResizing) {
            let deltaX = e.clientX - initialX;
            let deltaY = e.clientY - initialY;

            let newWidth = initialWidth + deltaX;
            let newHeight = initialHeight + deltaY;

            // Apply limits for resizing
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                windowElement.style.width = `${newWidth}px`;
            }
            if (newHeight >= minHeight && newHeight <= maxHeight) {
                windowElement.style.height = `${newHeight}px`;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = 'default';

        // Re-enable pointer events on iframe after resizing
        iframeElement.style.pointerEvents = 'auto';
    });
}

// Reset the positions and dimensions of all windows
function resetWindowPositions() {
    const window1 = document.getElementById('window1');
    const window2 = document.getElementById('window2');

    // Reset the positions and dimensions to the initial values
    window1.style.top = `${initialPositions.window1.top}px`;
    window1.style.left = `${initialPositions.window1.left}px`;
    window1.style.width = `${initialPositions.window1.width}px`;
    window1.style.height = `${initialPositions.window1.height}px`;

    window2.style.top = `${initialPositions.window2.top}px`;
    window2.style.width = `${initialPositions.window2.width}px`;
    window2.style.height = `${initialPositions.window2.height}px`;

    // If window2 has 'right' set, apply it
    if (initialPositions.window2.right) {
        const rightPosition = initialPositions.window2.right;
        window2.style.left = `calc(100% - ${rightPosition}px - ${initialPositions.window2.width}px)`;
    } else {
        window2.style.left = `${initialPositions.window2.left}px`;
    }
}

// Initialize draggable and resizable functionality for each window
const iframe1 = document.getElementById('iframe1');
makeDraggable(document.getElementById('window1'), document.getElementById('header1'), iframe1);
makeDraggable(document.getElementById('window2'), document.getElementById('header2'), iframe1);

// Set different min/max widths for window1 and window2
makeResizable(document.getElementById('window1'), document.getElementById('resize-handle1'), iframe1, 200, 300, 150, 700); // window1 min/max width: 200px to 400px
makeResizable(document.getElementById('window2'), document.getElementById('resize-handle2'), iframe1, 250, 1550, 180, 850); // window2 min/max width: 250px to 500px

// Reset button event listener
document.getElementById('resetButton').addEventListener('click', resetWindowPositions);


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