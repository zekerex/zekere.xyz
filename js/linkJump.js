document.addEventListener("DOMContentLoaded", function() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var parent = link.closest(".linkexclude, #linkexclude");
        if (!parent) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        } else {
            // Ensure these attributes are removed if they exist
            link.removeAttribute("target");
            link.removeAttribute("rel");
        }
    }
});
