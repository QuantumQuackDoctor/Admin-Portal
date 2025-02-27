# General information

## CSS

Prefix all classnames and ids with component name
ex.

```
.Header-link
```

## Services

Services will be provided use context, add services in the ServiceProvider and create a custom hook for them

```
const services = {
    authentication: new AuthService(),
};
```

```
export const useAuth = () => {
  return useContext(ServiceContext).authentication;
};

```

## style

Main pages will display data using widgets, these should redirect to more specific pages if needed.

```
<WidgetContainer>
    <Widget title="Title">
        content goes here
    </Widget>
</WidgetContainer>
```

Widget container handles layout, Widget applies some default styles and adds a close button

## Form Builder

# New Features

the onsubmit function can now recieve two parameters, the first parameter is the same as it has been. the second parameter is a reference to a function that will reset the form, calling the second parameter does just that.

# General Usage I guess

formbuilder is a utility for making fairly customizable form widgets
general usage

```
let builder = new FormBuilder("testTitle")
    .addField("test", "test")
    .setPlaceholder("placeholder")
    .setValidators([Validators.Required])
    .setErrorMessage("required")
    .and()
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .and();
```

```
<WidgetContainer>
    {builder.build((value) => {
    console.log(value);
    })}
</WidgetContainer>
```

### Formbuilder rows

```
let builder = new FormBuilder("testTitle")
    .setUseRows(true)

    //This field is in row 0
    .addField("test", "test")
    .setPlaceholder("placeholder")
    .setValidators([Validators.Required])
    .setErrorMessage("required")
    .and()

    //This field starts row 1
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .setDesiredRow(1) //!!this changes the row
    .and();

    //This field is now part of row 1
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .and();


    //This field starts row 2
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .setDesiredRow(2) //!!this changes the row
    .and();

    //This field is now part of row 2
    .addField("2", "2")
    .setPlaceholder("placeholder2")
    .setIcon(<FaThemeisle />)
    .and();

```

Upon setting useRows to true all fields are horizontally aligned (default useRows is false)
Desired row is applied to all fields following it

# How to add the header to a route

```
<Header>
    Any child components of header will be properly aligned with it.
</Header>
Any components specified here will be partially covered by header
```

Components outside of header will be covered on the left and bottom

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
