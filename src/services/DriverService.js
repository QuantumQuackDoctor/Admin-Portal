export const findDriver = () => {
  //TODO
  return {
    id: 1,
    email: "mockdriver@example.com",
    phone: null,
    firstName: "first",
    lastName: "last",
    car: "Blue Honda Accord",
    settings: {
      notifications: {
        text: false,
        email: true,
      },
      theme: "light",
    },
    ratings: [
      {
        id: 1,
        username: "username",
        stars: 4,
        description: "driver was very slow",
      },
    ],
  };
};
