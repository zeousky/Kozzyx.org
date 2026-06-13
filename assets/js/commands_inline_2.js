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
    alert: 'M 82 132 L 118 132'
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
    r: "5",
    fill: "var(--accent)"
  }, React.createElement("animate", {
    attributeName: "r",
    values: "5;6;5",
    dur: "1.8s",
    repeatCount: "indefinite"
  })), React.createElement("rect", {
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
    cx: "84",
    cy: "100",
    r: "1.5",
    fill: "var(--accent)"
  }), React.createElement("circle", {
    cx: "120",
    cy: "100",
    r: "1.5",
    fill: "var(--accent)"
  }))), React.createElement("path", {
    d: mouthPath,
    stroke: "#fff",
    strokeWidth: "3",
    fill: "none",
    strokeLinecap: "round"
  }), React.createElement("circle", {
    cx: "62",
    cy: "122",
    r: "4",
    fill: "var(--accent)",
    opacity: "0.4"
  }), React.createElement("circle", {
    cx: "138",
    cy: "122",
    r: "4",
    fill: "var(--accent)",
    opacity: "0.4"
  }), React.createElement("rect", {
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
      display: 'block'
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
    r: "1.5",
    fill: "var(--accent)"
  }));
}
Object.assign(window, {
  Mascot,
  MascotMini
});
function ScrambleText({
  text,
  delay = 0
}) {
  const [out, setOut] = React.useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#_';
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
  return React.createElement("span", null, out || '\u00A0');
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
      padding: '72px 40px 40px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
      opacity: 0.5
    }
  }), React.createElement("div", {
    className: "footer-grid",
    style: {
      maxWidth: 1320,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 56
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16
    }
  }, React.createElement(MascotMini, {
    size: 28
  }), React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "kozzyx")), React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg-dim)',
      lineHeight: 1.6,
      maxWidth: 320,
      margin: 0
    }
  }, "An all-in-one Discord bot \u2014 moderation, AI, tickets, polls, giveaways, and server setup. Built by one person, running on GCP, powered by the Gemini API."), React.createElement("div", {
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
    onMouseEnter: e => e.currentTarget.style.color = 'var(--fg)',
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
  }, "@kozzyxofficialx")), React.createElement("span", {
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
function Commands() {
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
  }, "\xA7 03 \u2014 commands"), React.createElement("h2", {
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
  }, "/"), React.createElement("span", {
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
Object.assign(window, {
  Commands
});
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
  }), React.createElement("section", {
    style: {
      padding: '80px 40px 0',
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-faint)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "commands"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(40px, 5vw, 72px)',
      margin: '12px 0 0',
      fontWeight: 500,
      letterSpacing: '-0.03em',
      lineHeight: 1
    }
  }, "63 commands.", React.createElement("br", null), React.createElement("span", {
    className: "serif",
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)',
      fontWeight: 400
    }
  }, "slash + prefix, all free")), React.createElement(Commands, null), React.createElement(Footer, null), React.createElement(TweakPanel, {
    accent: accent,
    setAccent: handleSetAccent,
    visible: editMode
  })));
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
