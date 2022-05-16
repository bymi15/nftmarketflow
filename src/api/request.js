const APIURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://nftmarketflow.herokuapp.com';

export const callGet = async (url) => {
  let res = {
    data: null,
    err: null,
  };
  try {
    const response = await fetch(`${APIURL}${url}`, {
      method: 'GET',
    });
    if (response.ok) {
      res.data = await response.json();
    } else {
      res.err = response.status;
    }
  } catch (err) {
    res.data = null;
    res.err = err;
  }
  return res;
};

export const callPost = async (url, data) => {
  let res = {
    data: null,
    err: null,
  };
  try {
    const response = await fetch(`${APIURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      res.data = await response.json();
    } else {
      res.err = response.status;
    }
  } catch (err) {
    res.err = err;
  }
  return res;
};

export const callPut = async (url, data) => {
  let res = {
    data: null,
    err: null,
  };
  try {
    const response = await fetch(`${APIURL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      res.data = await response.json();
    } else {
      res.err = response.status;
    }
  } catch (err) {
    res.err = err;
  }
  return res;
};

export const callDelete = async (url) => {
  let res = {
    data: null,
    err: null,
  };
  try {
    const response = await fetch(`${APIURL}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      res.err = response.status;
    }
  } catch (err) {
    res.err = err;
  }
  return res;
};
