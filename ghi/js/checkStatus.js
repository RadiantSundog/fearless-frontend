// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get("jwt_access_payload");
console.log(payloadCookie);
if (payloadCookie) {
  const decodedPayload = atob(payloadCookie.value);
  const payload = JSON.parse(decodedPayload);
  console.log(payload);
    if (payload.user.perms.includes("events.add_conference")) {
        document.getElementById("new-conference-link").classList.remove("d-none");
    }
    if (payload.user.perms.includes("events.add_location")) {
        document.getElementById("new-location-link").classList.remove("d-none");
    }
}
