/*

A video walkthrough of each SVGs source code: https://www.youtube.com/watch?v=kBT90nwUb_o

Follow me on twitter for more: https://twitter.com/HunorBorbely

*/

function Decoration({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <circle cx="0" cy="20" r="70" fill="#D1495B" />
      <circle
        cx="0"
        cy="-75"
        r="12"
        fill="none"
        stroke="#F79257"
        stroke-width="2"
      />
      <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
    </svg>
  );
}

detailScreens[0].svg = Decoration;

function Three({ size = 1 }) {
  return (
    <svg width={200 * size} height={400 * size} viewBox="-100 -200 200 400">
      <polygon points="0,0 80,120 -80,120" fill="#234236" />
      <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
      <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
      <rect x="-20" y="120" width="40" height="30" fill="brown" />
    </svg>
  );
}

detailScreens[1].svg = Three;

function Gingerbread({ size = 1 }) {
  return (
    <svg
      class="gingerbread"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <circle class="body" cx="0" cy="-50" r="30" />

      <circle class="eye" cx="-12" cy="-55" r="3" />
      <circle class="eye" cx="12" cy="-55" r="3" />
      <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />

      <line class="limb" x1="-40" y1="-10" x2="40" y2="-10" />
      <line class="limb" x1="-25" y1="50" x2="0" y2="-15" />
      <line class="limb" x1="25" y1="50" x2="0" y2="-15" />

      <circle class="button" cx="0" cy="-10" r="5" />
      <circle class="button" cx="0" cy="10" r="5" />
    </svg>
  );
}

detailScreens[2].svg = Gingerbread;

function House({ size = 1 }) {
  return (
    <svg
      class="house"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <polygon class="wall" points="-65,80 -65,-10 0,-70 65,-10 65,80" />
      <polyline class="roof" points="-75,-8 0,-78 75,-8" />

      <rect class="door" x="-45" y="10" width="30" height="60" />
      <circle class="door-knob" cx="-35" cy="40" r="2" />
      <rect class="stair" x="-47" y="70" width="34" height="5" />
      <rect class="stair" x="-49" y="75" width="38" height="5" />

      <rect class="window" x="5" y="15" width="40" height="35" />
      <line x1="5" y1="32.5" x2="45" y2="32.5" />
      <line x1="25" y1="15" x2="25" y2="50" />
      <rect class="window-sill" x="2" y="48" width="46" height="5" />

      <circle class="window" cx="0" cy="-25" r="15" />
      <line x1="-15" y1="-25" x2="15" y2="-25" />
      <line x1="0" y1="-40" x2="0" y2="-10" />
    </svg>
  );
}

detailScreens[3].svg = House;

function DecorationWithClip({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <clipPath id="ball">
        <circle cx="0" cy="20" r="70" />
      </clipPath>

      <circle cx="0" cy="20" r="70" fill="#D1495B" />

      <polyline
        clip-path="url(#ball)"
        points="-120 40 -80 0 -40 40 0 0 40 40 80 0 120 40"
        fill="none"
        stroke="#9C2D2A"
        stroke-width="20"
      />

      <circle
        cx="0"
        cy="-75"
        r="12"
        fill="none"
        stroke="#F79257"
        stroke-width="2"
      />
      <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
    </svg>
  );
}

detailScreens[4].svg = DecorationWithClip;

function Star({ size = 1 }) {
  return (
    <svg
      class="star"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <g transform="translate(0 5)">
        <g>
          <polygon points="0,0 36,-50 0,-100" fill="#EDD8B7" />
          <polygon points="0,0 -36,-50 0,-100" fill="#E5C39C" />
        </g>
        <g transform="rotate(72)">
          <polygon points="0,0 36,-50 0,-100" fill="#EDD8B7" />
          <polygon points="0,0 -36,-50 0,-100" fill="#E5C39C" />
        </g>
        <g transform="rotate(-72)">
          <polygon points="0,0 36,-50 0,-100" fill="#EDD8B7" />
          <polygon points="0,0 -36,-50 0,-100" fill="#E5C39C" />
        </g>
        <g transform="rotate(144)">
          <polygon points="0,0 36,-50 0,-100" fill="#EDD8B7" />
          <polygon points="0,0 -36,-50 0,-100" fill="#E5C39C" />
        </g>
        <g transform="rotate(-144)">
          <polygon points="0,0 36,-50 0,-100" fill="#EDD8B7" />
          <polygon points="0,0 -36,-50 0,-100" fill="#E5C39C" />
        </g>
      </g>
    </svg>
  );
}

