/**
 * Station directory — edit streamUrl and favicon here.
 *
 * Images: drop a PNG/JPG in /public/logos/ then set favicon to "/logos/your-file.png"
 * Streams: paste the direct audio URL (https://.../stream or .../listen).
 */
export type StationRegion = "ghana" | "africa" | "world";

export interface Station {
  id: string;
  name: string;
  city: string;
  country: string;
  freq: string;
  tags: string[];
  streamUrl: string;
  website?: string;
  favicon?: string;
  region?: StationRegion;
}

export const GHANA: Station[] = [
  { id:"gh-peace",   name:"Peace FM",      city:"Accra",  country:"Ghana", freq:"104.3 FM", tags:["news","twi","talk"],          streamUrl:"https://peacefm-atunwadigital.streamguys1.com/peacefm", website:"https://peacefmonline.com", favicon:"/logos/gh.peace.webp"},
  { id:"gh-joy",     name:"Joy FM",        city:"Accra",  country:"Ghana", freq:"99.7 FM",  tags:["news","english","talk"],       streamUrl:"https://mmg.streamguys1.com/JoyFM-mp3", website:"https://myjoyonline.com", favicon:"https://cdn-profiles.tunein.com/s7540/images/logog.png?t=152102" },
  { id:"gh-adom",    name:"Adom FM",       city:"Accra",  country:"Ghana", freq:"106.3 FM", tags:["music","twi","entertainment"], streamUrl:"https://mmg.streamguys1.com/AdomFM-mp3", website:"https://adomonline.com", favicon:"https://cdn.webrad.io/images/logos/radio-com-gh/adom-fm.png" },
  { id:"gh-citi",    name:"Citi FM",       city:"Accra",  country:"Ghana", freq:"97.3 FM",  tags:["news","talk","english"],       streamUrl:"https://citi973fm.radioca.st/stream", website:"https://citinewsroom.com", favicon:"https://citinewsroom.com/wp-content/uploads/2019/08/cnr_logo_web.png" },
  { id:"gh-hitz",    name:"Hitz FM",       city:"Accra",  country:"Ghana", freq:"103.9 FM", tags:["hiphop","afrobeats","urban"],  streamUrl:"https://mmg.streamguys1.com/HitzFM-mp3", website:"https://hitz1039.com", favicon:"/logos/gh-hitz.jpg" },
  { id:"gh-asempa",  name:"Asempa FM",     city:"Accra",  country:"Ghana", freq:"94.7 FM",  tags:["sports","talk","twi"],         streamUrl:"https://mmg.streamguys1.com/AsempaFM-mp3", website:"https://asempafm.com", favicon:"/logos/gh-asempa.jpg" },
  { id:"gh-sporty",  name:"Sporty FM",     city:"Accra",  country:"Ghana", freq:"106.1 FM", tags:["sports","talk","english"],     streamUrl:"https://sportyfm-atunwadigital.streamguys1.com/sportyfm", website:"https://sportyfmonline.com", favicon:"/logos/gh-sporty.png" },
  { id:"gh-yfm",     name:"Y FM",          city:"Accra",  country:"Ghana", freq:"107.9 FM", tags:["youth","pop","urban"],         streamUrl:"https://yfm1079accra-atunwadigital.streamguys1.com/yfm1079accra", website:"https://yfmghana.com", favicon:"https://cdn-profiles.tunein.com/s208875/images/logog.jpg?t=157140" },
  { id:"gh-starr",   name:"Starr FM",      city:"Accra",  country:"Ghana", freq:"103.5 FM", tags:["news","talk","english"],       streamUrl:"https://starrfm-atunwadigital.streamguys1.com/starrfm", website:"https://starrfm.com.gh", favicon:"/logos/gh-starr.webp" },
  { id:"gh-oman",    name:"Oman FM",       city:"Accra",  country:"Ghana", freq:"107.1 FM", tags:["twi","news","entertainment"],  streamUrl:"https://omanfm-atunwadigital.streamguys1.com/omanfm", website:"https://omanfm1071.com", favicon:"https://www.omanfm1071.com/wp-content/uploads/2019/04/oman_logo-.jpg" },
  { id:"gh-kasapa",  name:"Kasapa FM",     city:"Accra",  country:"Ghana", freq:"102.5 FM", tags:["twi","talk","news"],           streamUrl:"https://stream.zeno.fm/3eh6htuyk8quv", website:"https://kasapafm.com", favicon:"https://cdn-radiotime-logos.tunein.com/s174903g.png" },
  { id:"gh-nhyira",  name:"Nhyira FM",     city:"Kumasi", country:"Ghana", freq:"104.5 FM", tags:["twi","gospel","music"],        streamUrl:"https://mmg.streamguys1.com/NhyiraFM-mp3", website:"https://nhyirafm.com", favicon:"/logos/gh-nhyira.webp" },
  { id:"gh-luv",     name:"Luv FM",        city:"Kumasi", country:"Ghana", freq:"99.5 FM",  tags:["music","talk","english"],      streamUrl:"https://mmg.streamguys1.com/LuvFM-mp3", website:"https://myjoyonline.com", favicon:"/logos/gh-luv.png" },
  { id:"gh-pure",    name:"Pure FM",       city:"Kumasi", country:"Ghana", freq:"95.7 FM",  tags:["urban","hiphop","entertainment"], streamUrl:"https://atunwadigital.streamguys1.com/purefm", website:"https://purefmgh.com", favicon:"https://cdn-profiles.tunein.com/s293349/images/logoq.png?t=155861" },
  { id:"gh-hello",   name:"Hello FM",      city:"Kumasi", country:"Ghana", freq:"101.5 FM", tags:["twi","music","entertainment"], streamUrl:"https://atunwadigital.streamguys1.com/hellofm", website:"https://despitemedia.com", favicon:"/logos/gh-hello.png" },
  { id:"gh-happy",   name:"Happy FM",      city:"Accra",  country:"Ghana", freq:"98.9 FM",  tags:["music","entertainment","twi"], streamUrl:"https://atunwadigital.streamguys1.com/happyfm989accra", website:"https://happyfmghana.com", favicon:"https://cdn.webrad.io/images/logos/radio-com-gh/happy-fm.png" },
  { id:"gh-okay",    name:"Okay FM",       city:"Accra",  country:"Ghana", freq:"101.7 FM", tags:["music","entertainment","twi"], streamUrl:"https://atunwadigital.streamguys1.com/okayfm", website:"https://okayghana.com", favicon:"/logos/gh-okay.jpg" },
  { id:"gh-angel",   name:"Angel FM",      city:"Kumasi", country:"Ghana", freq:"107.1 FM", tags:["twi","news","entertainment"],  streamUrl:"https://atunwadigital.streamguys1.com/angelfm", website:"https://angelonline.com.gh", favicon:"https://cdn-profiles.tunein.com/s110138/images/logoq.jpg?t=158204" },
  { id:"gh-neat",    name:"Neat FM",       city:"Accra",  country:"Ghana", freq:"100.9 FM", tags:["highlife","oldies","ga"],      streamUrl:"https://atunwadigital.streamguys1.com/neatfm", website:"https://neatfm.com.gh", favicon:"/logos/gh-neat.png" },
  { id:"gh-asaase",  name:"Asaase Radio",  city:"Accra",  country:"Ghana", freq:"99.5 FM",  tags:["news","talk","english"],       streamUrl:"https://stream.radiojar.com/cyg76xcvp0hvv", website:"https://asaaseradio.com", favicon:"https://cdn-profiles.tunein.com/s307020/images/logog.png" },
  { id:"gh-uniiq",   name:"Uniiq FM",      city:"Accra",  country:"Ghana", freq:"95.7 FM",  tags:["music","ga","highlife"],       streamUrl:"https://mediagh.us:2000/stream/uniiqfm", website:"https://gbcghanaonline.com", favicon:"https://cdn.onlineradiobox.com/img/logo/7/7037.v3.png" },
  { id:"gh-ahotor",  name:"Ahotor FM",     city:"Ho",     country:"Ghana", freq:"96.7 FM",  tags:["ewe","music","entertainment"], streamUrl:"https://stream.zeno.fm/bbpfy9pk21zuv", website:"https://ahotorfm.com", favicon:"https://cdn-radiotime-logos.tunein.com/s270288g.png" },
  { id:"gh-sunny",   name:"Sunny FM",      city:"Accra",  country:"Ghana", freq:"88.7 FM",  tags:["gospel","christian","soul"],   streamUrl:"https://stream.zeno.fm/ehfk96mrfa0uv", website:"https://sunnyfmgh.com", favicon:"/logos/sunny.webp" },
  { id:"gh-opemsuo", name:"Opemsuo FM",    city:"Kumasi", country:"Ghana", freq:"96.3 FM",  tags:["twi","news","music"],          streamUrl:"https://opemsuofm-atunwadigital.streamguys1.com/opemsuofm", website:"https://opemsuofm.com", favicon:"/logos/opemsou.png" },
  { id:"gh-agoo",    name:"Agoo FM",       city:"Kumasi", country:"Ghana", freq:"96.9 FM",  tags:["twi","music","entertainment"], streamUrl:"https://agoofm-atunwadigital.streamguys1.com/agoofm", website:"https://agoofm.com", favicon:"https://cdn-profiles.tunein.com/s228220/images/logod.jpg?t=636911170360000000" },
  { id:"gh-gmr",     name:"Ghana Music Radio", city:"Accra", country:"Ghana", freq:"Online", tags:["music","afrobeats","highlife"], streamUrl:"https://streaming.radio.co/s92f890821/listen", website:"https://ghanamusicradio.com", favicon:"https://cdn.onlineradiobox.com/img/logo/2/7042.v2.png" },
  { id:"gh-sweet-melodies", name:"Sweet Melodies FM", city:"Accra", country:"Ghana", freq:"94.3 FM", tags:["music","gospel","english"], streamUrl:"http://41.190.68.250:8000/stream", website:"https://sweetmelodiesfm.com", favicon:"/logos/gh-sweet-melodies.jpg" },
];

