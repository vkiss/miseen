# mise en package
[![npm version](https://badge.fury.io/js/miseen.svg)](https://badge.fury.io/js/miseen)

A node library to create folders and change files permission using config files only

## Instalation

```sh
npm i miseen --save-dev
```

## How to create a folter
```json
# package.json
{
  "scripts": {
    "create-folder": "miseen mkdir"
  },
  "miseen": {
    "mkdir": [
      {
        "path": "temp-folder"
      }
    ],
  }
}
```

Now run `npm run create-folder` and a "temp-folder" will be created at the root of your repository.

### mkdir - options

You must add a configuration either within `package.json`, or creating a `.miseenrc`

#### Using `package.json`

```json
{
  "miseen": {
    "mkdir": [
      {
        "path": "temp-folder"
      }
      {
        "path": "nest-folder/inner-folder"
      }
    ],
  }
}
```

#### Using `.miseenrc`

```yml
mkdir:
  -
    path: temp
  -
    path: nest-folder/inner-folder
```

## How to change files permissiont
```json
# package.json
{
  "scripts": {
    "change-files-permission": "miseen chmod"
  },
  "miseen": {
    "chmod": [
      {
        "path": "temp-folder",
        "mode": 777
      }
    ],
  }
}
```

Now run `npm run change-files-permission` and every file inside "/temp-folder" will receive 777 as their permission mode.

### chmod - options

You must add a configuration either within `package.json`, or creating a `.miseenrc`

#### Using `package.json`

```json
{
  "miseen": {
    "chmod": [
      {
        "path": "temp-folder",
        "mode": 777,
      }
      {
        "path": "nest-folder/inner-folder",
        "mode": 775,
      }
    ],
  }
}
```

#### Using `.miseenrc`

```yml
chmod:
  -
    path: "temp-folder"
    mode: 777
  -
    path: "nest-folder/inner-folder"
    mode: 775
```

# Command line

If you run `miseen` without any parameter, it will run both `mkdir` and `chmod`, if they have valid configurations.\
This way, you can combine routine to better suit your needs.