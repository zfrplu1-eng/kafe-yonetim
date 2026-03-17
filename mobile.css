// Logo Placeholder Component
// Gerçek logolarınızı /public klasörüne "vargel-logo.png" ve "degirmen-logo.png" olarak eklemelisiniz

export function VargelLogoPlaceholder() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="vargelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Kafe fincanı */}
      <g transform="translate(200, 200)">
        <ellipse cx="0" cy="-60" rx="80" ry="20" fill="url(#vargelGrad)" opacity="0.3" />
        <path
          d="M -80,-60 L -60,40 Q -60,60 -40,70 L 40,70 Q 60,60 60,40 L 80,-60 Z"
          fill="url(#vargelGrad)"
        />
        <ellipse cx="0" cy="-60" rx="80" ry="20" fill="#06B6D4" />
        
        {/* Buhar */}
        <path d="M -40,-100 Q -45,-130 -40,-140" stroke="#06B6D4" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 0,-105 Q -5,-135 0,-145" stroke="#3B82F6" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 40,-100 Q 35,-130 40,-140" stroke="#06B6D4" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
      
      <text x="200" y="340" fontSize="32" fontWeight="bold" fill="url(#vargelGrad)" textAnchor="middle" fontFamily="Arial, sans-serif">
        VARGEL KAFE
      </text>
    </svg>
  );
}

export function DegirmenLogoPlaceholder() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="degirmenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#EA580C', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Değirmen */}
      <g transform="translate(200, 180)">
        {/* Değirmen gövdesi */}
        <path
          d="M -60,0 L -40,100 L 40,100 L 60,0 Z"
          fill="url(#degirmenGrad)"
        />
        
        {/* Çatı */}
        <path
          d="M -70,-5 L 0,-60 L 70,-5 Z"
          fill="#EA580C"
        />
        
        {/* Kanatlar merkezi */}
        <circle cx="0" cy="30" r="50" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.3" />
        
        {/* Kanatlar */}
        <g transform="rotate(0)">
          <rect x="-5" y="-50" width="10" height="50" fill="#EA580C" opacity="0.8" transform="translate(0, 30)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 30"
              to="360 0 30"
              dur="8s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="-50" y="-5" width="50" height="10" fill="#EA580C" opacity="0.8" transform="translate(0, 30)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 30"
              to="360 0 30"
              dur="8s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="5" y="-5" width="50" height="10" fill="#F59E0B" opacity="0.8" transform="translate(0, 30)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 30"
              to="360 0 30"
              dur="8s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="-5" y="5" width="10" height="50" fill="#F59E0B" opacity="0.8" transform="translate(0, 30)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 30"
              to="360 0 30"
              dur="8s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        
        {/* Merkez */}
        <circle cx="0" cy="30" r="12" fill="#EA580C" />
      </g>
      
      <text x="200" y="340" fontSize="32" fontWeight="bold" fill="url(#degirmenGrad)" textAnchor="middle" fontFamily="Arial, sans-serif">
        DEĞİRMEN KAFE
      </text>
    </svg>
  );
}
