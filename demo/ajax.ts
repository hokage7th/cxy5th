export function ajax(method, url, data) {
  return new Promise((rs, rj) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange(e => {
      if (e.target.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          return rs(xhr.response);
        }
      }

      return rj(xhr.response);
    });

    xhr.open(method, url);
    xhr.send(data);
  })
}