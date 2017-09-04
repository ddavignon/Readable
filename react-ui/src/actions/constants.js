export const ROOT_URL = ''; // http://localhost:5001';
export const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
export function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4();
  }