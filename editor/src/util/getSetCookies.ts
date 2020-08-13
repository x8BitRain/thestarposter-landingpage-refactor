const getCookie = (name: string): string | null => {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};

const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  // let domain = window.location.host
  // if (window.location.href.indexOf('nachthimmel.de') > -1) {
  //   domain = "nachthimmel.de"
  // }
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
};

export { getCookie, setCookie };
