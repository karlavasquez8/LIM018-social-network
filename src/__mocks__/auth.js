export const logIn = (email, password) => {
  const newFormEmail = new FormData();
  logIn(newFormEmail.get(email), newFormEmail.get(password)).then(() => {
    Promise.resolve({
      user: {
      },
    });
  });
};
