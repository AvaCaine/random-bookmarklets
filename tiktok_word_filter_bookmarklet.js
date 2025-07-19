javascript:(function(){
    const blacklist = ["blacklist1", "blacklist2"]; //replace blacklists with keyword/s you want to blacklist.
    function getCurrentVideoContainer() {
        const containers = [...document.querySelectorAll('[id^="one-column-item-"]')];
        if (!containers.length) return null;

        let visibleContainer = null;
        containers.forEach(c => {
            if (checkIfVisible(c)) {
                visibleContainer = c;
            }
        });
        return visibleContainer;
    }

    function getNewestVideoContainer() {
        const containers = [...document.querySelectorAll('[id^="one-column-item-"]')];
        if (!containers.length) return null;
        containers.sort((a, b) => {
            const aNum = parseInt(a.id.split("-").pop());
            const bNum = parseInt(b.id.split("-").pop());
            return bNum - aNum;
        });
        return containers[0]; 
    }

    function checkIfVisible(element) {
        const rect = element.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        return isVisible;
    }

    function scrollToNextVideo() {
        const newestContainer = getNewestVideoContainer();
        if (!newestContainer) {
            console.log("No newest video container found, skipping scroll.");
            return;
        };

        newestContainer.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            window.scrollBy(0, window.innerHeight);
        }, 500);
    }

    function checkAndScroll() {
        const container = getCurrentVideoContainer();
        if (!container) return;

        const textContent = container?.innerText?.toLowerCase() || "";

        if (blacklist.some(word => textContent.includes(word))) {
            console.log("Matched blacklist word in:", textContent);
            scrollToNextVideo();
        }
    }

    setInterval(() => {
        checkAndScroll();
    }, 250);

    alert("nothing errored");
})();
