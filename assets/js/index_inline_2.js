function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

const INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1442127404607737999&permissions=8&integration_type=0&scope=bot+applications.commands';
const ACCENTS = {
  violet: {
    name: 'violet',
    oklch: '0.72 0.17 280',
    label: 'Violet'
  },
  lime: {
    name: 'lime',
    oklch: '0.88 0.19 120',
    label: 'Lime'
  },
  coral: {
    name: 'coral',
    oklch: '0.75 0.17 28',
    label: 'Coral'
  },
  dark_blue: { name: 'dark_blue', oklch: '0.55 0.2 260', label: 'Dark Blue' }, cyan: {
    name: 'cyan',
    oklch: '0.82 0.13 210',
    label: 'Cyan'
  },
  amber: {
    name: 'amber',
    oklch: '0.82 0.16 75',
    label: 'Amber'
  },
  blush: {
    name: 'blush',
    oklch: '0.80 0.12 350',
    label: 'Blush'
  }
};

const COMMANDS = [

{
  cmd: "/afk",
  args: "[reason]",
  desc: "Set your AFK status. Others are notified when they ping you. Auto-removed when you send a message.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/appeal",
  args: "",
  desc: "Submit a ban appeal to a server.",
  cat: "tickets",
  popular: false,
  prefix: false
}, {
  cmd: "/ask",
  args: "<question>",
  desc: "Ask Gemini AI a question. Remembers conversation history per user per server.",
  cat: "ai",
  popular: true,
  prefix: false
}, {
  cmd: "/avatar",
  args: "[@user]",
  desc: "Show your own or another user's avatar.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/banner",
  args: "[@user]",
  desc: "Show your own or another user's banner.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/clear_memory",
  args: "",
  desc: "Clear Gemini AI's conversation history for you in this server.",
  cat: "ai",
  popular: false,
  prefix: false
}, {
  cmd: "/decide",
  args: "<options>",
  desc: "Let the AI pick between your options.",
  cat: "ai",
  popular: false,
  prefix: false
}, {
  cmd: "/define",
  args: "<word>",
  desc: "Look up the definition of an English word.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/features",
  args: "",
  desc: "Show a paginated list of all bot features and background systems.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/generate_rules",
  args: "",
  desc: "Use AI to generate a custom rules embed for this server.",
  cat: "ai",
  popular: false,
  prefix: false
}, {
  cmd: "/help",
  args: "",
  desc: "Show a paginated overview of all bot commands.",
  cat: "utility",
  popular: true,
  prefix: false
}, {
  cmd: "/imagine",
  args: "<prompt> [model]",
  desc: "Generate an image using AI (Flux, Flux Realism models).",
  cat: "ai",
  popular: true,
  prefix: false
}, {
  cmd: "/invites",
  args: "[@user]",
  desc: "Check invite stats for yourself or another user. Shows invite leaderboard.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/modhelp",
  args: "",
  desc: "Show a paginated moderator help guide (5 pages).",
  cat: "mod",
  popular: false,
  prefix: false
}, {
  cmd: "/nuke",
  args: "[amount]",
  desc: "Bulk delete messages from the current channel (up to 100 at a time).",
  cat: "mod",
  popular: true,
  prefix: false
}, {
  cmd: "/plugins",
  args: "",
  desc: "Enable or disable optional bot features per server (e.g. Audit Log).",
  cat: "setup",
  popular: false,
  prefix: false
}, {
  cmd: "/pong",
  args: "",
  desc: "Check if the bot is alive. Replies with /ping.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/redo_server_setup",
  args: "",
  desc: "Delete everything server_setup created and optionally redo it.",
  cat: "setup",
  popular: false,
  prefix: false
}, {
  cmd: "/remind",
  args: "<time> <message>",
  desc: "Set a reminder. The bot will DM you when the time is up. Supports: 10m, 2h, 1d, etc.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/server_setup",
  args: "",
  desc: "Run the initial server setup (creates roles, channels, categories).",
  cat: "setup",
  popular: true,
  prefix: false
}, {
  cmd: "/serverinfo",
  args: "",
  desc: "Show information about this server.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/stats",
  args: "",
  desc: "Show bot stats: server count, ping, uptime, memory, Node.js version.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/summarize",
  args: "",
  desc: "Summarize the last few messages in the channel using AI.",
  cat: "ai",
  popular: true,
  prefix: false
}, {
  cmd: "/test",
  args: "",
  desc: "Test if the bot is working.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/todo",
  args: "[add|remove|list] [item]",
  desc: "Manage your personal to-do list.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/translate",
  args: "<text> [language]",
  desc: "Translate text to another language using AI.",
  cat: "ai",
  popular: false,
  prefix: false
}, {
  cmd: "/userinfo",
  args: "[@user]",
  desc: "Show information about a user (joined, roles, ID, etc.).",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/vc",
  args: "<action>",
  desc: "Manage your dynamic voice channel. Actions: rename, lock, unlock, limit, kick, transfer, delete.",
  cat: "utility",
  popular: false,
  prefix: false
}, {
  cmd: "/wipe_server",
  args: "",
  desc: "⚠️ DANGER: Delete ALL channels and roles. Server owner only. Requires multiple confirmations.",
  cat: "mod",
  popular: false,
  prefix: false
},

{
  cmd: "/coinflip",
  args: "",
  desc: "Flip a coin. Returns heads or tails.",
  cat: "fun",
  popular: false,
  prefix: false
}, {
  cmd: "/hug",
  args: "[@user]",
  desc: "Send a hug to someone with a GIF.",
  cat: "fun",
  popular: false,
  prefix: false
}, {
  cmd: "/random",
  args: "[min] [max]",
  desc: "Generate a random number between two values.",
  cat: "fun",
  popular: false,
  prefix: false
}, {
  cmd: "/roast",
  args: "[@user]",
  desc: "Roast someone with an AI-generated roast.",
  cat: "fun",
  popular: true,
  prefix: false
}, {
  cmd: "/topic",
  args: "",
  desc: "Get a random conversation topic.",
  cat: "fun",
  popular: false,
  prefix: false
},

{
  cmd: ",kick",
  args: "@user [reason]",
  desc: "Kick a user from the server. Requires: Kick Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",ban",
  args: "@user [reason]",
  desc: "Ban a user from the server. Requires: Ban Members",
  cat: "mod",
  popular: true,
  prefix: true
}, {
  cmd: ",softban",
  args: "@user [reason]",
  desc: "Ban then immediately unban a user (removes their recent messages). Requires: Ban Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",damage",
  args: "@user <time>",
  desc: "Timeout (mute) a user for a duration. Examples: 10m, 2h, 1d. Requires: Timeout Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",heal",
  args: "@user",
  desc: "Remove a timeout from a user. Requires: Timeout Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",unraid",
  args: "",
  desc: "Lift a raid lockdown on the server. Requires: Administrator",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",warn",
  args: "@user [reason]",
  desc: "Warn a user. Logged to their warning history. Requires: Timeout Members",
  cat: "mod",
  popular: true,
  prefix: true
}, {
  cmd: ",warn remove",
  args: "@user [count]",
  desc: "Remove a number of warnings from a user. Requires: Timeout Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",warnings",
  args: "[@user]",
  desc: "View the warning count and history for a user.",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",clearwarns",
  args: "@user",
  desc: "Clear all warnings for a user. Requires: Timeout Members",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",warnthreshold add",
  args: "<count> <action> [minutes]",
  desc: "Set an automatic action when a user reaches a warning count. Actions: kick, ban, timeout.",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",warnthreshold remove",
  args: "<count>",
  desc: "Remove a warning threshold.",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",warnthreshold list",
  args: "",
  desc: "List all warning thresholds for this server.",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",lock",
  args: "[#channel] [reason]",
  desc: "Lock a channel so members cannot send messages. Requires: Manage Channels",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",unlock",
  args: "[#channel]",
  desc: "Unlock a previously locked channel. Requires: Manage Channels",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",slowmode",
  args: "[#channel] <seconds|off>",
  desc: "Set slowmode on a channel. Use 'off' to disable. Requires: Manage Channels",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",clear",
  args: "<amount>",
  desc: "Delete 1–100 messages from the current channel. Requires: Manage Messages",
  cat: "mod",
  popular: true,
  prefix: true
}, {
  cmd: ",nick",
  args: "@user <nickname>",
  desc: "Change a user's nickname. Requires: Manage Nicknames",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",nicklock",
  args: "@user",
  desc: "Lock a user's nickname so they cannot change it. Requires: Manage Nicknames",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",nickunlock",
  args: "@user",
  desc: "Unlock a user's nickname. Requires: Manage Nicknames",
  cat: "mod",
  popular: false,
  prefix: true
}, {
  cmd: ",audit",
  args: "@user",
  desc: "View the audit log entries for a user. Requires: View Audit Log + Audit Log plugin enabled.",
  cat: "mod",
  popular: false,
  prefix: true
},

{
  cmd: ",case_channel",
  args: "#channel",
  desc: "Set the channel where moderation and ticket cases are posted.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",appeals_channel",
  args: "#channel",
  desc: "Set the channel where ban appeal cases are posted.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",ticket_channel",
  args: "#channel",
  desc: "Set the channel where the ticket panel will be posted.",
  cat: "tickets",
  popular: false,
  prefix: true
}, {
  cmd: ",ticket",
  args: "",
  desc: "Post the ticket panel in the designated ticket channel.",
  cat: "tickets",
  popular: false,
  prefix: true
}, {
  cmd: ",ticket_edit",
  args: "[title|text|categories] <value>",
  desc: "Edit the ticket panel title, description text, or categories.",
  cat: "tickets",
  popular: false,
  prefix: true
}, {
  cmd: ",ticket_close",
  args: "<time|off>",
  desc: "Set the auto-close time for inactive tickets. Examples: 30m, 2h, 1d, off.",
  cat: "tickets",
  popular: false,
  prefix: true
}, {
  cmd: ",ticket_ping",
  args: "@role",
  desc: "Set a role to display inside new tickets (will not actually ping them).",
  cat: "tickets",
  popular: false,
  prefix: true
}, {
  cmd: ",autoresponder add",
  args: "<trigger> <response>",
  desc: "Add an autoresponder: when trigger is sent, bot replies with response.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",autoresponder remove",
  args: "<trigger>",
  desc: "Remove an autoresponder trigger.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",autoresponder list",
  args: "",
  desc: "List all autoresponders set up in this server.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",autoresponder_filter_on",
  args: "",
  desc: "Enable the autoresponder profanity/content filter for this server.",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",autoresponder_filter_off",
  args: "",
  desc: "Disable the autoresponder filter for this server.",
  cat: "setup",
  popular: false,
  prefix: true
},

{
  cmd: ",afk",
  args: "[reason]",
  desc: "Set your AFK status via prefix command. Prefix version of /afk.",
  cat: "utility",
  popular: false,
  prefix: true
}, {
  cmd: ",boosterrole create",
  args: "<name>",
  desc: "Create a custom role for yourself (server boosters only).",
  cat: "utility",
  popular: false,
  prefix: true
}, {
  cmd: ",boosterrole color",
  args: "<hex>",
  desc: "Set the color of your custom booster role. Example: ,boosterrole color #FF5733",
  cat: "utility",
  popular: false,
  prefix: true
},

{
  cmd: ",coinflip",
  args: "",
  desc: "Flip a coin. Aliases: ,coin ,flip",
  cat: "fun",
  popular: false,
  prefix: true
}, {
  cmd: ",random",
  args: "[min] [max]",
  desc: "Generate a random number. Aliases: ,rng",
  cat: "fun",
  popular: false,
  prefix: true
},

{
  cmd: ",embed_ticket_",
  args: "#hex",
  desc: "Set the embed color for ticket embeds. Example: ,embed_ticket_#57F287",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",embed_moderation_",
  args: "#hex",
  desc: "Set the embed color for moderation embeds. Example: ,embed_moderation_#ED4245",
  cat: "setup",
  popular: false,
  prefix: true
}, {
  cmd: ",embed_general_",
  args: "#hex",
  desc: "Set the embed color for general embeds. Example: ,embed_general_#5865F2",
  cat: "setup",
  popular: false,
  prefix: true
}];