detailScreens[5].svg = Star;

function Snowflake({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <path
          id="branch"
          d="
          M 0 0 L 0 -90
          M 0 -20 L 20 -34
          M 0 -20 L -20 -34
          M 0 -40 L 20 -54
          M 0 -40 L -20 -54
          M 0 -60 L 20 -74
          M 0 -60 L -20 -74"
          stroke="#E5C39C"
          stroke-width="5"
        />
      </defs>

      <use href="#branch" />
      <use href="#branch" transform="rotate(60)" />
      <use href="#branch" transform="rotate(120)" />
      <use href="#branch" transform="rotate(180)" />
      <use href="#branch" transform="rotate(240)" />
      <use href="#branch" transform="rotate(300)" />
    </svg>
  );
}

detailScreens[6].svg = Snowflake;

function Forest({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <g id="tree">
          <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="#778074"
            stroke-width="2"
          />
        </g>
      </defs>

      <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
      <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

      <use href="#tree" x="-30" y="25" transform="scale(2)" />
      <use href="#tree" x="-20" y="40" transform="scale(1.2)" />
      <use href="#tree" x="40" y="40" />
      <use href="#tree" x="50" y="30" transform="scale(1.5)" />
    </svg>
  );
}

detailScreens[7].svg = Forest;

function DecorationWithGradient({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <radialGradient id="shine" cx="0.25" cy="0.25" r="0.35">
          <stop offset="0%" stop-color="#e3a8b0" />
          <stop offset="100%" stop-color="#D1495B" />
        </radialGradient>
      </defs>

      <circle cx="0" cy="20" r="70" fill="url(#shine)" />
      <circle
        cx="0"
        cy="-75"
        r="12"
        fill="none"
        stroke="#F79257"
        stroke-width="2"
      />
      <rect x="-17.5" y="-65" width="35" height="20" fill="#F79257" />
    </svg>
  );
}

detailScreens[8].svg = DecorationWithGradient;

function Snowman({ size = 1 }) {
  return (
    <svg width={200 * size} height={400 * size} viewBox="-100 -200 200 400">
      <defs>
        <radialGradient id="snowball" cx="0.25" cy="0.25" r="1">
          <stop offset="0%" stop-color="white" />
          <stop offset="50%" stop-color="white" />
          <stop offset="100%" stop-color="#d6d6d6" />
        </radialGradient>
      </defs>

      <circle id="bigball" cx="0" cy="60" r="80" fill="url(#snowball)" />
      <circle cx="0" cy="-40" r="50" fill="url(#snowball)" />
      <polygon points="10,-46 50,-40 10,-34" fill="#e66465" />

      <circle cx="0" cy="-55" r="5" />
      <circle cx="20" cy="-55" r="5" />

      <line
        x1="-40"
        y1="30"
        x2="-90"
        y2="-30"
        stroke="black"
        stroke-width="5"
      />
      <line x1="-65" y1="0" x2="-90" y2="-10" stroke="black" stroke-width="5" />
    </svg>
  );
}

detailScreens[9].svg = Snowman;

function ThreeWithCurves({ size = 1 }) {
  return (
    <svg width={200 * size} height={400 * size} viewBox="-100 -200 200 400">
      <path
        d="
        M 0 -80
        Q 5 -75 0 -70
        Q -10 -65 0 -60
        Q 15 -55 0 -50
        Q -20 -45 0 -40
        Q 25 -35 0 -30
        Q -30 -25 0 -20
        Q 35 -15 0 -10
        Q -40 -5 0 0
        Q 45 5 0 10
        Q -50 15 0 20
        Q 55 25 0 30
        Q -60 35 0 40
        Q 65 45 0 50
        Q -70 55 0 60
        Q 75 65 0 70
        Q -80 75 0 80
        Q 85 85 0 90
        Q -90 95 0 100
        Q 95 105 0 110
        Q -100 115 0 120
        L 0 140
        L 20 140
        L -20 140"
        fill="none"
        stroke="#0C5C4C"
        stroke-width="5"
      />
    </svg>
  );
}

detailScreens[10].svg = ThreeWithCurves;

