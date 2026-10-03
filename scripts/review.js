const reviewParameters = new URLSearchParams(window.location.search);
const productId = reviewParameters.get("product");
const rating = Number(reviewParameters.get("rating"));
const installDate = reviewParameters.get("installDate");
const validProductIds = ["fc-1888", "fc-2050", "fs-1987", "ac-2000", "jj-1969"];
const isSubmittedReview = validProductIds.includes(productId)
    && Number.isInteger(rating)
    && rating >= 1
    && rating <= 5
    && Boolean(installDate);
const reviewCountKey = "wdd131ProductReviewCount";
let reviewCount = Number(localStorage.getItem(reviewCountKey)) || 0;

if (isSubmittedReview) {
    reviewCount += 1;
    localStorage.setItem(reviewCountKey, reviewCount);
} else {
    document.querySelector("#confirmation-title").textContent = "No review submitted";
    document.querySelector("#confirmation-message").textContent = "Please complete the required fields before submitting your review.";
}

document.querySelector("#review-count").textContent = reviewCount;