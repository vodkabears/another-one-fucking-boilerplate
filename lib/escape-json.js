const RE_CHARS = /\\"|['&<>/]/g;
const ENTITIES = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '\'': '&quot;',
  '\\"': '&quot;',
  '\/': '&#x2F;'
};

export default function escapeJSON(json) {
  return json.replace(RE_CHARS, char => ENTITIES[char]);
}