function Gift({ size = 1 }) {
  return (
    <svg
      class="gift"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <path
        class="ribbon"
        d="
          M 0 -50
          L 30 -50
          C 50 -50 50 -70 30 -65
          L 0 -50
          "
      />

      <path
        class="ribbon"
        d="
          M 0 -50
          L -30 -50
          C -50 -50 -50 -70 -30 -65
          L 0 -50
          "
      />

      <circle cx="0" cy="-50" r="10" fill="#a9172a" />

      <rect class="box" x="-60" y="-40" width="120" height="100" />
      <rect class="box" x="-70" y="-47" width="140" height="20" />
      <rect class="stripe" x="-20" y="-40" width="40" height="100" />
      <rect class="stripe" x="-25" y="-47" width="50" height="20" />
    </svg>
  );
}

detailScreens[11].svg = Gift;

function Bell({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <g stroke="black" stroke-width="2">
        <circle cx="0" cy="-45" r="7" fill="#4F6D7A" />
        <circle cx="0" cy="50" r="10" fill="#F79257" />
        <path
          d="
            M -50 40
            L -50 50
            L 50 50
            L 50 40
            Q 40 40 40 10
            C 40 -60 -40 -60 -40 10
            Q -40 40 -50 40"
          fill="#FDEA96"
        />
      </g>
    </svg>
  );
}

detailScreens[12].svg = Bell;

function Candy({ size = 1 }) {
  return (
    <svg
      class="candy"
      width={200 * size}
      height={400 * size}
      viewBox="-100 -200 200 400"
    >
      <path
        d="
          M 50 120
          L 50 -80
          A 50 50 0 0 0 -50 -80"
        stroke="#cd803d"
        stroke-width="45"
        class="body"
      />

      <path
        d="
          M 50 120
          L 50 -80
          A 50 50 0 0 0 -50 -80"
        stroke="white"
        stroke-width="40"
        class="body"
      />

      <line class="green-mark" x1="-35" y1="-90" x2="-60" y2="-100" />
      <line class="red-mark" x1="-15" y1="-115" x2="-25" y2="-135" />
      <line class="green-mark" x1="20" y1="-110" x2="35" y2="-130" />
      <line class="red-mark" x1="40" y1="-60" x2="60" y2="-80" />
      <line class="green-mark" x1="40" y1="-10" x2="60" y2="-30" />
      <line class="red-mark" x1="40" y1="40" x2="60" y2="20" />
      <line class="green-mark" x1="40" y1="90" x2="60" y2="70" />
    </svg>
  );
}

detailScreens[13].svg = Candy;

function Ribbon({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <path
          id="ribbon"
          d="
            M 0 -20
            Q 28 -40 56 -45
            C 96 -48 96 48 56 45
            Q 28 40 0 20
          "
          fill="#B73A3B"
        />
      </defs>

      <use href="#ribbon" />
      <use href="#ribbon" transform="scale(-1)" />

      <ellipse cx="0" cy="0" rx="20" ry="24" fill="#9C2D2A" />

      <path
        d="
        M 0 20
        Q 40 40 30 60
        Q 20 80 40 90

        M 0 20
        Q -30 30 -20 60
        Q -10 90 -50 100"
        fill="none"
        stroke="#B73A3B"
        stroke-width="3"
      />
    </svg>
  );
}

detailScreens[14].svg = Ribbon;

function Bear({ size = 1 }) {
  return (
    <svg
      class="bear"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <circle cx="-40" cy="-50" r="20" fill="white" />
      <circle cx="40" cy="-50" r="20" fill="white" />
      <circle cx="-40" cy="-50" r="15" fill="#E5C39C" />
      <circle cx="40" cy="-50" r="15" fill="#E5C39C" />

      <rect class="face" x="-55" y="-60" width="110" height="120" />

      <circle cx="20" cy="-30" r="3" />
      <circle cx="-20" cy="-30" r="3" />

      <path
        d="
          M -30 0
          C -30 -25 30 -25 30 0
          L 30 30
          Q 30 40 20 40
          L -20 40
          Q -30 40 -30 30"
        fill="#E5C39C"
      />

      <path
        d="
          M -10 0
          L 10 0
          C 10 20 -10 20 -10 0"
      />
      <path
        class="mouth"
        d="
          M 0 10
          Q 0 25 10 25

          M 0 10
          Q 0 25 -10 25"
      />
    </svg>
  );
}

detailScreens[15].svg = Bear;

