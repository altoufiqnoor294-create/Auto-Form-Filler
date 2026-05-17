// পেজ পুরোপুরি লোড হওয়ার জন্য ৩ সেকেন্ড অপেক্ষা করা হচ্ছে
window.addEventListener('load', () => {
    setTimeout(fillRatingQuestions, 3000); 
});

function fillRatingQuestions() {
    console.log("Rating auto-fill started...");

    // Google Form-এর প্রতিটি রেটিং/এমসিকিউ সেকশন সাধারণত 'radiogroup' হিসেবে থাকে
    let ratingGroups = document.querySelectorAll('[role="radiogroup"]');
    
    // প্রতিটি রেটিং গ্রুপ চেক করে লুপ চালানো
    ratingGroups.forEach((group, index) => {
        // এই গ্রুপের ভেতরে থাকা সবগুলো স্টার বা রেডিও বাটন খুঁজে বের করা
        let options = group.querySelectorAll('[role="radio"]');
        
        // যদি অপশন ঠিক ১০টি হয় (আপনার ফর্মের রিকোয়ারমেন্ট অনুযায়ী)
        if (options.length === 10) {
            // অপশনগুলোর ইনডেক্স ০ থেকে ৯ পর্যন্ত হয়। 
            // ৫ নম্বর অপশনের ইনডেক্স ৪, এবং ১০ নম্বর অপশনের ইনডেক্স ৯।
            let minIndex = 4; // ৫ নম্বর স্টার
            let maxIndex = 9; // ১০ নম্বর স্টার
            
            // ৪ থেকে ৯ এর মধ্যে একটি র‍্যান্ডম ইনডেক্স তৈরি করা
            let randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
            
            // সেই র‍্যান্ডম স্টারে ক্লিক করা
            options[randomIndex].click();
            
            console.log(`Question ${index + 1}: Selected option ${randomIndex + 1}`);
        }
    });

    console.log("All ratings filled successfully!");
    
    // আপনি চাইলে অটো-সাবমিট করার জন্য নিচের কোডগুলোর কমেন্ট (//) তুলে দিতে পারেন
    // setTimeout(() => {
    //     let submitButton = document.querySelector('[role="button"][jsname="M2ZUBf"]'); // সাবমিট বাটনের সম্ভাব্য সিলেক্টর
    //     if(submitButton) submitButton.click();
    // }, 1000);
}