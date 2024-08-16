export function getRandomUsername() {
  return Math.random().toString(36).substring(2, 15);
}

export function getRandomEmail(username) {
  return `${username}@yopmail.com`;
}

export function getRandomDate() {
  const start = new Date(1950, 0, 1); // Start date: January 1, 1900
  const end = new Date(2015, 0, 1); // End date: Today's date
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const day = String(randomDate.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = randomDate.toLocaleString("default", { month: "long" }); // Get month name
  const year = randomDate.getFullYear(); // Get year

  return `${day}/${month}/${year}`;
}

export function getMobileNumber() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

export function getPincode() {
  return Math.floor(Math.random() * 900000) + 100000;
}