function Text({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <path id="text-arc" d="M 0, 50 A 50 50 0 1 1 1,50" />
      </defs>

      <text
        fill="#0c5c4c"
        font-family="Tahoma"
        font-size="0.77em"
        font-weight="bold"
      >
        <textPath href="#text-arc">
          Happy Holidays! Happy Holidays! Happy Holidays!
        </textPath>
      </text>
    </svg>
  );
}

detailScreens[16].svg = Text;

function Sleigh({ size = 1 }) {
  return (
    <svg
      width={400 * size}
      height={200 * size}
      viewBox="-200 -100 400 200"
      fill="none"
    >
      <path
        stroke="#E0CEB9"
        stroke-width="4"
        d="M-200 80 L -80 80 Q 80 80 70 -10 A 70 70 0 0 0 -70 -10 Q -80 80 80 80 L 200 80"
      />

      <g class="sleigh">
        <path
          d="
          M -30 -2 L 30 -2 A 10 10 0 0 0 30 -22
          M -20 -2 L -20 -17
          M 20 -2 L 20 -17"
          stroke="#AF6455"
          stroke-width="5"
        />
        <path d="M -27 -17 L 27 -17" stroke="#7A504F" stroke-width="6" />
      </g>
    </svg>
  );
}

detailScreens[17].svg = Sleigh;

function RingingBell({ size = 1 }) {
  return (
    <svg
      class="bell"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <g stroke="#001514" stroke-width="2">
        <circle cx="0" cy="-45" r="7" fill="#4F6D7A" />
        <circle class="bell-tongue" cx="0" cy="50" r="10" fill="#F79257" />
        <path
          d="
            M -50 40
            L -50 50
            L 50 50
            L 50 40
            Q 40 40 40 10
            C 40 -60 -40 -60 -40 10
            Q -40 40 -50 40"
          fill="#FDEA96"
        />
      </g>
    </svg>
  );
}

detailScreens[18].svg = RingingBell;

function Snowing({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <defs>
        <g id="tree">
          <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="#778074"
            stroke-width="2"
          />
        </g>

        <circle id="big-flake" cx="0" cy="0" r="5" fill="white" />
        <circle id="small-flake" cx="0" cy="0" r="3" fill="white" />
      </defs>

      <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
      <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

      <use href="#tree" x="-30" y="25" transform="scale(2)" />
      <use href="#tree" x="-20" y="40" transform="scale(1.2)" />
      <use href="#tree" x="40" y="40" />
      <use href="#tree" x="50" y="30" transform="scale(1.5)" />

      <use href="#big-flake" x="0" y="0" class="flake fast" />
      <use href="#big-flake" x="-50" y="-20" class="flake fast small" />
      <use href="#big-flake" x="30" y="-40" class="flake fast" />
      <use href="#big-flake" x="50" y="-20" class="flake fast small" />
      <use href="#big-flake" x="30" y="50" class="flake slow" />
      <use href="#big-flake" x="-70" y="-80" class="flake slow small" />
      <use href="#big-flake" x="30" y="50" class="flake slow" />
      <use href="#big-flake" x="90" y="-80" class="flake slow small" />
      <use href="#small-flake" x="10" y="-50" class="flake slow" />
      <use href="#small-flake" x="-50" y="-60" class="flake slow small" />
      <use href="#small-flake" x="30" y="70" class="flake slow" />
      <use href="#small-flake" x="10" y="-80" class="flake slow small" />
    </svg>
  );
}

detailScreens[19].svg = Snowing;

function Background({ size = 1 }) {
  return (
    <div class="background" style={{ width: 200 * size, height: 200 * size }} />
  );
}

detailScreens[20].svg = Background;

function Clock({ size = 1 }) {
  const hour = new Date().getHours() % 12;
  const minute = new Date().getMinutes();
  let [hourRotation, setHourRotation] = React.useState((360 / 12) * hour);
  let [minuteRotation, setMinuteRotation] = React.useState((360 / 60) * minute);

  setTimeout(() => {
    const hour = new Date().getHours() % 12;
    const minute = new Date().getMinutes();
    setHourRotation((360 / 12) * hour);
    setMinuteRotation((360 / 60) * minute);
  }, 1000);

  return (
    <svg
      class="clock"
      width={200 * size}
      height={200 * size}
      viewBox="-100 -100 200 200"
    >
      <rect x="-100" y="-100" width="200" height="200" fill="#CD803D" />

      <circle r="55" stroke="#FCCE7B" stroke-width="10" fill="white" />
      <circle
        r="45"
        stroke="#B6705F"
        stroke-width="6"
        stroke-dasharray="6 17.56194490192345"
        stroke-dashoffset="3"
        fill="none"
      />
      <g stroke="#5f4c6c" stroke-linecap="round">
        <line
          id="hours"
          y2="-20"
          stroke-width="8"
          transform={`rotate(${hourRotation})`}
        />
        <line
          id="minutes"
          y2="-35"
          stroke-width="6"
          transform={`rotate(${minuteRotation})`}
        />
      </g>
    </svg>
  );
}

