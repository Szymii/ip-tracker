# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)

My solution URL: [https://szymii.github.io/ip--tracker/](https://szymii.github.io/ip-tracker/)

### ‼If the page doesn't work please disable adblock because it may blocking Geolocation API‼

## The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

## My process

### Built with

- Semantic HTML5 markup
- [SCSS](https://sass-lang.com/)
- Flexbox and Grid
- Mobile-first workflow
- Geolocation API [https://geo.ipify.org/](https://geo.ipify.org/)
- Leaflet - an open-source JavaScript library for mobile-friendly interactive maps [https://leafletjs.com/](https://leafletjs.com/)

### Intresting problem

Chrome changes the background color while auto-filling, this messed up the look of my custom loader.

To prevent this behavior I used this code:

```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease-in-out 0s;
  transition-property: background-color, color;
}
```

Solution from [stackoverflow](https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete)
