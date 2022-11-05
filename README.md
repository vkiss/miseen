# miseen
[![npm version](https://badge.fury.io/js/miseen.svg)](https://badge.fury.io/js/miseen)

A node library to create folders using config files only

## Instalation

```sh
npm i miseen --save-dev
```

## How
```json
# package.json
{
  "scripts": {
    "clean": "miseen"
  },
  "miseen": {
    "mkdir": "temp-folder",
  }
}
```

The `miseen.mkdir` value can a string, or an array of glob patterns strings.

## Configuration

You must add a configuration either within `package.json`, or creating a `.miseenrc`

#### Using `package.json`

```json
{
  "miseen": {
    "mkdir": [
      "temp",
      "nest-folder/inner-folder"
    ],
  }
}
```

#### Using `.miseenrc`

```yml
mkdir:
  - temp
  - nest-folder/inner-folder
```
