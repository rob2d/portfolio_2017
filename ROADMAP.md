# ROADMAP #
## [ Roadmap All the Things ™ ] ##
------------------------------

## Systematic fixes

- replace instances of `withStyles` of `MaterialUI` with `injectJSS` and simpy pull theme directly using Redux in all cases-- this would reduce bundle size a bit (+ consistency is an amazing thing).
[Random thought: could be simplified with a custom HOC linking to `core.theme`]
(this is in progress)

- go through components and determine `recompose/pure` usage to be sure the hierarchy is best for rendering efficiency.

- react-redux-router is deprecated. Migrate to another library (completely does the job for now though w R16+Redux)

## MediaReel

- cache instances of YouTube player while parent still mounted so that there's no need to reload iframe

## Technologies
- Create Custom monochrome SVGs to substitute tech text

- Allow filtering of techs in Projects view

- When a project card fades into a title, it should retain a banner that is faded from white; this should make ProjectDescription views a lot less depressing for people who aren't me.
