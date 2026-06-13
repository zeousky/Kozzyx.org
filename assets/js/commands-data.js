window.KOZZ_COMMANDS = [

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