detailScreens[21].svg = Clock;

function Lights({ size = 1 }) {
  const [lightsOn, setLights] = React.useState(false);

  const switchLights = () => setLights(!lightsOn);

  return (
    <svg
      class="lights"
      width={400 * size}
      height={200 * size}
      viewBox="-200 -100 400 200"
    >
      <defs>
        <g id="bulb">
          <path d="M 0,0 Q 20 25 0 40 Q -20 25 0 0" />
          <rect x="-6" y="-1" width="12" height="10" rx="3" fill="#5F4C6C" />
        </g>
      </defs>

      <path d="M -140 -60 Q -70 -50 0 -60 Q 110 -70 110 10" />
      <line x1="-70" y1="-15" x2="-70" y2="-55" />
      <line x1="30" y1="-25" x2="30" y2="-60" />
      <use
        class="b"
        href="#bulb"
        x="-120"
        y="-45"
        transform="rotate(5)"
        fill={lightsOn ? "#FFC05B" : "white"}
      />
      <use
        class="b"
        href="#bulb"
        x="-70"
        y="-15"
        fill={lightsOn ? "#F86285" : "white"}
      />
      <use
        class="b"
        href="#bulb"
        x="-20"
        y="-57"
        transform="rotate(-5)"
        fill={lightsOn ? "#03A8A8" : "white"}
      />
      <use
        class="b"
        href="#bulb"
        x="30"
        y="-25"
        fill={lightsOn ? "#748CEF" : "white"}
      />

      <rect x="90" y="10" width="40" height="40" fill="lightgray" />
      <circle
        id="button"
        cx="110"
        cy="30"
        r="15"
        fill="red"
        onClick={switchLights}
      />
    </svg>
  );
}

detailScreens[22].svg = Lights;

function Diagram({ size = 1 }) {
  const dataPoints = [3, 4, 7, 5, 3, 6];
  const sineWave = Array.from({ length: 115 })
    .map((item, index) => `${index - 55},${Math.sin(index / 20) * 20 + 10}`)
    .join(" ");

  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      {dataPoints.map((dataPoint, index) => (
        <rect
          key={index}
          x={index * 20 - 55}
          y={50 - dataPoint * 10}
          width="15"
          height={dataPoint * 10}
          fill="#CD803D"
        />
      ))}
      <polyline points={sineWave} fill="none" stroke="black" stroke-width="5" />
    </svg>
  );
}

detailScreens[23].svg = Diagram;

function Threes() {
  return (
    <g>
      <defs>
        <g id="tree">
          <polygon points="-10,0 10,0 0 -50" fill="#38755b" />
          <line x2="0" y2="10" stroke="#778074" stroke-width="2" />
        </g>
      </defs>

      <use href="#tree" x="-20" y="25" transform="scale(1.8)" />
      <use href="#tree" x="-10" y="40" transform="scale(1)" />
      <use href="#tree" x="30" y="40" transform="scale(0.8)" />
      <use href="#tree" x="40" y="30" transform="scale(1.2)" />
    </g>
  );
}

function Snow() {
  return (
    <g class="snowing">
      <defs>
        <circle id="big-flake" cx="0" cy="0" r="5" fill="white" />
        <circle id="small-flake" cx="0" cy="0" r="3" fill="white" />
      </defs>

      <use href="#big-flake" x="0" y="0" class="flake fast" />
      <use href="#big-flake" x="-50" y="-20" class="flake fast small" />
      <use href="#big-flake" x="30" y="-40" class="flake fast" />
      <use href="#big-flake" x="50" y="-20" class="flake fast small" />
      <use href="#big-flake" x="30" y="50" class="flake slow" />
      <use href="#big-flake" x="-70" y="-80" class="flake slow small" />
      <use href="#big-flake" x="30" y="50" class="flake slow" />
      <use href="#big-flake" x="90" y="-80" class="flake slow small" />
      <use href="#small-flake" x="10" y="-50" class="flake slow" />
      <use href="#small-flake" x="-50" y="-60" class="flake slow small" />
      <use href="#small-flake" x="30" y="70" class="flake slow" />
      <use href="#small-flake" x="10" y="-80" class="flake slow small" />
    </g>
  );
}

