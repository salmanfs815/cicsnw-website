// Umami records a click on any element carrying these attributes. The location
// property shows which donate button was used; the page is recorded automatically.
export function donateTracking(location: string) {
  return {
    "data-umami-event": "Donate click",
    "data-umami-event-location": location,
  };
}
