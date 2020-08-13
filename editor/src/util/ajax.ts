export default function ajax<T>(
  method: "GET" | "POST" | "PUT",
  url: string,
  body?: object | string
): Promise<{ status: number; ans: T }> {
  return new Promise((res, rej) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status < 300) {
          let ans: string | T = this.responseText;
          try {
            ans = JSON.parse(ans) as T;
          } catch (e) {
            //it wasnt a json object..
          }
          res({
            status: this.status,
            ans: ans as T
          });
        } else {
          rej({
            status: this.status,
            ans: this.responseText
          });
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(body as any);
  });
}
