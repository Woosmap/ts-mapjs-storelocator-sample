# Woosmap Map StoreLocator Sample

Store Locator sample based on *Woosmap Map JS* using *Typescript* and *VanillaJS* (No framework / Library dependencies).

The Web App is built using a Component States approach. 

Each component (map, search, store details, store list, ...) can communicate to their parent/child component(s) triggering events.

Some features of this sample:

- Search a Locality using the [Localities Widget](https://developers.woosmap.com/products/localities/localities-widget/quick-start/)
- Search Stores nearby a locality using [Stores Search API](https://developers.woosmap.com/products/search-api/get-started/)
- Get Directions using Woosmap [Distance Route API](https://developers.woosmap.com/products/distance-api/route-endpoint/)
- Filter your Stores by specific services using [Stores Search API](https://developers.woosmap.com/products/search-api/get-started/)
- Navigate and select stores on the map displayed using the [Map JS API](https://developers.woosmap.com/products/map-api/get-started/)


## Dev Install
### Install dependencies

```ShellSession
$ npm install
```

### Run
```ShellSession
$ npm start
```
Navigate to http://localhost:1234/

## Production build
```ShellSession
$ npm run build
```
