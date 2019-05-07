// createId() can be called with no arguments to make a 20 character id

// prefix places a string at the front of the id
// Not included in idLength
// Must be a string

// length is how long random generated portion is
// 20 is default
// Must be a number

// chars is the characters used for the random generated portion
// Default characters are upper and lower case alphabet and numbers
// Must be a string, not an array

// createId() => "x8HZPoiMRUhQzygXegAK"
// createId("myPrefix-", 10, "1234567890") => "myPrefix-1217738484"

export const createId = (prefix, length, chars) => {
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

  return id;
};
