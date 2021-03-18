export const logThis = function(data) {
  console.log(data);
};

export const wait = function(timeOut) {
  return new Promise(resolve => {
    setTimeout(resolve, timeOut);
  });
};

export const appendEditForm = function(form) {
  let formData = new FormData();

  for (let key in form) {
    formData.append(key, form[key]);
  }

  formData.append('_method', 'put');

  return formData;
};

export const appendForm = function(form) {
  let formData = new FormData();

  for (let key in form) {
    formData.append(key, form[key]);
  }

  return formData;
};