function SnowGlobe({ size = 1 }) {
  return (
    <svg width={200 * size} height={200 * size} viewBox="-100 -100 200 200">
      <clipPath id="snow-globe">
        <circle cx="0" cy="0" r="80" />
      </clipPath>

      <g clip-path="url(#snow-globe)">
        <rect x="-100" y="-100" width="200" height="200" fill="#F1DBC3" />
        <circle cx="0" cy="380" r="350" fill="#F8F4E8" />

        <Threes />
        <Snow />
      </g>

      <circle cx="0" cy="0" r="80" fill="none" stroke="gray" stroke-width="2" />
    </svg>
  );
}

detailScreens[24].svg = SnowGlobe;

function Day({ index, Component, select }) {
  const onMouseEnter = (event) => (event.currentTarget.style["z-index"] = 10);
  const onMouseLeave = (event) => {
    const target = event.currentTarget;
    // Add a delay to leave enough time for the door to close
    setTimeout(() => {
      target.style["z-index"] = 1;
    }, 1000);
  };

  return (
    <div
      class="day"
      onClick={() => select(index)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div class="cover">{index + 1}</div>
      <Component size="0.6" />
    </div>
  );
}

function App() {
  const [selection, setSelection] = React.useState(undefined);
  const DetailSVG = selection != undefined && detailScreens[selection].svg;

  return (
    <div className="App">
      <div className="grid">
        <header>
          <h1>Learn to code SVG</h1>
          <p>Click a tile to reveal an image and its source code</p>
        </header>
        <div className="block">
          <Day index={0} Component={Decoration} select={setSelection} />
          <Day index={1} Component={Three} select={setSelection} />
          <Day index={2} Component={Gingerbread} select={setSelection} />
          <Day index={3} Component={House} select={setSelection} />
          <Day index={4} Component={DecorationWithClip} select={setSelection} />
        </div>
        <div className="block">
          <Day index={5} Component={Star} select={setSelection} />
          <Day index={6} Component={Snowflake} select={setSelection} />
          <Day index={7} Component={Forest} select={setSelection} />
          <Day
            index={8}
            Component={DecorationWithGradient}
            select={setSelection}
          />
          <Day index={9} Component={Snowman} select={setSelection} />
        </div>

        <div className="block">
          <Day index={10} Component={ThreeWithCurves} select={setSelection} />
          <Day index={11} Component={Gift} select={setSelection} />
          <Day index={12} Component={Bell} select={setSelection} />
          <Day index={13} Component={Candy} select={setSelection} />
        </div>

        <div className="big-block">
          <Day index={14} Component={Ribbon} select={setSelection} />

          <div class="day twitter">
            Follow me
            <a href="https://twitter.com/HunorBorbely" target="_top">
              @HunorBorbely
            </a>
          </div>

          <Day index={15} Component={Bear} select={setSelection} />
          <Day index={16} Component={Text} select={setSelection} />
          <Day index={17} Component={Sleigh} select={setSelection} />
          <Day index={18} Component={RingingBell} select={setSelection} />
          <Day index={19} Component={Snowing} select={setSelection} />
          <Day index={20} Component={Background} select={setSelection} />
        </div>

        <div className="small-block">
          <Day index={21} Component={Clock} select={setSelection} />
          <Day index={22} Component={Lights} select={setSelection} />
          <Day index={23} Component={Diagram} select={setSelection} />
          <Day index={24} Component={SnowGlobe} select={setSelection} />
        </div>
      </div>
      {selection != undefined && (
        <div className="detail-screen">
          <div className="close" onClick={() => setSelection(undefined)} />
          <div class="content">
            <DetailSVG size="1" />
          </div>

          <div class="details">
            <h1>{detailScreens[selection].title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: detailScreens[selection].description
              }}
            />
            {detailScreens[selection].sourceCodes.map(({ type, content }) => (
              <div class="code-section" key={type}>
                <h2>{type}</h2>

                <pre class="source-code">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(type, content).value
                    }}
                  ></code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
