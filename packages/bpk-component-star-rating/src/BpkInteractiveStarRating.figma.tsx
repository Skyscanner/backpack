import figma from "@figma/code-connect"

import BpkInteractiveStarRating from "./BpkInteractiveStarRating"

figma.connect(
  BpkInteractiveStarRating,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=51587%3A777",
  {
    props: {
      large: figma.enum("Size", {
        "Large": true,
      }),
      extraLarge: figma.enum("Size", {
        "Extra-large": true,
      }),
      initialRating: figma.enum('Rating', {
        "1 star": 1,
        "2 stars": 2,
        "3 stars": 3,
        "4 stars": 4,
        "5 stars": 5
      })
    },
    example: ({  extraLarge, initialRating, large }) => (
      <BpkInteractiveStarRating
        getStarLabel={(rating: number, maxRating: number) => `${rating} out of ${maxRating} stars`}
        id="uniqueId"
        onRatingSelect={(rating: number) => console.log(rating)}
        large={large}
        extraLarge={extraLarge}
        rating={initialRating}
      />
    ),
  },
)
