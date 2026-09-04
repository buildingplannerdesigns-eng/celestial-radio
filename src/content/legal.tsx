export function AboutBody() {
  return (
    <>
      <p>
        Celestial Radio is a free internet radio player for live Ghana, Africa and world stations.
        Hear news, music, talk, gospel and more from one place — Peace FM, Joy FM, Adom FM, Citi FM and dozens of others.
      </p>
      <p>
        The app is designed and built by{" "}
        <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">Celestial Web Solutions</a>,
        a Ghana web studio. We do not own the radio stations. Each live stream is provided by its broadcaster; we only make them easier to find and play.
      </p>
      <h2>What you can do</h2>
      <ul>
        <li>Play live FM and online stations from Ghana, Africa and the world</li>
        <li>Search by name, city or genre</li>
        <li>Save favourites and pick up recently played stations</li>
        <li>Use dark or light mode, including a sleep timer on the player</li>
      </ul>
      <h2>Contact</h2>
      <p>
        For partnerships, station corrections or technical issues, visit{" "}
        <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">celestialwebsolutions.net</a>.
      </p>
    </>
  );
}

export function TermsBody() {
  return (
    <>
      <p>Last updated: 3 September 2026</p>
      <p>
        These terms govern your use of Celestial Radio, operated by Celestial Web Solutions
        (“we”, “us”). By using the website or app you agree to them.
      </p>
      <h2>1. The service</h2>
      <p>
        Celestial Radio lets you discover and play publicly available live radio streams.
        We provide a player and directory. We are not a radio station and we do not produce the audio.
      </p>
      <h2>2. Third-party streams</h2>
      <p>
        Streams, logos and station names belong to their broadcasters. Availability, quality and content
        can change or fail without notice. If a stream is down, geo-blocked or withdrawn, that is outside our control.
      </p>
      <h2>3. Acceptable use</h2>
      <p>You may use Celestial Radio for personal, non-commercial listening. You must not:</p>
      <ul>
        <li>Redistribute, rebroadcast or commercially exploit streams without the broadcaster’s permission</li>
        <li>Attempt to disrupt the site, scrape it aggressively, or bypass technical limits</li>
        <li>Use the service for anything unlawful</li>
      </ul>
      <h2>4. Intellectual property</h2>
      <p>
        The Celestial Radio name, star mark, layout and software are owned by Celestial Web Solutions.
        Station brands, logos and audio remain the property of their owners.
      </p>
      <h2>5. No warranty</h2>
      <p>
        The service is provided “as is”. We do not warrant that streams will be uninterrupted, accurate
        or available in your location. To the fullest extent allowed by law, we are not liable for
        losses arising from stream failures, third-party content, or your use of the player.
      </p>
      <h2>6. Changes</h2>
      <p>
        We may update stations, features or these terms. Continued use after a change means you accept the new terms.
      </p>
      <h2>7. Contact</h2>
      <p>
        Questions: <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">celestialwebsolutions.net</a>.
      </p>
    </>
  );
}

export function PrivacyBody() {
  return (
    <>
      <p>Last updated: 3 September 2026</p>
      <p>
        Celestial Radio is built by Celestial Web Solutions. This policy explains what we store
        when you use the player.
      </p>
      <h2>Information we store on your device</h2>
      <p>
        Favourites, recently played stations and your dark/light theme preference are saved in your
        browser’s local storage. That data stays on your device and is not sent to our servers.
      </p>
      <h2>Listening</h2>
      <p>
        When you play a station, your device connects directly to that broadcaster’s stream.
        Those providers may see your IP address and standard connection data under their own policies.
      </p>
      <h2>World radio search</h2>
      <p>
        The World section may query the public Radio Browser directory to list extra stations.
        That request can include your search text.
      </p>
      <h2>Cookies and accounts</h2>
      <p>
        We do not require an account. We do not use advertising cookies. If you install the app as a PWA,
        your browser may keep a local cache of the interface.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions: <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">celestialwebsolutions.net</a>.
      </p>
    </>
  );
}

export const LEGAL_PAGES = {
  about: { title: "About Celestial Radio", Body: AboutBody },
  terms: { title: "Terms & Conditions", Body: TermsBody },
  privacy: { title: "Privacy Policy", Body: PrivacyBody },
} as const;

export type LegalId = keyof typeof LEGAL_PAGES;