const FEATURES = [{
  id: 'automod',
  tab: 'Moderation',
  title: 'Full moderation toolkit',
  blurb: "Warns, bans, kicks, nicklocks, channel locks, warn thresholds that auto-escalate. The stuff you actually need.",
  points: ['Warn-threshold system — auto-mute/kick/ban at X warns', '/nuke and ,unraid for when things get loud', 'Per-user warn history and /clearwarns for fresh starts', 'Channel locks and nickname locks, both reversible'],
  visual: 'automod'
}, {
  id: 'ai',
  tab: 'AI commands',
  title: 'AI in chat, not a separate app',
  blurb: "/ask for Gemini-powered answers, /imagine for image generation, /translate for on-the-fly translation.",
  points: ['/ask remembers conversation context per-user', '/imagine generates images from any prompt', '/translate auto-detects source language', '/clear_memory to reset the bot\'s memory of your chat'],
  visual: 'cases'
}, {
  id: 'setup',
  tab: 'Server setup',
  title: 'Go from empty server to ready in one command',
  blurb: "/server_setup scaffolds channels, roles, and config. /generate_rules gives you AI-generated starting rules to edit.",
  points: ['/server_setup creates a working baseline in seconds', '/generate_rules — AI-drafted rules you actually own', 'Modular plugins via /plugins and ,enable / ,disable', '/wipe_server to start over, with double-confirm']
}, {
  id: 'tickets',
  tab: 'Tickets & appeals',
  title: 'Support and appeals, ticket-based',
  blurb: "Users open tickets with one command. Appeals for bans and warns route to a channel your mods actually check.",
  points: [',ticket opens a private channel instantly', '/appeal lets banned users request review', ',ticket_ping to page the right role', 'Configurable ticket channel and auto-close'],
  visual: 'raid'
}];
window.KOZZ = {
  ACCENTS,
  COMMANDS,
  FEATURES,
  INVITE_URL
};

