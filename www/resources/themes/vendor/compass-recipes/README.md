# Compass Recipes ![project status](https://stillmaintained.com/MoOx/compass-recipes.png)

A series of Compass and Sass mixins and functions for creating delicious CSS effects.

## [Demos](https://moox.github.com/compass-recipes/)

Note: These are demos of the repository at its current state, *not* the last stable gem. To get the most up-to-date recipes, please see Installation for instructions on installing the repo at his current state*

## Types of Recipes

* **[Backgrounds](https://moox.github.com/compass-recipes/recipes/background/)** - Background patterns, gradients.
* **Color** Advanced color functions like `brightness()`
* **[Effects](https://moox.github.com/compass-recipes/recipes/effect/)** - Visual effects like `bevel` and `cutout`
* **[Form skins](https://moox.github.com/compass-recipes/recipes/form/skin/)** - Only one at the moment.
* **[Icons](https://moox.github.com/compass-recipes/recipes/icon)** - Includes webfont icon support and a few open source fonts.
* **[Layout](https://moox.github.com/compass-recipes/recipes/layout)** - Vertical centering and box layout shortcuts.
* **[Media queries](https://moox.github.com/compass-recipes/recipes/media-queries)** - Predefined queries for common device widths. *Experimental: Uses `compass --pre`*
* **[Shadows](https://moox.github.com/compass-recipes/recipes/shadow/)** - A wide collection of shadows which use pseudo elements to create fold effects, etc.
* **[Shapes](https://moox.github.com/compass-recipes/recipes/shape/)** - Geometric and iconic shapes, created only with CSS
* **[Shared](https://moox.github.com/compass-recipes/recipes/shared/)** - Common CSS tricks and hacks.
* **[UI](https://moox.github.com/compass-recipes/recipes/ui/)** Element styling for buttons, etc.
* View other potential items: https://moox.github.com/compass-recipes/issues/

## Installation

[Compass Recipes is available as a gem on RubyGems.org](https://rubygems.org/gems/compass-recipes), so installation is quite easy.

```shell
gem install compass-recipes
```

*If you want all latests recipes, you can just checkout the recipes (or download as zip) and add '{your-path-here-or-./}compass-recipes/stylesheets' using `additional_import_paths` or `add_import_path` (see [Compass configuration reference](https://compass-style.org/help/tutorials/configuration-reference/)*

# Usage

When compass-recipes installed, you just need to require the compass plugin in your project

```css
require 'compass-recipes'
```

Then you can include some recipes like this

```css
@import "recipes/shape/triangle";
.my-triangle
{
    @include triangle;
}
```

Like Compass does, you can include all recipes in a folder like this

```css
@import "recipes/shape";

.my-triangle
{
    @include triangle;
}

.my-square
{
    @include square;
}
```

## Authors/Maintainers
 
Compass Recipes is maintained by [Maxime Thirouin](https://moox.fr), a front-end web developer at [Shopbot](https://shopbot-inc.com), and [David Kaneda](https://www.davidkaneda.com), creative director at [Sencha](https://www.sencha.com).

### Sous Chefs

While Maxime and David are the primary project maintainers, these people have provided lots of the core ideas and techniques in the recipes. They are the bacon in our BLT: [@simurai](https://twitter.com/simurai), [@chriscoyier](https://twitter.com/chriscoyier), [@leaverou](https://twitter.com/leaverou), [@necolas](https://twitter.com/necolas).

## Open to All

If you have a nifty CSS trick that makes sense to be abstracted (and isn't already in another Github repo), please fork and submit a pull request. Note: If you are not the author of the CSS trick, you must get their permission before adding.

## Build Documentation

First you need bundle

```bundle install```

Then, to build the gh-pages from the `tests/`, you need to call

```bundle exec rake pages```

## Additional Resources

Some other great CSS/SCSS/design projects for making delicious websites:

* [Normalize](https://necolas.github.com/normalize.css/) - The standard of CSS normalizations.
* [Subtle Patterns](https://subtlepatterns.com/) - Great collection of free background patterns, some of which are not possible with CSS alone.
* [Animate.sass](https://github.com/adamstac/animate.sass) - A bevy of pre-defined keyframe animations.
* [OMG Text](https://jaredhardy.com/omg-text/) - Some super-rad text effects using text-shadow

## License

Copyright (c) 2012 Maxime Thirouin

Released under [MIT Licence](https://moox.mit-license.org/)