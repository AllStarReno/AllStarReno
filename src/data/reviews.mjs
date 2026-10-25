// Real customer reviews, copied word for word from /workspace/allstar/reviews.json (owner-approved 2026-10-23).
// Display only: never output rating/review schema. Each links to its original public source.
export const REVIEWS = [
 {
  "name": "Rob D.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2026-06-12",
  "text": "Excellent craftsmanship, stunning results Our new shower is absolutely stunning, exceeding all our expectations. The craftsmanship is truly top-notch—it's like having a piece of magazine-worthy design right in our home. Initially, I was a bit skeptical about the decision, but the team proved it was more than worth it. Both my wife and I couldn’t be happier. Thank you for bringing our vision to life!",
  "tags": [
   "bathroom-remodeling",
   "walk-in-showers",
   "all-star-shower-systems",
   "tub-to-shower-conversions"
  ],
  "cities": []
 },
 {
  "name": "Max P.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2026-05-27",
  "text": "Affordable and amazing results The pricing was incredibly affordable, and the quality of our new shower exceeded our expectations! The entire process was smooth, and we’re thrilled with the final results. Highly recommend for anyone considering a bathroom upgrade.",
  "tags": [
   "bathroom-remodeling",
   "walk-in-showers",
   "all-star-shower-systems",
   "full-bathroom-remodel"
  ],
  "cities": []
 },
 {
  "name": "Anibal G.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2025-10-15",
  "text": "All-Star Renovations exceeded expectations with their shower remodel. Their craftsmanship, communication, and professionalism were top-notch. The finished shower looks incredible, completed on schedule and within budget. Highly recommend them for bathroom upgrades or home renovations. They truly live up to their name! @allstarreno.com",
  "tags": [
   "bathroom-remodeling",
   "walk-in-showers",
   "tub-to-shower-conversions",
   "all-star-shower-systems"
  ],
  "cities": []
 },
 {
  "name": "Gary R.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2026-01-30",
  "text": "I hired All-Star Renovations for a bathroom remodel in my Little Rock home. [The owner] communicated clearly from the start, arrived as scheduled, and completed the work within the agreed timeline. The workmanship was solid, with exceptional attention to detail and professionalism. Any questions I had were answered promptly, and the crew left the space clean at the end of each day. Overall, I’m happy with the result and would consider them for future projects.",
  "tags": [
   "bathroom-remodeling",
   "full-bathroom-remodel"
  ],
  "cities": [
   "little-rock"
  ]
 },
 {
  "name": "LaTasha M.",
  "platform": "ProsGrade",
  "url": "https://prosgrade.com/renovations/conway/all-star-renovations",
  "date": "",
  "text": "Over the years they’ve helped me with the little things... small projects, random fixes, all the “can you come look at this?” moments... and they always showed up and did it right. That consistency is exactly why I trusted them with my full bathroom remodel. When people prove themselves over time, you don’t think twice.",
  "tags": [
   "bathroom-remodeling",
   "full-bathroom-remodel",
   "handyman-services",
   "repairs",
   "maintenance"
  ],
  "cities": []
 },
 {
  "name": "Kesha W.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2026-03-27",
  "text": "Central Arkansas homeowner All-Star Renovations Amazing work and customer service. He finished the jobs in no time and explained in detail the work that he was doing and is super affordable. 😊 I recommend calling [All-Star Renovations] for any home repairs/renovations!!",
  "tags": [
   "handyman-services",
   "repairs",
   "installation",
   "maintenance"
  ],
  "cities": []
 },
 {
  "name": "Kristi S.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2025-12-27",
  "text": "[The owner] was professional, knowledgeable and fixed my dryer belt in no time. I would do business with him again. Great work.",
  "tags": [
   "handyman-services",
   "repairs",
   "maintenance"
  ],
  "cities": []
 },
 {
  "name": "Paul D.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2025-11-05",
  "text": "[The owner] gave us a good estimate and did a great job refinishing our wall. I highly recommend All Star Renovations.",
  "tags": [
   "handyman-services",
   "repairs"
  ],
  "cities": []
 },
 {
  "name": "Mandy M.",
  "platform": "Trustindex",
  "url": "https://www.trustindex.io/reviews/allstarreno.com",
  "date": "2026-03-28",
  "text": "He helped me over the phone with my washer, very nice guy!",
  "tags": [
   "handyman-services",
   "repairs"
  ],
  "cities": []
 }
];

// Pick up to n reviews for a page: city matches first, then service-tag matches.
export function reviewsFor({ tags = [], city = null, n = 3 } = {}) {
  const score = (r) => (city && r.cities.includes(city) ? 10 : 0) + tags.filter((t) => r.tags.includes(t)).length * (tags.length > 1 && r.tags.includes(tags[tags.length - 1]) ? 2 : 1);
  return REVIEWS.map((r) => [score(r), r]).filter(([s]) => s > 0).sort((a, b) => b[0] - a[0]).slice(0, n).map(([, r]) => r);
}
