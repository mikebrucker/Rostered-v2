// createId() can be called with no arguments to make a 20 character id

// prefix places a string at the front of the id
// suffix places a string at the end of the id
// Not included in idLength
// Must be a string, should help find type or location of data
// Encouraged to use a character like - or _ at the end of your prefix and beginning of your suffix
// You can split id `id.split("-")` to get your prefix or suffix

// length is how long random generated portion is
// 20 is default
// Must be a number

// chars is the characters used for the random generated portion
// Default characters are upper and lower case alphabet and numbers
// Must be a string, not an array

// createId() => "x8HZPoiMRUhQzygXegAK"
// createId("myPrefix-", 10, "1234567890") => "myPrefix-1217738484"
// createId("game-") + createId("_", "#import", 6) => "game-z6QFnS3wr21dt8pe66J6_XIySVz#import"

export const createId = (prefix, suffix, length, chars) => {
  const randomNum = () => Math.floor(Math.random() * characters.length);

  const characters =
    chars && typeof chars === "string"
      ? chars
      : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  const idLength = length && typeof length === "number" ? length : 20;

  let id = "";

  for (let i = 0; i < idLength; i++) {
    id = id.concat(characters[randomNum()]);
  }

  id = prefix && typeof prefix === "string" ? prefix + id : id;

  id = suffix && typeof suffix === "string" ? id + suffix : id;

  return id;
};
