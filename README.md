# 📸 rayli

📸 A command-line tool to generate code images of your local code right away from the terminal

- [Usage](#usage)
- [Commands](#commands)

# Usage

```sh-session
$ npm install -g rayli
$ rayli COMMAND
running command...
$ rayli (--version)
rayli/0.0.1 win32-x64 node-v16.13.0
$ rayli --help [COMMAND]
USAGE
  $ rayli COMMAND
...
```

# Commands

- [`rayli config`](#rayli-config)
- [`rayli config:remove`](#rayli-configremove)
- [`rayli config:show`](#rayli-configshow)
- [`rayli generate`](#rayli-generate)
- [`rayli gist`](#rayli-gist)
- [`rayli github`](#rayli-github)
- [`rayli help [COMMAND]`](#rayli-help-command)

## `rayli config`

🔐 Configure the default values

```
USAGE
  $ rayli config

DESCRIPTION
  🔐 Configure the default values

EXAMPLES
  $ rayli config
```

## `rayli config:remove`

🚚 Remove the configured values

```
USAGE
  $ rayli config:remove

DESCRIPTION
  🚚 Remove the configured values

EXAMPLES
  $ rayli config:remove
```

## `rayli config:show`

👀 Check your configured values

```
USAGE
  $ rayli config:show

DESCRIPTION
  👀 Check your configured values

EXAMPLES
  $ rayli config:show
```

## `rayli generate`

📷 Generate a beautiful image of your code snippet

```
USAGE
  $ rayli generate [-c]

FLAGS
  -c, --[no-]config  🔐 Use the default configured values

DESCRIPTION
  📷 Generate a beautiful image of your code snippet

EXAMPLES
  $ rayli generate --config
```

## `rayli gist`

🌌 Generate a beautiful image of your gist

```
USAGE
  $ rayli gist -u <value> [-c]

FLAGS
  -c, --[no-]config  🔐 Use the default configured values
  -u, --url=<value>  (required) 🔗 Link of the gist

DESCRIPTION
  🌌 Generate a beautiful image of your gist

EXAMPLES
  $ rayli gist --url=https://gist.github.com/Kira272921/bfce776b3ad1145f764d89c296fec605
```

## `rayli github`

🐱 Generate a beautiful image of your code hosted on GitHub

```
USAGE
  $ rayli github -u <value> [-c]

FLAGS
  -c, --[no-]config  🔐 Use the default configured values
  -u, --url=<value>  (required) 🔗 Link of the code

DESCRIPTION
  🐱 Generate a beautiful image of your code hosted on GitHub

EXAMPLES
  $ rayli github --url=https://raw.githubusercontent.com/Kira272921/snipli/main/src/commands/download.ts
```

## `rayli help [COMMAND]`

Display help for rayli.

```
USAGE
  $ rayli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rayli.
```
