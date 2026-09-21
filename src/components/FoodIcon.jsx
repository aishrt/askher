// Hand-drawn SVG icons for dishes that have no proper emoji.

const Dosa = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="32" cy="46" rx="30" ry="11" fill="#dfe6ec" />
    <ellipse cx="32" cy="44.5" rx="26" ry="8.5" fill="#fff" />
    {/* sambar + chutney bowls */}
    <ellipse cx="17" cy="49" rx="7" ry="4" fill="#b7c2cc" />
    <ellipse cx="17" cy="48" rx="5.6" ry="2.8" fill="#e8742c" />
    <ellipse cx="33" cy="51" rx="7" ry="4" fill="#b7c2cc" />
    <ellipse cx="33" cy="50" rx="5.6" ry="2.8" fill="#f1efd9" />
    <circle cx="31" cy="49.6" r=".8" fill="#5fa04e" />
    <circle cx="34.5" cy="50.3" r=".8" fill="#5fa04e" />
    {/* the crispy dosa roll */}
    <path d="M6 39 L49 17 Q57 14 58.5 20 Q60 26 53 29 L11 44.5 Q4 45 6 39Z" fill="#e8a33a" />
    <path d="M49 17 Q57 14 58.5 20 Q60 26 53 29 Q48 24 49 17Z" fill="#c07a22" />
    <path d="M9 40.5 L50 21" stroke="#f6cd7a" strokeWidth="2" strokeLinecap="round" />
    <path d="M17 37.5l3 4M25 33.5l3 4M33 29.5l3 4M41 25.5l3 4" stroke="#b36a1a" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const Chaap = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <g transform="rotate(-40 32 32)">
      <rect x="2" y="30.5" width="60" height="3" rx="1.5" fill="#b98b5b" />
      {[8, 23, 38].map((x) => (
        <g key={x}>
          <rect x={x} y="23" width="13" height="18" rx="5" fill="#d9893f" />
          <rect x={x + 1.5} y="24.5" width="10" height="5" rx="2.5" fill="#efb06a" />
          <path d={`M${x + 3} 33l3 5M${x + 7} 32l3 5`} stroke="#8a4b1c" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
      <rect x="21.2" y="26" width="2.6" height="12" rx="1.2" fill="#e58fb1" />
      <rect x="36.2" y="26" width="2.6" height="12" rx="1.2" fill="#6ab04c" />
      <rect x="51.2" y="26" width="2.6" height="12" rx="1.2" fill="#e58fb1" />
    </g>
    {/* lemon wedge */}
    <path d="M44 56 a9 9 0 0 1 16 -6 z" fill="#f7d54a" />
    <path d="M46.5 54.5 a6 6 0 0 1 10.5 -4" stroke="#fff6b0" strokeWidth="1.4" fill="none" />
  </svg>
)

const Pakoda = ({ cx, cy, r }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#d4862a" />
    <circle cx={cx - r * 0.7} cy={cy - r * 0.45} r={r * 0.42} fill="#d4862a" />
    <circle cx={cx + r * 0.75} cy={cy - r * 0.2} r={r * 0.4} fill="#d4862a" />
    <circle cx={cx + r * 0.1} cy={cy + r * 0.75} r={r * 0.38} fill="#d4862a" />
    <circle cx={cx - r * 0.25} cy={cy - r * 0.35} r={r * 0.35} fill="#eaa94c" />
    <circle cx={cx + r * 0.35} cy={cy + r * 0.2} r={r * 0.14} fill="#9c5416" />
    <circle cx={cx - r * 0.4} cy={cy + r * 0.3} r={r * 0.12} fill="#9c5416" />
    <circle cx={cx + r * 0.2} cy={cy - r * 0.55} r={r * 0.1} fill="#4f9a3b" />
  </g>
)

const Pakode = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    {/* banana-leaf plate */}
    <path d="M3 50 Q32 34 61 50 Q32 62 3 50Z" fill="#6aa84f" />
    <path d="M6 50 Q32 44 58 50" stroke="#9bd07a" strokeWidth="1.4" fill="none" />
    <Pakoda cx={21} cy={42} r={9} />
    <Pakoda cx={41} cy={42} r={9.5} />
    <Pakoda cx={31} cy={29} r={9} />
    {/* green chilli */}
    <path d="M46 55 Q55 54 59 45" stroke="#2f8a2c" strokeWidth="3.4" strokeLinecap="round" fill="none" />
    <path d="M59 45 l2 -3" stroke="#6b4a1f" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const CholeBhature = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    {/* puffed bhatura */}
    <circle cx="24" cy="25" r="19" fill="#eab957" />
    <circle cx="24" cy="25" r="16.5" fill="#f4cd72" />
    <ellipse cx="18" cy="18" rx="8" ry="5" fill="#fbe5a8" />
    <circle cx="30" cy="30" r="1.5" fill="#c98a2c" />
    <circle cx="16" cy="31" r="1.2" fill="#c98a2c" />
    <circle cx="32" cy="19" r="1" fill="#c98a2c" />
    {/* bowl of chole */}
    <path d="M28 41 h32 a16 14 0 0 1 -32 0z" fill="#aab4bd" />
    <path d="M30 44 h28" stroke="#cfd6dc" strokeWidth="1.5" />
    <ellipse cx="44" cy="41" rx="16" ry="5" fill="#9a4b1a" />
    {[
      [37, 40], [41, 42.5], [45, 39.5], [49, 42], [53, 40], [43, 41],
    ].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="1.7" fill="#e6b86a" />
    ))}
    <ellipse cx="50" cy="39.5" rx="3" ry="1.4" fill="none" stroke="#f5d6e6" strokeWidth="1" />
    <circle cx="39" cy="38.8" r=".9" fill="#3f9b3a" />
    <circle cx="47" cy="43" r=".9" fill="#3f9b3a" />
  </svg>
)

const Thali = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#b9c3cc" />
    <circle cx="32" cy="32" r="26.5" fill="#e4e9ed" />
    {/* katoris */}
    {[
      [17, 21, '#f2b632'],
      [30.5, 13.5, '#d9542c'],
      [44.5, 17, '#5f9e3f'],
      [51, 30.5, '#fff4e2'],
    ].map(([x, y, c]) => (
      <g key={c}>
        <circle cx={x} cy={y} r="7.4" fill="#a3aeb8" />
        <circle cx={x} cy={y} r="5.8" fill={c} />
      </g>
    ))}
    {/* rice */}
    <ellipse cx="21" cy="42" rx="10" ry="7.5" fill="#fbfbf5" stroke="#dcdcd2" strokeWidth="1" />
    {/* roti */}
    <circle cx="42" cy="45" r="10.5" fill="#e3ad5b" />
    <circle cx="42" cy="45" r="8.8" fill="#eec27a" />
    <circle cx="39" cy="42" r="1.3" fill="#b9782d" />
    <circle cx="45" cy="48" r="1.1" fill="#b9782d" />
    {/* gulab jamun */}
    <circle cx="31" cy="30" r="3.8" fill="#7a2d12" />
    <circle cx="30" cy="29" r="1.1" fill="#b75a2e" />
  </svg>
)

const ICONS = { dosa: Dosa, chaap: Chaap, pakode: Pakode, 'chole-bhature': CholeBhature, thali: Thali }

/** Shows the drawn icon if we have one, otherwise the emoji. Sized with font-size (1em). */
export default function FoodIcon({ food }) {
  const Icon = ICONS[food.id]
  return Icon ? (
    <span className="food-svg">
      <Icon />
    </span>
  ) : (
    <span>{food.emoji}</span>
  )
}
