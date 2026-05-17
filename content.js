window.addEventListener('load', () => {
    let currentUrl = window.location.href;
    
    // ব্রাউজারের মেমোরি থেকে কতবার সাবমিট হয়েছে তা চেক করা। না থাকলে 0 ধরবে।
    let submitCount = parseInt(localStorage.getItem('botSubmitCount')) || 0;

    if (currentUrl.includes("viewform")) {
        // যদি ৫০ বার হয়ে যায়, তবে আর ফর্ম ফিল-আপ করবে না।
        if (submitCount >= 50) {
            console.log("Target reached: 50 forms submitted. Stopping bot.");
            alert("আপনার বট সফলভাবে ৫০ বার ফর্ম সাবমিট করেছে এবং থেমে গেছে!");
            // পরবর্তীতে আবার প্রথম থেকে শুরু করতে চাইলে মেমোরি ক্লিন করে দেওয়া হচ্ছে
            localStorage.removeItem('botSubmitCount');
            return; // এখানেই কোড থামিয়ে দেওয়া হলো
        }
        
        console.log(`Current Submission Count: ${submitCount + 1}/50`);
        setTimeout(fillAndSubmitForm, 3000);

    } else if (currentUrl.includes("formResponse")) {
        // সাবমিট হওয়ার পরের পেজে আসলে কাউন্ট ১ বাড়িয়ে মেমোরিতে সেভ করে রাখবে
        submitCount++;
        localStorage.setItem('botSubmitCount', submitCount);
        console.log(`Total forms successfully submitted: ${submitCount}`);

        if (submitCount >= 50) {
            console.log("50 submissions completed!");
        } else {
            // ৫০ বার না হলে নতুন ফর্মের লিংকে ক্লিক করবে
            setTimeout(clickSubmitAnother, 2000);
        }
    }
});

function fillAndSubmitForm() {
    console.log("Auto-fill started...");

    let ratingGroups = document.querySelectorAll('[role="radiogroup"]');
    
    ratingGroups.forEach((group) => {
        let options = group.querySelectorAll('[role="radio"]');
        if (options.length === 10) {
            let minIndex = 4; // ৫ নম্বর অপশন
            let maxIndex = 9; // ১০ নম্বর অপশন
            let randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
            options[randomIndex].click();
        }
    });

    console.log("Ratings filled. Attempting to submit...");
    
    setTimeout(() => {
        let buttons = document.querySelectorAll('[role="button"]');
        let submitClicked = false;

        // পেজের সবগুলো বাটন খুঁজে তার ভেতরের লেখা চেক করা হচ্ছে
        for (let i = 0; i < buttons.length; i++) {
            let btnText = buttons[i].innerText.toLowerCase().trim();
            
            // বাটনের লেখায় submit বা 'জমা দিন' থাকলে শুধুমাত্র সেখানেই ক্লিক করবে
            if (btnText === "submit" || btnText === "জমা দিন") {
                buttons[i].click();
                submitClicked = true;
                console.log("Exact Submit button clicked!");
                break; // সঠিক বাটন পেলে খোঁজা বন্ধ করে দিবে
            }
        }

        // যদি কোনো কারণে লেখা মিলিয়ে বাটন না পায়, তবে গুগল ফর্মের সাবমিট বাটনের নির্দিষ্ট jsname দিয়ে ট্রাই করবে
        if (!submitClicked) {
            let submitBtnByJsname = document.querySelector('[role="button"][jsname="M2ZUBf"]');
            if (submitBtnByJsname) {
                submitBtnByJsname.click();
                console.log("Fallback submit button clicked!");
            } else {
                console.log("Error: Submit button not found.");
            }
        }
    }, 1000); 
}

function clickSubmitAnother() {
    console.log("Looking for 'Submit another response' link...");
    
    let links = document.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
        let linkText = links[i].innerText.toLowerCase();
        let linkHref = links[i].href;
        
        if (linkText.includes("submit another response") || linkText.includes("আরেকটি") || linkHref.includes("viewform")) {
            links[i].click();
            console.log("Clicked to submit another response!");
            break;
        }
    }
}
