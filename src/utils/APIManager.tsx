export const request = (endPoint:string, requestType:string, body:any) =>
  new Promise(async (resolve, reject) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = '';

    // const user = getUser();
    // if (user) {
    //   token = 'Bearer ' + user.token;
    // }

    console.log('URL : ', BASE_URL + endPoint);
    fetch(BASE_URL + endPoint, {
      method: requestType,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: body,
    })
      .then(response => {
        console.log('RESPONSE ', response);
        response
          .json()
          .then(json => {
            if (response.ok) {
              resolve(json);
            } else if (response.status === 417) {
              reject(json);
            } else {
              if (response.status === 401 || response.status === 403) {
                // LogOutUser();
              }
              reject(json);
            }
          })
          .catch(error => {
            if (response.status === 401 || response.status === 403) {
              // LogOutUser();
            }
            reject(response.status);
          });
      })
      .catch(error => {
        reject(error);
      });
  });