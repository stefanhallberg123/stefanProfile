import { extAPI, intAPI } from "../../config";

export const getExtProfiles = (amount) => {
    return fetch(`${extAPI}${amount}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

export const getCountries = () => {
  return fetch(`https://restcountries.com/v3.1/all    `, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// export const getIntProfiles = () => {
//   return fetch(`${intAPI}/`, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const apiCreateProfile = (profile) => {
  return fetch(`${intAPI}/createProfile/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: profile,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
