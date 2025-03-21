export function OpenApple() {
  window.open(
    "https://appleid.apple.com/auth/authorize?client_id=com.twitter.twitter.siwa&redirect_uri=https%3A%2F%2Fx.com&response_type=code%20id_token&state=dSRvlrOpM1clc8rkeR5i1wEsAFb9na7Rxn0HdzE1nuh&scope=name%20email&response_mode=web_message&frame_id=f8c77be3-1fd8-4a74-b6ba-13a3e2ba885a&m=11&v=1.5.5",
    "_blank"
  );
}