function Mascot({
  size = 240,
  mood: defaultMood = 'neutral',
  blink = true
}) {
  const [eye, setEye] = React.useState({
    x: 0,
    y: 0
  });
  const [blinking, setBlinking] = React.useState(false);
  const [mood, setMood] = React.useState(defaultMood);
  const [bouncing, setBouncing] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!blink) return;
    let t;
    const loop = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 140);
      t = setTimeout(loop, 2200 + Math.random() * 3500);
    };
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, [blink]);
  React.useEffect(() => {
    const onMove = e => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / Math.max(r.width, 300);
      const dy = (e.clientY - cy) / Math.max(r.height, 300);
      const mag = Math.min(1, Math.hypot(dx, dy) * 1.4);
      const ang = Math.atan2(dy, dx);
      setEye({
        x: Math.cos(ang) * mag * 4,
        y: Math.sin(ang) * mag * 4
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  const mouthPath = {
    neutral: 'M 78 130 Q 100 136 122 130',
    happy: 'M 76 126 Q 100 146 124 126',
    smug: 'M 80 132 Q 100 128 120 134',
    alert: 'M 82 132 L 118 132',
    thinking: 'M 85 130 Q 100 120 115 130'
  }[mood] || 'M 78 130 Q 100 136 122 130';
  const handleClick = () => {
    if (bouncing) return;
    setMood('happy');
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);
    setTimeout(() => setMood(defaultMood), 2000);
  };
  return React.createElement("svg", {
    ref: ref,
    onClick: handleClick,
    viewBox: "0 0 200 200",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible',
      cursor: 'pointer',
      transform: bouncing ? 'scale(1.08) translateY(-12px)' : 'scale(1) translateY(0)',
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }, React.createElement("defs", null, React.createElement("linearGradient", {
    id: "body-grad",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, React.createElement("stop", {
    offset: "0",
    stopColor: "var(--accent)",
    stopOpacity: "1"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "var(--accent)",
    stopOpacity: "0.75"
  })), React.createElement("radialGradient", {
    id: "body-shade",
    cx: "0.35",
    cy: "0.3",
    r: "0.8"
  }, React.createElement("stop", {
    offset: "0",
    stopColor: "#ffffff",
    stopOpacity: "0.25"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#ffffff",
    stopOpacity: "0"
  }))), React.createElement("ellipse", {
    cx: "100",
    cy: "185",
    rx: "55",
    ry: "6",
    fill: "#000",
    opacity: "0.25"
  }, React.createElement("animate", {
    attributeName: "rx",
    values: "55;60;55",
    dur: "3s",
    repeatCount: "indefinite"
  }), React.createElement("animate", {
    attributeName: "opacity",
    values: "0.25;0.15;0.25",
    dur: "3s",
    repeatCount: "indefinite"
  })), React.createElement("g", {
    "transform-origin": "100 40"
  }, React.createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    values: "-5 100 40; 5 100 40; -5 100 40",
    dur: "4s",
    repeatCount: "indefinite"
  }), React.createElement("line", {
    x1: "100",
    y1: "40",
    x2: "100",
    y2: "22",
    stroke: "var(--accent)",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), React.createElement("circle", {
    cx: "100",
    cy: "19",
    r: "8",
    fill: "var(--accent)",
    opacity: "0.4"
  }, React.createElement("animate", {
    attributeName: "opacity",
    values: "0.4;0.8;0.4",
    dur: "2s",
    repeatCount: "indefinite"
  }), React.createElement("animate", {
    attributeName: "r",
    values: "8;12;8",
    dur: "2s",
    repeatCount: "indefinite"
  })), React.createElement("circle", {
    cx: "100",
    cy: "19",
    r: "5",
    fill: "var(--accent)"
  }, React.createElement("animate", {
    attributeName: "r",
    values: "5;6.5;5",
    dur: "2s",
    repeatCount: "indefinite"
  }))), React.createElement("g", null, React.createElement("animateTransform", {
    attributeName: "transform",
    type: "translate",
    values: "0 0; 0 -2; 0 0",
    dur: "3s",
    repeatCount: "indefinite"
  }), React.createElement("rect", {
    x: "40",
    y: "42",
    width: "120",
    height: "130",
    rx: "36",
    ry: "36",
    fill: "url(#body-grad)"
  }), React.createElement("rect", {
    x: "40",
    y: "42",
    width: "120",
    height: "130",
    rx: "36",
    ry: "36",
    fill: "url(#body-shade)"
  }), React.createElement("rect", {
    x: "40",
    y: "42",
    width: "120",
    height: "130",
    rx: "36",
    ry: "36",
    fill: "none",
    stroke: "rgba(0,0,0,0.2)",
    strokeWidth: "1"
  }), React.createElement("rect", {
    x: "54",
    y: "70",
    width: "92",
    height: "74",
    rx: "20",
    ry: "20",
    fill: "#0b0b0d",
    opacity: "0.92"
  }), React.createElement("rect", {
    x: "54",
    y: "70",
    width: "92",
    height: "74",
    rx: "20",
    ry: "20",
    fill: "none",
    stroke: "rgba(255,255,255,0.08)",
    strokeWidth: "1"
  }), React.createElement("g", {
    transform: `translate(${eye.x}, ${eye.y})`
  }, React.createElement("circle", {
    cx: "82",
    cy: "102",
    r: blinking ? 0.5 : 5,
    fill: "#fff",
    style: {
      transition: 'r 80ms'
    }
  }), React.createElement("circle", {
    cx: "118",
    cy: "102",
    r: blinking ? 0.5 : 5,
    fill: "#fff",
    style: {
      transition: 'r 80ms'
    }
  }), !blinking && React.createElement(React.Fragment, null, React.createElement("circle", {
    cx: "82",
    cy: "102",
    r: "2.5",
    fill: "#000",
    opacity: "0.2"
  }), React.createElement("circle", {
    cx: "118",
    cy: "102",
    r: "2.5",
    fill: "#000",
    opacity: "0.2"
  }), React.createElement("circle", {
    cx: "83.5",
    cy: "100.5",
    r: "1.5",
    fill: "var(--accent)"
  }), React.createElement("circle", {
    cx: "119.5",
    cy: "100.5",
    r: "1.5",
    fill: "var(--accent)"
  }))), React.createElement("path", {
    d: mouthPath,
    stroke: "#fff",
    strokeWidth: "3",
    fill: "none",
    strokeLinecap: "round",
    style: {
      transition: 'd 0.3s'
    }
  }), React.createElement("circle", {
    cx: "62",
    cy: "122",
    r: "4",
    fill: "var(--accent)",
    opacity: mood === 'happy' ? 0.6 : 0.2,
    style: {
      transition: 'opacity 0.3s'
    }
  }), React.createElement("circle", {
    cx: "138",
    cy: "122",
    r: "4",
    fill: "var(--accent)",
    opacity: mood === 'happy' ? 0.6 : 0.2,
    style: {
      transition: 'opacity 0.3s'
    }
  })), React.createElement("rect", {
    x: "62",
    y: "170",
    width: "22",
    height: "8",
    rx: "4",
    fill: "var(--accent)",
    opacity: "0.7"
  }), React.createElement("rect", {
    x: "116",
    y: "170",
    width: "22",
    height: "8",
    rx: "4",
    fill: "var(--accent)",
    opacity: "0.7"
  }));
}

function MascotMini({
  size = 28
}) {
  return React.createElement("svg", {
    viewBox: "0 0 40 40",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement("rect", {
    x: "6",
    y: "8",
    width: "28",
    height: "26",
    rx: "8",
    fill: "var(--accent)"
  }), React.createElement("rect", {
    x: "11",
    y: "13",
    width: "18",
    height: "13",
    rx: "4",
    fill: "#0b0b0d"
  }), React.createElement("circle", {
    cx: "16",
    cy: "19.5",
    r: "1.6",
    fill: "#fff"
  }), React.createElement("circle", {
    cx: "24",
    cy: "19.5",
    r: "1.6",
    fill: "#fff"
  }), React.createElement("line", {
    x1: "20",
    y1: "8",
    x2: "20",
    y2: "4",
    stroke: "var(--accent)",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), React.createElement("circle", {
    cx: "20",
    cy: "3",
    r: "2.5",
    fill: "var(--accent)",
    opacity: "0.5"
  }, React.createElement("animate", {
    attributeName: "opacity",
    values: "0.3;0.8;0.3",
    dur: "2s",
    repeatCount: "indefinite"
  })), React.createElement("circle", {
    cx: "20",
    cy: "3",
    r: "1.5",
    fill: "var(--accent)"
  }));
}
Object.assign(window, {
  Mascot,
  MascotMini
});
function useTilt(ref, settings = {}) {
  const defaultSettings = {
    max: 5,
    perspective: 1000,
    scale: 1.02,
    speed: 1000,
    ...settings
  };
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMouseMove = e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / centerY * defaultSettings.max;
      const rotateY = (x - centerX) / centerX * defaultSettings.max;
      el.style.transform = `perspective(${defaultSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${defaultSettings.scale}, ${defaultSettings.scale}, ${defaultSettings.scale})`;
    };
    const onMouseLeave = () => {
      el.style.transform = `perspective(${defaultSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.style.transition = `transform ${defaultSettings.speed}ms cubic-bezier(.03,.98,.52,.99)`;
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref]);
}
function ScrambleText({
  text,
  delay = 0
}) {
  const [out, setOut] = React.useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#_';
  React.useEffect(() => {
    let start = null;
    const duration = 1200;
    let reqId;
    const tick = now => {
      if (!start) start = now;
      const elapsed = now - start;
      if (elapsed < delay) {
        reqId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.max(0, Math.min(1, (elapsed - delay) / duration));
      if (progress >= 1) {
        setOut(text);
        return;
      }
      const revealedCount = Math.floor(progress * text.length);
      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealedCount || text[i] === ' ') {
          scrambled += text[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setOut(scrambled);
      reqId = requestAnimationFrame(tick);
    };
    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
  }, [text, delay]);
  return React.createElement("span", null, out || ' ');
}
function AnimatedNumber({
  value
}) {
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();
        const animate = now => {
          const progress = Math.min((now - startTime) / duration, 1);

          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.floor(ease * value));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return React.createElement("span", {
    ref: ref
  }, display);
}
function Nav({
  theme,
  setTheme
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navStyle = {
    position: 'fixed',
    top: scrolled ? 16 : 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: scrolled ? 'calc(100% - 32px)' : '100%',
    maxWidth: scrolled ? 1200 : 'none',
    zIndex: 1000,
    padding: scrolled ? '10px 24px' : '18px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    background: scrolled ? 'var(--glass-bg)' : 'color-mix(in oklab, var(--bg) 72%, transparent)',
    borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid var(--line-soft)',
    borderRadius: scrolled ? 20 : 0,
    boxShadow: scrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : 'none'
  };
  const linkStyle = {
    color: 'var(--fg-dim)',
    fontSize: 13,
    fontWeight: 500,
    padding: '8px 14px',
    borderRadius: 10,
    transition: 'all 0.2s'
  };
  const closeMenu = () => setMenuOpen(false);
  return React.createElement(React.Fragment, null, React.createElement("nav", {
    style: navStyle
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement(MascotMini, {
    size: 28
  }), React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--fg)'
    }
  }, "kozzyx")), React.createElement("div", {
    className: "nav-links",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, ['Home', 'Features', 'Commands', 'Team', 'FAQ'].map(item => React.createElement("a", {
    key: item,
    href: item === 'Home' ? 'index.html' : `${item.toLowerCase()}.html`,
    style: linkStyle,
    onMouseEnter: e => {
      e.target.style.color = 'var(--fg)';
      e.target.style.background = 'var(--bg-elev-2)';
    },
    onMouseLeave: e => {
      e.target.style.color = 'var(--fg-dim)';
      e.target.style.background = 'transparent';
    }
  }, item))), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, React.createElement("button", {
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    title: "Toggle theme",
    className: "glass",
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--fg-dim)',
      transition: 'all 0.2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.color = 'var(--fg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--glass-border)';
      e.currentTarget.style.color = 'var(--fg-dim)';
    }
  }, theme === 'dark' ? React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
  })) : React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }))), React.createElement("a", {
    href: window.KOZZ.INVITE_URL,
    target: "_blank",
    rel: "noopener",
    className: "nav-cta-btn",
    style: {
      padding: '9px 18px',
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 600,
      transition: 'all 0.2s',
      display: 'inline-block',
      boxShadow: scrolled ? '0 4px 12px color-mix(in oklab, var(--accent) 30%, transparent)' : 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.style.filter = 'brightness(1.1)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'brightness(1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, "Invite Bot"), React.createElement("button", {
    onClick: () => setMenuOpen(true),
    "aria-label": "Menu",
    className: "mobile-hamburger glass",
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      display: 'none',
      placeItems: 'center',
      color: 'var(--fg-dim)'
    }
  }, React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M4 6h16M4 12h16M4 18h16"
  }))))), React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      pointerEvents: menuOpen ? 'all' : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, React.createElement("div", {
    onClick: closeMenu,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      opacity: menuOpen ? 1 : 0,
      transition: 'opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }
  }), React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      background: 'var(--bg-elev)',
      borderTop: '1px solid var(--line)',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      transform: menuOpen ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
      padding: '12px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      boxShadow: '0 -20px 60px rgba(0,0,0,0.6)'
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 5,
      borderRadius: 3,
      background: 'var(--line)',
      margin: '0 auto 16px',
      opacity: 0.8
    }
  }), [{
    href: 'index.html',
    label: 'Home'
  }, {
    href: 'features.html',
    label: 'Features'
  }, {
    href: 'commands.html',
    label: 'Commands'
  }, {
    href: 'team.html',
    label: 'Team'
  }, {
    href: 'faq.html',
    label: 'FAQ'
  }].map(l => React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: closeMenu,
    style: {
      padding: '16px 20px',
      fontSize: 17,
      fontWeight: 500,
      color: 'var(--fg)',
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg)',
      border: '1px solid var(--line-soft)',
      transition: 'background 0.2s'
    }
  }, l.label, React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--fg-dim)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })))), React.createElement("a", {
    href: window.KOZZ.INVITE_URL,
    target: "_blank",
    onClick: closeMenu,
    style: {
      marginTop: 16,
      display: 'block',
      textAlign: 'center',
      padding: '18px',
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      borderRadius: 16,
      fontSize: 16,
      fontWeight: 600,
      boxShadow: '0 8px 24px var(--accent-soft)'
    },
    rel: "noopener noreferrer"
  }, "Add to Discord"))));
}
Object.assign(window, {
  Nav
});
function Footer() {
  return React.createElement("footer", {
    style: {
      marginTop: 80,
      borderTop: '1px solid var(--line)',
      padding: '80px 40px 60px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 60
    }
  }, React.createElement("div", {
    style: {
      gridColumn: 'span 2'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 20
    }
  }, React.createElement(MascotMini, {
    size: 32
  }), React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "kozzyx")), React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg-faint)',
      lineHeight: 1.6,
      maxWidth: 300
    }
  }, "The complete Discord ecosystem. Built for communities that demand better. 100% free, forever."), React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      gap: 8
    }
  }, React.createElement("a", {
    href: "https://discord.gg/fPG29xv7EA",
    target: "_blank",
    rel: "noopener",
    title: "Join the support server",
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      border: '1px solid var(--line)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--fg-dim)',
      transition: 'all 0.15s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--accent)';
      e.currentTarget.style.borderColor = 'var(--accent)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--fg-dim)';
      e.currentTarget.style.borderColor = 'var(--line)';
    }
  }, React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, React.createElement("path", {
    d: "M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22H3.42C2.064 21.168.96 20.064.96 18.696V2.472C.96 1.104 2.064 0 3.42 0h16.12zM12 5.5s-1.5 1.2-3.6 1.2c0 0-.4 2.5 1.8 4.6 0 0 .9-1 1.8-1s1.8 1 1.8 1c2.2-2.1 1.8-4.6 1.8-4.6-2.1 0-3.6-1.2-3.6-1.2z"
  }))))), React.createElement("div", null, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 16
    }
  }, "Product"), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, React.createElement("a", {
    href: "features.html",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Features"), React.createElement("a", {
    href: "commands.html",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Commands"), React.createElement("a", {
    href: "faq.html",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "FAQ"), React.createElement("a", {
    href: window.KOZZ.INVITE_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Add to Discord"))), React.createElement("div", null, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 16
    }
  }, "Support"), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, React.createElement("a", {
    href: "https://discord.gg/fPG29xv7EA",
    target: "_blank",
    rel: "noopener",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Support server", React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M7 17L17 7M7 7h10v10"
  }))), React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-faint)'
    }
  }, React.createElement("code", {
    className: "mono",
    style: {
      fontSize: 12,
      padding: '1px 5px',
      background: 'var(--bg-elev-2)',
      borderRadius: 3
    }
  }, "/help"), " in Discord"), React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-faint)'
    }
  }, React.createElement("code", {
    className: "mono",
    style: {
      fontSize: 12,
      padding: '1px 5px',
      background: 'var(--bg-elev-2)',
      borderRadius: 3
    }
  }, "/modhelp"), " for mod cmds"))), React.createElement("div", null, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 16
    }
  }, "Legal"), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, React.createElement("a", {
    href: "privacy.html",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Privacy policy"), React.createElement("a", {
    href: "terms.html",
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      transition: 'color 0.15s'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "Terms of service")))), React.createElement("div", {
    style: {
      maxWidth: 1320,
      margin: '56px auto 0',
      paddingTop: 24,
      borderTop: '1px solid var(--line-soft)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)'
    }
  }, "\xA9 2026 kozzyx \xB7 not affiliated with Discord Inc."), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, React.createElement("span", null, "made by ", React.createElement("a", {
    href: "https://github.com/kozzyxofficialx",
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'var(--fg-dim)',
      textDecoration: 'underline',
      textDecorationColor: 'var(--line)',
      textUnderlineOffset: 2
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--fg-dim)'
  }, "@ckazros")), React.createElement("span", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "\xB7"), React.createElement("span", null, "\uD83C\uDDED\uD83C\uDDFA hungary"))));
}
Object.assign(window, {
  Footer
});
function TweakPanel({
  accent,
  setAccent,
  visible
}) {
  const accents = window.KOZZ.ACCENTS;
  if (!visible) return null;
  return React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000,
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)',
      minWidth: 240
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em'
    }
  }, "TWEAKS"), React.createElement(MascotMini, {
    size: 18
  })), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-dim)',
      marginBottom: 10
    }
  }, "Accent color"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 6
    }
  }, Object.values(accents).map(a => React.createElement("button", {
    key: a.name,
    onClick: () => setAccent(a.name),
    style: {
      padding: '10px 8px',
      borderRadius: 8,
      border: '1px solid ' + (accent === a.name ? 'var(--fg)' : 'var(--line)'),
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      transition: 'all 0.15s'
    }
  }, React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      background: `oklch(${a.oklch})`
    }
  }), React.createElement("span", {
    style: {
      fontSize: 11,
      color: accent === a.name ? 'var(--fg)' : 'var(--fg-dim)'
    }
  }, a.label)))));
}
Object.assign(window, {
  TweakPanel
});
function Hero() {
  const [chatStep, setChatStep] = React.useState(0);
  const chatRef = React.useRef(null);

  const chatScript = [{
    t: 'msg',
    user: 'sp4m_b0t_4471',
    color: 'oklch(0.70 0.14 30)',
    text: 'FREE NITRO >>> discord-gifts.ru/claim',
    new: true
  }, {
    t: 'kozz',
    text: 'Caught phishing pattern. User removed, message purged.',
    action: 'BAN'
  }, {
    t: 'msg',
    user: 'mira',
    color: 'oklch(0.80 0.10 200)',
    text: 'lol thanks kozzy'
  }, {
    t: 'msg',
    user: 'jun',
    color: 'oklch(0.78 0.12 280)',
    text: 'wait is that the 4th one today'
  }, {
    t: 'kozz',
    text: 'Raid shield raised — 12 suspicious joins in last 60s.',
    action: 'AUTO'
  }, {
    t: 'msg',
    user: 'jun',
    color: 'oklch(0.78 0.12 280)',
    text: 'legend'
  }];
  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i > chatScript.length) {
        setChatStep(0);
        i = 0;
        return;
      }
      setChatStep(i);
    }, 1400);
    return () => clearInterval(id);
  }, []);
  React.useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatStep]);
  return React.createElement("section", {
    className: "hero-grid",
    style: {
      padding: '80px 40px 100px',
      maxWidth: 1320,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 80,
      alignItems: 'center',
      position: 'relative'
    }
  }, React.createElement(HeroParticles, null), React.createElement("div", null, React.createElement("div", {
    className: "badge-float",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px 6px 6px',
      borderRadius: 100,
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      fontSize: 12,
      color: 'var(--fg-dim)',
      marginBottom: 28
    }
  }, React.createElement("span", {
    className: "mono",
    style: {
      background: 'color-mix(in oklab, var(--ok) 14%, transparent)',
      color: 'var(--ok)',
      padding: '3px 8px',
      borderRadius: 100,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.04em',
      border: '1px solid color-mix(in oklab, var(--ok) 25%, transparent)'
    }
  }, "FREE"), "100% free \xB7 no paywalled commands, ever"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(48px, 6vw, 84px)',
      lineHeight: 0.98,
      letterSpacing: '-0.035em',
      margin: 0,
      fontWeight: 500
    }
  }, React.createElement(ScrambleText, {
    text: "One bot.",
    delay: 800
  }), React.createElement("br", null), React.createElement(ScrambleText, {
    text: "Moderation, ",
    delay: 900
  }), React.createElement("span", {
    className: "serif shine",
    style: {
      fontStyle: 'italic',
      fontWeight: 400,
      color: 'var(--accent)'
    }
  }, React.createElement(ScrambleText, {
    text: "AI, tickets,",
    delay: 1000
  })), React.createElement("br", null), React.createElement(ScrambleText, {
    text: "and the boring stuff.",
    delay: 1100
  })), React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.5,
      color: 'var(--fg-dim)',
      marginTop: 28,
      maxWidth: 520
    }
  }, "kozzyx is an all-in-one Discord bot. Warns, bans, and ticket flows. Gemini-powered /ask and /imagine. Polls, giveaways, leaderboards. One-command server setup. 90+ commands across slash and prefix."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 36,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement("a", {
    href: window.KOZZ.INVITE_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      padding: '14px 22px',
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      transition: 'transform 0.12s, filter 0.2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.filter = 'brightness(1.08)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'brightness(1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, React.createElement("path", {
    d: "M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22H3.42C2.064 21.168.96 20.064.96 18.696V2.472C.96 1.104 2.064 0 3.42 0h16.12zM12 5.5s-1.5 1.2-3.6 1.2c0 0-.4 2.5 1.8 4.6 0 0 .9-1 1.8-1s1.8 1 1.8 1c2.2-2.1 1.8-4.6 1.8-4.6-2.1 0-3.6-1.2-3.6-1.2z"
  })), "Add to Discord"), React.createElement("a", {
    href: "commands.html",
    style: {
      padding: '14px 20px',
      background: 'transparent',
      color: 'var(--fg)',
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 500,
      border: '1px solid var(--line)',
      transition: 'background 0.2s',
      display: 'inline-block'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-elev)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, "View commands"), React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg-faint)',
      marginLeft: 4
    }
  }, "90+ commands \xB7 slash + prefix \xB7 ", React.createElement("span", {
    style: {
      color: 'var(--ok)'
    }
  }, "always free"))), React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement(TrustLine, null))), React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-8% -8% -8% -8%',
      background: 'radial-gradient(circle at 60% 40%, var(--accent-soft), transparent 70%)',
      filter: 'blur(40px)',
      zIndex: 0
    }
  }), React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0
    }
  }, React.createElement("div", {
    style: {
      marginBottom: -30,
      animation: 'float 5s ease-in-out infinite'
    }
  }, React.createElement(Mascot, {
    size: 180,
    mood: "smug"
  })), React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)'
    }
  }, React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--line-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-elev-2)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("span", {
    style: {
      color: 'var(--fg-faint)',
      fontSize: 14
    }
  }, "#"), React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "general"), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)'
    }
  }, "\u2014 214 members")), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: 'var(--ok)'
    }
  }), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "kozzyx online"))), React.createElement("div", {
    ref: chatRef,
    style: {
      padding: 12,
      height: 280,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 14
    }
  }, chatScript.slice(0, chatStep).map((m, i) => React.createElement(ChatLine, {
    key: i,
    m: m
  })), chatStep > 0 && chatStep < chatScript.length && React.createElement(TypingDot, null))))), React.createElement("style", null, `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; } }
      `));
}
function ChatLine({
  m
}) {
  if (m.t === 'kozz') {
    return React.createElement("div", {
      style: {
        background: 'var(--accent-soft)',
        border: '1px solid color-mix(in oklab, var(--accent) 30%, transparent)',
        padding: '8px 12px',
        borderRadius: 10,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        animation: 'fadeUp 0.3s ease'
      }
    }, React.createElement(MascotMini, {
      size: 18
    }), React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--fg)'
      }
    }, m.text), React.createElement("span", {
      className: "mono",
      style: {
        marginLeft: 'auto',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.05em',
        padding: '2px 6px',
        borderRadius: 4,
        background: 'var(--accent)',
        color: 'var(--accent-fg)'
      }
    }, m.action)));
  }
  return React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      animation: 'fadeUp 0.3s ease'
    }
  }, React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 13,
      background: m.color,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 11,
      fontWeight: 600,
      color: '#0b0b0d'
    }
  }, m.user[0].toUpperCase()), React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, m.user), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "now")), React.createElement("div", {
    style: {
      fontSize: 13,
      color: m.new ? 'var(--fg-dim)' : 'var(--fg)',
      textDecoration: m.new ? 'line-through' : 'none',
      opacity: m.new ? 0.55 : 1
    }
  }, m.text)));
}
function TypingDot() {
  return React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: '4px 8px',
      alignItems: 'center'
    }
  }, [0, 1, 2].map(i => React.createElement("span", {
    key: i,
    style: {
      width: 5,
      height: 5,
      borderRadius: 5,
      background: 'var(--fg-faint)',
      animation: `blink 1.2s infinite ${i * 0.15}s`
    }
  })));
}
function TrustLine() {
  return React.createElement(React.Fragment, null, React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    }
  }, "Built with"), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      color: 'var(--fg-dim)',
      fontSize: 14
    }
  }, React.createElement("span", null, "discord.js"), React.createElement("span", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "\xB7"), React.createElement("span", null, "gemini api"), React.createElement("span", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "\xB7"), React.createElement("span", null, "node.js"), React.createElement("span", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "\xB7"), React.createElement("span", null, "gcp")));
}
Object.assign(window, {
  Hero
});
function Stats() {

  const stats = [{
    n: 10,
    label: 'servers',
    note: 'update this with your real count'
  }, {
    n: 63,
    label: 'commands',
    note: 'slash + prefix · all free'
  }, {
    n: 6,
    label: 'categories',
    note: 'mod · AI · utility · setup · tickets · fun'
  }, {
    n: 99,
    label: '% uptime',
    note: 'hosted on GCP · always-on VM'
  }];
  return React.createElement("section", {
    style: {
      padding: '60px 40px',
      maxWidth: 1320,
      margin: '0 auto',
      borderTop: '1px solid var(--line-soft)',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 36
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "\xA7 01 \u2014 Overview"), React.createElement("h2", {
    style: {
      fontSize: 32,
      margin: '8px 0 0',
      fontWeight: 500,
      letterSpacing: '-0.02em'
    }
  }, "Transparent stats. ", React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--fg-dim)',
      fontWeight: 400
    }
  }, "no funny business"))), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)'
    }
  }, "updated live \xB7 30s cache")), React.createElement("div", {
    className: "stats-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0,
      borderTop: '1px solid var(--line)'
    },
    "data-stagger": true
  }, stats.map((s, i) => React.createElement(StatCell, _extends({
    key: i
  }, s, {
    isLast: i === stats.length - 1
  })))));
}
function DashField({
  label,
  val,
  hl
}) {
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      fontSize: 12,
      gap: 10
    }
  }, React.createElement("div", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, label), React.createElement("div", {
    style: {
      color: hl ? 'var(--accent)' : 'var(--fg)',
      fontWeight: hl ? 600 : 400
    }
  }, val));
}
function StatCell({
  n,
  label,
  note,
  isLast
}) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = now => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(n * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, {
      threshold: 0.3
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return React.createElement("div", {
    ref: ref,
    "data-statcell": true,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      padding: '32px 28px',
      borderRight: isLast ? 'none' : '1px solid var(--line)',
      position: 'relative',
      transition: 'background 0.2s',
      background: hovered ? 'var(--bg-elev)' : 'transparent'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 56,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1
    }
  }, val.toLocaleString())), React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 14,
      fontWeight: 500
    }
  }, label), React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 4,
      fontSize: 11,
      color: 'var(--fg-faint)'
    }
  }, note));
}
Object.assign(window, {
  Stats
});
function MarqueeDivider() {
  return React.createElement("div", {
    className: "marquee-divider",
    style: {
      transform: 'rotate(-1.5deg) scale(1.02)',
      background: 'var(--accent)',
      padding: '12px 0',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
    }
  }, React.createElement("div", {
    className: "marquee-inner"
  }, [1, 2].map(i => React.createElement(React.Fragment, {
    key: i
  }, React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// 90+ COMMANDS"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// GEMINI AI"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// IMPENETRABLE AUTOMOD"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// INSTANT TICKETS"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// MASSBAN & BLACKLIST"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// POLLS & GIVEAWAYS"), React.createElement("span", {
    className: "marquee-item mono",
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--accent-fg)'
    }
  }, "/// LIVE LEADERBOARDS")))));
}
function HowItWorks() {
  const steps = [{
    num: '01',
    icon: React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React.createElement("path", {
      d: "M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22H3.42C2.064 21.168.96 20.064.96 18.696V2.472C.96 1.104 2.064 0 3.42 0h16.12z"
    })),
    title: 'Invite kozzyx',
    desc: 'Click "Add to Discord", pick your server, grant admin perms. Takes 30 seconds.',
    tag: 'one click'
  }, {
    num: '02',
    icon: React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React.createElement("rect", {
      x: "2",
      y: "3",
      width: "20",
      height: "14",
      rx: "2"
    }), React.createElement("path", {
      d: "M8 21h8M12 17v4"
    })),
    title: 'Run /server_setup',
    desc: 'One command scaffolds channels, roles, and config. Pick a preset or go bare.',
    tag: '~30 seconds'
  }, {
    num: '03',
    icon: React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    })),
    title: 'Forget about it',
    desc: 'Automod runs. Raids get blocked. AI answers questions. You moderate when it matters.',
    tag: 'hands-free'
  }];
  return React.createElement("section", {
    style: {
      padding: '100px 40px',
      maxWidth: 1320,
      margin: '0 auto'
    },
    "data-reveal": "up"
  }, React.createElement("div", {
    style: {
      maxWidth: 600,
      marginBottom: 56
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "\xA7 02 \u2014 How it works"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(32px, 4vw, 52px)',
      margin: '12px 0 0',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1.05
    }
  }, "Up and running", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "in under a minute"))), React.createElement("div", {
    className: "how-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    },
    "data-stagger": true
  }, steps.map((s, i) => React.createElement("div", {
    key: i,
    className: "how-step",
    style: {
      position: 'relative'
    }
  }, i < steps.length - 1 && React.createElement("div", {
    className: "how-step-connector"
  }), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 14,
      background: 'var(--accent-soft)',
      border: '1px solid color-mix(in oklab, var(--accent) 30%, var(--line))',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--accent)'
    }
  }, s.icon), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      padding: '4px 10px',
      borderRadius: 100,
      background: 'var(--bg-elev-2)',
      color: 'var(--fg-faint)',
      border: '1px solid var(--line-soft)'
    }
  }, s.tag)), React.createElement("div", {
    className: "mono how-step-number"
  }, s.num), React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      marginBottom: 10
    }
  }, s.title), React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg-dim)',
      lineHeight: 1.55
    }
  }, s.desc)))), React.createElement("div", {
    style: {
      marginTop: 80,
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--line-soft)'
    }
  }), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-faint)',
      letterSpacing: '0.08em',
      whiteSpace: 'nowrap'
    }
  }, "THEN YOU JUST WATCH IT WORK"), React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--line-soft)'
    }
  })));
}
Object.assign(window, {
  HowItWorks
});
function CommandBrowser() {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('all');
  const [cmdType, setCmdType] = React.useState('all');
  const [copied, setCopied] = React.useState(null);
  const cats = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'mod',
    label: 'Moderation'
  }, {
    id: 'ai',
    label: 'AI'
  }, {
    id: 'utility',
    label: 'Utility'
  }, {
    id: 'setup',
    label: 'Setup & Config'
  }, {
    id: 'tickets',
    label: 'Tickets'
  }, {
    id: 'fun',
    label: 'Fun'
  }];
  const filtered = window.KOZZ.COMMANDS.filter(cmd => {
    const matchQ = !q || cmd.cmd.toLowerCase().includes(q.toLowerCase()) || cmd.desc.toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === 'all' || cmd.cat === cat;
    const matchType = cmdType === 'all' || (cmdType === 'prefix' ? cmd.prefix : !cmd.prefix);
    return matchQ && matchCat && matchType;
  });
  const copy = cmd => {
    navigator.clipboard?.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1400);
  };
  return React.createElement("section", {
    id: "commands",
    style: {
      padding: '120px 40px',
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 24,
      marginBottom: 40
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "\xA7 05 \u2014 Commands"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(36px, 4vw, 56px)',
      margin: '12px 0 0',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1
    }
  }, window.KOZZ.COMMANDS.length, " commands.", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--fg-dim)',
      fontWeight: 400
    }
  }, "slash + prefix."))), React.createElement("div", {
    className: "search-glow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderRadius: 10,
      minWidth: 320
    }
  }, React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    style: {
      color: 'var(--fg-faint)'
    }
  }, React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), React.createElement("path", {
    d: "m21 21-4.35-4.35"
  })), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search commands...",
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--fg)',
      fontSize: 14,
      fontFamily: 'inherit'
    }
  }), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)',
      padding: '2px 5px',
      background: 'var(--bg-elev-2)',
      borderRadius: 3
    }
  }, "\u2318K"))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 18,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderRadius: 8,
      padding: 3,
      gap: 2,
      flexShrink: 0
    }
  }, [{
    id: 'all',
    label: 'All'
  }, {
    id: 'slash',
    label: '/ Slash'
  }, {
    id: 'prefix',
    label: ', Prefix'
  }].map(t => React.createElement("button", {
    key: t.id,
    onClick: () => setCmdType(t.id),
    className: "mono",
    style: {
      padding: '6px 12px',
      fontSize: 12,
      borderRadius: 5,
      background: cmdType === t.id ? 'var(--bg-elev-2)' : 'transparent',
      color: cmdType === t.id ? 'var(--fg)' : 'var(--fg-faint)',
      fontWeight: cmdType === t.id ? 600 : 400,
      border: '1px solid ' + (cmdType === t.id ? 'var(--line)' : 'transparent'),
      transition: 'all 0.15s'
    }
  }, t.label))), React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: 'var(--line)',
      flexShrink: 0
    }
  }), cats.map(cat_item => React.createElement("button", {
    key: cat_item.id,
    onClick: () => setCat(cat_item.id),
    style: {
      padding: '8px 14px',
      fontSize: 13,
      borderRadius: 100,
      border: '1px solid ' + (cat === cat_item.id ? 'var(--accent)' : 'var(--line)'),
      background: cat === cat_item.id ? 'var(--accent-soft)' : 'transparent',
      color: cat === cat_item.id ? 'var(--accent)' : 'var(--fg-dim)',
      fontWeight: cat === cat_item.id ? 600 : 400,
      transition: 'all 0.15s'
    }
  }, cat_item.label, React.createElement("span", {
    className: "mono",
    style: {
      marginLeft: 6,
      fontSize: 11,
      opacity: 0.7
    }
  }, cat_item.id === 'all' ? window.KOZZ.COMMANDS.filter(x => cmdType === 'all' || (cmdType === 'prefix' ? x.prefix : !x.prefix)).length : window.KOZZ.COMMANDS.filter(x => x.cat === cat_item.id && (cmdType === 'all' || (cmdType === 'prefix' ? x.prefix : !x.prefix))).length)))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 1,
      background: 'var(--line)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, filtered.map(c => {
    const full = `${c.cmd} ${c.args}`;
    const isCopied = copied === full;
    return React.createElement("div", {
      key: c.cmd,
      style: {
        padding: '20px 22px',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        position: 'relative',
        transition: 'background 0.15s',
        cursor: 'pointer'
      },
      onClick: () => copy(full),
      onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-elev)',
      onMouseLeave: e => e.currentTarget.style.background = 'var(--bg)'
    }, React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: c.prefix ? 'var(--warn)' : 'var(--accent)'
      }
    }, c.cmd), React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: 'var(--fg-faint)'
      }
    }, c.args), c.prefix ? React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 9,
        padding: '2px 6px',
        background: 'color-mix(in oklab, var(--warn) 12%, transparent)',
        color: 'var(--warn)',
        borderRadius: 3,
        letterSpacing: '0.05em',
        fontWeight: 600,
        border: '1px solid color-mix(in oklab, var(--warn) 25%, transparent)'
      }
    }, "PREFIX") : React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 9,
        padding: '2px 6px',
        background: 'var(--accent-soft)',
        color: 'var(--accent)',
        borderRadius: 3,
        letterSpacing: '0.05em',
        fontWeight: 600
      }
    }, "SLASH"), c.popular && React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 9,
        padding: '2px 6px',
        background: 'var(--bg-elev-2)',
        color: 'var(--fg-dim)',
        borderRadius: 3,
        letterSpacing: '0.05em',
        fontWeight: 600
      }
    }, "\u2605"), React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 11,
        color: isCopied ? 'var(--ok)' : 'var(--fg-faint)',
        opacity: isCopied ? 1 : 0,
        transition: 'opacity 0.2s'
      },
      className: "mono"
    }, isCopied ? '✓ copied' : ''), React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      style: {
        color: 'var(--fg-faint)',
        opacity: isCopied ? 0 : 0.6,
        transition: 'opacity 0.2s'
      }
    }, React.createElement("rect", {
      x: "9",
      y: "9",
      width: "13",
      height: "13",
      rx: "2"
    }), React.createElement("path", {
      d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
    }))), React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--fg-dim)',
        lineHeight: 1.45
      }
    }, c.desc));
  }), filtered.length === 0 && React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: 'var(--fg-faint)',
      gridColumn: '1 / -1',
      background: 'var(--bg)'
    }
  }, React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "No commands match \"", q, "\""), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "try /ask, ,ban, or /server_setup"))), React.createElement("div", {
    className: "mono",
    style: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 11,
      color: 'var(--fg-faint)'
    }
  }, "click any command to copy \xB7 permissions configurable per-role"));
}
function FAQ() {
  const [open, setOpen] = React.useState(null);
  const items = [{
    q: 'How does the Gemini AI integration work?',
    a: '/ask and /summarize send relevant message content to the Gemini 1.5 Pro API via Google. We have built-in jailbreak detection to keep interactions safe. Your conversation context is kept in memory per-server and can be wiped anytime with /clear_memory.'
  }, {
    q: 'Is kozzyx actually 100% free?',
    a: "Yes. Unlike MEE6 or Carl-bot, we don't lock essential features like Antiraid, Tickets, or advanced AI tools behind a subscription. The bot is self-funded and hosted on high-performance Google Cloud VMs."
  }, {
    q: 'What makes the Antiraid system different?',
    a: 'Our system allows you to simulate raids with /antiraid test to verify your settings. It uses complex pattern matching to detect join spikes and can automatically trigger lockdowns, kicks, or bans based on your configuration.'
  }, {
    q: 'How do I setup the bot for the first time?',
    a: 'The easiest way is using /server_setup. It will automatically scaffold necessary channels, roles, and initial configurations. You can then use /generate_rules to get AI-drafted server rules tailored to your community.'
  }, {
    q: 'What is the difference between prefix and slash commands?',
    a: "Slash commands (/) are Discord's native standard. We also support prefix commands: ',', ';', '.' for moderation (like ,ban) and '!', '?' for configuration (like !antiraid). Prefix commands are often faster for power users."
  }, {
    q: 'How can users appeal their bans?',
    a: 'kozzyx has a built-in /appeal system. When a user is banned, they can submit an appeal which routes directly to a designated staff channel in your server for review.'
  }, {
    q: 'Is the bot code public?',
    a: "The bot's core logic is kept in a private repository to protect the custom AI architecture and security systems. We do not provide public access to the source code at this time."
  }, {
    q: 'My bot is offline. What should I do?',
    a: "We maintain 99.9% uptime. If the bot is unresponsive for more than 5 minutes, it's likely undergoing a quick update. Join our support server for real-time status updates."
  }];
  return React.createElement("section", {
    id: "faq",
    style: {
      padding: '120px 40px',
      maxWidth: 1320,
      margin: '0 auto'
    },
    "data-reveal": "up"
  }, React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: 56
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "\xA7 06 \u2014 FAQ"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(36px, 4vw, 56px)',
      margin: '12px 0 0',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1
    }
  }, "Common questions.", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "actual answers"))), React.createElement("div", {
    style: {
      maxWidth: 860,
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, items.map((item, i) => {
    const isOpen = open === i;
    return React.createElement("div", {
      key: i,
      style: {
        borderTop: '1px solid var(--line-soft)',
        ...(i === items.length - 1 ? {
          borderBottom: '1px solid var(--line-soft)'
        } : {})
      }
    }, React.createElement("button", {
      onClick: () => setOpen(isOpen ? null : i),
      style: {
        width: '100%',
        textAlign: 'left',
        padding: '22px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        fontSize: 16,
        fontWeight: 500,
        color: isOpen ? 'var(--fg)' : 'var(--fg-dim)',
        transition: 'color 0.2s'
      }
    }, item.q, React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      style: {
        flexShrink: 0,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
        color: 'var(--fg-faint)'
      }
    }, React.createElement("path", {
      d: "m6 9 6 6 6-6"
    }))), React.createElement("div", {
      style: {
        overflow: 'hidden',
        maxHeight: isOpen ? 300 : 0,
        transition: 'max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }, React.createElement("p", {
      style: {
        margin: 0,
        paddingBottom: 22,
        fontSize: 15,
        color: 'var(--fg-dim)',
        lineHeight: 1.65
      }
    }, item.a)));
  })));
}
function Story() {
  const milestones = [{
    year: '2025 november',
    title: 'The Squid Game Era',
    desc: 'KozzyX (originally known as Frontman) started off as a squid game themed moderation and fun bot. It was nothing crazy.',
    icon: React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), React.createElement("path", {
      d: "M12 8v8M8 12h8"
    }))
  }, {
    year: '2025 december',
    title: 'Rebrand',
    desc: 'We officially rebranded the bot from "Frontman" to "KozzyX" so it can sound more professional, in the meantime my coding skills got better and I started adding a lot more commands and features. ',
    icon: React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, React.createElement("path", {
      d: "M12 2v20M2 12h20L12 2z"
    }))
  }, {
    year: '2026 february-may',
    title: 'The return',
    desc: 'I quit developing the bot due to not having any motivation or ideas of what to add to my bot. In february, I returned to developing the bot with amazing ideas such as cloud hosting, ALL customizable commands, AI features, more and more moderation features, plugins that can be enabled/disabled to make moderation much better, BUT along with developing the bot, I was also developing this website, hope you like it! :) ',
    icon: React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }))
  }];
  return React.createElement("section", {
    style: {
      padding: '120px 40px',
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 64
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 16
    }
  }, "\xA7 03 \u2014 Our journey"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(36px, 4vw, 56px)',
      margin: 0,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1.05
    }
  }, "Started as a game.", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "Built for the future"))), React.createElement("div", {
    className: "story-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 32
    }
  }, milestones.map((m, i) => React.createElement("div", {
    key: i,
    "data-reveal": "up",
    style: {
      transitionDelay: `${i * 0.15}s`
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--accent)',
      fontWeight: 600,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement("span", {
    style: {
      padding: '4px 8px',
      background: 'var(--accent-soft)',
      borderRadius: 4
    }
  }, m.year), React.createElement("div", {
    style: {
      height: 1,
      flex: 1,
      background: 'var(--line-soft)'
    }
  })), React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      margin: '0 0 16px',
      color: 'var(--fg)'
    }
  }, m.title), React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--fg-dim)',
      lineHeight: 1.6,
      margin: 0
    }
  }, m.desc)))), React.createElement("style", null, `@media(max-width:900px){.story-grid{grid-template-columns:1fr!important; gap:48px!important;}}`));
}
function FeatureCards() {
  const BentoCard = ({
    children,
    className,
    style,
    href
  }) => {
    const ref = React.useRef(null);
    useTilt(ref, {
      max: 4,
      scale: 1.01
    });
    return React.createElement("a", {
      href: href,
      ref: ref,
      className: className,
      style: {
        ...style,
        display: 'block',
        textDecoration: 'none',
        position: 'relative'
      }
    }, children);
  };
  return React.createElement("section", {
    style: {
      padding: '0 40px 120px',
      maxWidth: 1320,
      margin: '0 auto',
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60vw',
      height: '40vw',
      background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
      opacity: 0.5,
      filter: 'blur(80px)',
      pointerEvents: 'none',
      zIndex: 0
    }
  }), React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 12
    }
  }, "\xA7 04 \u2014 Features"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(32px, 4vw, 48px)',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      margin: 0,
      lineHeight: 1.05
    }
  }, "Every tool your server needs.", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "none of them paywalled"))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'auto',
      gap: 16
    },
    className: "bento-grid"
  }, React.createElement(BentoCard, {
    href: "features.html",
    className: "glass-card",
    style: {
      gridColumn: 'span 5',
      gridRow: 'span 2',
      padding: 28,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'color-mix(in oklab, var(--danger) 15%, transparent)',
      display: 'grid',
      placeItems: 'center'
    }
  }, React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--danger)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "Moderation"), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "automod + manual tools"))), [{
    on: true,
    name: 'Phishing links',
    hits: 47,
    color: 'var(--danger)'
  }, {
    on: true,
    name: 'Mass mentions',
    hits: 12,
    color: 'var(--warn)'
  }, {
    on: true,
    name: 'New-account flood',
    hits: 9,
    color: 'var(--danger)'
  }, {
    on: false,
    name: 'Caps spam',
    hits: 0,
    color: 'var(--fg-faint)'
  }].map((r, i) => React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderTop: '1px solid var(--line-soft)'
    }
  }, React.createElement("div", {
    style: {
      width: 28,
      height: 16,
      borderRadius: 8,
      background: r.on ? 'var(--accent)' : 'var(--bg-elev-2)',
      border: '1px solid var(--line)',
      position: 'relative',
      flexShrink: 0
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: 2,
      left: r.on ? 14 : 2,
      width: 10,
      height: 10,
      borderRadius: 5,
      background: '#fff',
      transition: 'left 0.2s'
    }
  })), React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      color: r.on ? 'var(--fg)' : 'var(--fg-faint)'
    }
  }, r.name), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: r.color
    }
  }, r.hits > 0 ? r.hits + ' hits' : '—'))), React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 12,
      color: 'var(--danger)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontWeight: 600
    }
  }, "See moderation tools \u2192")), React.createElement(BentoCard, {
    href: "features.html",
    className: "glass-card",
    style: {
      gridColumn: 'span 4',
      gridRow: 'span 2',
      padding: 28,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--accent-soft)',
      display: 'grid',
      placeItems: 'center'
    }
  }, React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M12 2a10 10 0 1 0 10 10"
  }), React.createElement("path", {
    d: "M12 6v6l4 2"
  }), React.createElement("circle", {
    cx: "18",
    cy: "6",
    r: "3"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "AI commands"), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "powered by Gemini"))), [{
    user: 'you',
    msg: '/ask what should our server rules cover?',
    isCmd: true
  }, {
    user: 'kozzyx',
    msg: "For a gaming server, I'd cover: no harassment, no spoilers without tags, no spam, use correct channels, and respect staff decisions.",
    isBot: true
  }].map((m, i) => React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 14
    }
  }, React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      background: m.isBot ? 'var(--accent)' : 'var(--bg-elev-2)',
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      fontSize: 11,
      fontWeight: 700,
      color: m.isBot ? '#fff' : 'var(--fg-dim)'
    }
  }, m.isBot ? 'K' : 'U'), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: m.isBot ? 'var(--accent)' : 'var(--fg)',
      marginBottom: 3
    }
  }, m.user, m.isBot && React.createElement("span", {
    style: {
      marginLeft: 5,
      fontSize: 8,
      padding: '1px 4px',
      background: '#5865f2',
      color: '#fff',
      borderRadius: 3,
      fontWeight: 700,
      verticalAlign: 'middle'
    }
  }, "APP")), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-dim)',
      lineHeight: 1.5
    }
  }, m.isCmd ? React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--accent)'
    }
  }, m.msg) : m.msg)))), React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['/ask', '/imagine', '/summarize', '/translate'].map(c => React.createElement("span", {
    key: c,
    className: "mono",
    style: {
      fontSize: 10,
      padding: '3px 7px',
      background: 'var(--accent-soft)',
      color: 'var(--accent)',
      borderRadius: 4
    }
  }, c)))), React.createElement(BentoCard, {
    href: "features.html",
    className: "glass-card",
    style: {
      gridColumn: 'span 3',
      background: 'color-mix(in oklab, var(--danger) 6%, var(--glass-bg))',
      padding: 24
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12
    }
  }, React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: 'var(--danger)',
      animation: 'pulseLive 1.5s infinite'
    }
  }), React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--danger)',
      fontWeight: 600,
      letterSpacing: '0.08em'
    }
  }, "RAID SHIELD")), React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, "12"), React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-dim)',
      marginTop: 4
    }
  }, "suspicious joins blocked"), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)',
      marginTop: 8
    }
  }, "auto-raised in 30s")), React.createElement(BentoCard, {
    href: "features.html",
    className: "glass-card",
    style: {
      gridColumn: 'span 5',
      padding: 24
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'color-mix(in oklab, var(--warn) 15%, transparent)',
      display: 'grid',
      placeItems: 'center'
    }
  }, React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--warn)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2"
  }), React.createElement("path", {
    d: "M8 21h8M12 17v4"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "Server setup"), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "/server_setup \xB7 one command"))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['#rules', '#mod-log', '#tickets', '@Mod', '@Member'].map((item, i) => React.createElement("span", {
    key: i,
    style: {
      fontSize: 11,
      padding: '4px 10px',
      borderRadius: 100,
      background: item.startsWith('@') ? 'color-mix(in oklab, var(--warn) 12%, transparent)' : 'var(--bg-elev-2)',
      color: item.startsWith('@') ? 'var(--warn)' : 'var(--fg-dim)',
      border: '1px solid var(--line-soft)'
    }
  }, item))), React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 12,
      color: 'var(--fg-dim)'
    }
  }, "Scaffolds channels, roles, and config from a single preset. Takes 30 seconds.")), React.createElement(BentoCard, {
    href: "features.html",
    className: "glass-card",
    style: {
      gridColumn: 'span 4',
      padding: 24
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'color-mix(in oklab, var(--ok) 15%, transparent)',
      display: 'grid',
      placeItems: 'center'
    }
  }, React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--ok)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
  }), React.createElement("polyline", {
    points: "22,6 12,13 2,6"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, "Tickets & appeals"), React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-faint)'
    }
  }, "fast support"))), React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)'
    }
  }, "Native support system with auto-close and transcript logging."))), React.createElement("style", null, `
                .bento-grid { }
                @media (max-width: 900px) { .bento-grid { grid-template-columns: 1fr 1fr !important; } .bento-grid > a { grid-column: span 1 !important; grid-row: span 1 !important; } }
                @media (max-width: 600px) { .bento-grid { grid-template-columns: 1fr !important; } }
            `)));
}
function ClosingCTA() {
  return React.createElement("section", {
    style: {
      padding: '140px 40px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(var(--line) 1.5px, transparent 1px)',
      backgroundSize: '32px 32px',
      opacity: 0.3,
      pointerEvents: 'none'
    }
  }), React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '80vw',
      height: '50vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
      pointerEvents: 'none',
      filter: 'blur(60px)'
    }
  }), React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, React.createElement("div", {
    className: "badge-float",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px 6px 6px',
      borderRadius: 100,
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      fontSize: 12,
      color: 'var(--fg-dim)',
      marginBottom: 32
    }
  }, React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: 'var(--ok)',
      animation: 'pulseLive 2s infinite'
    }
  }), "kozzyx is online \xB7 ready for your server"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(48px, 7vw, 96px)',
      margin: '0 0 16px',
      fontWeight: 500,
      letterSpacing: '-0.04em',
      lineHeight: 0.95,
      textWrap: 'balance'
    }
  }, "Add kozzyx to", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "your server"), "."), React.createElement("p", {
    style: {
      fontSize: 18,
      color: 'var(--fg-dim)',
      margin: '24px auto',
      maxWidth: 440,
      lineHeight: 1.6
    }
  }, "30 seconds to add. 63 commands, all free. No premium tier, no hidden limits."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      marginTop: 40,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, React.createElement("a", {
    href: window.KOZZ.INVITE_URL,
    target: "_blank",
    rel: "noopener",
    className: "glass-hover",
    style: {
      padding: '16px 36px',
      background: 'var(--accent)',
      color: 'var(--accent-fg)',
      borderRadius: 14,
      fontSize: 16,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      boxShadow: '0 8px 32px -8px var(--accent-glow)'
    }
  }, React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, React.createElement("path", {
    d: "M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22H3.42C2.064 21.168.96 20.064.96 18.696V2.472C.96 1.104 2.064 0 3.42 0h16.12z"
  })), "Add to Discord"), React.createElement("a", {
    href: "commands.html",
    className: "glass",
    style: {
      padding: '16px 28px',
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--fg)',
      display: 'inline-block',
      transition: 'all 0.2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.background = 'var(--bg-elev-2)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--glass-border)';
      e.currentTarget.style.background = 'var(--glass-bg)';
    }
  }, "Browse all 63 commands \u2192"))));
}
function HeroParticles() {
  const particles = Array.from({
    length: 24
  }).map((_, i) => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    '--dur': 15 + Math.random() * 25 + 's',
    '--tx': Math.random() * 200 - 100 + 'px',
    '--ty': -(150 + Math.random() * 250) + 'px',
    animationDelay: Math.random() * -20 + 's'
  }));
  return React.createElement("div", {
    className: "particles"
  }, particles.map((style, i) => React.createElement("div", {
    key: i,
    className: "particle",
    style: style
  })));
}
function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return React.createElement("button", {
    onClick: () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }),
    style: {
      position: 'fixed',
      bottom: 32,
      right: 32,
      width: 48,
      height: 48,
      borderRadius: 24,
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      color: 'var(--fg)',
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.color = 'var(--accent)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.color = 'var(--fg)';
    }
  }, React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("polyline", {
    points: "18 15 12 9 6 15"
  })));
}
Object.assign(window, {
  HeroParticles,
  ScrollToTop,
  TrustPrivacy,
  ApiDocs,
  DashboardPreview
});
function TrustPrivacy() {
  return React.createElement("section", {
    style: {
      padding: '80px 40px',
      maxWidth: 1320,
      margin: '0 auto'
    },
    "data-reveal": "up"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 40,
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderRadius: 24,
      padding: 48
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 400
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: 12
    }
  }, "\xA7 Trust & Privacy"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(28px, 3vw, 40px)',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      margin: '0 0 16px',
      lineHeight: 1.05
    }
  }, "Built on ", React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--ok)',
      fontWeight: 400
    }
  }, "Transparency.")), React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--fg-dim)',
      lineHeight: 1.6,
      margin: 0
    }
  }, "Moderation bots require high permissions. We take that responsibility seriously. KozzyX processes data in memory and immediately forgets it.")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'color-mix(in oklab, var(--ok) 15%, transparent)',
      color: 'var(--ok)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 4
    }
  }, "End-to-End Encryption"), React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg-dim)'
    }
  }, "All API traffic to Google Gemini and Discord is securely encrypted in transit."))), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--bg-elev-2)',
      color: 'var(--fg)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  }))), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 4
    }
  }, "Zero Long-term Logging"), React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg-dim)'
    }
  }, "Messages analyzed by automod or AI are processed and instantly discarded."))))));
}
function App() {
  const [theme, setTheme] = React.useState(() => 'dark');
  const [accent, setAccent] = React.useState(() => window.KOZZ_TWEAKS?.accent || 'violet');
  const [editMode, setEditMode] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kzTheme', theme);
  }, [theme]);
  React.useEffect(() => {
    const a = window.KOZZ.ACCENTS[accent];
    if (a) document.documentElement.style.setProperty('--accent', `oklch(${a.oklch})`);
    document.documentElement.style.setProperty('--accent-soft', `oklch(${a?.oklch} / 0.14)`);
  }, [accent]);
  React.useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
    });
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
  }, []);
  const handleSetAccent = a => {
    setAccent(a);
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: {
        accent: a
      }
    }, '*');
  };
  return React.createElement(React.Fragment, null, React.createElement(Nav, {
    theme: theme,
    setTheme: setTheme
  }), React.createElement(Hero, null), React.createElement(MarqueeDivider, null), React.createElement(Stats, null), React.createElement(TrustPrivacy, null), React.createElement(HowItWorks, null), React.createElement(Story, null), React.createElement(FeatureCards, null), React.createElement(CommandBrowser, null), React.createElement(FAQ, null), React.createElement(ClosingCTA, null), React.createElement(Footer, null), React.createElement(ScrollToTop, null), React.createElement(TweakPanel, {
    accent: accent,
    setAccent: handleSetAccent,
    visible: editMode
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));

requestAnimationFrame(() => setTimeout(() => {

  const revealTargets = [['section > div > h2', 'up'], ['section > div .serif', 'up'], ['section p', 'up'], ['.discord-preview, [style*="border-radius: 16"]', 'scale']];

  document.querySelectorAll('section').forEach(sec => {
    if (!sec.hasAttribute('data-reveal')) sec.setAttribute('data-reveal', 'up');
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  document.querySelectorAll('a, button').forEach(el => {
    const isCta = (el.textContent || '').match(/Add to Discord|View commands|Read the docs|See commands/);
    if (!isCta) return;
    el.classList.add('magnetic');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  const mascotWrap = document.querySelector('section [style*="animation: float"]');
  if (mascotWrap) {
    addEventListener('scroll', () => {
      const y = scrollY * 0.15;
      mascotWrap.style.setProperty('transform', `translateY(${-y}px)`);
    }, {
      passive: true
    });
  }

  document.querySelectorAll('[data-tiltcard]').forEach(card => {
    card.classList.add('spotlight-card');
    card.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const heroItalic = document.querySelector('h1 .serif');
  if (heroItalic) heroItalic.classList.add('shine');

  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    addEventListener('scroll', () => {
      const total = document.body.scrollHeight - innerHeight;
      progressBar.style.width = scrollY / total * 100 + '%';
    }, {
      passive: true
    });
  }

  const staggerObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        staggerObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.1
  });
  document.querySelectorAll('[data-stagger]').forEach(el => staggerObs.observe(el));

  const statCells = document.querySelectorAll('[data-statcell]');
  const popObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('counter-pop');
        popObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.4
  });
  statCells.forEach(el => popObs.observe(el));

  let kShown = false;
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !kShown) {
      kShown = true;
      const toast = document.createElement('div');
      toast.textContent = '⌘K — jumped to search';
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '96px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--bg-elev)',
        border: '1px solid var(--line)',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '13px',
        color: 'var(--fg-dim)',
        zIndex: '99999',
        fontFamily: 'Geist Mono, monospace',
        animation: 'fadeUp 0.3s ease',
        pointerEvents: 'none'
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  });
}, 300));