export const AFRICA: Station[] = [
  { id:"ng-cool",    name:"Cool FM",       city:"Lagos",        country:"Nigeria",       freq:"96.9 FM",  tags:["pop","urban","english"],         streamUrl:"https://coolfmlagos969-atunwadigital.streamguys1.com/coolfmlagos969", website:"https://coolfm.ng", favicon:"/logos/cool.svg" },
  { id:"ng-beat",    name:"Beat FM",       city:"Lagos",        country:"Nigeria",       freq:"99.9 FM",  tags:["afrobeats","hiphop"],             streamUrl:"https://beatfmlagos-atunwadigital.streamguys1.com/beatfmlagos", website:"https://thebeat99.com", favicon:"https://cdn-profiles.tunein.com/s96062/images/logog.png" },
  { id:"ng-wazobia", name:"Wazobia FM",    city:"Lagos",        country:"Nigeria",       freq:"95.1 FM",  tags:["pidgin","talk","entertainment"],  streamUrl:"https://wazobiafmlagos951-atunwadigital.streamguys1.com/wazobiafmlagos951", website:"https://wazobiafm.com", favicon:"https://cdn-profiles.tunein.com/s151803/images/logog.png" },
  { id:"za-5fm",     name:"5FM",           city:"Johannesburg", country:"South Africa",  freq:"National", tags:["pop","youth","english"],          streamUrl:"https://playerservices.streamtheworld.com/api/livestream-redirect/5FM.mp3", website:"https://5fm.co.za", favicon:"https://cdn-profiles.tunein.com/s9907/images/logog.png" },
  { id:"za-metro",   name:"Metro FM",      city:"Johannesburg", country:"South Africa",  freq:"National", tags:["urban","rnb","afro"],             streamUrl:"https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM.mp3", website:"https://metrofm.co.za", favicon:"https://cdn-profiles.tunein.com/s9908/images/logog.png" },
  { id:"za-947",     name:"947 Jo'burg",   city:"Johannesburg", country:"South Africa",  freq:"94.7 FM",  tags:["pop","talk","english"],           streamUrl:"https://playerservices.streamtheworld.com/api/livestream-redirect/947.mp3", website:"https://947.co.za", favicon:"https://cdn-profiles.tunein.com/s25607/images/logog.png" },
  { id:"ke-classic", name:"Classic 105",   city:"Nairobi",      country:"Kenya",         freq:"105.2 FM", tags:["classic hits","pop"],             streamUrl:"https://atunwadigital.streamguys1.com/classic105", website:"https://classic105.com", favicon:"https://cdn-profiles.tunein.com/s24940/images/logog.png" },
  { id:"ke-maisha",  name:"Radio Maisha",  city:"Nairobi",      country:"Kenya",         freq:"89.9 FM",  tags:["swahili","afro","music"],         streamUrl:"https://atunwadigital.streamguys1.com/radiomaisha", website:"https://radiomaisha.co.ke", favicon:"https://cdn-profiles.tunein.com/s151804/images/logog.png" },
  { id:"rfi",        name:"RFI Afrique",   city:"Pan-Africa",   country:"International", freq:"Satellite",tags:["news","french"],                  streamUrl:"https://live02.rfi.fr/rfiafrique-64.mp3", website:"https://rfi.fr", favicon:"https://static.rfi.fr/meta_og_twcards/RFI_FB.png" },
  { id:"tz-clouds",  name:"Clouds FM",     city:"Dar es Salaam",country:"Tanzania",      freq:"88.5 FM",  tags:["swahili","music","news"],         streamUrl:"https://eu6.fastcast4u.com/proxy/clouds?mp=/1", website:"https://cloudsfm.co.tz", favicon:"https://cdn.onlineradiobox.com/img/logo/5/42505.v3.png" },
];

export const LOCAL = [...GHANA, ...AFRICA];
