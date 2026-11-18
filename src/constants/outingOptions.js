// The allowed values for an outing. Used by the filters, the form chips and the Zod schema.
export const outingStatuses = ["Idea", "Voting", "Confirmed"];

export const outingTypes = ["Hike", "Food", "Game night", "Beach", "Movie", "Other"];

// One Ionicons name per outing type, shown on each card.
export const typeIcons = {
  Hike: "walk-outline",
  Food: "restaurant-outline",
  "Game night": "game-controller-outline",
  Beach: "sunny-outline",
  Movie: "film-outline",
  Other: "sparkles-outline",
};

// RSVP answers: value is what gets saved, label is what the user sees.
export const responseOptions = [
  { value: "going", label: "Going" },
  { value: "maybe", label: "Maybe" },
  { value: "cant", label: "Can't" },
];
