// generate random quotees on living life and being happy
const quotes = [
  {
    quote: "The purpose of our lives is to be happy.",
  },
  {
    quote: "Life is what happens when you’re busy making other plans.",
  },
  {
    quote: "Get busy living or get busy dying.",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
  },
  {
    quote:
      "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
  },
  {
    quote:
      "If you want to live a happy life, tie it to a goal, not to people or things.",
  },
  {
    quote: "Never let the fear of striking out keep you from playing the game.",
  },
  {
    quote:
      "Money and success don’t change people; they merely amplify what is already there.",
  },
  {
    quote:
      "Your time is limited, so don’t waste it living someone else’s life.",
  },
  {
    quote: "Not how long, but how well you have lived is the main thing.",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
  },
  {
    quote:
      "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.",
  },
  {
    quote: "In order to write about life first you must live it.",
  },
  {
    quote:
      "The big lesson in life, baby, is never be scared of anyone or anything.",
  },
  {
    quote:
      "Sing like no one’s listening, love like you’ve never been hurt, dance like nobody’s watching, and live like its heaven on earth.",
  },
  {
    quote:
      "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.",
  },
  {
    quote:
      "Life is not a problem to be solved, but a reality to be experienced.",
  },
  {
    quote: "The unexamined life is not worth living.",
  },
  {
    quote: "Turn your wounds into wisdom.",
  },
  {
    quote:
      "The way I see it, if you want the rainbow, you gotta put up with the rain.",
  },
  {
    quote:
      "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.",
  },
];
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
