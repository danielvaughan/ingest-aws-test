$(document).ready(() => {

  let iotKeys;

  $('#btn-keys').on('click', () => {
    $.ajax({
      url: window.lambdaEndpoint,
      success: (res) => {
        addLog(`Endpoint: ${res.iotEndpoint},
                        Region: ${res.region},
                        AccessKey: ${res.accessKey},
                        SecretKey: ${res.secretKey},
                        SessionToken: ${res.sessionToken}`);

        iotKeys = res; // save the keys
      }
    });
  });
});

const addLog = (msg) => {
  const date = (new Date()).toTimeString().slice(0, 8);
  $("#log").prepend(`<li>[${date}] ${msg}</li>`);
}