# Online Meeting Landing Page

Online Meeting Landing Page is a Landing page with a countdown timer for online workshop or seminars using video conference apps. This will redirect you to the video conferencing apps (ex. Google Meets, Zoom) at the time you set it up. This will prevents any of participants entering the room before time.

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install foobar.

```bash
npm install
```

### Requirements

npm @6.9.0

## Usage

To start you need to run webpack service

```bash
npm start
```

If you do not know what you are doing, make sure change only `./src` directory. The HTML files will be compiled by webpack from `index.ejs` file.

To change the content, please kindly change your meeting details at `./src/db/db.json` files. If you change the html content directly it will be overriden.

```json
{
  "url": "https://www.bncc.net/",
  "time": {
    "date": 25,
    "month": 2,
    "year": 2020,
    "hours": 9,
    "minutes": 15,
    "seconds": 0
  },
  "title": "BNCC Webinar Series",
  "subtitle": "Tema acara nih",
  "series": "What is Product Manager?"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
