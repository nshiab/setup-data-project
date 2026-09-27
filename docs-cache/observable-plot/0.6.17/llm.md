# Observable Plot 0.6.17

Package: `@observablehq/plot@0.6.17`. Source:
[v0.6.17](https://github.com/observablehq/plot/tree/v0.6.17/docs).

This reference combines selected upstream documentation for static charts and
maps. Introductory and site pages, interaction helpers, and the Auto and Tip
marks are omitted. Vue components and plot fences are retained as source
examples. Use the table of contents to find API signatures and examples; links
to omitted pages lead to the tagged upstream documentation.

## Table of contents

- [features/curves.md](#plot-features--curves)
  - [Curves](#plot-features--curves--curves)
- [features/facets.md](#plot-features--facets)
  - [Facets](#plot-features--facets--facets)
  - [Mark facet options](#plot-features--facets--mark-facet-options)
  - [Plot facet options](#plot-features--facets--plot-facet-options)
  - [Facet scales](#plot-features--facets--facet-scales)
- [features/formats.md](#plot-features--formats)
  - [Formats](#plot-features--formats--formats)
  - [formatNumber(_locale_) <VersionBadge version="0.6.15" pr="2078" />](#plot-features--formats--formatNumber)
  - [formatIsoDate(_date_)](#plot-features--formats--formatIsoDate)
  - [formatWeekday(_locale_, _format_)](#plot-features--formats--formatWeekday)
  - [formatMonth(_locale_, _format_)](#plot-features--formats--formatMonth)
- [features/legends.md](#plot-features--legends)
  - [Legends <VersionBadge version="0.3.0" />](#plot-features--legends--legends)
  - [Legend options](#plot-features--legends--legend-options)
  - [legend(_options_)](#plot-features--legends--legend)
- [features/marks.md](#plot-features--marks)
  - [Marks](#plot-features--marks--Marks)
  - [Marks are geometric shapes](#plot-features--marks--marks-are-geometric-shapes)
  - [Marks are layered](#plot-features--marks--marks-are-layered)
  - [Marks use scales](#plot-features--marks--marks-use-scales)
  - [Marks have tidy data](#plot-features--marks--marks-have-tidy-data)
  - [Marks imply data types](#plot-features--marks--marks-imply-data-types)
  - [Marks have options](#plot-features--marks--marks-have-options)
  - [Marks have channels](#plot-features--marks--marks-have-channels)
  - [Mark options](#plot-features--marks--mark-options)
  - [Insets](#plot-features--marks--insets)
  - [Rounded corners](#plot-features--marks--rounded-corners)
  - [marks(..._marks_) <VersionBadge version="0.2.0" />](#plot-features--marks--marks)
- [features/plots.md](#plot-features--plots)
  - [Plots](#plot-features--plots--plots)
  - [Marks option](#plot-features--plots--marks-option)
  - [Layout options](#plot-features--plots--layout-options)
  - [Other options](#plot-features--plots--other-options)
  - [plot(_options_)](#plot-features--plots--plot)
  - [_mark_.plot(_options_)](#plot-features--plots--mark_plot)
  - [_plot_.scale(_name_)](#plot-features--plots--plot_scale)
  - [_plot_.legend(_name_, _options_)](#plot-features--plots--plot_legend)
- [features/projections.md](#plot-features--projections)
  - [Projections <VersionBadge version="0.6.1" />](#plot-features--projections--projections)
  - [Projection options](#plot-features--projections--projection-options)
- [features/scales.md](#plot-features--scales)
  - [Scales](#plot-features--scales--scales)
  - [Continuous scales](#plot-features--scales--continuous-scales)
  - [Discrete scales](#plot-features--scales--discrete-scales)
  - [Color scales](#plot-features--scales--color-scales)
  - [Other scales](#plot-features--scales--other-scales)
  - [Type inference](#plot-features--scales--type-inference)
  - [Scale transforms](#plot-features--scales--scale-transforms)
  - [Scale options](#plot-features--scales--scale-options)
  - [Color scale options](#plot-features--scales--color-scale-options)
  - [Position scale options](#plot-features--scales--position-scale-options)
  - [Sort mark option <VersionBadge version="0.2.0" />](#plot-features--scales--sort-mark-option)
  - [scale(_options_) <VersionBadge version="0.4.0" />](#plot-features--scales--scale)
- [marks/area.md](#plot-marks--area)
  - [Area mark](#plot-marks--area--area-mark)
  - [Area options](#plot-marks--area--area-options)
  - [areaY(_data_, _options_)](#plot-marks--area--areaY)
  - [areaX(_data_, _options_)](#plot-marks--area--areaX)
  - [area(_data_, _options_)](#plot-marks--area--area)
- [marks/arrow.md](#plot-marks--arrow)
  - [Arrow mark <VersionBadge version="0.4.0" />](#plot-marks--arrow--arrow-mark)
  - [Arrow options](#plot-marks--arrow--arrow-options)
  - [arrow(_data_, _options_)](#plot-marks--arrow--arrow)
- [marks/axis.md](#plot-marks--axis)
  - [Axis mark <VersionBadge version="0.6.3" />](#plot-marks--axis--axis-mark)
  - [Axis options](#plot-marks--axis--axis-options)
  - [axisX(_data_, _options_)](#plot-marks--axis--axisX)
  - [axisY(_data_, _options_)](#plot-marks--axis--axisY)
  - [axisFx(_data_, _options_)](#plot-marks--axis--axisFx)
  - [axisFy(_data_, _options_)](#plot-marks--axis--axisFy)
- [marks/bar.md](#plot-marks--bar)
  - [Bar mark](#plot-marks--bar--bar-mark)
  - [Bar options](#plot-marks--bar--bar-options)
  - [barX(_data_, _options_)](#plot-marks--bar--barX)
  - [barY(_data_, _options_)](#plot-marks--bar--barY)
- [marks/bollinger.md](#plot-marks--bollinger)
  - [Bollinger mark <VersionBadge version="0.6.10" pr="1772" />](#plot-marks--bollinger--bollinger-mark)
  - [Bollinger options](#plot-marks--bollinger--bollinger-options)
  - [bollingerX(_data_, _options_)](#plot-marks--bollinger--bollingerX)
  - [bollingerY(_data_, _options_)](#plot-marks--bollinger--bollingerY)
  - [bollinger(_options_)](#plot-marks--bollinger--bollinger)
- [marks/box.md](#plot-marks--box)
  - [Box mark <VersionBadge version="0.4.2" />](#plot-marks--box--box-mark)
  - [Box options](#plot-marks--box--box-options)
  - [boxX(_data_, _options_)](#plot-marks--box--boxX)
  - [boxY(_data_, _options_)](#plot-marks--box--boxY)
- [marks/cell.md](#plot-marks--cell)
  - [Cell mark](#plot-marks--cell--cell-mark)
  - [Cell options](#plot-marks--cell--cell-options)
  - [cell(_data_, _options_)](#plot-marks--cell--cell)
  - [cellX(_data_, _options_)](#plot-marks--cell--cellX)
  - [cellY(_data_, _options_)](#plot-marks--cell--cellY)
- [marks/contour.md](#plot-marks--contour)
  - [Contour mark <VersionBadge version="0.6.2" />](#plot-marks--contour--contour-mark)
  - [Contour options](#plot-marks--contour--contour-options)
  - [contour(_data_, _options_)](#plot-marks--contour--contour)
- [marks/delaunay.md](#plot-marks--delaunay)
  - [Delaunay marks <VersionBadge version="0.5.1" />](#plot-marks--delaunay--delaunay-marks)
  - [delaunayLink(_data_, _options_)](#plot-marks--delaunay--delaunayLink)
  - [delaunayMesh(_data_, _options_)](#plot-marks--delaunay--delaunayMesh)
  - [hull(_data_, _options_)](#plot-marks--delaunay--hull)
  - [voronoi(_data_, _options_)](#plot-marks--delaunay--voronoi)
  - [voronoiMesh(_data_, _options_)](#plot-marks--delaunay--voronoiMesh)
- [marks/density.md](#plot-marks--density)
  - [Density mark <VersionBadge version="0.5.1" />](#plot-marks--density--density-mark)
  - [Density options](#plot-marks--density--density-options)
  - [density(_data_, _options_)](#plot-marks--density--density)
- [marks/difference.md](#plot-marks--difference)
  - [Difference mark <VersionBadge version="0.6.12" pr="1896" />](#plot-marks--difference--difference-mark)
  - [Difference options](#plot-marks--difference--difference-options)
  - [differenceY(_data_, _options_)](#plot-marks--difference--differenceY)
  - [differenceX(_data_, _options_) <VersionBadge version="0.6.16" pr="1922" />](#plot-marks--difference--differenceX)
- [marks/dot.md](#plot-marks--dot)
  - [Dot mark](#plot-marks--dot--dot-mark)
  - [Dot options](#plot-marks--dot--dot-options)
  - [dot(_data_, _options_)](#plot-marks--dot--dot)
  - [dotX(_data_, _options_)](#plot-marks--dot--dotX)
  - [dotY(_data_, _options_)](#plot-marks--dot--dotY)
  - [circle(_data_, _options_) <VersionBadge version="0.5.0" />](#plot-marks--dot--circle)
  - [hexagon(_data_, _options_) <VersionBadge version="0.5.0" />](#plot-marks--dot--hexagon)
- [marks/frame.md](#plot-marks--frame)
  - [Frame mark](#plot-marks--frame--frame-mark)
  - [Frame options](#plot-marks--frame--frame-options)
  - [frame(_options_)](#plot-marks--frame--frame)
- [marks/geo.md](#plot-marks--geo)
  - [Geo mark <VersionBadge version="0.6.1" />](#plot-marks--geo--geo-mark)
  - [Geo options](#plot-marks--geo--geo-options)
  - [geo(_data_, _options_)](#plot-marks--geo--geo)
  - [sphere(_options_) <VersionBadge version="0.6.1" />](#plot-marks--geo--sphere)
  - [graticule(_options_) <VersionBadge version="0.6.1" />](#plot-marks--geo--graticule)
- [marks/grid.md](#plot-marks--grid)
  - [Grid mark <VersionBadge version="0.6.3" />](#plot-marks--grid--grid-mark)
  - [Grid options](#plot-marks--grid--grid-options)
  - [gridX(_data_, _options_)](#plot-marks--grid--gridX)
  - [gridY(_data_, _options_)](#plot-marks--grid--gridY)
  - [gridFx(_data_, _options_)](#plot-marks--grid--gridFx)
  - [gridFy(_data_, _options_)](#plot-marks--grid--gridFy)
- [marks/hexgrid.md](#plot-marks--hexgrid)
  - [Hexgrid mark <VersionBadge version="0.5.0" />](#plot-marks--hexgrid--hexgrid-mark)
  - [Hexgrid options](#plot-marks--hexgrid--hexgrid-options)
  - [hexgrid(_options_)](#plot-marks--hexgrid--hexgrid)
- [marks/image.md](#plot-marks--image)
  - [Image mark <VersionBadge version="0.3.0" />](#plot-marks--image--image-mark)
  - [Image options](#plot-marks--image--image-options)
  - [image(_data_, _options_)](#plot-marks--image--image)
- [marks/line.md](#plot-marks--line)
  - [Line mark](#plot-marks--line--line-mark)
  - [Line options](#plot-marks--line--line-options)
  - [line(_data_, _options_)](#plot-marks--line--line)
  - [lineX(_data_, _options_)](#plot-marks--line--lineX)
  - [lineY(_data_, _options_)](#plot-marks--line--lineY)
- [marks/linear-regression.md](#plot-marks--linear-regression)
  - [Linear regression mark <VersionBadge version="0.5.1" />](#plot-marks--linear-regression--linear-regression-mark)
  - [Linear regression options](#plot-marks--linear-regression--linear-regression-options)
  - [linearRegressionX(_data_, _options_)](#plot-marks--linear-regression--linearRegressionX)
  - [linearRegressionY(_data_, _options_)](#plot-marks--linear-regression--linearRegressionY)
- [marks/link.md](#plot-marks--link)
  - [Link mark](#plot-marks--link--link-mark)
  - [Link options](#plot-marks--link--link-options)
  - [link(_data_, _options_)](#plot-marks--link--link)
- [marks/raster.md](#plot-marks--raster)
  - [Raster mark <VersionBadge version="0.6.2" />](#plot-marks--raster--raster-mark)
  - [Raster options](#plot-marks--raster--raster-options)
  - [raster(_data_, _options_)](#plot-marks--raster--raster)
  - [Spatial interpolators](#plot-marks--raster--spatial-interpolators)
  - [interpolateNone(_index_, _width_, _height_, _x_, _y_, _value_)](#plot-marks--raster--interpolateNone)
  - [interpolateNearest(_index_, _width_, _height_, _x_, _y_, _value_)](#plot-marks--raster--interpolateNearest)
  - [interpolatorBarycentric(_options_)](#plot-marks--raster--interpolatorBarycentric)
  - [interpolatorRandomWalk(_options_)](#plot-marks--raster--interpolatorRandomWalk)
- [marks/rect.md](#plot-marks--rect)
  - [Rect mark](#plot-marks--rect--rect-mark)
  - [Rect options](#plot-marks--rect--rect-options)
  - [rect(_data_, _options_)](#plot-marks--rect--rect)
  - [rectX(_data_, _options_)](#plot-marks--rect--rectX)
  - [rectY(_data_, _options_)](#plot-marks--rect--rectY)
- [marks/rule.md](#plot-marks--rule)
  - [Rule mark](#plot-marks--rule--rule-mark)
  - [Rule options](#plot-marks--rule--rule-options)
  - [ruleX(_data_, _options_)](#plot-marks--rule--ruleX)
  - [ruleY(_data_, _options_)](#plot-marks--rule--ruleY)
- [marks/text.md](#plot-marks--text)
  - [Text mark](#plot-marks--text--text-mark)
  - [Text options](#plot-marks--text--text-options)
  - [text(_data_, _options_)](#plot-marks--text--text)
  - [textX(_data_, _options_)](#plot-marks--text--textX)
  - [textY(_data_, _options_)](#plot-marks--text--textY)
- [marks/tick.md](#plot-marks--tick)
  - [Tick mark](#plot-marks--tick--tick-mark)
  - [Tick options](#plot-marks--tick--tick-options)
  - [tickX(_data_, _options_)](#plot-marks--tick--tickX)
  - [tickY(_data_, _options_)](#plot-marks--tick--tickY)
- [marks/tree.md](#plot-marks--tree)
  - [Tree mark <VersionBadge version="0.4.3" />](#plot-marks--tree--tree-mark)
  - [Tree options](#plot-marks--tree--tree-options)
  - [tree(_data_, _options_)](#plot-marks--tree--tree)
  - [cluster(_data_, _options_)](#plot-marks--tree--cluster)
- [marks/vector.md](#plot-marks--vector)
  - [Vector mark <VersionBadge version="0.4.0" />](#plot-marks--vector--vector-mark)
  - [Vector options](#plot-marks--vector--vector-options)
  - [vector(_data_, _options_)](#plot-marks--vector--vector)
  - [vectorX(_data_, _options_)](#plot-marks--vector--vectorX)
  - [vectorY(_data_, _options_)](#plot-marks--vector--vectorY)
  - [spike(_data_, _options_) <VersionBadge version="0.6.2" />](#plot-marks--vector--spike)
- [marks/waffle.md](#plot-marks--waffle)
  - [Waffle mark <VersionBadge version="0.6.16" pr="2040" />](#plot-marks--waffle--waffle-mark)
  - [Waffle options](#plot-marks--waffle--waffle-options)
  - [waffleX(_data_, _options_)](#plot-marks--waffle--waffleX)
  - [waffleY(_data_, _options_)](#plot-marks--waffle--waffleY)
- [transforms/bin.md](#plot-transforms--bin)
  - [Bin transform](#plot-transforms--bin--bin-transform)
  - [Bin options](#plot-transforms--bin--bin-options)
  - [bin(_outputs_, _options_)](#plot-transforms--bin--bin)
  - [binX(_outputs_, _options_)](#plot-transforms--bin--binX)
  - [binY(_outputs_, _options_)](#plot-transforms--bin--binY)
- [transforms/centroid.md](#plot-transforms--centroid)
  - [Centroid transform <VersionBadge version="0.6.2" />](#plot-transforms--centroid--centroid-transform)
  - [centroid(_options_)](#plot-transforms--centroid--centroid)
  - [geoCentroid(_options_)](#plot-transforms--centroid--geoCentroid)
- [transforms/group.md](#plot-transforms--group)
  - [Group transform](#plot-transforms--group--group-transform)
  - [Group options](#plot-transforms--group--group-options)
  - [group(_outputs_, _options_)](#plot-transforms--group--group)
  - [groupX(_outputs_, _options_)](#plot-transforms--group--groupX)
  - [groupY(_outputs_, _options_)](#plot-transforms--group--groupY)
  - [groupZ(_outputs_, _options_)](#plot-transforms--group--groupZ)
  - [find(_test_) <VersionBadge version="0.6.12" pr="1914" />](#plot-transforms--group--find)
- [transforms/normalize.md](#plot-transforms--normalize)
  - [Normalize transform](#plot-transforms--normalize--normalize-transform)
  - [Normalize options](#plot-transforms--normalize--normalize-options)
  - [normalize(_basis_) <VersionBadge version="0.2.3" />](#plot-transforms--normalize--normalize)
  - [normalizeX(_basis_, _options_)](#plot-transforms--normalize--normalizeX)
  - [normalizeY(_basis_, _options_)](#plot-transforms--normalize--normalizeY)
- [transforms/sort.md](#plot-transforms--sort)
  - [Sort transform](#plot-transforms--sort--sort-transform)
  - [sort(_order_, _options_)](#plot-transforms--sort--sort)
  - [shuffle(_options_)](#plot-transforms--sort--shuffle)
  - [reverse(_options_)](#plot-transforms--sort--reverse)
- [transforms/stack.md](#plot-transforms--stack)
  - [Stack transform](#plot-transforms--stack--stack-transform)
  - [Stack options](#plot-transforms--stack--stack-options)
  - [stackY(_stack_, _options_)](#plot-transforms--stack--stackY)
  - [stackY1(_stack_, _options_)](#plot-transforms--stack--stackY1)
  - [stackY2(_stack_, _options_)](#plot-transforms--stack--stackY2)
  - [stackX(_stack_, _options_)](#plot-transforms--stack--stackX)
  - [stackX1(_stack_, _options_)](#plot-transforms--stack--stackX1)
  - [stackX2(_stack_, _options_)](#plot-transforms--stack--stackX2)

---

<a id="plot-features--curves"></a>

# features/curves.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/curves.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";

const curve = ref("catmull-rom");
const numbers = d3.range(20).map(d3.randomLcg(42));

</script>

<a id="plot-features--curves--curves"></a>

# Curves

A **curve** defines how to turn a discrete representation of a line as a
sequence of points [[_x₀_, _y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] into a
continuous path; _i.e._, how to interpolate between points. Curves are used by
the [line](#plot-marks--line), [area](#plot-marks--area), and
[link](#plot-marks--link) marks, and are implemented by
[d3-shape](https://d3js.org/d3-shape/curve).

<p>
  <label class="label-input">
    Curve:
    <select v-model="curve">
      <option>basis</option>
      <option>basis-open</option>
      <option>basis-closed</option>
      <option>bump-x</option>
      <option>bump-y</option>
      <option>bundle</option>
      <option>cardinal</option>
      <option>cardinal-open</option>
      <option>cardinal-closed</option>
      <option>catmull-rom</option>
      <option>catmull-rom-open</option>
      <option>catmull-rom-closed</option>
      <option>linear</option>
      <option>linear-closed</option>
      <option>monotone-x</option>
      <option>monotone-y</option>
      <option>natural</option>
      <option>step</option>
      <option>step-after</option>
      <option>step-before</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-curve-option

```js-vue
Plot.plot({
  marks: [
    Plot.lineY(numbers, {curve: "{{curve}}"}),
    Plot.dotY(numbers, {x: (d, i) => i})
  ]
})
```

:::

The supported curve options are:

- **curve** - the curve method, either a string or a function
- **tension** - the curve tension (for fine-tuning)

The following named curve methods are supported:

- _basis_ - a cubic basis spline (repeating the end points)
- _basis-open_ - an open cubic basis spline
- _basis-closed_ - a closed cubic basis spline
- _bump-x_ - a Bézier curve with horizontal tangents
- _bump-y_ - a Bézier curve with vertical tangents
- _bundle_ - a straightened cubic basis spline (suitable for lines only, not
  areas)
- _cardinal_ - a cubic cardinal spline (with one-sided differences at the ends)
- _cardinal-open_ - an open cubic cardinal spline
- _cardinal-closed_ - an closed cubic cardinal spline
- _catmull-rom_ - a cubic Catmull–Rom spline (with one-sided differences at the
  ends)
- _catmull-rom-open_ - an open cubic Catmull–Rom spline
- _catmull-rom-closed_ - a closed cubic Catmull–Rom spline
- _linear_ - a piecewise linear curve (_i.e._, straight line segments)
- _linear-closed_ - a closed piecewise linear curve (_i.e._, straight line
  segments)
- _monotone-x_ - a cubic spline that preserves monotonicity in _x_
- _monotone-y_ - a cubic spline that preserves monotonicity in _y_
- _natural_ - a natural cubic spline
- _step_ - a piecewise constant function where _y_ changes at the midpoint of
  _x_
- _step-after_ - a piecewise constant function where _y_ changes after _x_
- _step-before_ - a piecewise constant function where _x_ changes after _y_
- _auto_ - like _linear_, but use the (possibly spherical)
  [projection](#plot-features--projections), if any
  <VersionBadge version="0.6.1" />

If **curve** is a function, it will be invoked with a given _context_ in the
same fashion as a
[D3 curve factory](https://d3js.org/d3-shape/curve#custom-curves). The _auto_
curve is only available for the [line mark](#plot-marks--line) and
[link mark](#plot-marks--link) and is typically used in conjunction with a
spherical [projection](#plot-features--projections) to interpolate along
[geodesics](https://en.wikipedia.org/wiki/Geodesic).

The tension option only has an effect on bundle, cardinal and Catmull–Rom
splines (_bundle_, _cardinal_, _cardinal-open_, _cardinal-closed_,
_catmull-rom_, _catmull-rom-open_, and _catmull-rom-closed_). For bundle
splines, it corresponds to
[beta](https://d3js.org/d3-shape/curve#curveBundle_beta); for cardinal splines,
[tension](https://d3js.org/d3-shape/curve#curveCardinal_tension); for
Catmull–Rom splines,
[alpha](https://d3js.org/d3-shape/curve#curveCatmullRom_alpha).

---

<a id="plot-features--facets"></a>

# features/facets.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/facets.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import anscombe from "../data/anscombe.ts";
import barley from "../data/barley.ts";
import industries from "../data/bls-industry-unemployment.ts";
import penguins from "../data/penguins.ts";

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

<a id="plot-features--facets--facets"></a>

# Facets

Faceting partitions data by ordinal or categorical value and then repeats a plot
for each partition (each **facet**), producing
[small multiples](https://en.wikipedia.org/wiki/Small_multiple) for comparison.
Faceting is typically enabled by declaring the horizontal↔︎ facet channel **fx**,
the vertical↕︎ facet channel **fy**, or both for two-dimensional faceting.

For example, below we recreate the Trellis display (“reminiscent of garden
trelliswork”) of
[Becker _et al._](https://hci.stanford.edu/courses/cs448b/papers/becker-trellis-jcgs.pdf)
using the dot’s **fy** channel to declare vertical↕︎ facets, showing the yields
of several varieties of barley across several sites for the years
<span :style="{borderBottom: `solid 2px ${scheme[0]}`}">1931</span> and
<span :style="{borderBottom: `solid 2px ${scheme[1]}`}">1932</span>.

:::plot https://observablehq.com/@observablehq/plot-trellis

```js
Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: { nice: true },
  y: { inset: 5 },
  color: { type: "categorical" },
  marks: [
    Plot.frame(),
    Plot.dot(barley, {
      x: "yield",
      y: "variety",
      fy: "site",
      stroke: "year",
      sort: { y: "-x", fy: "-x", reduce: "median" },
    }),
  ],
});
```

:::

:::tip This plot uses the
[**sort** mark option](#plot-features--scales--sort-mark-option) to order the
_y_ and _fy_ scale domains by descending median yield (the associated _x_
values). Without this option, the domains would be sorted alphabetically. :::

:::tip Use the [frame mark](#plot-marks--frame) for stronger visual separation
of facets. :::

The chart above reveals a likely data collection error: the years appear to be
reversed for the Morris site as it is the only site where the yields in
<span :style="{borderBottom: `solid 2px ${scheme[1]}`}">1932</span> were higher
than in <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">1931</span>. The
anomaly in Morris is more obvious if we use directed arrows to show the
year-over-year change. The [group transform](#plot-transforms--group) groups the
observations by site and variety to compute the change.

:::plot defer https://observablehq.com/@observablehq/plot-trellis-anomaly

```js
Plot.plot({
  height: 800,
  marginLeft: 110,
  grid: true,
  x: { nice: true },
  y: { inset: 5 },
  color: {
    scheme: "spectral",
    label: "Change in yield",
    tickFormat: "+f",
    legend: true,
  },
  facet: { marginRight: 90 },
  marks: [
    Plot.frame(),
    Plot.arrow(
      barley,
      Plot.groupY({
        x1: "first",
        x2: "last",
        stroke: ([x1, x2]) => x2 - x1, // year-over-year difference
      }, {
        x: "yield",
        y: "variety",
        fy: "site",
        stroke: "yield",
        strokeWidth: 2,
        sort: { y: "-x1", fy: "-x1", reduce: "median" },
      }),
    ),
  ],
});
```

:::

:::info Here the sort order has changed slightly: the _y_ and _fy_ domains are
sorted by the median **x1** values, which are the yields for 1931. :::

Faceting requires ordinal or categorical data because there are a discrete
number of facets; the associated _fx_ and _fy_ scales are
[band scales](#plot-features--scales--discrete-scales). Quantitative or temporal
data can be made ordinal by binning, say using
[Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).
Or, use the
[**interval** scale option](#plot-features--scales--scale-transforms) on the
_fx_ or _fy_ scale. Below, we produce a [box plot](#plot-marks--box) of the
weights (in kilograms) of Olympic athletes, faceted by height binned at a 10cm
(0.1 meter) interval.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-box-plot

```js
Plot.plot({
  fy: {
    grid: true,
    tickFormat: ".1f",
    interval: 0.1, // 10cm
    reverse: true,
  },
  marks: [
    Plot.boxX(olympians.filter((d) => d.height), { x: "weight", fy: "height" }),
  ],
});
```

:::

:::tip If you are interested in automatic faceting for quantitative data, please
upvote [#14](https://github.com/observablehq/plot/issues/14). :::

When both **fx** and **fy** channels are specified, two-dimensional faceting
results, as in the faceted scatterplot of penguin culmen measurements below. The
horizontal↔︎ facet shows sex (with the rightmost column representing penguins
whose _sex_ field is null, indicating missing data), while the vertical↕︎ facet
shows species.

:::plot defer
https://observablehq.com/@observablehq/plot-two-dimensional-faceting

```js
Plot.plot({
  grid: true,
  marginRight: 60,
  facet: { label: null },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species",
    }),
  ],
});
```

:::

You can mix-and-match faceted and non-faceted marks within the same plot. The
non-faceted marks will be repeated across all facets. This is useful for
decoration marks, such as a [frame](#plot-marks--frame), and also for context:
below, the entire population of penguins is repeated in each facet as small gray
dots, making it easier to see how each facet compares to the whole.

:::plot defer https://observablehq.com/@observablehq/plot-non-faceted-marks

```js
Plot.plot({
  grid: true,
  marginRight: 60,
  facet: { label: null },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "#aaa",
      r: 1,
    }),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species",
    }),
  ],
});
```

:::

:::tip Set the
[**facet** mark option](#plot-features--facets--mark-facet-options) to _exclude_
to draw only the dots _not_ in the current facet. :::

When there are many facets, facets may be small and hard to read; you may need
to increase the plot’s **width** or **height**. Alternatively, you can wrap
facets by computing a row and column number as **fy** and **fx**. Below, small
multiples of varying unemployment counts across industries are shown in a
three-column display.

:::plot defer https://observablehq.com/@observablehq/plot-facet-wrap

```js
Plot.plot((() => {
  const n = 3; // number of facet columns
  const keys = Array.from(d3.union(industries.map((d) => d.industry)));
  const index = new Map(keys.map((key, i) => [key, i]));
  const fx = (key) => index.get(key) % n;
  const fy = (key) => Math.floor(index.get(key) / n);
  return {
    height: 300,
    axis: null,
    y: { insetTop: 10 },
    fx: { padding: 0.03 },
    marks: [
      Plot.areaY(
        industries,
        Plot.normalizeY("extent", {
          x: "date",
          y: "unemployed",
          fx: (d) => fx(d.industry),
          fy: (d) => fy(d.industry),
        }),
      ),
      Plot.text(keys, { fx, fy, frameAnchor: "top-left", dx: 6, dy: 6 }),
      Plot.frame(),
    ],
  };
})());
```

:::

:::tip If you are interested in automatic facet wrapping, please upvote
[#277](https://github.com/observablehq/plot/issues/277). :::

:::info This example uses an
[immediately-invoked function expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
to declare local variables. :::

The above chart also demonstrates faceted annotations, using a
[text mark](#plot-marks--text) to label the facet in lieu of facet axes. Below,
we apply a single text annotation to the _Adelie_ facet by setting the **fy**
channel to a single-element array parallel to the data.

:::plot defer https://observablehq.com/@observablehq/plot-annotated-facets

```js
Plot.plot({
  marginLeft: 60,
  marginRight: 60,
  grid: true,
  y: { label: null },
  fy: { label: null },
  color: { legend: true },
  marks: [
    Plot.barX(
      penguins,
      Plot.groupY({ x: "count" }, { fy: "species", y: "island", fill: "sex" }),
    ),
    Plot.text([
      `While Chinstrap and Gentoo penguins were each observed on only one island, Adelie penguins were observed on all three islands.`,
    ], {
      fy: ["Adelie"],
      frameAnchor: "top-right",
      lineWidth: 18,
      dx: -6,
      dy: 6,
    }),
    Plot.frame(),
  ],
});
```

:::

<a id="plot-features--facets--mark-facet-options"></a>

## Mark facet options

Facets can be defined for each mark via the **fx** or **fy** channels.
<VersionBadge version="0.6.1" /> The **fx** and **fy** channels are computed
prior to the
[mark’s transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md),
if any (_i.e._, facet channels are not transformed). Alternatively, the
[**facet** plot option](#plot-features--facets--plot-facet-options) allows
top-level faceting based on data.

Faceting can be explicitly enabled or disabled on a mark with the **facet**
option, which accepts the following values:

- _auto_ (default) - automatically determine if this mark should be faceted
- _include_ (or true) - draw the subset of the mark’s data in the current facet
- _exclude_ - draw the subset of the mark’s data _not_ in the current facet
- _super_ - draw this mark in a single frame that covers all facets
- null (or false) - repeat this mark’s data across all facets (_i.e._, no
  faceting)

When mark-level faceting is used, the default _auto_ setting is equivalent to
_include_: the mark will be faceted if either the **fx** or **fy** channel
option (or both) is specified. The null or false option will disable faceting,
while _exclude_ draws the subset of the mark’s data _not_ in the current facet.
When a mark uses _super_ faceting, it is not allowed to use position scales
(_x_, _y_, _fx_, or _fy_); _super_ faceting is intended for decorations, such as
labels and legends.

The **facetAnchor**
option<a id="plot-features--facets--facetAnchor" href="#plot-features--facets--facetAnchor" aria-label="Permalink to &quot;facetAnchor&quot;"></a>
<VersionBadge version="0.6.3" /> controls the placement of the mark with respect
to the facets. Based on the value, the mark will be displayed on:

- null - non-empty facets
- _top_, _right_, _bottom_, or _left_ - the given side
- _top-empty_, _right-empty_, _bottom-empty_, or _left-empty_ - adjacent empty
  facet or side
- _empty_ - empty facets

The **facetAnchor** option defaults to null for all marks except axis marks,
whose default depends on the axis orientation and associated scale.

When using top-level faceting, if the mark data is parallel to the facet data
(_i.e._, it has the same length and order), but is not strictly equal (`===`),
you can enable faceting by specifying the **facet** option to _include_ (or
equivalently true). Likewise you can disable faceting by setting the **facet**
option to null or false. Finally, the **facet** option supports the _exclude_
option to select all data points that are _not_ part of the current facet,
allowing “background” marks for context.

When top-level faceting is used, the default _auto_ setting is equivalent to
_include_ when the mark data is strictly equal to the top-level facet data;
otherwise it is equivalent to null. When the _include_ or _exclude_ facet mode
is chosen, the mark data must be parallel to the top-level facet data: the data
must have the same length and order. If the data are not parallel, then the
wrong data may be shown in each facet. The default _auto_ therefore requires
strict equality (`===`) for safety, and using the facet data as mark data is
recommended when using the _exclude_ facet mode. (To construct parallel data
safely, consider using
[_array_.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
on the facet data.)

<a id="plot-features--facets--plot-facet-options"></a>

## Plot facet options

The **facet** plot option provides addition control over facet position scales
and axes:

- **marginTop** - the top margin
- **marginRight** - the right margin
- **marginBottom** - the bottom margin
- **marginLeft** - the left margin
- **margin** - shorthand for the four margins
- **grid** - if true, draw grid lines for each facet
- **label** - if null, disable default facet axis labels

The **facet** margin options behave largely the same as the margin
[plot options](#plot-features--plots); the only difference is the positioning of
the associated scale label for the _x_ and _y_ scales. Likewise, the **grid**
and **label** options have the same meaning as the plot options, except the
facet options only apply to the _fx_ and _fy_ scales.

The **facet** plot option is also an alternative to the **fx** and **fy** mark
options. It is useful when multiple marks share the same data; the **x** and
**y** facet channels are then shared by all marks that use the facet data.
(Other marks will be repeated across facets.) For example, we can visualize the
famous [Anscombe’s quartet](https://en.wikipedia.org/wiki/Anscombe's_quartet) as
a scatterplot with horizontal facets.

:::plot https://observablehq.com/@observablehq/plot-anscombes-quartet

```js
Plot.plot({
  grid: true,
  aspectRatio: 0.5,
  facet: { data: anscombe, x: "series" },
  marks: [
    Plot.frame(),
    Plot.line(anscombe, { x: "x", y: "y" }),
    Plot.dot(anscombe, { x: "x", y: "y" }),
  ],
});
```

:::

For top-level faceting, these **facet** options determine the facets:

- **data** - the data to be faceted
- **x** - the horizontal↔︎ position; bound to the _fx_ scale
- **y** - the vertical↕︎ position; bound to the _fy_ scale

With top-level faceting, any mark that uses the specified facet data will be
faceted by default, whereas marks that use different data will be repeated
across all facets. Use the mark **facet** option to change the behavior.

<a id="plot-features--facets--facet-scales"></a>

## Facet scales

When faceting, two additional
[band scales](#plot-features--scales--discrete-scales) may be configured:

- _fx_ - the horizontal↔︎ position, a _band_ scale
- _fy_ - the vertical↕︎ position, a _band_ scale

You can adjust the space between facets using the **padding**, **round**, and
**align** scale options.

---

<a id="plot-features--formats"></a>

# features/formats.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/formats.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

</script>

<a id="plot-features--formats--formats"></a>

# Formats

These helper functions are provided for convenience as a **tickFormat** option
for the [axis mark](#plot-marks--axis), as the **text** option for a
[text mark](#plot-marks--text), or other use. See also
[d3-format](https://d3js.org/d3-format),
[d3-time-format](https://d3js.org/d3-time-format), and JavaScript’s built-in
[date formatting](https://observablehq.com/@mbostock/date-formatting) and
[number formatting](https://observablehq.com/@mbostock/number-formatting).

<a id="plot-features--formats--formatNumber"></a>

## formatNumber(_locale_) <VersionBadge version="0.6.15" pr="2078" />

```js
Plot.formatNumber("en-US")(Math.PI); // "3.142"
```

Returns a function that formats a given number according to the specified
_locale_. The _locale_ is a
[BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S.
English.

<a id="plot-features--formats--formatIsoDate"></a>

## formatIsoDate(_date_)

```js
Plot.formatIsoDate(new Date("2020-01-01T00:00:00.000Z")); // "2020-01-01"
```

Given a _date_, returns the shortest equivalent ISO 8601 UTC string. If the
given _date_ is not valid, returns `"Invalid Date"`. See
[isoformat](https://github.com/mbostock/isoformat).

<a id="plot-features--formats--formatWeekday"></a>

## formatWeekday(_locale_, _format_)

:::plot https://observablehq.com/@observablehq/plot-format-helpers

```js
Plot.textX(d3.range(7)).plot({ x: { tickFormat: Plot.formatWeekday() } });
```

:::

```js
Plot.formatWeekday("es-MX", "long")(0); // "domingo"
```

Returns a function that formats a given week day number (from 0 = Sunday to 6 =
Saturday) according to the specified _locale_ and _format_. The _locale_ is a
[BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S.
English. The _format_ is a
[weekday format](https://tc39.es/ecma402/#datetimeformat-objects): either
_narrow_, _short_, or _long_; if not specified, it defaults to _short_.

<a id="plot-features--formats--formatMonth"></a>

## formatMonth(_locale_, _format_)

:::plot https://observablehq.com/@observablehq/plot-format-helpers

```js
Plot.textX(d3.range(12)).plot({
  x: { tickFormat: Plot.formatMonth(), ticks: 12 },
});
```

:::

```js
Plot.formatMonth("es-MX", "long")(0); // "enero"
```

Returns a function that formats a given month number (from 0 = January to 11 =
December) according to the specified _locale_ and _format_. The _locale_ is a
[BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S.
English. The _format_ is a
[month format](https://tc39.es/ecma402/#datetimeformat-objects): either
_2-digit_, _numeric_, _narrow_, _short_, _long_; if not specified, it defaults
to _short_.

---

<a id="plot-features--legends"></a>

# features/legends.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/legends.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const penguins = shallowRef([]);

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const gistemp = shallowRef([
  {Date: new Date("1880-01-01"), Anomaly: -0.78},
  {Date: new Date("2016-12-01"), Anomaly: 1.35}
]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  d3.csv("../data/penguins.csv", d3.autoType).then((data) => (penguins.value = data));
});

</script>

<a id="plot-features--legends--legends"></a>

# Legends <VersionBadge version="0.3.0" />

Plot can generate **legends** for _color_, _opacity_, and _symbol_
[scales](#plot-features--scales). For example, the scatterplot below of body
measurements of Olympic athletes includes a legend for its _color_ scale,
allowing the meaning of color to be interpreted by the reader. (The axes
similarly document the meaning of the _x_ and _y_ position scales.)

:::plot defer https://observablehq.com/@observablehq/plot-olympians-scatterplot

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.dot(olympians, { x: "weight", y: "height", stroke: "sex" }),
  ],
});
```

:::

The legend above is a _swatches_ legend because the _color_ scale is _ordinal_
(with a _categorical_ scheme). When the _color_ scale is continuous, a _ramp_
legend with a smooth gradient is generated instead. The plot below of global
average surface temperature ([GISTEMP](https://data.giss.nasa.gov/gistemp/))
uses a _diverging_ _color_ scale to indicate the deviation from the 1951–1980
average in degrees Celsius.

:::plot defer
https://observablehq.com/@observablehq/plot-diverging-color-scatterplot

```js
Plot.plot({
  color: {
    scheme: "BuRd",
    legend: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, { x: "Date", y: "Anomaly", stroke: "Anomaly" }),
  ],
});
```

:::

When an ordinal _color_ scale is used redundantly with a _symbol_ scale, the
_symbol_ legend will incorporate the color encoding. This is more accessible
than using color alone, particularly for readers with color vision deficiency.

:::plot defer https://observablehq.com/@observablehq/plot-symbol-channel

```js
Plot.plot({
  grid: true,
  x: { label: "Body mass (g)" },
  y: { label: "Flipper length (mm)" },
  symbol: { legend: true },
  marks: [
    Plot.dot(penguins, {
      x: "body_mass_g",
      y: "flipper_length_mm",
      stroke: "species",
      symbol: "species",
    }),
  ],
});
```

:::

Plot does not yet generate legends for the _r_ (radius) scale or the _length_
scale. If you are interested in this feature, please upvote
[#236](https://github.com/observablehq/plot/issues/236). In the meantime, you
can implement a legend using marks as demonstrated in the
[spike map](https://observablehq.com/@observablehq/plot-spike) example.

<a id="plot-features--legends--legend-options"></a>

## Legend options

If the **legend** [scale option](#plot-features--scales--scale-options) is true,
the default legend will be produced for the scale; otherwise, the meaning of the
**legend** option depends on the scale: for quantitative color scales, it
defaults to _ramp_ but may be set to _swatches_ for a discrete scale (most
commonly for _threshold_ color scales); for _ordinal_ _color_ scales and
_symbol_ scales, only the _swatches_ value is supported.

<!-- TODO Describe the color and opacity options. -->

Categorical and ordinal color legends are rendered as swatches, unless the
**legend** option is set to _ramp_. The swatches can be configured with the
following options:

- **tickFormat** - a format function for the labels
- **swatchSize** - the size of the swatch (if square)
- **swatchWidth** - the swatches’ width
- **swatchHeight** - the swatches’ height
- **columns** - the number of swatches per row
- **marginLeft** - the legend’s left margin
- **className** - a class name, that defaults to a randomly generated string
  scoping the styles
- **opacity** - the swatch fill opacity <VersionBadge version="0.6.5" />
- **width** - the legend’s width (in pixels)

Symbol legends are rendered as swatches and support the options above in
addition to the following options:

- **fill** - the symbol fill color
- **fillOpacity** - the symbol fill opacity; defaults to 1
- **stroke** - the symbol stroke color
- **strokeOpacity** - the symbol stroke opacity; defaults to 1
- **strokeWidth** - the symbol stroke width; defaults to 1.5
- **r** - the symbol radius; defaults to 4.5 pixels

The **fill** and **stroke** symbol legend options can be specified as “color” to
apply the color scale when the symbol scale is a redundant encoding. The
**fill** defaults to none. The **stroke** defaults to currentColor if the fill
is none, and to none otherwise. The **fill** and **stroke** options may also be
inherited from the corresponding options on an associated dot mark.

Continuous color legends are rendered as a ramp, and can be configured with the
following options:

- **label** - the scale’s label
- **ticks** - the desired number of ticks, or an array of tick values
- **tickFormat** - a format function for the legend’s ticks
- **tickSize** - the tick size
- **round** - if true (default), round tick positions to pixels
- **width** - the legend’s width
- **height** - the legend’s height
- **marginTop** - the legend’s top margin
- **marginRight** - the legend’s right margin
- **marginBottom** - the legend’s bottom margin
- **marginLeft** - the legend’s left margin
- **opacity** - the ramp’s fill opacity

The **style** legend option allows custom styles to override Plot’s defaults; it
has the same behavior as in Plot’s top-level
[plot options](#plot-features--plots). The **className** option is suffixed with
_-ramp_ or _-swatches_, reflecting the **legend** type.

<a id="plot-features--legends--legend"></a>

## legend(_options_)

Renders a standalone legend for the scale defined by the given _options_ object,
returning a SVG or HTML figure element. This element can then be inserted into
the page as described in the
[getting started guide](https://github.com/observablehq/plot/tree/v0.6.17/docs/getting-started.md).
The _options_ object must define at least one scale; see
[scale options](#plot-features--scales) for how to define a scale.

For example, here is a _ramp_ legend of a _linear_ _color_ scale with the
default domain of [0, 1] and default scheme _turbo_:

<PlotRender :options='{color: {type: "linear"}}' defer method="legend" />

```js
Plot.legend({ color: { type: "linear" } });
```

The _options_ object may also include any additional legend options described in
the previous section. For example, to make the above legend slightly wider:

<PlotRender :options='{width: 320, color: {type: "linear"}}' defer method="legend" />

```js
Plot.legend({ width: 320, color: { type: "linear" } });
```

---

<a id="plot-features--marks"></a>

# features/marks.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/features/marks.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as htl from "htl";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import gistemp from "../data/gistemp.ts";

const sales = [
  {units: 10, fruit: "peach"},
  {units: 20, fruit: "pear"},
  {units: 40, fruit: "plum"},
  {units: 30, fruit: "plum"}
];

const linedata = [
  {hour: 0, value: 8, sensor: "A"},
  {hour: 0, value: 6, sensor: "B"},
  {hour: 1, value: 7, sensor: "A"},
  {hour: 1, value: 5, sensor: "B"},
  {hour: 2, value: 3, sensor: "A"},
  {hour: 2, value: 0, sensor: "B"},
  {hour: 3, value: 9, sensor: "A"},
  {hour: 3, value: 2, sensor: "B"}
];

const timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  // {year: 2018, population: 7631.091040},
  {year: 2019, population: 7713.468100},
  {year: 2020, population: 7794.798739}
];

const area = ref(true);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const bls = shallowRef([]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
});

</script>

<a id="plot-features--marks--Marks"></a>

# Marks

:::tip If you aren’t yet up and running with Plot, please read our
[getting started guide](https://github.com/observablehq/plot/tree/v0.6.17/docs/getting-started.md)
first. Tinkering with the code below will give a better sense of how Plot works.
:::

Plot doesn’t have chart types; instead, you construct charts by layering
**marks**.

<a id="plot-features--marks--marks-are-geometric-shapes"></a>

## Marks are geometric shapes

Plot provides a variety of mark types. Think of marks as the “visual vocabulary”
— the painter’s palette 🎨, but of shapes instead of colors — that you pull from
when composing a chart. Each mark type produces a certain type of geometric
shape.

For example, the [dot mark](#plot-marks--dot) draws stroked circles (by
default).

:::plot https://observablehq.com/@observablehq/plot-temporal-scatterplot

```js
Plot.dot(gistemp, { x: "Date", y: "Anomaly" }).plot();
```

:::

The [line mark](#plot-marks--line) draws connected line segments (also known as
a _polyline_ or _polygonal chain_).

:::plot https://observablehq.com/@observablehq/plot-temporal-line-chart

```js
Plot.lineY(gistemp, { x: "Date", y: "Anomaly" }).plot();
```

:::

And the [bar mark](#plot-marks--bar) draws rectangular bars in either a
horizontal (barX→) or vertical (barY↑) orientation.

:::plot https://observablehq.com/@observablehq/plot-alphabet-bar-chart

```js
Plot.barX(alphabet, { x: "frequency", y: "letter" }).plot();
```

:::

So instead of looking for a chart type, consider the shape of the primary
graphical elements in your chart, and look for the corresponding mark type. If a
chart has only a single mark, the mark type _is_ effectively the chart type: the
bar mark is used to make a bar chart, the area mark is used to make an area
chart, and so on.

<a id="plot-features--marks--marks-are-layered"></a>

## Marks are layered

The big advantage of mark types over chart types is that you can compose
multiple marks of different types into a single [plot](#plot-features--plots).
For example, below an [area](#plot-marks--area) and [line](#plot-marks--line)
are used to plot the same sequence of values, while a [rule](#plot-marks--rule)
emphasizes _y_ = 0.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks-2

```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.areaY(aapl, { x: "Date", y: "Close", fillOpacity: 0.2 }),
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

Each mark supplies its own data; a quick way to combine multiple datasets into a
chart is to declare a separate mark for each. You can even use
[_array_.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
to create multiple marks from nested data.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks-2

```js
Plot.plot({
  marks: [
    [goog, aapl].map((stock) => Plot.lineY(stock, { x: "Date", y: "Close" })),
  ],
});
```

:::

Marks may also be a function which returns an
[SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), if you
wish to insert arbitrary content. (Here we use
[Hypertext Literal](https://github.com/observablehq/htl) to generate an SVG
gradient.)

:::plot defer https://observablehq.com/@observablehq/plot-gradient-bars

```js
Plot.plot({
  marks: [
    () =>
      htl.svg`<defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="15%" stop-color="purple" />
        <stop offset="75%" stop-color="red" />
        <stop offset="100%" stop-color="gold" />
      </linearGradient>
    </defs>`,
    Plot.barY(alphabet, {
      x: "letter",
      y: "frequency",
      fill: "url(#gradient)",
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

And marks may be null or undefined, which produce no output; this is useful for
showing marks conditionally (_e.g._, when a box is checked).

<p>
  <label class="label-input">
    Show area:
    <input type="checkbox" v-model="area">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-optional-marks

```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    area ? Plot.areaY(aapl, { x: "Date", y: "Close", fillOpacity: 0.2 }) : null,
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

<a id="plot-features--marks--marks-use-scales"></a>

## Marks use scales

Marks are (typically) not positioned in literal pixels, or colored in literal
colors, as in a conventional graphics system. Instead you provide abstract
values such as time and temperature — marks are drawn “in data space” — and
[scales](#plot-features--scales) encode these into visual values such as
position and color. And best of all, Plot automatically creates
[axes](#plot-marks--axis) and [legends](#plot-features--legends) to document the
scales’ encodings.

Data is passed through scales automatically during rendering; the mark controls
which scales are used. The **x** and **y** options are typically bound to the
_x_ and _y_ scales, respectively, while the **fill** and **stroke** options are
typically bound to the _color_ scale. Changing a scale’s definition, say by
overriding its **domain** (the extent of abstract input values) or **type**,
affects the appearance of all marks that use the scale.

:::plot defer https://observablehq.com/@observablehq/plot-aapl-log-scale

```js {2-6}
Plot.plot({
  y: {
    type: "log",
    domain: [30, 300],
    grid: true,
  },
  marks: [
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

<a id="plot-features--marks--marks-have-tidy-data"></a>

## Marks have tidy data

A single mark can draw multiple shapes. A mark generally produces a shape — such
as a rectangle or circle — for each element in the data.

:::plot defer https://observablehq.com/@observablehq/plot-tidy-data

```js
Plot.dot(aapl, { x: "Date", y: "Close" }).plot();
```

:::

It’s more complicated than that, though, since some marks produce shapes that
incorporate _multiple_ data points. Pass the same data to a
[line](#plot-marks--line) and you’ll get a single polyline.

:::plot defer https://observablehq.com/@observablehq/plot-tidy-data

```js
Plot.lineY(aapl, { x: "Date", y: "Close" }).plot();
```

:::

And a line mark isn’t even guaranteed to produce a single polyline — there can
be multiple polylines, as in a line chart with multiple series (using **z**).

:::plot defer
https://observablehq.com/@observablehq/plot-multiple-series-line-chart

```js
Plot.lineY(bls, { x: "date", y: "unemployment", z: "division" }).plot();
```

:::

Plot favors [tidy data](http://vita.had.co.nz/papers/tidy-data.html) structured
as an array of objects, where each object represents an observation (a row), and
each object property represents an observed value; all objects in the array
should have the same property names (the columns).

For example, say we have hourly readings from two sensors _A_ and _B_. You can
represent the sensor log as an array of objects like so:

```js
linedata = [
  { hour: 0, value: 8, sensor: "A" },
  { hour: 0, value: 6, sensor: "B" },
  { hour: 1, value: 7, sensor: "A" },
  { hour: 1, value: 5, sensor: "B" },
  { hour: 2, value: 3, sensor: "A" },
  { hour: 2, value: 0, sensor: "B" },
  { hour: 3, value: 9, sensor: "A" },
  { hour: 3, value: 2, sensor: "B" },
];
```

:::tip For larger datasets, you can more efficiently pass data using an
[Apache Arrow](https://arrow.apache.org/docs/js/) table as a columnar data
representation. <VersionBadge version="0.6.16" pr="2115" /> :::

Then you can pass the data to the line mark, and extract named columns from the
data for the desired options:

:::plot https://observablehq.com/@observablehq/plot-accessors

```js
Plot.lineY(linedata, { x: "hour", y: "value", stroke: "sensor" }).plot();
```

:::

Another common way to extract a column from tabular data is an accessor
function. This function is invoked for each element in the data (each row), and
returns the corresponding observed value, as with
[_array_.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

:::plot https://observablehq.com/@observablehq/plot-accessors

```js
Plot.lineY(linedata, {
  x: (d) => d.hour,
  y: (d) => d.value,
  stroke: (d) => d.sensor,
}).plot();
```

:::

For greater efficiency, Plot also supports columnar data: you can use an
[Apache Arrow](https://arrow.apache.org/docs/js/) table as data instead of an
array of objects. <VersionBadge version="0.6.16" pr="2115" /> You can even pass
parallel arrays of values, or Apache Arrow vectors, to each channel.

```js
Plot.lineY({ length: linedata.length }, {
  x: linedata.map((d) => d.hour),
  y: linedata.map((d) => d.value),
  stroke: linedata.map((d) => d.sensor),
}).plot();
```

:::tip Note that when accessor functions or parallel arrays are used instead of
field names, automatic axis labels (_hour_ and _value_) are lost. These can be
restored using the **label** option on the _x_ and _y_ scales. :::

<a id="plot-features--marks--marks-imply-data-types"></a>

## Marks imply data types

Data comes in different types: quantitative (or temporal) values can be
subtracted, ordinal values can be ordered, and nominal (or categorical) values
can only be the same or different.

:::info Because nominal values often need some arbitrary order for display
purposes — often alphabetical — Plot uses the term _ordinal_ to refer to both
ordinal and nominal data. :::

Some marks work with any type of data, while other marks have certain
requirements or assumptions of data. For example, a line should only be used
when both _x_ and _y_ are quantitative or temporal, and when the data is in a
meaningful order (such as chronological). This is because the line mark will
interpolate between adjacent points to draw line segments. If _x_ or _y_ is
nominal — say the names of countries — it doesn’t make sense to use a line
because there is no half-way point between two nominal values.

:::plot https://observablehq.com/@observablehq/plot-dont-do-this

```js
Plot.lineY(["please", "don’t", "do", "this"]).plot(); // 🌶️
```

:::

:::warning While Plot aspires to give good defaults and helpful warnings, Plot
won’t prevent you from creating a meaningless chart. _Only you_ can prevent
bogus charts! :::

In particular, beware the simple “bar”! A bar mark is used for a bar chart, but
a rect mark is needed for a histogram. Plot has four different mark types for
drawing rectangles:

- use [rect](#plot-marks--rect) when both _x_ and _y_ are quantitative
- use [barX](#plot-marks--bar) when _x_ is quantitative and _y_ is ordinal
- use [barY](#plot-marks--bar) when _x_ is ordinal and _y_ is quantitative
- use [cell](#plot-marks--cell) when both _x_ and _y_ are ordinal

Plot encourages you to think about data types as you visualize because data
types often imply semantics. For example, do you notice anything strange about
the bar chart below?

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar

```js
Plot
  .barY(timeseries, { x: "year", y: "population" }) // 🌶️
  .plot({ x: { tickFormat: "" } });
```

:::

Here’s the underlying data:

```js
timeseries = [
  { year: 2014, population: 7295.290765 },
  { year: 2015, population: 7379.797139 },
  { year: 2016, population: 7464.022049 },
  { year: 2017, population: 7547.858925 },
  { year: 2019, population: 7713.468100 },
  { year: 2020, population: 7794.798739 },
];
```

The data is missing the population for the year 2018! Because the barY mark
implies an ordinal _x_ scale, the gap is hidden. Switching to the rectY mark
(with the **interval** option to indicate that these are annual observations)
reveals the missing data.

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar

```js
Plot
  .rectY(timeseries, { x: "year", y: "population", interval: 1 })
  .plot({ x: { tickFormat: "" } });
```

:::

Alternatively, you can keep the barY mark and apply the **interval** option to
the _x_ scale.

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar

```js
Plot
  .barY(timeseries, { x: "year", y: "population" })
  .plot({ x: { tickFormat: "", interval: 1 } });
```

:::

<a id="plot-features--marks--marks-have-options"></a>

## Marks have options

When constructing a mark, you can specify options to change the mark’s
appearance. These options are passed as a second argument to the mark
constructor. (The first argument is the required data.) For example, if you want
filled dots instead of stroked ones, pass the desired color to the **fill**
option:

:::plot https://observablehq.com/@observablehq/plot-marks-have-options

```js
Plot.dot(gistemp, { x: "Date", y: "Anomaly", fill: "red" }).plot();
```

:::

As the name suggests, options are generally optional; Plot tries to provide good
defaults for whatever you don’t specify. Plot even has
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md)
for various common forms of data. Below, we extract an array of numbers from the
`gistemp` dataset, and use the line mark shorthand to set _x_ = index and _y_ =
identity.

:::plot https://observablehq.com/@observablehq/plot-marks-have-options

```js
Plot.lineY(gistemp.map((d) => d.Anomaly)).plot();
```

:::

Some marks even provide default
[transforms](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md),
say for [stacking](#plot-transforms--stack)!

:::tip Because Plot strives to be concise, there are many default behaviors,
some of which can be subtle. If Plot isn’t doing what you expect, try disabling
the defaults by specifying options explicitly. :::

In addition to the standard options such as **fill** and **stroke** that are
supported by all mark types, each mark type can support options unique to that
type. For example, the dot mark takes a **symbol** option so you can draw things
other than circles. See the documentation for each mark type to see what it
supports.

<a id="plot-features--marks--marks-have-channels"></a>

## Marks have channels

Channels are mark options that can be used to encode data. These options allow
the value to vary with the data, such as a different position or color for each
dot. To use a channel, supply it with a column of data, typically as:

- a field (column) name,
- an accessor function, or
- an array of values of the same length and order as the data.

Not all mark options can be expressed as channels. For example, **stroke** can
be a channel but **strokeDasharray** cannot. This is mostly a pragmatic
limitation — it would be harder to implement Plot if every option were
expressible as a channel — but it also serves to guide you towards options that
are intended for encoding data.

:::tip To vary the definition of a constant option with data, create multiple
marks with your different constant options, and then filter the data for each
mark to achieve the desired result. :::

Some options can be either a channel or a constant depending on the provided
value. For example, if you set the **fill** option to _purple_, Plot interprets
it as a literal color.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels

```js
Plot
  .barX(timeseries, { x: "population", y: "year", fill: "purple" })
  .plot({ y: { label: null, tickFormat: "" } });
```

:::

Whereas if the **fill** option is a string but _not_ a valid CSS color, Plot
assumes you mean the corresponding column of the data and interprets it as a
channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels

```js
Plot
  .barX(timeseries, { x: "population", y: "year", fill: "year" })
  .plot({ y: { label: null, tickFormat: "" } });
```

:::

If the **fill** option is a function, it is interpreted as a channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels

```js
Plot
  .barX(timeseries, { x: "population", y: "year", fill: (d) => d.year })
  .plot({ y: { label: null, tickFormat: "" } });
```

:::

Lastly, note that while channels are normally bound to a
[scale](#plot-features--marks--marks-use-scales), you can bypass the _color_
scale here by supplying literal color values to the **fill** channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels

```js
Plot
  .barX(timeseries, {
    x: "population",
    y: "year",
    fill: (d) => d.year & 1 ? "red" : "currentColor",
  })
  .plot({ y: { label: null, tickFormat: "" } });
```

:::

But rather than supplying literal values, it is more semantic to provide
abstract values and use scales. In addition to centralizing the encoding
definition (if used by multiple marks), it allows Plot to generate a legend.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels

```js
Plot
  .barX(timeseries, {
    x: "population",
    y: "year",
    fill: (d) => d.year & 1 ? "odd" : "even",
  })
  .plot({ y: { label: null, tickFormat: "" }, color: { legend: true } });
```

:::

You can then specify the _color_ scale’s **domain** and **range** to control the
encoding.

<a id="plot-features--marks--mark-options"></a>

## Mark options

Mark constructors take two arguments: **data** and **options**. Together these
describe a tabular dataset and how to visualize it. Option values that must be
the same for all of a mark’s generated shapes are known as _constants_, whereas
option values that may vary across a mark’s generated shapes are known as
_channels_. Channels are typically bound to [scales](#plot-features--scales) and
encode abstract data values, such as time or temperature, as visual values, such
as position or color. (Channels can also be used to order ordinal domains; see
the [**sort** option](#plot-features--scales--sort-mark-option).)

A mark’s data is most commonly an array of objects representing a tabular
dataset, such as the result of loading a CSV file, while a mark’s options bind
channels (such as _x_ and _y_) to columns in the data (such as _units_ and
_fruit_).

```js
sales = [
  { units: 10, fruit: "peach" },
  { units: 20, fruit: "pear" },
  { units: 40, fruit: "plum" },
  { units: 30, fruit: "plum" },
];
```

```js
Plot.dot(sales, { x: "units", y: "fruit" });
```

While a column name such as `"units"` is the most concise way of specifying
channel values, values can also be specified as functions for greater
flexibility, say to transform data or derive a new column on the fly. Channel
functions are invoked for each datum (_d_) in the data and return the
corresponding channel value. (This is similar to how D3’s
[_selection_.attr](https://d3js.org/d3-selection/modifying#selection_attr)
accepts functions, though note that Plot channel functions should return
abstract values, not visual values.)

```js
Plot.dot(sales, { x: (d) => d.units * 1000, y: (d) => d.fruit });
```

Plot also supports columnar data for greater efficiency with bigger datasets;
for example, data can be specified as any array of the appropriate length (or
any iterable or value compatible with
[Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)),
and then separate arrays of values can be passed as _options_.

```js
index = [0, 1, 2, 3];
```

```js
units = [10, 20, 40, 30];
```

```js
fruits = ["peach", "pear", "plum", "plum"];
```

```js
Plot.dot(index, { x: units, y: fruits });
```

Channel values can also be specified as numbers for constant values, say for a
fixed baseline with an [area](#plot-marks--area).

```js
Plot.area(aapl, { x1: "Date", y1: 0, y2: "Close" });
```

Missing and invalid data are handled specifically for each mark type and
channel. In most cases, if the provided channel value for a given datum is null,
undefined, or (strictly) NaN, the mark will implicitly filter the datum and not
generate a corresponding output. In some cases, such as the radius (_r_) of a
dot, the channel value must additionally be positive. Plot.line and Plot.area
will stop the path before any invalid point and start again at the next valid
point, thus creating interruptions rather than interpolating between valid
points. Titles will only be added if they are non-empty.

All marks support the following style options:

- **fill** - fill color
- **fillOpacity** - fill opacity (a number between 0 and 1)
- **stroke** - stroke color
- **strokeWidth** - stroke width (in pixels)
- **strokeOpacity** - stroke opacity (a number between 0 and 1)
- **strokeLinejoin** - how to join lines (_bevel_, _miter_, _miter-clip_, or
  _round_)
- **strokeLinecap** - how to cap lines (_butt_, _round_, or _square_)
- **strokeMiterlimit** - to limit the length of _miter_ joins
- **strokeDasharray** - a comma-separated list of dash lengths (typically in
  pixels)
- **strokeDashoffset** - the
  [stroke dash offset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)
  (typically in pixels)
- **opacity** - object opacity (a number between 0 and 1)
- **mixBlendMode** - the
  [blend mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
  (_e.g._, _multiply_)
- **imageFilter** - a CSS
  [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) (_e.g._,
  _blur(5px)_) <VersionBadge version="0.6.7" />
- **shapeRendering** - the
  [shape-rendering mode](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering)
  (_e.g._, _crispEdges_)
- **paintOrder** - the
  [paint order](https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order)
  (_e.g._, _stroke_)
- **dx** - horizontal offset (in pixels; defaults to 0)
- **dy** - vertical offset (in pixels; defaults to 0)
- **target** - link target (e.g., “_blank” for a new window); for use with the
  **href** channel
- **className** - the
  [class attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class),
  if any (defaults to null) <VersionBadge version="0.6.16" pr="1098" />
- **ariaDescription** - a textual description of the mark’s contents
- **ariaHidden** - if true, hide this content from the accessibility tree
- **pointerEvents** - the
  [pointer events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
  (_e.g._, _none_)
- **clip** - whether and how to clip the mark
- **tip** - whether to generate an implicit
  [pointer](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md)
  [tip](https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tip.md)
  <VersionBadge version="0.6.7" />

If the **clip**
option<a id="plot-features--marks--clip" href="#plot-features--marks--clip" aria-label="Permalink to &quot;clip&quot;"></a>
is _frame_ (or equivalently true), the mark is clipped to the frame’s
dimensions. If the **clip** option is null (or equivalently false), the mark is
not clipped. If the **clip** option is _sphere_, the mark will be clipped to the
projected sphere (_e.g._, the front hemisphere when using the orthographic
projection); a [geographic projection](#plot-features--projections) is required
in this case. Lastly if the **clip** option is a GeoJSON object
<VersionBadge version="0.6.17" pr="2243" />, the mark will be clipped to the
projected geometry.

If the **tip** option is true, a
[tip mark](https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tip.md)
with the
[pointer transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md)
will be derived from this mark and placed atop all other marks, offering details
on demand. If the **tip** option is set to an options object, these options will
be passed to the derived tip mark. If the **tip** option (or, if an object, its
**pointer** option) is set to _x_, _y_, or _xy_,
[pointerX](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md#pointerX),
[pointerY](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md#pointerY),
or
[pointer](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md#pointer)
will be used, respectively; otherwise the pointing mode will be chosen
automatically. (If the **tip** mark option is truthy, the **title** channel is
no longer applied using an SVG title element as this would conflict with the tip
mark.)

For all marks except [text](#plot-marks--text), the **dx** and **dy** options
are rendered as a transform property, possibly including a 0.5px offset on
low-density screens.

All marks support the following optional channels:

- **fill** - a fill color; bound to the _color_ scale
- **fillOpacity** - a fill opacity; bound to the _opacity_ scale
- **stroke** - a stroke color; bound to the _color_ scale
- **strokeOpacity** - a stroke opacity; bound to the _opacity_ scale
- **strokeWidth** - a stroke width (in pixels)
- **opacity** - an object opacity; bound to the _opacity_ scale
- **title** - an accessible, short-text description (a string of text, possibly
  with newlines)
- **href** - a URL to link to
- **ariaLabel** - a short label representing the value in the accessibility tree

The **fill**, **fillOpacity**, **stroke**, **strokeWidth**, **strokeOpacity**,
and **opacity** options can be specified as either channels or constants. When
the fill or stroke is specified as a function or array, it is interpreted as a
channel; when the fill or stroke is specified as a string, it is interpreted as
a constant if a valid CSS color and otherwise it is interpreted as a column name
for a channel. Similarly when the fill opacity, stroke opacity, object opacity,
stroke width, or radius is specified as a number, it is interpreted as a
constant; otherwise it is interpreted as a channel.

The scale associated with any channel can be overridden by specifying the
channel as an object with a _value_ property specifying the channel values and a
_scale_ property specifying the desired scale name or null for an unscaled
channel. For example, to force the **stroke** channel to be unscaled,
interpreting the associated values as literal color strings:

```js
Plot.dot(data, { stroke: { value: "fieldName", scale: null } });
```

To instead force the **stroke** channel to be bound to the _color_ scale
regardless of the provided values, say:

```js
Plot.dot(data, { stroke: { value: "fieldName", scale: "color" } });
```

The color channels (**fill** and **stroke**) are bound to the _color_ scale by
default, unless the provided values are all valid CSS color strings or nullish,
in which case the values are interpreted literally and unscaled.

In addition to functions of data, arrays, and column names, channel values can
be specified as an object with a _transform_ method; this transform method is
passed the mark’s array of data and must return the corresponding array of
channel values. (Whereas a channel value specified as a function is invoked
repeatedly for each element in the mark’s data, similar to _array_.map, the
transform method is invoked only once being passed the entire array of data.)
For example, to pass the mark’s data directly to the **x** channel, equivalent
to
[Plot.identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity):

```js
Plot.dot(numbers, { x: { transform: (data) => data } });
```

The **title**, **href**, and **ariaLabel** options can _only_ be specified as
channels. When these options are specified as a string, the string refers to the
name of a column in the mark’s associated data. If you’d like every instance of
a particular mark to have the same value, specify the option as a function that
returns the desired value, _e.g._ `() => "Hello, world!"`.

For marks that support the **frameAnchor** option, it may be specified as one of
the four sides (_top_, _right_, _bottom_, _left_), one of the four corners
(_top-left_, _top-right_, _bottom-right_, _bottom-left_), or the _middle_ of the
frame.

All marks support the following
[transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md)
options:

- **filter** - apply the
  [filter transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/filter.md)
- **sort** - apply the [sort transform](#plot-transforms--sort)
- **reverse** - apply the [reverse transform](#plot-transforms--sort--reverse)
- **transform** - apply a
  [custom transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#custom-transforms)
- **initializer** - apply a
  [custom initializer](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#custom-initializers)

The **sort** option, when not specified as a channel value (such as a field name
or an accessor function), can also be used to
[impute ordinal scale domains](#plot-features--scales--sort-mark-option).

<a id="plot-features--marks--insets"></a>

### Insets

Rect-like marks support insets: a positive inset moves the respective side in
(towards the opposing side), whereas a negative inset moves the respective side
out (away from the opposing side). Insets are specified in pixels using the
following options:

- **inset** - shorthand for all four insets
- **insetTop** - inset the top edge
- **insetRight** - inset the right edge
- **insetBottom** - inset the bottom edge
- **insetLeft** - inset the left edge

Insets default to zero. Insets are commonly used to create a one-pixel gap
between adjacent bars in histograms; the [bin transform](#plot-transforms--bin)
provides default insets. (Note that the
[band scale padding](#plot-features--scales--position-scale-options) defaults to
0.1 as an alternative to insets.)

<a id="plot-features--marks--rounded-corners"></a>

### Rounded corners

Rect-like marks support rounded corners. Each corner (or side) is individually
addressable <VersionBadge version="0.6.16" pr="2099" /> using the following
options:

- **r** - the radius for all four corners
- **rx1** - the radius for the **x1**-**y1** and **x1**-**y2** corners
- **rx2** - the radius for the **x2**-**y1** and **x2**-**y2** corners
- **ry1** - the radius for the **x1**-**y1** and **x2**-**y1** corners
- **ry2** - the radius for the **x1**-**y2** and **x2**-**y2** corners
- **rx1y1** - the radius for the **x1**-**y1** corner
- **rx1y2** - the radius for the **x1**-**y2** corner
- **rx2y1** - the radius for the **x2**-**y1** corner
- **rx2y2** - the radius for the **x2**-**y2** corner
- **rx** - the
  [_x_-radius](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx)
  for elliptical corners
- **ry** - the
  [_y_-radius](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/ry)
  for elliptical corners

Corner radii are specified in either pixels or, for **rx** and **ry**, as
percentages (strings) or the keyword _auto_. If the corner radii are too big,
they are reduced proportionally.

<a id="plot-features--marks--marks"></a>

## marks(..._marks_) <VersionBadge version="0.2.0" />

```js
Plot.marks(
  Plot.ruleY([0]),
  Plot.areaY(data, { fill: color, fillOpacity, ...options }),
  Plot.lineY(data, { stroke: color, ...options }),
);
```

A convenience method for composing a mark from a series of other marks. Returns
an array of marks that implements the _mark_.plot function. See the
[box mark](#plot-marks--box) implementation for an example.

---

<a id="plot-features--plots"></a>

# features/plots.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/features/plots.md

---
prev:
  text: Getting started
  link: /getting-started
---

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as htl from "htl";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";

const marginTop = ref(20);
const marginRight = ref(20);
const marginBottom = ref(30);
const marginLeft = ref(40);
const fixed = ref(true);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const penguins = shallowRef([]);
const stocks = computed(() => [...aapl.value.map((d) => ({...d, Symbol: "AAPL"})), ...goog.value.map((d) => ({...d, Symbol: "GOOG"}))]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/penguins.csv", d3.autoType).then((data) => (penguins.value = data));
});

</script>

<a id="plot-features--plots--plots"></a>

# Plots

To render a **plot** in Observable Plot, call
[plot](#plot-features--plots--plot) (typically as `Plot.plot`), passing in the
desired _options_. This function returns an SVG or HTML figure element.

:::plot https://observablehq.com/@observablehq/plot-hello-world

```js
Plot.plot({
  marks: [
    Plot.frame(),
    Plot.text(["Hello, world!"], { frameAnchor: "middle" }),
  ],
});
```

:::

:::tip The returned plot element is detached; it must be inserted into the page
to be visible. For help, see the
[getting started guide](https://github.com/observablehq/plot/tree/v0.6.17/docs/getting-started.md).
:::

<a id="plot-features--plots--marks-option"></a>

## Marks option

The **marks** option specifies an array of [marks](#plot-features--marks) to
render. Above, there are two marks: a [frame](#plot-marks--frame) to draw the
outline of the plot frame, and a [text](#plot-marks--text) to say hello. 👋

Each mark supplies its own tabular data. For example, the table below shows the
first five rows of a daily dataset of Apple stock price (`aapl`).

| Date       |      Open |      High |       Low |     Close |    Volume |
| ---------- | --------: | --------: | --------: | --------: | --------: |
| 2013-05-13 | 64.501427 | 65.414284 | 64.500000 | 64.962860 |  79237200 |
| 2013-05-14 | 64.835716 | 65.028572 | 63.164288 | 63.408573 | 111779500 |
| 2013-05-15 | 62.737144 | 63.000000 | 60.337143 | 61.264286 | 185403400 |
| 2013-05-16 | 60.462856 | 62.549999 | 59.842857 | 62.082859 | 150801000 |
| 2013-05-17 | 62.721428 | 62.869999 | 61.572857 | 61.894287 | 106976100 |

In JavaScript, we can represent tabular data as an array of objects. Each object
records a daily observation, with properties _Date_, _Open_, _High_, and so on.
This is known as a “row-based” format since each object corresponds to a row in
the table.

```js-vue
aapl = [
  {Date: new Date("2013-05-13"), Open: 64.501427, High: 65.414284, Low: 64.500000, Close: 64.962860, Volume: 79237200},
  {Date: new Date("2013-05-14"), Open: 64.835716, High: 65.028572, Low: 63.164288, Close: 63.408573, Volume: 111779500},
  {Date: new Date("2013-05-15"), Open: 62.737144, High: 63.000000, Low: 60.337143, Close: 61.264286, Volume: 185403400},
  {Date: new Date("2013-05-16"), Open: 60.462856, High: 62.549999, Low: 59.842857, Close: 62.082859, Volume: 150801000},
  {Date: new Date("2013-05-17"), Open: 62.721428, High: 62.869999, Low: 61.572857, Close: 61.894287, Volume: 106976100}
]
```

:::tip Rather than baking data into JavaScript, use
[JSON](https://en.wikipedia.org/wiki/JSON) or
[CSV](https://en.wikipedia.org/wiki/Comma-separated_values) files to store data.
You can use [d3.json](https://d3js.org/d3-fetch#json),
[d3.csv](https://d3js.org/d3-fetch#csv), or
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to load a
file. On Observable, you can also use a
[file attachment](https://observablehq.com/@observablehq/file-attachments) or
[SQL cell](https://observablehq.com/@observablehq/sql-cell). :::

To use data with Plot, pass the data as the first argument to the mark
constructor. We can then assign columns of data such as _Date_ and _Close_ to
visual properties of the mark (or “channels”) such as horizontal↔︎ position **x**
and vertical↕︎ position **y**.

:::plot defer https://observablehq.com/@observablehq/plot-first-line-chart

```js
Plot.plot({
  marks: [
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

A plot can have multiple marks, and each mark has its own data. For example, say
we had a similar table `goog` representing the daily price of Google stock for
the same period. Below, the
<span style="border-bottom: solid 2px var(--vp-c-red);">red</span> line
represents Google stock, while the
<span style="border-bottom: solid 2px var(--vp-c-blue);">blue</span> line
represents Apple stock.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks

```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(goog, { x: "Date", y: "Close", stroke: "red" }),
    Plot.lineY(aapl, { x: "Date", y: "Close", stroke: "blue" }),
  ],
});
```

:::

:::tip When comparing the performance of different stocks, we typically want to
normalize the return relative to a purchase price. See the
[normalize transform](#plot-transforms--normalize) for an example. :::

Alternatively, the tables can be combined, say with a _Symbol_ column to
distinguish AAPL from GOOG. This allows the use of a categorical _color_ scale
and legend.

:::plot defer https://observablehq.com/@observablehq/plot-stocks-multiline-chart

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(stocks, { x: "Date", y: "Close", stroke: "Symbol" }),
  ],
});
```

:::

Each mark has its own options, and different mark types support different
options. See the respective mark type (such as [bar](#plot-marks--bar) or
[dot](#plot-marks--dot)) for details.

Marks are drawn in the given order, with the last mark drawn on top. For
example, below
<span style="border-bottom: solid 2px var(--vp-c-green);">green</span> bars are
drawn on top of <span style="border-bottom: solid 2px;">{{$dark ? "white" :
"black"}}</span> bars.

:::plot https://observablehq.com/@observablehq/plot-marks-z-order

```js
Plot.plot({
  x: { padding: 0.4 },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency", dx: 2, dy: 2 }),
    Plot.barY(alphabet, {
      x: "letter",
      y: "frequency",
      fill: "green",
      dx: -2,
      dy: -2,
    }),
  ],
});
```

:::

<a id="plot-features--plots--layout-options"></a>

## Layout options

The layout options determine the overall size of the plot; all are specified as
numbers in pixels:

- **marginTop** - the top margin
- **marginRight** - the right margin
- **marginBottom** - the bottom margin
- **marginLeft** - the left margin
- **margin** - shorthand for the four margins
- **width** - the outer width of the plot (including margins)
- **height** - the outer height of the plot (including margins)

Experiment with the margins by adjusting the sliders below. Note that because
the _x_ scale is a _band_ scale, the **round** option defaults to true, so the
bars may jump when you adjust the horizontal margins to snap to crisp edges.

<p>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginTop:</span>
    <input type="range" v-model.number="marginTop" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginTop}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginRight:</span>
    <input type="range" v-model.number="marginRight" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginRight}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginBottom:</span>
    <input type="range" v-model.number="marginBottom" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginBottom}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginLeft:</span>
    <input type="range" v-model.number="marginLeft" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginLeft}}</span>
  </label>
</p>

:::plot hidden defer

```js
Plot.plot({
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  grid: true,
  marks: [
    Plot.frame({
      stroke: "var(--vp-c-text-2)",
      strokeOpacity: 0.5,
      insetTop: -marginTop,
      insetRight: -marginRight,
      insetBottom: -marginBottom,
      insetLeft: -marginLeft,
    }),
    Plot.barY(alphabet, { x: "letter", y: "frequency", fill: "green" }),
    Plot.frame(),
  ],
});
```

:::

```js-vue
Plot.plot({
  marginTop: {{marginTop}},
  marginRight: {{marginRight}},
  marginBottom: {{marginBottom}},
  marginLeft: {{marginLeft}},
  grid: true,
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "green"}),
    Plot.frame()
  ]
})
```

:::info To assist the explanation, the plot above is drawn with a light gray
border. :::

The default **width** is 640. On Observable, the width can be set to the
[standard width](https://github.com/observablehq/stdlib/blob/main/README.md#width)
to make responsive plots. The default **height** is chosen automatically based
on the plot’s associated scales; for example, if _y_ is linear and there is no
_fy_ scale, it might be 396. The default margins depend on the maximum margins
of the plot’s constituent [marks](#plot-features--plots--marks-option). While
most marks default to zero margins (because they are drawn inside the chart
area), Plot’s [axis mark](#plot-marks--axis) has non-zero default margins.

:::tip Plot does not adjust margins automatically to make room for long tick
labels. If your _y_ axis labels are too long, you can increase the
**marginLeft** to make more room. Also consider using a different **tickFormat**
for short labels (_e.g._, `s` for SI prefix notation), or a scale **transform**
(say to convert units to millions or billions). :::

The **aspectRatio**
option<a id="plot-features--plots--aspectRatio" href="#plot-features--plots--aspectRatio" aria-label="Permalink to &quot;aspectRatio&quot;"></a>
<VersionBadge version="0.6.4" />, if not null, computes a default **height**
such that a variation of one unit in the _x_ dimension is represented by the
corresponding number of pixels as a variation in the _y_ dimension of one unit.
The **aspectRatio** option is recommended only when _x_ and _y_ domains share
the same units, such as millimeters. When a position scale is
[ordinal](#plot-features--scales--discrete-scales) (_point_ or _band_),
consecutive domain values are treated as one unit length apart; for example, if
both _x_ and _y_ are ordinal, then an aspect ratio of one produces a square
grid.

<p>
  <label class="label-input">
    Use fixed aspect ratio:
    <input type="checkbox" v-model="fixed">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-intro-to-aspectratio

```js
Plot.plot({
  grid: true,
  inset: 10,
  aspectRatio: fixed ? 1 : undefined,
  color: { legend: true },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      stroke: "species",
    }),
  ],
});
```

:::

:::tip When using facets, set the _fx_ and _fy_ scales’ **round** option to
false if you need an exact aspect ratio. :::

<a id="plot-features--plots--other-options"></a>

## Other options

By default, [plot](#plot-features--plots--plot) returns an SVG element; however,
if the plot includes a title, subtitle, [legend](#plot-features--legends), or
caption, plot wraps the SVG element with an HTML figure element. You can also
force Plot to generate a figure element by setting the **figure** option
<VersionBadge version="0.6.10" pr="1761" /> to true.

The **title** & **subtitle** options <VersionBadge version="0.6.10" pr="1761" />
and the **caption** option accept either a string or an HTML element. If given
an HTML element, say using the
[`html` tagged template literal](http://github.com/observablehq/htl), the title
and subtitle are used as-is while the caption is wrapped in a figcaption
element; otherwise, the specified text will be escaped and wrapped in an h2, h3,
or figcaption, respectively.

:::plot https://observablehq.com/@observablehq/plot-caption

```js
Plot.plot({
  title: "For charts, an informative title",
  subtitle: "Subtitle to follow with additional context",
  caption: "Figure 1. A chart with a title, subtitle, and caption.",
  marks: [
    Plot.frame(),
    Plot.text([
      "Titles, subtitles, captions, and annotations assist inter­pretation by telling the reader what’s interesting. Don’t make the reader work to find what you already know.",
    ], { lineWidth: 30, frameAnchor: "middle" }),
  ],
});
```

:::

The **style** option allows custom styles to override Plot’s defaults. It may be
specified either as a string of inline styles (_e.g._, `"color: red;"`, in the
same fashion as assigning
[_element_.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style))
or an object of properties (_e.g._, `{color: "red"}`, in the same fashion as
assigning
[_element_.style properties](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)).
By default, the returned plot has a max-width of 100%, and the system-ui font.
Plot’s marks and axes default to
[currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword),
meaning that they will inherit the surrounding content’s color.

:::warning CAUTION Unitless numbers
([quirky lengths](https://www.w3.org/TR/css-values-4/#deprecated-quirky-length))
such as `{padding: 20}` are not supported by some browsers; you should instead
specify a string with units such as `{padding: "20px"}`. :::

The generated SVG element has a class name which applies a default stylesheet.
Use the top-level **className** option to specify that class name.

The **clip** option <VersionBadge version="0.6.10" pr="1792" /> determines the
default clipping behavior if the
[mark **clip** option](#plot-features--marks--mark-options) is not specified;
set it to true to enable clipping. This option does not affect
[axis](#plot-marks--axis), [grid](#plot-marks--grid), and
[frame](#plot-marks--frame) marks, whose **clip** option defaults to false.

The **document** option specifies the
[document](https://developer.mozilla.org/en-US/docs/Web/API/Document) used to
create plot elements. It defaults to window.document, but can be changed to
another document, say when using a virtual DOM implementation for server-side
rendering in Node.

<a id="plot-features--plots--plot"></a>

## plot(_options_)

```js
Plot.plot({
  height: 200,
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency" }),
  ],
});
```

Renders a new plot with the specified _options_, returning a SVG or HTML figure
element. This element can then be inserted into the page as described in the
[getting started guide](https://github.com/observablehq/plot/tree/v0.6.17/docs/getting-started.md).

<a id="plot-features--plots--mark_plot"></a>

## _mark_.plot(_options_)

```js
Plot.barY(alphabet, { x: "letter", y: "frequency" }).plot({ height: 200 });
```

Given a [_mark_](#plot-features--marks), this is a convenience shorthand for
calling [plot](#plot-features--plots--plot) where the **marks** option includes
this _mark_. Any additional **marks** in _options_ are drawn on top of this
_mark_.

<a id="plot-features--plots--plot_scale"></a>

## _plot_.scale(_name_)

```js
const plot = Plot.plot(options); // render a plot
const color = plot.scale("color"); // get the color scale
console.log(color.range); // inspect the scale’s range
```

Returns the [scale object](#plot-features--scales--scale-options) for the scale
with the specified _name_ (such as _x_ or _color_) on the given _plot_, where
_plot_ is a rendered plot element returned by
[plot](#plot-features--plots--plot). If the associated _plot_ has no scale with
the given _name_, returns undefined.

<a id="plot-features--plots--plot_legend"></a>

## _plot_.legend(_name_, _options_)

```js
const plot = Plot.plot(options); // render a plot
const legend = plot.legend("color"); // render a color legend
```

Renders a standalone legend for the scale with the specified _name_ (such as _x_
or _color_) on the given _plot_, where _plot_ is a rendered plot element
returned by [plot](#plot-features--plots--plot), returning a SVG or HTML figure
element. This element can then be inserted into the page as described in the
[getting started guide](https://github.com/observablehq/plot/tree/v0.6.17/docs/getting-started.md).
If the associated _plot_ has no scale with the given _name_, returns undefined.
Legends are currently only supported for _color_, _opacity_, and _symbol_
scales.

---

<a id="plot-features--projections"></a>

# features/projections.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/projections.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";

const longitude = ref(90);
const radius = ref(30);
const circle = computed(() => d3.geoCircle().center([9, 34]).radius(radius.value)());
const projection = ref("equirectangular");
const westport = shallowRef({type: null});
const earthquakes = shallowRef([]);
const walmarts = shallowRef([]);
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});

onMounted(() => {
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then((data) => (earthquakes.value = data.features.map((f) => ({longitude: f.geometry.coordinates[0], latitude: f.geometry.coordinates[1], magnitude: f.properties.mag}))));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/westport-house.json").then((data) => (westport.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

<a id="plot-features--projections--projections"></a>

# Projections <VersionBadge version="0.6.1" />

A **projection** maps abstract coordinates in _x_ and _y_ to pixel positions on
screen. Most often, abstract coordinates are spherical (degrees longitude and
latitude), as when rendering a geographic map. For example, below we show
earthquakes in the last seven days with a magnitude of 2.5 or higher as reported
by the [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
Use the slider to adjust the _orthographic_ projection’s center of longitude.

<p>
  <label class="label-input">
    Longitude:
    <input type="range" v-model.number="longitude" min="-180" max="180" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{longitude}}°</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-earthquake-globe

```js
Plot.plot({
  projection: { type: "orthographic", rotate: [-longitude, -30] },
  r: { transform: (d) => Math.pow(10, d) }, // convert Richter to amplitude
  marks: [
    Plot.geo(land, { fill: "currentColor", fillOpacity: 0.2 }),
    Plot.sphere(),
    Plot.dot(earthquakes, {
      x: "longitude",
      y: "latitude",
      r: "magnitude",
      stroke: "red",
      fill: "red",
      fillOpacity: 0.2,
    }),
  ],
});
```

:::

Above, a [geo mark](#plot-marks--geo) draws polygons representing land and a
[sphere mark](#plot-marks--geo--sphere) draws the outline of the globe. A
[dot mark](#plot-marks--dot) draws earthquakes as circles sized by magnitude.

The geo mark is “projection aware” so that it can handle all the nuances of
projecting spherical polygons to the screen — leaning on
[d3-geo](https://d3js.org/d3-geo) to provide
[adaptive sampling](https://observablehq.com/@d3/adaptive-sampling) with
configurable precision,
[antimeridian cutting](https://observablehq.com/@d3/antimeridian-cutting), and
clipping. The dot mark is not; instead, Plot applies the projection in place of
the _x_ and _y_ scales. Hence, projections work with any mark that consumes
continuous **x** and **y** channels — as well as marks that use **x1** & **y1**
and **x2** & **y2**. Each mark implementation decides whether to handle
projections specially or to treat the projection as any other position scale.
(For example, the [line mark](#plot-marks--line) is projection-aware to draw
geodesics.)

:::info Marks that require _band_ scales (bars, cells, and ticks) cannot be used
with projections. Likewise one-dimensional marks such as rules cannot be used,
though see [#1164](https://github.com/observablehq/plot/issues/1164). :::

Plot provides a variety of built-in projections. And as above, all world
projections can be rotated to show a different aspect.

<p>
  <label class="label-input">
    Projection:
    <select v-model="projection">
      <!-- <option>albers-usa</option> -->
      <!-- <option>albers</option> -->
      <option>azimuthal-equal-area</option>
      <option>azimuthal-equidistant</option>
      <!-- <option>conic-conformal</option> -->
      <option>conic-equal-area</option>
      <option>conic-equidistant</option>
      <option>equal-earth</option>
      <option>equirectangular</option>
      <option>gnomonic</option>
      <!-- <option>identity</option> -->
      <!-- <option>reflect-y</option> -->
      <option>mercator</option>
      <option>orthographic</option>
      <option>stereographic</option>
      <option>transverse-mercator</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-world-projections

```js-vue
Plot.plot({
  projection: "{{projection}}",
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor"}),
    Plot.sphere()
  ]
})
```

:::

Why so many? Each projection has its strengths and weaknesses:

- _conformal_ projections preserve angles and local shape,
- _equal-area_ projections preserve area (use these for choropleths),
- _equidistant_ projections preserve distance from one (or two) points,
- _azimuthal_ projections expand radially from a central feature,
- _cylindrical_ projections have symmetry around the axis of rotation,
- the _stereographic_ projection preserves circles, and
- the _gnomonic_ projection displays all great circles as straight lines!

No single projection is best at everything. It is impossible, for example, for a
projection to be both conformal and equal-area.

In addition to world projections, Plot provides the U.S.-centric _albers-usa_
conic equal-area projection with an inset of Alaska and Hawaii. (Note that the
scale for Alaska is diminished: it is projected at 0.35× its true relative
area.)

:::plot defer https://observablehq.com/@observablehq/plot-albers-usa-projection

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(nation),
    Plot.geo(statemesh, { strokeOpacity: 0.2 }),
  ],
});
```

:::

:::tip Use the _albers-usa_ projection for U.S.-centric choropleth maps. :::

For maps that focus on a specific region, use the **domain** option to zoom in.
This object should be a GeoJSON object. For example, you can use
[d3.geoCircle](https://d3js.org/d3-geo/shape#geoCircle) to generate a circle of
a given radius centered at a given longitude and latitude. You can also use the
**inset** options for a bit of padding around the **domain**.

<p>
  <label class="label-input">
    Radius:
    <input type="range" v-model.number="radius" min="10" max="50" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{radius.toFixed(1)}}°</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-projection-domain

```js
Plot.plot({
  projection: {
    type: "azimuthal-equidistant",
    rotate: [-9, -34],
    domain: circle,
    inset: 10,
  },
  marks: [
    Plot.graticule(),
    Plot.geo(land, { fill: "currentColor", fillOpacity: 0.3 }),
    Plot.geo(circle, { stroke: "red", strokeWidth: 2 }),
    Plot.frame(),
  ],
});
```

```js
circle = d3.geoCircle().center([9, 34]).radius(radius)();
```

If none of Plot’s built-in projections meet your needs, you can use any of
[D3’s extended projections](https://github.com/d3/d3-geo-projection) by
specifying the **projection** option as a function that returns a D3 projection.
Below, a map of Antarctica in a polar aspect of the _azimuthal-equidistant_
projection.

:::plot defer https://observablehq.com/@observablehq/plot-polar-projection

```js
Plot.plot({
  width: 688,
  height: 688,
  projection: ({ width, height }) =>
    d3.geoAzimuthalEquidistant()
      .rotate([0, 90])
      .translate([width / 2, height / 2])
      .scale(width)
      .clipAngle(40),
  marks: [
    Plot.graticule(),
    Plot.geo(land, { fill: "currentColor" }),
    Plot.frame(),
  ],
});
```

:::

While this notebook mostly details spherical projections, you can use the
_identity_ projection to display planar geometry. For example, below we draw a
schematic of the second floor of the
[Westport House](https://en.wikipedia.org/wiki/Westport_House) in Dundee,
Ireland.

:::plot defer https://observablehq.com/@observablehq/plot-floor-plan

```js
Plot.geo(westport).plot({ projection: { type: "identity", domain: westport } });
```

:::

:::tip There’s also a _reflect-y_ projection in case _y_ points up↑, which is
often the case with
[projected reference systems](https://en.wikipedia.org/wiki/Projected_coordinate_system).
:::

Naturally, Plot’s projection system is compatible with its
[faceting system](#plot-features--facets). Below, a comic strip of sorts shows
the locations of Walmart store openings in past decades.

:::plot defer https://observablehq.com/@observablehq/plot-map-small-multiples

```js
Plot.plot({
  marginLeft: 0,
  marginRight: 0,
  projection: "albers",
  fx: {
    interval: "10 years",
    tickFormat: (d) => `${d.getUTCFullYear()}’s`,
    label: null,
  },
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.1 }),
    Plot.geo(nation),
    Plot.dot(walmarts, {
      fx: "date",
      x: "longitude",
      y: "latitude",
      r: 1,
      fill: "currentColor",
    }),
  ],
});
```

:::

:::info This uses the
[**interval** scale option](#plot-features--scales--scale-transforms) to bin
temporal data into facets by decade. :::

To learn more about mapping with Plot, see our hands-on tutorials:

- [Build your first map with Observable Plot](https://observablehq.com/@observablehq/build-your-first-map-with-observable-plot)
- [Build your first choropleth map with Observable Plot](https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot)

<a id="plot-features--projections--projection-options"></a>

## Projection options

The **projection** [plot option](#plot-features--plots) applies a
two-dimensional (often geographic) projection in place of **x** and **y**
scales. It is typically used in conjunction with a [geo mark](#plot-marks--geo)
to produce a map, but can be used with any mark that supports **x** and **y**
channels, such as [dot](#plot-marks--dot), [text](#plot-marks--text),
[arrow](#plot-marks--arrow), and [rect](#plot-marks--rect). For marks that use
**x1**, **y1**, **x2**, and **y2** channels, the two projected points are ⟨_x1_,
_y1_⟩ and ⟨_x2_, _y2_⟩; otherwise, the projected point is ⟨_x_, _y_⟩.

The following built-in named projections are supported:

- _equirectangular_ - the equirectangular, or _plate carrée_, projection
- _orthographic_ - the orthographic projection
- _stereographic_ - the stereographic projection
- _mercator_ - the Mercator projection
- _equal-earth_ - the
  [Equal Earth projection](https://en.wikipedia.org/wiki/Equal_Earth_projection)
  by Šavrič _et al._
- _azimuthal-equal-area_ - the azimuthal equal-area projection
- _azimuthal-equidistant_ - the azimuthal equidistant projection
- _conic-conformal_ - the conic conformal projection
- _conic-equal-area_ - the conic equal-area projection
- _conic-equidistant_ - the conic equidistant projection
- _gnomonic_ - the gnomonic projection
- _transverse-mercator_ - the transverse Mercator projection
- _albers_ - the Albers’ conic equal-area projection
- _albers-usa_ - a composite Albers conic equal-area projection suitable for the
  United States
- _identity_ - the identity projection for planar geometry
- _reflect-y_ - like the identity projection, but _y_ points up
- null (default) - the null projection for pre-projected geometry in screen
  coordinates

In addition to these named projections, the **projection** option may be
specified as a [D3 projection](https://d3js.org/d3-geo/projection), or any
custom projection that implements
[_projection_.stream](https://d3js.org/d3-geo/stream), or a function that
receives a configuration object ({_width_, _height_, ..._options_}) and returns
such a projection. In the last case, the width and height represent the frame
dimensions minus any insets.

If the **projection** option is specified as an object, the following additional
projection options are supported:

- **type** - one of the projection names above
- **parallels** - the
  [standard parallels](https://d3js.org/d3-geo/conic#conic_parallels) (for conic
  projections only)
- **precision** - the
  [sampling threshold](https://d3js.org/d3-geo/projection#projection_precision)
- **rotate** - a two- or three- element array of Euler angles to rotate the
  sphere
- **domain** - a GeoJSON object to fit in the center of the (inset) frame
- **inset** - inset by the given amount in pixels when fitting to the frame
  (default zero)
- **insetLeft** - inset from the left edge of the frame (defaults to inset)
- **insetRight** - inset from the right edge of the frame (defaults to inset)
- **insetTop** - inset from the top edge of the frame (defaults to inset)
- **insetBottom** - inset from the bottom edge of the frame (defaults to inset)
- **clip** - the projection clipping method

The following projection clipping methods are supported for **clip**:

- _frame_ or true (default) - clip to the extent of the frame (including margins
  but not insets)
- a number - clip to a great circle of the given radius in degrees centered
  around the origin
- null or false - do not clip

Whereas the **clip** [mark option](#plot-features--marks--mark-options) is
implemented using SVG clipping, the **clip** projection option affects the
generated geometry and typically produces smaller SVG output.

---

<a id="plot-features--scales"></a>

# features/scales.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/features/scales.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import gistemp from "../data/gistemp.ts";

const intervaled = ref(true);
const padding = ref(0.1);
const align = ref(0.5);
const radius = ref(8);
const schemeq = ref("turbo");
const schemed = ref("rdbu");
const schemeo = ref("Observable10");
const interpolateq = ref("rgb");
const anomaly = gistemp.map((d) => d.Anomaly);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const sftemp = shallowRef([]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/sf-temperatures.csv", d3.autoType).then((data) => (sftemp.value = data));
});

</script>

<a id="plot-features--scales--scales"></a>

# Scales

**Scales** convert an abstract value such as time or temperature to a visual
value such as _x_→ or _y_↑ position or color. For example, say we have a dataset
(`gistemp`) containing monthly observations of
[global average surface temperature](https://data.giss.nasa.gov/gistemp/) from
1880 to 2016, represented as the “anomaly” (or difference) relative to the
1951–1980 average. The first few rows are:

| Date       | Anomaly |
| ---------- | ------: |
| 1880-01-01 |    -0.3 |
| 1880-02-01 |   -0.21 |
| 1880-03-01 |   -0.18 |
| 1880-04-01 |   -0.27 |
| 1880-05-01 |   -0.14 |
| 1880-06-01 |   -0.29 |

When visualizing this data with a [line](#plot-marks--line), the _x_ scale is
responsible for mapping dates to horizontal↔︎ positions. For example, 1880-01-01
might be mapped to _x_ = 40 (on the left) and 2016-12-01 might be mapped to _x_
= 620 (on the right). Likewise, the _y_ scale maps temperature anomalies to
vertical↕︎ positions.

:::plot https://observablehq.com/@observablehq/plot-scales-intro

```js
Plot.lineY(gistemp, { x: "Date", y: "Anomaly" }).plot();
```

:::

In Plot, the [mark](#plot-features--marks) binds channels to scales; for
example, the line’s **x** channel is bound to the _x_ scale. The channel name
and the scale name are often the same, but not always; for example, an area’s
**y1** and **y2** channels are both bound to the _y_ scale. (You can opt-out of
a scale for a particular channel using
[scale overrides](#plot-features--marks--mark-options) if needed.)

Think of a scale as a function that takes an abstract value and returns the
corresponding visual value. For the _y_ scale above, that might look like this:

```js
function y(anomaly) {
  const t = (anomaly - minAnomaly) / (maxAnomaly - minAnomaly); // t in [0, 1]
  return height - marginBottom - t * (height - marginTop - marginBottom);
}
```

The function `y` depends on a few additional details: the chart’s size and
margins, and the minimum and maximum temperatures in the data:

```js
const marginTop = 20;
const marginBottom = 30;
const height = 400;
const minAnomaly = d3.min(gistemp, (d) => d.Anomaly);
const maxAnomaly = d3.max(gistemp, (d) => d.Anomaly);
```

Scales aren’t limited to horizontal and vertical position. They can also output
to color, radius, length, opacity, and more. For example if we switch to a
[rule](#plot-marks--rule) and use the **stroke** channel instead of **y**, we
get a one-dimensional heatmap:

:::plot https://observablehq.com/@observablehq/plot-scales-intro

```js
Plot.ruleX(gistemp, { x: "Date", stroke: "Anomaly" }).plot();
```

:::

While the resulting chart looks different, the _color_ scale here behaves
similarly to the `y` function above — the only difference is that it
interpolates colors (using
[d3.interpolateTurbo](https://d3js.org/d3-scale-chromatic/sequential#interpolateTurbo))
instead of numbers (the top and bottom sides of the plot frame):

```js
function color(anomaly) {
  const t = (anomaly - minAnomaly) / (maxAnomaly - minAnomaly); // t in [0, 1]
  return d3.interpolateTurbo(t);
}
```

Within a given [plot](#plot-features--plots), marks share scales. For example,
if a plot has two line marks, such as the lines below visualizing the daily
closing price of
<span style="border-bottom: solid 2px var(--vp-c-red);">Google</span> and
<span style="border-bottom: solid 2px var(--vp-c-blue);">Apple</span> stock,
both share the same _x_ and _y_ scales for a consistent encoding.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks

```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(goog, { x: "Date", y: "Close", stroke: "red" }),
    Plot.lineY(aapl, { x: "Date", y: "Close", stroke: "blue" }),
  ],
});
```

:::

:::tip When comparing the performance of different stocks, we typically want to
normalize the return relative to a purchase price; see the
[normalize transform](#plot-transforms--normalize) for an example. Also, not
that we recommend them, but if you are interested in dual-axis charts, please
upvote [#147](https://github.com/observablehq/plot/issues/147). :::

Plot has many different scales; we categorize them by their _input_ (**domain**)
and _output_ (**range**).

The **domain** is the abstract values that the scale expects as input. For
quantitative or temporal data, it is typically expressed as an extent such as
[_start_, _end_], [_cold_, _hot_], or [_min_, _max_]. For ordinal or nominal
data, it is an array of values such as names or categories. The type of input
values corresponds to the **type** scale option (_e.g._, _linear_ or _ordinal_).

The **range** is the visual values that the scale generates as output. For
position scales, it is typically an extent such as [_left_, _right_] or
[_bottom_, _top_]; for color scales, it might be a continuous extent [_blue_,
_red_] or an array of discrete colors. The type of values that a scale outputs
corresponds to the _name_ of the scale (_e.g._, _x_ or _color_).

<!-- Position, color, radius, length, angle. In many cases this is just what the underlying interpolator is. For position, the output is a number, so we interpolate from the left to the right side. Whereas for color, the output is a color, we need a color space such as RGB or LCh to interpolate, or a fixed color ramp such as *turbo*.  -->

<!-- There are also some special transforms we can apply as part of the visual encoding. For example, continuous transforms such as log and sqrt. And sometimes converting continuous values into discrete values, with quantile, quantize, threshold. The latter transforms especially are usually for color. -->

Let’s look at some examples to make this less abstract.

<a id="plot-features--scales--continuous-scales"></a>

## Continuous scales

The domain of a quantitative scale is a continuous extent [_min_, _max_] where
_min_ and _max_ are numbers, such as temperatures. Below, the first domain value
(_x_ = 0) corresponds to the left side of the plot while the second (_x_ = 100)
corresponds to the right side.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { domain: [0, 100], grid: true } });
```

:::

Flipping the domain reverses the scale so that +_x_ points ←left instead of
right→.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { domain: [100, 0], grid: true } });
```

:::

Alternatively, use the **reverse** option; this is convenient when the domain is
implied from data rather than specified explicitly.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { domain: [0, 100], reverse: true, grid: true } });
```

:::

If the domain is dates, Plot will default to a UTC scale. This is a linear scale
with ticks based on the Gregorian calendar.

<!-- Plot doesn’t parse dates; convert your strings to [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instances with [d3.utcParse](https://d3js.org/d3-time-format#utcParse) or [d3.autoType](https://d3js.org/d3-dsv#autoType). -->

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: { domain: [new Date("2021-01-01"), new Date("2022-01-01")], grid: true },
});
```

:::

To force a UTC scale, say when the data is milliseconds since UNIX epoch rather
than Date instances, pass _utc_ as the **type** option. Though we recommend
coercing strings and numbers to more specific types when you load data, rather
than relying on scales to do it.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: { type: "utc", domain: [1609459200000, 1640995200000], grid: true },
});
```

:::

If the scale **type** is _time_, the ticks will be in local time — as with the
dates below — rather than UTC.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: {
    type: "time",
    domain: [new Date(2021, 0, 1), new Date(2022, 0, 1)],
    grid: true,
  },
});
```

:::

When plotting values that vary widely, such as the luminosity of stars in an
[HR diagram](https://observablehq.com/@mbostock/hertzsprung-russell-diagram), a
_log_ scale may improve readability. Log scales default to base-10 ticks with
SI-prefix notation.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { type: "log", domain: [1e0, 1e5], grid: true } });
```

:::

If you prefer conventional notation, you can specify the **tickFormat** option
to change the behavior of the axis. The **tickFormat** option can either be a
[d3.format](https://d3js.org/d3-format) string or a function that takes a tick
value and returns the corresponding string. Note, however, that this may result
in overlapping text.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: { type: "log", domain: [1e0, 1e5], tickFormat: ",", grid: true },
});
```

:::

Log scales also support a **base** option, say for powers of two. This does not
affect the scale’s encoding, but it does change where ticks are shown.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: { type: "log", base: 2, domain: [1e0, 1e4], ticks: 20, grid: true },
});
```

:::

The domain of a log scale cannot include (or cross) zero; for this, consider a
[bi-symmetric log](https://d3js.org/d3-scale/symlog) scale instead.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { type: "symlog", domain: [-10, 10], grid: true } });
```

:::

Power scales and square-root scales are also supported. The _pow_ scale supports
the **exponent** option, which defaults to 1 (for a linear scale). The _sqrt_
scale is shorthand for a _pow_ scale with exponent 0.5.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({ x: { type: "sqrt", domain: [0, 100], grid: true } });
```

:::

:::plot https://observablehq.com/@observablehq/plot-continuous-scales

```js
Plot.plot({
  x: { type: "pow", exponent: 1 / 3, domain: [0, 100], grid: true },
});
```

:::

Continuous scales also support a **clamp** option which, if true, clamps input
values to the scale’s domain before scaling. This is useful for preventing marks
from escaping the chart area.

Continuous scales support an **interpolate** option specified either as a
function that takes a single argument _t_ in [0, 1] and returns the
corresponding value from the **range**, or as a two-argument function that takes
a pair of values [_start_, _end_] from the range and returns the corresponding
interpolator from [0, 1], typically mapping 0 to _start_, and 1 to _end_.

Continuous scales support a piecewise **domain** specified as an array of _n_
domain values (with _n_ greater than or equal to two), with a corresponding
**range** having the same number of values; each segment of the domain is mapped
to the matching segment of the range using the scale’s interpolator. When the
domain has _n_&nbsp;&gt;&nbsp;2 elements and the range has two elements (for
example, when using the default range on a _x_ or _y_ scale), the latter is
automatically split into _n_&nbsp;&minus;&nbsp;1 segments of equal size. Note
that in addition to the domain, you must specify the scale’s continuous **type**
since a scale specified with a domain having more than two elements otherwise
defaults to an ordinal scale. (You will often have to specify the **ticks**
manually, too.) For an example, see the
[Polylinear axis](https://observablehq.com/@observablehq/polylinear-axis)
notebook.

<a id="plot-features--scales--discrete-scales"></a>

## Discrete scales

Sadly, not all data is continuous: some data is merely ordinal, such as t-shirt
sizes; and some categorical (_a.k.a._ nominal), such as brands of clothing. To
encode such data as position, a _point_ or _band_ scale is required.

A _point_ scale divides space into uniformly-spaced discrete values. It is
commonly used for scatterplots (a [dot mark](#plot-marks--dot)) of ordinal data.
It is the default scale type for ordinal data on the _x_ and _y_ scale.

:::plot https://observablehq.com/@observablehq/plot-discrete-scales

```js
Plot.plot({ x: { type: "point", domain: "ABCDEFGHIJ", grid: true } });
```

:::

A band scale divides space into uniformly-spaced and -sized discrete intervals.
It is commonly used for bar charts (bar marks). To show the bands below, we use
a [cell](#plot-marks--cell) instead of a [grid](#plot-marks--grid).

:::plot https://observablehq.com/@observablehq/plot-discrete-scales

```js
Plot
  .cell("ABCDEFGHIJ", {
    x: Plot.identity,
    stroke: "currentColor",
    strokeOpacity: 0.1,
  })
  .plot({ x: { type: "band", domain: "ABCDEFGHIJ" } });
```

:::

While _point_ and _band_ scales appear visually similar when only the grid is
visible, the two are not identical — they differ respective to padding. Play
with the options below to get a sense of their effect on the scale’s behavior.

<p>
  <label class="label-input">
    <span>Padding:</span>
    <input type="range" v-model.number="padding" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toFixed(2)}}</span>
  </label>
  <label class="label-input">
    <span>Align:</span>
    <input type="range" v-model.number="align" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{align.toFixed(2)}}</span>
  </label>
</p>

:::plot hidden https://observablehq.com/@observablehq/plot-discrete-scales

```js
Plot.plot({
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    align,
    round: false,
  },
  marks: [
    Plot.frame({ strokeOpacity: 0.3 }),
    Plot.tickX("ABCDEFGHIJ", { x: Plot.identity, stroke: "currentColor" }),
  ],
});
```

:::

:::plot hidden https://observablehq.com/@observablehq/plot-discrete-scales

```js
Plot.plot({
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    align,
    round: false,
  },
  marks: [
    Plot.frame({ strokeOpacity: 0.3 }),
    Plot.cell("ABCDEFGHIJ", { x: Plot.identity, stroke: "currentColor" }),
  ],
});
```

:::

Position scales also have a **round** option which forces the scale to snap to
integer pixels. This defaults to true for point and band scales, and false for
quantitative scales. Use caution with high-cardinality ordinal domains (_i.e._,
a point or band scale used to encode many different values), as rounding can
lead to “wasted” space or even zero-width bands.

<a id="plot-features--scales--color-scales"></a>

## Color scales

While position is the most salient (and important) encoding, color matters too!
The default quantitative color scale **type** is _linear_, and the default
**scheme** is
[_turbo_](https://ai.googleblog.com/2019/08/turbo-improved-rainbow-colormap-for.html).
A wide variety of sequential, diverging, and cyclical schemes are supported,
including ColorBrewer and [_viridis_](http://bids.github.io/colormap/).

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemeq">
      <optgroup label="sequential, single-hue">
        <option value="blues">Blues</option>
        <option value="greens">Greens</option>
        <option value="greys">Greys</option>
        <option value="purples">Purples</option>
        <option value="reds">Reds</option>
        <option value="oranges">Oranges</option>
      </optgroup>
      <optgroup label="sequential, multi-hue">
        <option value="turbo" selected>Turbo</option>
        <option value="viridis">Viridis</option>
        <option value="magma">Magma</option>
        <option value="inferno">Inferno</option>
        <option value="plasma">Plasma</option>
        <option value="cividis">Cividis</option>
        <option value="cubehelix">Cubehelix</option>
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="bugn">BuGn</option>
        <option value="bupu">BuPu</option>
        <option value="gnbu">GnBu</option>
        <option value="orrd">OrRd</option>
        <option value="pubugn">PuBuGn</option>
        <option value="pubu">PuBu</option>
        <option value="purd">PuRd</option>
        <option value="rdpu">RdPu</option>
        <option value="ylgnbu">YlGnBu</option>
        <option value="ylgn">YlGn</option>
        <option value="ylorbr">YlOrBr</option>
        <option value="ylorrd">YlOrRd</option>
      </optgroup>
      <optgroup label="cyclical">
        <option value="rainbow">Rainbow</option>
        <option value="sinebow">Sinebow</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden

```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    scheme: schemeq,
  },
  marks: [
    Plot.cell(d3.range(40), {
      x: Plot.identity,
      fill: Plot.identity,
      inset: -0.5,
    }),
  ],
});
```

:::

You can implement a custom color scheme by specifying the scale’s **range**, or
by passing an **interpolate** function that takes a parameter _t_ in [0, 1]. The
**interpolate** option can specify a color space such as _rgb_, or a
two-argument function that takes a pair of values from the range.

<p>
  <label class="label-input">
    Color interpolate:
    <select v-model="interpolateq">
      <option value="rgb">rgb</option>
      <option value="lab">lab</option>
      <option value="hcl">hcl</option>
      <option value="hsl">hsl</option>
      <option value="rgb-gamma">d3.interpolateRgb.gamma(2)</option>
      <option value="angry-rainbow">(t) => `hsl(${t * 360},100%,50%)`</option>
    </select>
  </label>
</p>

:::plot hidden

```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    type: "linear",
    ...interpolateq === "angry-rainbow"
      ? { interpolate: (t) => `hsl(${t * 360},100%,50%)` }
      : interpolateq === "rgb-gamma"
      ? {
        range: ["steelblue", "orange"],
        interpolate: d3.interpolateRgb.gamma(2),
      }
      : { range: ["steelblue", "orange"], interpolate: interpolateq },
  },
  marks: [
    Plot.cell(d3.range(40), {
      x: Plot.identity,
      fill: Plot.identity,
      inset: -0.5,
    }),
  ],
});
```

:::

And like position scales, you can apply a _sqrt_, _pow_, _log_, or _symlog_
transform; these are often useful when working with non-uniformly distributed
data.

Diverging color scales are intended to show positive and negative values, or
more generally values above or below some **pivot** value. Diverging color
scales default to the _RdBu_ (red–blue) color scheme. The pivot defaults to
zero, but you can change it with the **pivot** option, which should ideally be a
value near the middle of the domain.

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemed">
      <optgroup label="diverging">
        <option value="brbg">BrBG</option>
        <option value="prgn">PRGn</option>
        <option value="piyg">PiYG</option>
        <option value="puor">PuOr</option>
        <option value="rdbu">RdBu</option>
        <option value="rdgy">RdGy</option>
        <option value="rdylbu">RdYlBu</option>
        <option value="rdylgn">RdYlGn</option>
        <option value="spectral">Spectral</option>
        <option value="burd">BuRd</option>
        <option value="buylrd">BuYlRd</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden

```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    type: "linear",
    scheme: schemed,
  },
  marks: [
    Plot.cell(d3.range(40), {
      x: Plot.identity,
      fill: Plot.identity,
      inset: -0.5,
    }),
  ],
});
```

:::

Below we again show observed global surface temperatures. The reversed _BuRd_
color scheme is used since
<span :style="{borderBottom: `solid 2px ${d3.interpolateRdBu(0.9)}`}">blue</span>
and
<span :style="{borderBottom: `solid 2px ${d3.interpolateRdBu(0.1)}`}">red</span>
are semantically associated with cold and hot, respectively.

:::plot https://observablehq.com/@observablehq/plot-diverging-color-scatterplot

```js
Plot.plot({
  grid: true,
  color: {
    type: "diverging",
    scheme: "BuRd",
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, { x: "Date", y: "Anomaly", stroke: "Anomaly" }),
  ],
});
```

:::

Plot also provides color schemes for discrete data. Use the _categorical_ type
for categorical (nominal) unordered data, and the _ordinal_ type for ordered
data.

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemeo">
      <optgroup label="categorical">
        <option>Accent</option>
        <option>Category10</option>
        <option>Dark2</option>
        <option>Observable10</option>
        <option>Paired</option>
        <option>Pastel1</option>
        <option>Pastel2</option>
        <option>Set1</option>
        <option>Set2</option>
        <option>Set3</option>
        <option>Tableau10</option>
      </optgroup>
      <optgroup label="sequential, single-hue">
        <option value="blues">Blues</option>
        <option value="greens">Greens</option>
        <option value="greys">Greys</option>
        <option value="purples">Purples</option>
        <option value="reds">Reds</option>
        <option value="oranges">Oranges</option>
      </optgroup>
      <optgroup label="sequential, multi-hue">
        <option value="turbo" selected>Turbo</option>
        <option value="viridis">Viridis</option>
        <option value="magma">Magma</option>
        <option value="inferno">Inferno</option>
        <option value="plasma">Plasma</option>
        <option value="cividis">Cividis</option>
        <option value="cubehelix">Cubehelix</option>
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="bugn">BuGn</option>
        <option value="bupu">BuPu</option>
        <option value="gnbu">GnBu</option>
        <option value="orrd">OrRd</option>
        <option value="pubugn">PuBuGn</option>
        <option value="pubu">PuBu</option>
        <option value="purd">PuRd</option>
        <option value="rdpu">RdPu</option>
        <option value="ylgnbu">YlGnBu</option>
        <option value="ylgn">YlGn</option>
        <option value="ylorbr">YlOrBr</option>
        <option value="ylorrd">YlOrRd</option>
      </optgroup>
      <optgroup label="cyclical">
        <option value="rainbow">Rainbow</option>
        <option value="sinebow">Sinebow</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden

```js
Plot.plot({
  color: {
    type: "ordinal",
    scheme: schemeo,
  },
  marks: [
    Plot.cell("ABCDEFGHIJ", { x: Plot.identity, fill: Plot.identity }),
  ],
});
```

:::

:::warning CAUTION Discrete color schemes are intended for data that has only a
few unique values. If the size of the categorical domain exceeds the number of
colors in the scheme, colors will be reused; combining values into an “other”
category is recommended. :::

<a id="plot-features--scales--other-scales"></a>

## Other scales

But wait, there’s more! 😅 Plot has _opacity_, _r_, _symbol_, and _length_
scales, too. For example, the _r_ scale **type** defaults to _sqrt_ such that
when used with the [dot mark](#plot-marks--dot), the resulting area is
proportional to the **r** channel value. You can adjust the effective dot size
by specifying an explicit **range**, as below.

<p>
  <label class="label-input">
    Radius:
    <input type="range" v-model.number="radius" min="1" max="20" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{radius.toFixed(1)}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-radius-scale-range

```js
Plot.plot({
  r: { range: [0, radius] },
  marks: [
    Plot.dot(d3.range(1, 11), {
      x: Plot.identity,
      r: Plot.identity,
      fill: "currentColor",
    }),
  ],
});
```

:::

The default **range** for the associated _r_ scale is constructed such that a
zero value maps to zero for an accurate areal encoding, while the first quartile
of values is mapped to a radius of three pixels; this tends to be more stable
with varying data.

<a id="plot-features--scales--type-inference"></a>

## Type inference

Plot strives to be concise: rather than you laboriously specifying everything,
Plot can guess by inspecting the data so you don’t have to set the **type**,
**domain**, and **range** (and for color, **scheme**) of scales explicitly. But
for Plot’s guesses to be accurate, your data must match Plot’s expectations.
Here they are.

A scale’s **type** is most often inferred from associated marks’ channel values:
strings and booleans imply an _ordinal_ scale; dates imply a _utc_ scale;
anything else is _linear_. Plot assumes that your data is consistently typed, so
inference is based solely on the first non-null, non-undefined value. We
recommend typed CSV (passing `{typed: true}` to Observable’s FileAttachment csv
method) or explicitly coercing types when loading data (_e.g._, d3.autoType).

If a scale’s **domain** is specified explicitly, the scale’s **type** is
inferred from the **domain** values rather than channels as described above.
However, if the **domain** or **range** has more than two elements, the
_ordinal_ type (or _point_ for position scales) is used.

Finally, some marks declare the scale **type** for associated channels. For
example, [barX](#plot-marks--bar) requires _y_ to be a _band_ scale. Further,
the facet scales _fx_ and _fy_ are always _band_ scales, and the _r_ (radius)
scale is implicitly a _sqrt_ scale.

If you don’t specify a quantitative scale’s **domain**, it is the extent
(minimum and maximum) of associated channel values, except for the _r_ (radius)
scale where it goes from zero to the maximum. A quantitative domain can be
extended to “nice” human-readable values with the **nice** option. For an
ordinal scale, the domain defaults to the sorted union (all distinct values in
natural order) of associated values; see the
[**sort** mark option](#plot-features--scales--sort-mark-option) to change the
order.

All position scales (_x_, _y_, _fx_, and _fy_) have implicit automatic ranges
based on the chart dimensions. The _x_ scale ranges from the left to right edge,
while the _y_ scale ranges from the bottom to top edge, accounting for margins.

<a id="plot-features--scales--scale-transforms"></a>

## Scale transforms

The **transform** scale option allows you to apply a function to all values
before they are passed through the scale. This is convenient for transforming a
scale’s data, say to convert to thousands or between temperature units.

:::plot defer
https://observablehq.com/@observablehq/plot-fahrenheit-to-celsius-scale-transform

```js{5}
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°C)",
    transform: (f) => (f - 32) * (5 / 9) // convert Fahrenheit to Celsius
  },
  marks: [
    Plot.ruleY([32]), // 32°F
    Plot.lineY(sftemp, Plot.windowY(7, {x: "date", y: "high"}))
  ]
})
```

:::

The **percent** scale option is shorthand for a **transform** that multiplies
values by 100; it also adds a percent symbol (%) to the default label.

:::plot https://observablehq.com/@observablehq/plot-percent-scale-transform

```js{2}
Plot.plot({
  y: {percent: true}, // convert proportion [0, 1] to percent [0, 100]
  color: {scheme: "BuRd"},
  marks: [
    Plot.rectY(gistemp, Plot.binX({y: "proportion", fill: "x"}, {x: "Anomaly", fill: "Anomaly"})),
    Plot.ruleY([0])
  ]
})
```

:::

:::warning CAUTION
[Mark transforms](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md)
typically consume values _before_ they are passed through scales (_e.g._, when
binning). In this case the mark transforms will see the values prior to the
scale transform as input, and the scale transform will apply to the _output_ of
the mark transform. :::

The **interval** scale
option<a id="plot-features--scales--interval" href="#plot-features--scales--interval" aria-label="Permalink to &quot;interval&quot;"></a>
<VersionBadge version="0.5.1" /> sets an ordinal scale’s **domain** to the start
of every interval within the extent of the data. In addition, it implicitly sets
the **transform** of the scale to _interval_.floor, rounding values down to the
start of each interval. For example, below we generate a time-series bar chart;
when an **interval** is specified, missing days are visible.

<p>
  <label class="label-input">
    Use interval:
    <input type="checkbox" v-model="intervaled">
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-band-scale-interval

```js
Plot.plot({
  marginBottom: 80,
  x: {
    tickRotate: -90,
    interval: intervaled ? "day" : null,
    label: null,
  },
  y: {
    transform: (d) => d / 1e6,
    label: "Daily trade volume (millions)",
  },
  marks: [
    Plot.barY(aapl.slice(-40), { x: "Date", y: "Volume" }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip As an added bonus, the **fontVariant** and **type** options are no longer
needed because Plot now understands that the _x_ scale, despite being _ordinal_,
represents daily observations. :::

While the example above relies on the **interval** being promoted to the scale’s
**transform**, the [stack](#plot-transforms--stack),
[bin](#plot-transforms--bin), and [group](#plot-transforms--group) transforms
are also interval-aware: they apply the scale’s **interval**, if any, _before_
grouping values. (This results in the interval being applied twice, both before
and after the mark transform, but the second application has no effect since
interval application is idempotent.)

The **interval** option can also be used for quantitative and temporal scales.
This enforces uniformity, say rounding timed observations down to the nearest
hour, which may be helpful for the [stack transform](#plot-transforms--stack)
among other uses.

<a id="plot-features--scales--scale-options"></a>

## Scale options

Each scale’s options are specified as a nested options object with the
corresponding scale name within the top-level
[plot options](#plot-features--plots):

- **x** - horizontal position
- **y** - vertical position
- **r** - radius (size)
- **color** - fill or stroke
- **opacity** - fill or stroke opacity
- **length** - linear length (for [vectors](#plot-marks--vector))
- **symbol** - categorical symbol (for [dots](#plot-marks--dot))

For example, to set the domain for the _x_ scale:

:::plot

```js
Plot.plot({ x: { domain: [new Date("1880-01-01"), new Date("2016-11-01")] } });
```

:::

Plot supports many scale types. Some scale types are for quantitative data:
values that can be added or subtracted, such as temperature or time. Other scale
types are for ordinal or categorical data: unquantifiable values that can only
be ordered, such as t-shirt sizes, or values with no inherent order that can
only be tested for equality, such as types of fruit. Some scale types are
further intended for specific visual encodings: for example, as position or
color.

You can set the scale type explicitly via the **type** scale option, though
typically the scale type is inferred automatically. Some marks mandate a
particular scale type: for example, [barY](#plot-marks--bar) requires that the
_x_ scale is a _band_ scale. Some scales have a default type: for example, the
_r_ (radius) scale defaults to _sqrt_ and the _opacity_ scale defaults to
_linear_. Most often, the scale type is inferred from associated data, pulled
either from the domain (if specified) or from associated channels. Strings and
booleans imply an ordinal scale; dates imply a UTC scale; and anything else is
linear. Unless they represent text, we recommend explicitly converting strings
to more specific types when loading data (_e.g._, with d3.autoType or
Observable’s FileAttachment). For simplicity’s sake, Plot assumes that data is
consistently typed; type inference is based solely on the first non-null,
non-undefined value.

For quantitative data (_i.e._ numbers), a mathematical transform may be applied
to the data by changing the scale type:

- _linear_ (default) - linear transform (translate and scale)
- _pow_ - power (exponential) transform
- _sqrt_ - square-root transform (_pow_ transform with exponent = 0.5)
- _log_ - logarithmic transform
- _symlog_ - bi-symmetric logarithmic transform per
  [Webber _et al._](https://www.researchgate.net/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data)

The appropriate transform depends on the data’s distribution and what you wish
to know. A _sqrt_ transform exaggerates differences between small values at the
expense of large values; it is a special case of the _pow_ transform which has a
configurable _scale_.**exponent** (0.5 for _sqrt_). A _log_ transform is
suitable for comparing orders of magnitude and can only be used when the domain
does not include zero. The base defaults to 10 and can be specified with the
_scale_.**base** option; note that this only affects the axis ticks and not the
scale’s behavior. A _symlog_ transform is more elaborate, but works well with
wide-range values that include zero; it can be configured with the
_scale_.**constant** option (default 1).

For temporal data (_i.e._ dates), two variants of a _linear_ scale are also
supported:

- _utc_ (default, recommended) - UTC time
- _time_ - local time

UTC is recommended over local time as charts in UTC time are guaranteed to
appear consistently to all viewers whereas charts in local time will depend on
the viewer’s time zone. Due to limitations in JavaScript’s Date class, Plot does
not yet support an explicit time zone other than UTC.

For ordinal data (_e.g._, strings), use the _ordinal_ scale type or the _point_
or _band_ position scale types. The _categorical_ scale type is also supported;
it is equivalent to _ordinal_ except as a color scale, where it provides a
different default color scheme. (Since position is inherently ordinal or even
quantitative, categorical data must be assigned an effective order when
represented as position, and hence _categorical_ and _ordinal_ may be considered
synonymous in context.)

You can opt-out of a scale using the _identity_ scale type. This is useful if
you wish to specify literal colors or pixel positions within a mark channel
rather than relying on the scale to convert abstract values into visual values.
For position scales (_x_ and _y_), an _identity_ scale is still quantitative and
may produce an axis, yet unlike a _linear_ scale the domain and range are fixed
based on the plot layout.

:::tip To opt-out of a scale for a single channel, you can specify the channel
values as a `{value, scale}` object; see
[mark options](#plot-features--marks--mark-options). :::

Quantitative scales, as well as identity position scales, coerce channel values
to numbers; both null and undefined are coerced to NaN. Similarly, time scales
coerce channel values to dates; numbers are assumed to be milliseconds since
UNIX epoch, while strings are assumed to be in
[ISO 8601 format](https://github.com/mbostock/isoformat/blob/main/README.md#parsedate-fallback).

A scale’s domain (the extent of its inputs, abstract values) and range (the
extent of its outputs, visual values) are typically inferred automatically. You
can set them explicitly using these options:

- **domain** - typically [_min_, _max_], or an array of ordinal or categorical
  values
- **range** - typically [_min_, _max_], or an array of ordinal or categorical
  values
- **unknown** - the desired output value (defaults to undefined) for invalid
  input values
- **reverse** - reverses the domain (or the range), say to flip the chart along
  _x_ or _y_
- **interval** - an interval or time interval (for interval data; see below)

For most quantitative scales, the default domain is the [_min_, _max_] of all
values associated with the scale. For the _radius_ and _opacity_ scales, the
default domain is [0, _max_] to ensure a meaningful value encoding. For ordinal
scales, the default domain is the set of all distinct values associated with the
scale in natural ascending order; for a different order, set the domain
explicitly or add a [**sort** option](#plot-features--scales--sort-mark-option)
to an associated mark. For threshold scales, the default domain is [0] to
separate negative and non-negative values. For quantile scales, the default
domain is the set of all defined values associated with the scale. If a scale is
reversed, it is equivalent to setting the domain as [_max_, _min_] instead of
[_min_, _max_].

The default range depends on the scale: for position scales (_x_, _y_, _fx_, and
_fy_), the default range depends on the
[plot’s size and margins](#plot-features--plots). For color scales, there are
default color schemes for quantitative, ordinal, and categorical data. For
opacity, the default range is [0, 1]. And for radius, the default range is
designed to produce dots of “reasonable” size assuming a _sqrt_ scale type for
accurate area representation: zero maps to zero, the first quartile maps to a
radius of three pixels, and other values are extrapolated. This convention for
radius ensures that if the scale’s data values are all equal, dots have the
default constant radius of three pixels, while if the data varies, dots will
tend to be larger.

The behavior of the **unknown** scale option depends on the scale type. For
quantitative and temporal scales, the unknown value is used whenever the input
value is undefined, null, or NaN. For ordinal or categorical scales, the unknown
value is returned for any input value outside the domain. For band or point
scales, the unknown option has no effect; it is effectively always equal to
undefined. If the unknown option is set to undefined (the default), or null or
NaN, then the affected input values will be considered undefined and filtered
from the output.

For data at regular intervals, such as integer values or daily samples, the
[**interval** option](#plot-features--scales--scale-transforms) can be used to
enforce uniformity. The specified _interval_ — such as d3.utcMonth — must expose
an _interval_.floor(_value_), _interval_.offset(_value_), and
_interval_.range(_start_, _stop_) functions. The option can also be specified as
a number, in which case it will be promoted to a numeric interval with the given
step. The option can alternatively be specified as a string (_second_, _minute_,
_hour_, _day_, _week_, _month_, _quarter_, _half_, _year_, _monday_, _tuesday_,
_wednesday_, _thursday_, _friday_, _saturday_, _sunday_)
<VersionBadge version="0.6.2" /> naming the corresponding time interval, or a
skip interval consisting of a number followed by the interval name (possibly
pluralized), such as _3 months_ or _10 years_. This option sets the default
_scale_.transform to the given interval’s _interval_.floor function. In
addition, the default _scale_.domain is an array of uniformly-spaced values
spanning the extent of the values associated with the scale.

Quantitative scales can be further customized with additional options:

- **clamp** - if true, clamp input values to the scale’s domain
- **nice** - if true (or a tick count), extend the domain to nice round values
- **zero** - if true, extend the domain to include zero if needed
- **percent** - if true, transform proportions in [0, 1] to percentages in [0,
  100]

Clamping is typically used in conjunction with setting an explicit domain since
if the domain is inferred, no values will be outside the domain. Clamping is
useful for focusing on a subset of the data while ensuring that extreme values
remain visible, but use caution: clamped values may need an annotation to avoid
misinterpretation. Top-level **clamp**, **nice**, and **zero** options are
supported as shorthand for setting the respective option on all scales.

The **transform** option allows you to apply a function to all values before
they are passed through the scale. This is convenient for transforming a scale’s
data, say to convert to thousands or between temperature units.

```js
Plot.plot({
  y: {
    label: "Temperature (°F)",
    transform: (f) => f * 9 / 5 + 32 // convert Celsius to Fahrenheit
  },
  marks: …
})
```

<a id="plot-features--scales--color-scale-options"></a>

### Color scale options

The normal scale types — _linear_, _sqrt_, _pow_, _log_, _symlog_, and _ordinal_
— can be used to encode color. In addition, Plot supports special scale types
for color:

- _categorical_ - like _ordinal_, but defaults to _observable10_
- _sequential_ - like _linear_
- _cyclical_ - like _linear_, but defaults to _rainbow_
- _threshold_ - discretizes using thresholds given as the **domain**; defaults
  to _rdylbu_
- _quantile_ - discretizes by computing quantile thresholds; defaults to
  _rdylbu_
- _quantize_ - discretizes by computing uniform thresholds; defaults to _rdylbu_
  <VersionBadge version="0.4.3" />
- _diverging_ - like _linear_, but with a pivot; defaults to _rdbu_
- _diverging-log_ - like _log_, but with a pivot that defaults to 1; defaults to
  _rdbu_
- _diverging-pow_ - like _pow_, but with a pivot; defaults to _rdbu_
- _diverging-sqrt_ - like _sqrt_, but with a pivot; defaults to _rdbu_
- _diverging-symlog_ - like _symlog_, but with a pivot; defaults to _rdbu_

For a _threshold_ scale, the **domain** represents _n_ (typically numeric)
thresholds which will produce a **range** of _n_ + 1 output colors; the *i*th
color of the **range** applies to values that are smaller than the *i*th element
of the domain and larger or equal to the _i_ - 1th element of the domain. For a
_quantile_ scale, the **domain** represents all input values to the scale, and
the **n** option specifies how many quantiles to compute from the **domain**;
**n** quantiles will produce **n** - 1 thresholds, and an output range of **n**
colors. For a _quantize_ scale, the domain will be transformed into
approximately **n** quantized values, where **n** is an option that defaults
to 5.

By default, all diverging color scales are symmetric around the pivot; set
**symmetric** to false if you want to cover the whole extent on both sides.

Color scales support two additional options:

- **scheme** - a named color scheme in lieu of a range, such as _reds_
- **interpolate** - in conjunction with a range, how to interpolate colors

For quantile and quantize color scales, the **scheme** option is used in
conjunction with **n**, which determines how many quantiles or quantized values
to compute, and thus the number of elements in the scale’s range; it defaults to
5 (for quintiles in the case of a quantile scale).

The following sequential scale schemes are supported for both quantitative and
ordinal data:

:::plot defer hidden

```js
Plot.plot({
  width: 322,
  height: 25 * 27,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: { axis: null },
  y: { axis: "right", tickSize: 0 },
  color: { type: "identity" },
  marks: [
    Plot.cell(
      [
        ["Blues", d3.interpolateBlues],
        ["Greens", d3.interpolateGreens],
        ["Greys", d3.interpolateGreys],
        ["Purples", d3.interpolatePurples],
        ["Reds", d3.interpolateReds],
        ["Oranges", d3.interpolateOranges],
        ["Turbo", d3.interpolateTurbo],
        ["Viridis", d3.interpolateViridis],
        ["Magma", d3.interpolateMagma],
        ["Inferno", d3.interpolateInferno],
        ["Plasma", d3.interpolatePlasma],
        ["Cividis", d3.interpolateCividis],
        ["Cubehelix", d3.interpolateCubehelixDefault],
        ["Warm", d3.interpolateWarm],
        ["Cool", d3.interpolateCool],
        ["BuGn", d3.interpolateBuGn],
        ["BuPu", d3.interpolateBuPu],
        ["GnBu", d3.interpolateGnBu],
        ["OrRd", d3.interpolateOrRd],
        ["PuBuGn", d3.interpolatePuBuGn],
        ["PuBu", d3.interpolatePuBu],
        ["PuRd", d3.interpolatePuRd],
        ["RdPu", d3.interpolateRdPu],
        ["YlGnBu", d3.interpolateYlGnBu],
        ["YlGn", d3.interpolateYlGn],
        ["YlOrBr", d3.interpolateYlOrBr],
        ["YlOrRd", d3.interpolateYlOrRd],
      ].flatMap(([name, i]) =>
        d3.ticks(0, 1, 20).map((t) => [t, name, String(i(t))])
      ),
      { fill: "2", insetTop: 0.5, insetBottom: 0.5 },
    ),
  ],
});
```

:::

The default color scheme, _turbo_, was chosen primarily to ensure high-contrast
visibility. Color schemes such as _blues_ make low-value marks difficult to see
against a white background, for better or for worse. To use a subset of a
continuous color scheme (or any single-argument _interpolate_ function), set the
_scale_.range property to the corresponding subset of [0, 1]; for example, to
use the first half of the _rainbow_ color scheme, use a range of [0, 0.5]. By
default, the full range [0, 1] is used. If you wish to encode a quantitative
value without hue, consider using _opacity_ rather than _color_ (e.g., use
Plot.dot’s _strokeOpacity_ instead of _stroke_).

The following diverging scale schemes are supported:

:::plot defer hidden

```js
Plot.plot({
  width: 322,
  height: 25 * 11,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: { axis: null },
  y: { axis: "right", tickSize: 0 },
  color: { type: "identity" },
  marks: [
    Plot.cell(
      [
        ["BrBG", d3.interpolateBrBG],
        ["PRGn", d3.interpolatePRGn],
        ["PiYG", d3.interpolatePiYG],
        ["PuOr", d3.interpolatePuOr],
        ["RdBu", d3.interpolateRdBu],
        ["RdGy", d3.interpolateRdGy],
        ["RdYlBu", d3.interpolateRdYlBu],
        ["RdYlGn", d3.interpolateRdYlGn],
        ["Spectral", d3.interpolateSpectral],
        ["BuRd", (t) => d3.interpolateRdBu(1 - t)],
        ["BuYlRd", (t) => d3.interpolateRdYlBu(1 - t)],
      ].flatMap(([name, i]) =>
        d3.ticks(0, 1, 30).map((t) => [t, name, String(i(t))])
      ),
      { fill: "2", insetTop: 0.5, insetBottom: 0.5 },
    ),
  ],
});
```

:::

Picking a diverging color scheme name defaults the scale type to _diverging_;
set the scale type to _linear_ to treat the color scheme as sequential instead.
Diverging color scales support a _scale_.**pivot** option, which defaults to
zero. Values below the pivot will use the lower half of the color scheme
(_e.g._, reds for the _rdgy_ scheme), while values above the pivot will use the
upper half (grays for _rdgy_).

The following cylical color schemes are supported:

:::plot defer hidden

```js
Plot.plot({
  width: 322,
  height: 25 * 2,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: { axis: null },
  y: { axis: "right", tickSize: 0 },
  color: { type: "identity" },
  marks: [
    Plot.cell(
      [
        ["rainbow", d3.interpolateRainbow],
        ["sinebow", d3.interpolateSinebow],
      ].flatMap(([name, i]) =>
        d3.ticks(0, 1, 30).map((t) => [t, name, String(i(t))])
      ),
      { fill: "2", insetTop: 0.5, insetBottom: 0.5 },
    ),
  ],
});
```

:::

The following categorical color schemes are supported:

:::plot defer hidden

```js
Plot.plot({
  width: 322,
  height: 25 * 10,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: { axis: null },
  y: { axis: "right", tickSize: 0 },
  color: { type: "identity" },
  marks: [
    Plot.cell(
      [
        ["Accent", d3.schemeAccent],
        ["Category10", d3.schemeCategory10],
        ["Dark2", d3.schemeDark2],
        ["Observable10", Plot.scale({ color: { type: "categorical" } }).range],
        ["Paired", d3.schemePaired],
        ["Pastel1", d3.schemePastel1],
        ["Pastel2", d3.schemePastel2],
        ["Set1", d3.schemeSet1],
        ["Set2", d3.schemeSet2],
        ["Set3", d3.schemeSet3],
        ["Tableau10", d3.schemeTableau10],
      ].flatMap(([name, scheme]) => scheme.map((s, i) => [i, name, s])),
      { fill: "2", inset: 0.5 },
    ),
  ],
});
```

:::

The following color interpolators are supported:

- _rgb_ - RGB (red, green, blue)
- _hsl_ - HSL (hue, saturation, lightness)
- _lab_ - CIELAB (_a.k.a._ “Lab”)
- _hcl_ - CIELCh<sub>ab</sub> (_a.k.a._ “LCh” or “HCL”)

<a id="plot-features--scales--position-scale-options"></a>

### Position scale options

The position scales (_x_, _y_, _fx_, and _fy_) support additional options:

- **inset** - inset the default range by the specified amount in pixels
- **round** - round the output value to the nearest integer (whole pixel)

The _x_ and _fx_ scales support asymmetric insets for more precision. Replace
inset by:

- **insetLeft** - insets the start of the default range by the specified number
  of pixels
- **insetRight** - insets the end of the default range by the specified number
  of pixels

Similarly, the _y_ and _fy_ scales support asymmetric insets with:

- **insetTop** - insets the top of the default range by the specified number of
  pixels
- **insetBottom** - insets the bottom of the default range by the specified
  number of pixels

The inset scale options can provide “breathing room” to separate marks from axes
or the plot’s edge. For example, in a scatterplot with a Plot.dot with the
default 3-pixel radius and 1.5-pixel stroke width, an inset of 5 pixels prevents
dots from overlapping with the axes. The _scale_.round option is useful for
crisp edges by rounding to the nearest pixel boundary.

In addition to the generic _ordinal_ scale type, which requires an explicit
output range value for each input domain value, Plot supports special _point_
and _band_ scale types for encoding ordinal data as position. These scale types
accept a [_min_, _max_] range similar to quantitative scales, and divide this
continuous interval into discrete points or bands based on the number of
distinct values in the domain (_i.e._, the domain’s cardinality). If the
associated marks have no effective width along the ordinal dimension — such as a
dot, rule, or tick — then use a _point_ scale; otherwise, say for a bar, use a
_band_ scale.

Ordinal position scales support additional options, all specified as proportions
in [0, 1]:

- **padding** - how much of the range to reserve to inset first and last point
  or band
- **align** - where to distribute points or bands (0 = at start, 0.5 = at
  middle, 1 = at end)

For a _band_ scale, you can further fine-tune padding:

- **paddingInner** - how much of the range to reserve to separate adjacent bands
- **paddingOuter** - how much of the range to reserve to inset first and last
  band

Align defaults to 0.5 (centered). Band scale padding defaults to 0.1 (10% of
available space reserved for separating bands), while point scale padding
defaults to 0.5 (the gap between the first point and the edge is half the
distance of the gap between points, and likewise for the gap between the last
point and the opposite edge). Note that rounding and mark insets (e.g., for bars
and rects) also affect separation between adjacent marks.

Plot implicitly generates an [axis mark](#plot-marks--axis) for position scales
if one is not explicitly declared. (For more control, declare the axis mark
explicitly.) The following [axis mark options](#plot-marks--axis--axis-options)
are also available as scale options, applying to the implicit axis:

- **axis** - the axis **anchor**: _top_, _bottom_ (_x_ or _fx_); _left_, _right_
  (_y_ or _fy_); _both_; null to suppress
- **ticks** - the approximate number of ticks to generate, or interval, or array
  of values
- **tickSpacing** - the approximate number of pixels between ticks (if **ticks**
  is not specified)
- **tickSize** - the length of each tick (in pixels; default 6 for _x_ and _y_,
  or 0 for _fx_ and _fy_)
- **tickPadding** - the separation between the tick and its label (in pixels;
  default 3)
- **tickFormat** - either a function or specifier string to format tick values;
  see [Formats](#plot-features--formats)
- **tickRotate** - whether to rotate tick labels (an angle in degrees clockwise;
  default 0)
- **fontVariant** - the font-variant attribute; defaults to _tabular-nums_ if
  quantitative
- **label** - a string to label the axis
- **labelAnchor** - the label anchor: _top_, _right_, _bottom_, _left_, or
  _center_
- **labelArrow** - the label arrow: _auto_ (default), _up_, _right_, _down_,
  _left_, _none_, or true <VersionBadge version="0.6.7" />
- **labelOffset** - the label position offset (in pixels; default depends on
  margins and orientation)
- **ariaLabel** - a short label representing the axis in the accessibility tree
- **ariaDescription** - a textual description for the axis

For an implicit [grid mark](#plot-marks--grid), use the **grid** option. For an
implicit [frame mark](#plot-marks--frame) along one edge of the frame, use the
**line** option.

- **grid** - whether to draw grid lines across the plot for each tick
- **line** - if true, draw the axis line (only for _x_ and _y_)

Top-level options are also supported as shorthand: **grid** (for _x_ and _y_
only; see [facets](#plot-features--facets)), **label**, **axis**, **inset**,
**round**, **align**, and **padding**. If the **grid** option is true, show a
grid using _currentColor_; if specified as a string, show a grid with the
specified color; if an approximate number of ticks, an interval, or an array of
tick values, show corresponding grid lines.

<a id="plot-features--scales--sort-mark-option"></a>

## Sort mark option <VersionBadge version="0.2.0" />

If an ordinal scale’s domain is not set, it defaults to natural ascending order;
to order the domain by associated values in another dimension, either compute
the domain manually (consider
[d3.groupSort](https://d3js.org/d3-array/group#groupSort)) or use an associated
mark’s **sort** option. For example, to sort bars by ascending frequency rather
than alphabetically by letter:

```js
Plot.barY(alphabet, { x: "letter", y: "frequency", sort: { x: "y" } });
```

The sort option is an object whose keys are ordinal scale names, such as _x_ or
_fx_, and whose values are mark channel names, such as **y**, **y1**, or **y2**.
By specifying an existing channel rather than a new value, you avoid repeating
the order definition and can refer to channels derived by
[transforms](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md)
(such as [stack](#plot-transforms--stack) or [bin](#plot-transforms--bin)). When
sorting the _x_ domain, if no **x** channel is defined, **x2** will be used
instead if available, and similarly for _y_ and **y2**; this is useful for marks
that implicitly stack such as [area](#plot-marks--area),
[bar](#plot-marks--bar), and [rect](#plot-marks--rect). A sort value may also be
specified as _width_ or _height_ <VersionBadge version="0.4.2" />, representing
derived channels |_x2_ - _x1_| and |_y2_ - _y1_| respectively.

Note that there may be multiple associated values in the secondary dimension for
a given value in the primary ordinal dimension. The secondary values are
therefore grouped for each associated primary value, and each group is then
aggregated by applying a reducer. The default reducer is _max_, but may be
changed by specifying the **reduce** option. Lastly the primary values are by
default sorted based on the associated reduced value in natural ascending order
to produce the domain. The above code is shorthand for:

```js
Plot.barY(alphabet, {
  x: "letter",
  y: "frequency",
  sort: { x: "y", reduce: "max", order: "ascending" },
});
```

Generally speaking, a reducer only needs to be specified when there are multiple
secondary values for a given primary value. See the
[group transform](#plot-transforms--group) for the list of supported reducers.

For descending rather than ascending order, set the **order** option to
_descending_:

```js
Plot.barY(alphabet, {
  x: "letter",
  y: "frequency",
  sort: { x: "y", order: "descending" },
});
```

Alternatively, the _-channel_ shorthand option, which changes the default
**order** to _descending_:

```js
Plot.barY(alphabet, { x: "letter", y: "frequency", sort: { x: "-y" } });
```

Setting **order** to null will disable sorting, preserving the order of the
data. (When an aggregating transform is used, such as
[group](#plot-transforms--group) or [bin](#plot-transforms--bin), note that the
data may already have been sorted and thus the order may differ from the input
data.)

Alternatively, set the **reverse** option to true. This produces a different
result than descending order for null or unorderable values: descending order
puts nulls last, whereas reversed ascending order puts nulls first.

```js
Plot.barY(alphabet, {
  x: "letter",
  y: "frequency",
  sort: { x: "y", reverse: true },
});
```

An additional **limit** option truncates the domain to the first _n_ values
after ordering. If **limit** is negative, the last _n_ values are used instead.
Hence, a positive **limit** with **reverse** = true will return the top _n_
values in descending order. If **limit** is an array [_lo_, _hi_], the *i*th
values with _lo_ ≤ _i_ < _hi_ will be selected. (Note that like the
[basic filter transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/filter.md),
limiting the _x_ domain here does not affect the computation of the _y_ domain,
which is computed independently without respect to filtering.)

```js
Plot.barY(alphabet, {
  x: "letter",
  y: "frequency",
  sort: { x: "y", limit: 5 },
});
```

If different sort options are needed for different ordinal scales, the channel
name can be replaced with a _value_ object with additional per-scale options.

```js
Plot.barY(alphabet, {
  x: "letter",
  y: "frequency",
  sort: { x: { value: "y", order: "descending" } },
});
```

If the input channel is _data_, then the reducer is passed groups of the mark’s
data; this is typically used in conjunction with a custom reducer function, as
when the built-in single-channel reducers are insufficient.

Note: when the value of the sort option is a string or a function, it is
interpreted as a mark [sort transform](#plot-transforms--sort). To use both sort
options and a mark sort transform, use
[Plot.sort](#plot-transforms--sort--sort).

<a id="plot-features--scales--scale"></a>

## scale(_options_) <VersionBadge version="0.4.0" />

You can also create a standalone scale with Plot.**scale**(_options_). The
_options_ object must define at least one scale; see
[Scale options](#plot-features--scales--scale-options) for how to define a
scale. For example, here is a categorical color scale with the _Tableau10_ color
scheme and a domain of fruits:

```js
const color = Plot.scale({
  color: { scheme: "Tableau10", domain: ["apple", "orange", "pear"] },
});
```

Both [_plot_.scale](#plot-features--plots--plot_scale) and
[Plot.scale](#plot-features--scales--scale) return scale objects. These objects
represent the actual (or “materialized”) scale options used by Plot, including
the domain, range, interpolate function, _etc._ The scale’s label, if any, is
also returned; however, note that other axis properties are not currently
exposed. Point and band scales also expose their materialized bandwidth and
step.

```js
color.domain; // ["apple", "orange", "pear"]
```

For convenience, scale objects expose a _scale_.**apply**(_input_) method which
returns the scale’s output for the given _input_ value. When applicable, scale
objects also expose a _scale_.**invert**(_output_) method which returns the
corresponding input value from the scale’s domain for the given _output_ value.

```js
color.apply("apple"); // "#4e79a7"
```

To apply a standalone scale object to a plot, pass it to Plot.plot as the
corresponding scale options, such as **color**:

:::plot

```js
Plot.cellX(["apple", "apple", "orange", "pear", "orange"]).plot({ color });
```

:::

As another example, below are two plots with different options where the second
plot uses the _color_ scale from the first plot:

```js
const plot1 = Plot.plot({ ...options1 });
const plot2 = Plot.plot({ ...options2, color: plot1.scale("color") });
```

---

<a id="plot-marks--area"></a>

# marks/area.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/area.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import aapl from "../data/aapl.ts";
import industries from "../data/bls-industry-unemployment.ts";
import sftemp from "../data/sf-temperatures.ts";

</script>

<a id="plot-marks--area--area-mark"></a>

# Area mark

The **area mark** draws the region between a baseline (**x1**, **y1**) and a
topline (**x2**, **y2**) as in an area chart. Often the baseline represents _y_
= 0, and because the area mark interpolates between adjacent data points,
typically both the _x_ and _y_ scales are quantitative or temporal.

:::plot https://observablehq.com/@observablehq/plot-area-simple

```js
Plot.areaY(aapl, { x: "Date", y: "Close" }).plot();
```

:::

The area mark has three constructors: [areaY](#plot-marks--area--areaY) for when
the baseline and topline share _x_ values, as in a time-series area chart where
time goes right→ (or ←left); [areaX](#plot-marks--area--areaX) for when the
baseline and topline share _y_ values, as in a time-series area chart where time
goes up↑ (or down↓); and lastly the rarely-used [area](#plot-marks--area--area)
where the baseline and topline share neither _x_ nor _y_ values.

The area mark is often paired with a [line](#plot-marks--line) and
[rule](#plot-marks--rule) mark to accentuate the topline and baseline.

:::plot https://observablehq.com/@observablehq/plot-area-and-line

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.areaY(aapl, { x: "Date", y: "Close", fillOpacity: 0.3 }),
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
    Plot.ruleY([0]),
  ],
});
```

:::

With the default definitions of **x** = index and **y** =
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity),
you can pass an array of numbers as data. Below, a random walk is constructed
with [d3.cumsum](https://observablehq.com/@d3/d3-cumsum?collection=@d3/d3-array)
and
[d3.randomNormal](https://observablehq.com/@d3/d3-random?collection=@d3/d3-random).

:::plot defer https://observablehq.com/@observablehq/plot-random-walk-area

```js
Plot.areaY(d3.cumsum({ length: 600 }, d3.randomNormal())).plot();
```

:::

As with [lines](#plot-marks--line), points in areas are connected in input
order: the first point is connected to the second point, the second is connected
to the third, and so on. Area data is typically in chronological order. Unsorted
data may produce gibberish.

:::plot defer https://observablehq.com/@observablehq/plot-area-sort

```js
Plot.areaY(d3.shuffle(aapl.slice()), { x: "Date", y: "Close" }).plot(); // 🌶️
```

:::

If your data isn’t sorted, use the [sort transform](#plot-transforms--sort).

:::plot defer https://observablehq.com/@observablehq/plot-area-sort

```js
Plot.areaY(d3.shuffle(aapl.slice()), { x: "Date", y: "Close", sort: "Date" })
  .plot();
```

:::

When the baseline is not _y_ = 0 but instead represents another dimension of
data as in a band chart, specify **y1** and **y2** instead of **y**.

:::plot defer https://observablehq.com/@observablehq/plot-temperature-band

```js
Plot.plot({
  y: {
    label: "Temperature (°F)",
    grid: true,
  },
  marks: [
    Plot.areaY(sftemp, { x: "date", y1: "low", y2: "high" }),
  ],
});
```

:::

:::tip Since **y1** and **y2** refer to different fields here, a _y_-scale label
is specified to improve readability. Also, the band above is spiky; you can
smooth it by applying a
[window transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/window.md).
:::

While charts typically put _y_ = 0 on the bottom edge, such that the area grows
up↑, this is not required; reversing the _y_ scale will produce a “hanging” area
that grows down↓.

:::plot defer https://observablehq.com/@observablehq/plot-top-down-area-chart

```js
Plot.plot({
  x: {
    label: null,
  },
  y: {
    grid: true,
    reverse: true,
  },
  marks: [
    Plot.areaY(aapl, { x: "Date", y: "Close", fillOpacity: 0.3 }),
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
    Plot.ruleY([0]),
  ],
});
```

:::

For a vertically-oriented baseline and topline, such as when time goes up↑
instead of right→, use [areaX](#plot-marks--area--areaX) instead of
[areaY](#plot-marks--area--areaY) and swap **x** and **y**.

:::plot defer https://observablehq.com/@observablehq/plot-vertical-area-chart

```js
Plot.plot({
  x: {
    grid: true,
  },
  marks: [
    Plot.areaX(aapl, { y: "Date", x: "Close", fillOpacity: 0.3 }),
    Plot.lineX(aapl, { y: "Date", x: "Close" }),
    Plot.ruleX([0]),
  ],
});
```

:::

If some channel values are undefined (or null or NaN), gaps will appear between
adjacent points. To demonstrate, below we set the **y** value to NaN for the
first three months of each year.

:::plot defer
https://observablehq.com/@observablehq/plot-area-chart-with-missing-data

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.areaY(aapl, {
      x: "Date",
      y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close,
      fillOpacity: 0.3,
    }),
    Plot.lineY(aapl, {
      x: "Date",
      y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close,
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

Supplying undefined values is not the same as filtering the data: the latter
will interpolate between the data points. Observe the conspicuous straight lines
below!

:::plot defer

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.areaY(aapl, {
      filter: (d) => d.Date.getUTCMonth() >= 3,
      x: "Date",
      y: "Close",
      fillOpacity: 0.3,
    }),
    Plot.lineY(aapl, {
      x: "Date",
      y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close,
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

If a **fill** channel is specified, it is assumed to be ordinal or nominal; data
is grouped into series and then implicitly [stacked](#plot-transforms--stack).

:::plot defer https://observablehq.com/@observablehq/plot-stacked-areas

```js
Plot.plot({
  y: {
    transform: (d) => d / 1000,
    label: "Unemployed (thousands)",
  },
  marks: [
    Plot.areaY(industries, { x: "date", y: "unemployed", fill: "industry" }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::warning CAUTION This area chart uses color but does not include a
[legend](#plot-features--legends). This should usually be avoided because color
cannot be interpreted without a legend, titles, or labels. :::

Or, as a streamgraph with the **offset** stack transform option:

:::plot defer https://observablehq.com/@observablehq/plot-centered-streamgraph

```js
Plot.plot({
  y: {
    transform: (d) => d / 1000,
    label: "Unemployed (thousands)",
  },
  marks: [
    Plot.areaY(industries, {
      x: "date",
      y: "unemployed",
      fill: "industry",
      offset: "wiggle",
    }),
  ],
});
```

:::

The **z** channel determines how data is grouped: if the **z** channel is not
specified, but a varying **fill** channel is, the **fill** channel is used for
**z**; the **z** channel will further fallback to a varying **stroke** channel
if needed.

The **z** channel (either implicitly or explicitly) is typically used with the
[stack transform](#plot-transforms--stack) for a stacked area chart or
streamgraph. You can disable the implicit stack transform and produce
overlapping areas by setting **y2** instead of **y**.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-areas

```js
Plot.plot({
  marks: [
    Plot.areaY(industries, {
      x: "date",
      y2: "unemployed",
      z: "industry",
      fillOpacity: 0.1,
    }),
    Plot.lineY(industries, {
      x: "date",
      y: "unemployed",
      z: "industry",
      strokeWidth: 1,
    }),
  ],
});
```

:::

To vary **fill** within a single series, set the **z** option to null.

:::plot defer https://observablehq.com/@observablehq/plot-variable-fill-area

```js
Plot.plot({
  color: {
    type: "log",
    legend: true,
  },
  marks: [
    Plot.areaY(aapl, { x: "Date", y: "Close", fill: "Volume", z: null }),
    Plot.ruleY([0]),
  ],
});
```

:::

As an alternative to overlapping or stacking, [faceting](#plot-features--facets)
will produce small multiples, here arranged vertically with a shared _x_-axis.

:::plot defer https://observablehq.com/@observablehq/plot-faceted-areas

```js
Plot.plot({
  height: 720,
  axis: null,
  marks: [
    Plot.areaY(industries, { x: "date", y: "unemployed", fy: "industry" }),
    Plot.text(
      industries,
      Plot.selectFirst({
        text: "industry",
        fy: "industry",
        frameAnchor: "top-left",
        dx: 6,
        dy: 6,
      }),
    ),
    Plot.frame(),
  ],
});
```

:::

:::tip Above, smaller industries such as agriculture and mining & extraction are
dwarfed by larger industries such as wholesale & retail trade. To emphasize each
industry’s trend, instead of comparing absolute numbers across industries, you
could use the [normalize transform](#plot-transforms--normalize). :::

Or, as a [horizon chart](https://observablehq.com/@observablehq/plot-horizon),
where the area is repeated at different scales with different colors, showing
both small-scale variation in position and large-scale variation in color:

:::plot defer
https://observablehq.com/@observablehq/plot-unemployment-horizon-chart

```js-vue
Plot.plot((() => {
  const bands = 7;
  const step = d3.max(industries, (d) => d.unemployed) / bands;
  return {
    height: 720,
    axis: null,
    y: {domain: [0, step]},
    color: {scheme: "{{$dark ? "viridis" : "YlGnBu"}}"},
    facet: {data: industries, y: "industry"},
    marks: [
      d3.range(bands).map((i) => Plot.areaY(industries, {x: "date", y: (d) => d.unemployed - i * step, fill: i, clip: true})),
      Plot.text(industries, Plot.selectFirst({text: "industry", frameAnchor: "top-left", dx: 6, dy: 6})),
      Plot.frame()
    ]
  };
})())
```

:::

See also the
[ridgeline chart](https://observablehq.com/@observablehq/plot-ridgeline)
example.

Interpolation is controlled by the [**curve** option](#plot-features--curves).
The default curve is _linear_, which draws straight line segments between pairs
of adjacent points. A _step_ curve is nice for emphasizing when the value
changes, while _basis_ and _catmull–rom_ are nice for smoothing.

<a id="plot-marks--area--area-options"></a>

## Area options

The following channels are required:

- **x1** - the horizontal position of the baseline; bound to the _x_ scale
- **y1** - the vertical position of the baseline; bound to the _y_ scale

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x2** - the horizontal position of the topline; bound to the _x_ scale
- **y2** - the vertical position of the topline; bound to the _y_ scale
- **z** - a categorical value to group data into series

If **x2** is not specified, it defaults to **x1**. If **y2** is not specified,
it defaults to **y1**. These defaults facilitate sharing _x_ or _y_ coordinates
between the baseline and topline. See also the implicit stack transform and
shorthand **x** and **y** options supported by [areaY](#plot-marks--area--areaY)
and [areaX](#plot-marks--area--areaX).

By default, the data is assumed to represent a single series (_i.e._, a single
value that varies over time). If the **z** channel is specified, data is grouped
by **z** to form separate series. Typically **z** is a categorical value such as
a series name. If **z** is not specified, it defaults to **fill** if a channel,
or **stroke** if a channel.

The **stroke** defaults to _none_. The **fill** defaults to _currentColor_ if
the stroke is _none_, and to _none_ otherwise. If the fill is defined as a
channel, the area will be broken into contiguous overlapping segments when the
fill color changes; the fill color will apply to the interval spanning the
current data point and the following data point. This behavior also applies to
the **fillOpacity**, **stroke**, **strokeOpacity**, **strokeWidth**,
**opacity**, **href**, **title**, and **ariaLabel** channels. When any of these
channels are used, setting an explicit **z** channel (possibly to null) is
strongly recommended. The **strokeLinecap** and **strokeLinejoin** default to
_round_, and the **strokeMiterlimit** defaults to 1.

Points along the baseline and topline are connected in input order. Likewise, if
there are multiple series via the **z**, **fill**, or **stroke** channel, the
series are drawn in input order such that the last series is drawn on top.
Typically, the data is already in sorted order, such as chronological for time
series; if sorting is needed, consider a
[sort transform](#plot-transforms--sort).

The area mark supports [curve options](#plot-features--curves) to control
interpolation between points. If any of the **x1**, **y1**, **x2**, or **y2**
values are invalid (undefined, null, or NaN), the baseline and topline will be
interrupted, resulting in a break that divides the area shape into multiple
segments. (See
[d3-shape’s _area_.defined](https://d3js.org/d3-shape/area#area_defined) for
more.) If an area segment consists of only a single point, it may appear
invisible unless rendered with rounded or square line caps. In addition, some
curves such as _cardinal-open_ only render a visible segment if it contains
multiple points.

<a id="plot-marks--area--areaY"></a>

## areaY(_data_, _options_)

```js
Plot.areaY(aapl, { x: "Date", y: "Close" });
```

Returns a new area with the given _data_ and _options_. This constructor is used
when the baseline and topline share _x_ values, as in a time-series area chart
where time goes right→. If neither the **y1** nor **y2** option is specified,
the **y** option may be specified as shorthand to apply an implicit
[stackY transform](#plot-transforms--stack); this is the typical configuration
for an area chart with a baseline at _y_ = 0. If the **y** option is not
specified, it defaults to the identity function. The **x** option specifies the
**x1** channel; and the **x1** and **x2** options are ignored.

If the **interval** option is specified, the
[binX transform](#plot-transforms--bin) is implicitly applied to the specified
_options_. The reducer of the output _y_ channel may be specified via the
**reduce** option, which defaults to _first_. To default to zero instead of
showing gaps in data, as when the observed value represents a quantity, use the
_sum_ reducer.

```js
Plot.areaY(observations, { x: "date", y: "temperature", interval: "day" });
```

The **interval** option is recommended to “regularize” sampled data; for
example, if your data represents timestamped temperature measurements and you
expect one sample per day, use "day" as the interval.

The **areaY** mark draws the region between a baseline (_y1_) and a topline
(_y2_) as in an area chart. When the baseline is _y_ = 0, the _y_ channel can be
specified instead of _y1_ and _y2_.

<a id="plot-marks--area--areaX"></a>

## areaX(_data_, _options_)

```js
Plot.areaX(aapl, { y: "Date", x: "Close" });
```

Returns a new area with the given _data_ and _options_. This constructor is used
when the baseline and topline share _y_ values, as in a time-series area chart
where time goes up↑. If neither the **x1** nor **x2** option is specified, the
**x** option may be specified as shorthand to apply an implicit
[stackX transform](#plot-transforms--stack); this is the typical configuration
for an area chart with a baseline at _x_ = 0. If the **x** option is not
specified, it defaults to the identity function. The **y** option specifies the
**y1** channel; and the **y1** and **y2** options are ignored.

If the **interval** option is specified, the
[binY transform](#plot-transforms--bin) is implicitly applied to the specified
_options_. The reducer of the output _x_ channel may be specified via the
**reduce** option, which defaults to _first_. To default to zero instead of
showing gaps in data, as when the observed value represents a quantity, use the
_sum_ reducer.

```js
Plot.areaX(observations, { y: "date", x: "temperature", interval: "day" });
```

The **interval** option is recommended to “regularize” sampled data; for
example, if your data represents timestamped temperature measurements and you
expect one sample per day, use "day" as the interval.

<a id="plot-marks--area--area"></a>

## area(_data_, _options_)

```js
Plot.area(aapl, { x1: "Date", y1: 0, y2: "Close" });
```

Returns a new area with the given _data_ and _options_. This method is rarely
used directly; it is only needed when the baseline and topline have neither
common **x** nor **y** values. [areaY](#plot-marks--area--areaY) is used in the
common horizontal orientation where the baseline and topline share **x** values,
while [areaX](#plot-marks--area--areaX) is used in the vertical orientation
where the baseline and topline share **y** values.

---

<a id="plot-marks--arrow"></a>

# marks/arrow.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/arrow.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import metros from "../data/metros.ts";
import miserables from "../data/miserables.ts";

const markov = (() => {
  const matrix = [[3, 2, 5], [1, 7, 2], [1, 1, 8]];
  const nodes = matrix.map((m, i) => d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100));
  const edges = matrix.flatMap((m, i) => m.map((value, j) => ([nodes[i], nodes[j], value])));
  return {nodes, edges};
})();

function samegroup({source, target}) {
  source = miserables.groups.get(source);
  target = miserables.groups.get(target);
  return source === target ? source : null;
}

</script>

<a id="plot-marks--arrow--arrow-mark"></a>

# Arrow mark <VersionBadge version="0.4.0" />

:::tip See also the [vector mark](#plot-marks--vector), which draws arrows of a
given length and direction. :::

The **arrow mark** draws arrows between two points [**x1**, **y1**] and [**x2**,
**y2**] in quantitative dimensions. It is similar to the
[link mark](#plot-marks--link), except it draws an arrowhead and is suitable for
directed edges. With the **bend** option, it can be swoopy.⤵︎

For example, below we show the rising inequality (and population) in various
U.S. cities from 1980 to 2015. Each arrow represents two observations of a city:
the city’s population (**x**) and inequality (**y**) in 1980, and the same
in 2015. The arrow’s **stroke** redundantly encodes the change in inequality:
red indicates rising inequality, while blue (there are only four) indicates
declining inequality.

:::plot defer https://observablehq.com/@observablehq/plot-arrow-variation-chart

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population",
  },
  y: {
    label: "Inequality",
    ticks: 4,
  },
  color: {
    scheme: "BuRd",
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f",
  },
  marks: [
    Plot.arrow(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      bend: true,
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980,
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      dy: -6,
    }),
  ],
});
```

:::

The arrow mark is also useful for drawing directed graph edges, say representing
transition frequencies in a finite state machine.

:::plot https://observablehq.com/@observablehq/plot-finite-state-machine

```js
Plot.plot({
  inset: 60,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.dot(markov.nodes, { r: 40 }),
    Plot.arrow(markov.edges, {
      x1: ([[x1]]) => x1,
      y1: ([[, y1]]) => y1,
      x2: ([, [x2]]) => x2,
      y2: ([, [, y2]]) => y2,
      bend: true,
      strokeWidth: ([, , value]) => value,
      strokeLinejoin: "miter",
      headLength: 24,
      inset: 48,
    }),
    Plot.text(markov.nodes, { text: ["A", "B", "C"], dy: 12 }),
    Plot.text(markov.edges, {
      x: ([[x1, y1], [x2, y2]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
      y: ([[x1, y1], [x2, y2]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
      text: ([, , value]) => value,
    }),
  ],
});
```

:::

For undirected edges, as in the arc diagram of character co-occurrence in _Les
Misérables_ below, set the **sweep** option to the desired orientation: _-y_ for
right-bulging links whose endpoints are vertically separated.

:::plot https://observablehq.com/@observablehq/plot-arc-diagram

```js
Plot.plot({
  height: 1080,
  marginLeft: 100,
  axis: null,
  x: { domain: [0, 1] }, // see https://github.com/observablehq/plot/issues/1541
  color: { domain: d3.range(10), unknown: "#ccc" },
  marks: [
    Plot.dot(miserables.nodes, {
      x: 0,
      y: "id",
      fill: "group",
      sort: { y: "fill" },
    }),
    Plot.text(miserables.nodes, {
      x: 0,
      y: "id",
      text: "id",
      textAnchor: "end",
      dx: -6,
      fill: "group",
    }),
    Plot.arrow(miserables.links, {
      x: 0,
      y1: "source",
      y2: "target",
      sweep: "-y",
      bend: 90,
      headLength: 0,
      stroke: samegroup,
      sort: samegroup,
      reverse: true,
    }),
  ],
});
```

:::

<a id="plot-marks--arrow--arrow-options"></a>

## Arrow options

The following channels are required:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

For vertical or horizontal arrows, the **x** option can be specified as
shorthand for **x1** and **x2**, and the **y** option can be specified as
shorthand for **y1** and **y2**, respectively.

The arrow mark supports the
[standard mark options](#plot-features--marks--mark-options). The **stroke**
defaults to _currentColor_. The **fill** defaults to _none_. The **strokeWidth**
defaults to 1.5, and the **strokeMiterlimit** defaults to 1. The following
additional options are supported:

- **bend** - the bend angle, in degrees; defaults to 0°; true for 22.5°
- **headAngle** - the arrowhead angle, in degrees; defaults to 60°
- **headLength** - the arrowhead scale; defaults to 8
- **insetEnd** - inset at the end of the arrow (useful if the arrow points to a
  dot)
- **insetStart** - inset at the start of the arrow
- **inset** - shorthand for the two insets
- **sweep** - the sweep order

The **bend** option sets the angle between the straight line connecting the two
points and the outgoing direction of the arrow from the start point. It must be
within ±90°. A positive angle will produce a clockwise curve; a negative angle
will produce a counterclockwise curve; zero will produce a straight line. The
**headAngle** determines how pointy the arrowhead is; it is typically between 0°
and 180°. The **headLength** determines the scale of the arrowhead relative to
the stroke width. Assuming the default of stroke width 1.5px, the **headLength**
is the length of the arrowhead’s side in pixels.

The **sweep** option <VersionBadge version="0.6.10" pr="1740" /> controls the
bend orientation. It defaults to 1 indicating a positive (clockwise) bend angle;
-1 indicates a negative (anticlockwise) bend angle; 0 effectively clears the
bend angle. If _-x_, the bend angle is flipped when the ending point is to the
left of the starting point — ensuring all arrows bulge up (down if bend is
negative); if _-y_, the bend angle is flipped when the ending point is above the
starting point — ensuring all arrows bulge right (left if bend is negative); the
sign is negated for _+x_ and _+y_.

<a id="plot-marks--arrow--arrow"></a>

## arrow(_data_, _options_)

```js
Plot.arrow(inequality, {
  x1: "POP_1980",
  y1: "R90_10_1980",
  x2: "POP_2015",
  y2: "R90_10_2015",
  bend: true,
});
```

Returns a new arrow with the given _data_ and _options_.

---

<a id="plot-marks--axis"></a>

# marks/axis.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/axis.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";
import penguins from "../data/penguins.ts";

const anchor = ref("bottom");
const facetAnchor = ref("auto");

const responses = [
  {name: "Family in feud with Zucker­bergs", value: 0.17},
  {name: "Committed 671 birthdays to memory", value: 0.19},
  {name: "Ex is doing too well", value: 0.10},
  {name: "High school friends all dead now", value: 0.15},
  {name: "Discovered how to “like” things mentally", value: 0.27},
  {name: "Not enough politics", value: 0.12}
];

</script>

<a id="plot-marks--axis--axis-mark"></a>

# Axis mark <VersionBadge version="0.6.3" />

The **axis mark** conveys the meaning of a position
[scale](#plot-features--scales): _x_ or _y_, and _fx_ or _fy_ when
[faceting](#plot-features--facets). Plot automatically adds default axis marks
as needed, but you can customize the appearance of axes either through scale
options or by explicitly declaring an axis mark.

For example, the **axis** scale option specifies the side of the frame to draw
the axis. Setting it to _both_ will repeat the axis on both sides.

:::plot https://observablehq.com/@observablehq/plot-axis-both

```js
Plot.plot({
  x: { percent: true, grid: true, axis: "both" },
  marks: [
    Plot.barX(alphabet, { x: "frequency", y: "letter" }),
    Plot.ruleX([0]),
  ],
});
```

:::

The above is equivalent to declaring two explicit axis marks, one with the _top_
**anchor** and the other with the _bottom_ **anchor**, and one explicit
[grid mark](#plot-marks--grid). A benefit of declaring explicit axes is that you
can draw them atop other marks.

:::plot https://observablehq.com/@observablehq/plot-axis-both

```js
Plot.plot({
  x: { percent: true },
  marks: [
    Plot.axisX({ anchor: "top" }),
    Plot.axisX({ anchor: "bottom", label: null }),
    Plot.barX(alphabet, { x: "frequency", y: "letter" }),
    Plot.gridX({ interval: 1, stroke: "var(--vp-c-bg)", strokeOpacity: 0.5 }),
    Plot.ruleX([0]),
  ],
});
```

:::

:::info The **interval** option above instructs the grid lines to be drawn at
unit intervals, _i.e._ whole percentages. As an alternative, you can use the
**ticks** option to specify the desired number of ticks or the **tickSpacing**
option to specify the desired separation between adjacent ticks in pixels. :::

If you don’t declare an axis mark for a position scale, Plot will implicitly add
one for you below (before) all other marks. To disable an implicit axis, set the
_scale_.**axis** option to null for the corresponding scale; or, set the
top-level **axis** option to null to disable all implicit axes.

Plot’s axis mark is a composite mark comprised of:

- a [vector](#plot-marks--vector) for ticks
- a [text](#plot-marks--text) for tick labels
- a [text](#plot-marks--text) for an axis label

As such, you can take advantage of the full capabilities of these marks. For
example, you can use the text mark’s **lineWidth** option to wrap long tick
labels (and even soft hyphens). Note this option is expressed in ems, not
pixels, and you may have to reserve additional **marginBottom** to make room for
multiple lines.

:::plot https://observablehq.com/@observablehq/plot-wrap-tick-labels

```js
Plot.plot({
  y: { percent: true },
  marks: [
    Plot.axisX({ label: null, lineWidth: 8, marginBottom: 40 }),
    Plot.axisY({ label: "Responses (%)" }),
    Plot.barY(responses, { x: "name", y: "value" }),
    Plot.ruleY([0]),
  ],
});
```

:::

Or, you can use the **textAnchor** option to extend the _y_-axis tick labels to
the right and into the frame, and the **fill** option to specify the color of
the text.

:::plot https://observablehq.com/@observablehq/plot-anchor-tick-labels

```js
Plot.plot({
  marginTop: 0,
  marginLeft: 4,
  x: { ticks: 4, label: "Yield (kg)" },
  marks: [
    Plot.barX([42, 17, 32], { y: ["🍌 banana", "🍎 apple", "🍐 pear"] }),
    Plot.axisY({ textAnchor: "start", fill: "var(--vp-c-bg)", dx: 14 }),
  ],
});
```

:::

Layering several marks makes it possible to create
[ggplot2-style axes](https://ggplot2.tidyverse.org/reference/guide_axis.html)
with a filled [frame](#plot-marks--frame) and white grid lines.

:::plot https://observablehq.com/@observablehq/plot-ggplot2-style-axes

```js
Plot.plot({
  inset: 10,
  marks: [
    Plot.frame({ fill: "#eaeaea" }),
    Plot.gridY({ stroke: "white", strokeOpacity: 1 }),
    Plot.gridX({ stroke: "white", strokeOpacity: 1 }),
    Plot.line(aapl, { x: "Date", y: "Close", stroke: "black" }),
  ],
});
```

:::

Or you could emulate the style of _The New York Times_, with tick labels above
dashed grid lines, and a custom tick format to show units (here dollars) on the
first tick.

:::plot https://observablehq.com/@observablehq/plot-nyt-style-axes

```js
Plot.plot({
  round: true,
  marginLeft: 0, // don’t need left-margin since labels are inset
  x: { label: null, insetLeft: 36 }, // reserve space for inset labels
  marks: [
    Plot.gridY({
      strokeDasharray: "0.75,2", // dashed
      strokeOpacity: 1, // opaque
    }),
    Plot.axisY({
      tickSize: 0, // don’t draw ticks
      dx: 38, // offset right
      dy: -6, // offset up
      lineAnchor: "bottom", // draw labels above grid lines
      tickFormat: (d, i, _) => (i === _.length - 1 ? `$${d}` : d),
    }),
    Plot.ruleY([0]),
    Plot.line(aapl, { x: "Date", y: "Close", markerEnd: "dot" }),
  ],
});
```

:::

Time axes default to a consistent multi-line tick format
<VersionBadge version="0.6.9" />,
[à la Datawrapper](https://blog.datawrapper.de/new-axis-ticks/), for example
showing the first month of each quarter, and the year:

:::plot https://observablehq.com/@observablehq/plot-datawrapper-style-date-axis

```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.axisX({ ticks: "3 months" }),
    Plot.gridX(),
    Plot.line(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

The format is inferred from the tick interval, and consists of two fields
(_e.g._, month and year, day and month, minutes and hours); when a tick has the
same second field value as the previous tick (_e.g._, “19 Jan” after “17 Jan”),
only the first field (“19”) is shown for brevity. Alternatively, you can specify
multiple explicit axes with options for hierarchical time intervals, here
showing weeks, months, and years.

:::plot https://observablehq.com/@observablehq/plot-multiscale-date-axis

```js
Plot.plot({
  x: { round: true, nice: d3.utcWeek },
  y: { inset: 6 },
  marks: [
    Plot.frame({ fill: "currentColor", fillOpacity: 0.1 }),
    Plot.frame({ anchor: "bottom" }),
    Plot.axisX({
      ticks: "year",
      tickSize: 28,
      tickPadding: -11,
      tickFormat: "  %Y",
      textAnchor: "start",
    }),
    Plot.axisX({
      ticks: "month",
      tickSize: 16,
      tickPadding: -11,
      tickFormat: "  %b",
      textAnchor: "start",
    }),
    Plot.gridX({
      ticks: "week",
      stroke: "var(--vp-c-bg)",
      strokeOpacity: 1,
      insetBottom: -0.5,
    }),
    Plot.line(aapl.slice(-340, -10), { x: "Date", y: "Close", curve: "step" }),
  ],
});
```

:::

You can even style an axis dynamically based on data! The data associated with
an axis or grid mark are the tick values sampled from the associated scale’s
domain. If you don’t specify the data explicitly, the ticks will be chosen
through a combination of the **ticks**, **tickSpacing**, and **interval**
options.

:::plot https://observablehq.com/@observablehq/plot-data-based-axis

```js
Plot.plot({
  marginRight: 0,
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, { x: "Date", y: "Close" }),
    Plot.gridY({
      x: (y) => aapl.find((d) => d.Close >= y)?.Date,
      insetLeft: -6,
    }),
    Plot.axisY({
      x: (y) => aapl.find((d) => d.Close >= y)?.Date,
      insetLeft: -6,
      textStroke: "var(--vp-c-bg)",
    }),
  ],
});
```

:::

The color of an axis can be controlled with the **color**, **stroke**, and
**fill** options, which affect the axis’ component marks differently. The
**stroke** option affects the tick vector; the **fill** option affects the label
texts. The **color** option is shorthand for setting both **fill** and
**stroke**. While these options are typically set to constant colors (such as
_red_ or the default _currentColor_), they can be specified as channels to
assign colors dynamically based on the associated tick value.

:::plot https://observablehq.com/@observablehq/plot-axes-with-color

```js
Plot.axisX(d3.ticks(0, 1, 10), { color: "red" }).plot(); // text fill and tick stroke
```

:::

:::plot https://observablehq.com/@observablehq/plot-axes-with-color

```js
Plot.axisX(d3.ticks(0, 1, 10), {
  stroke: Plot.identity,
  strokeWidth: 3,
  tickSize: 10,
}).plot(); // tick stroke
```

:::

:::plot https://observablehq.com/@observablehq/plot-axes-with-color

```js
Plot.axisX(d3.ticks(0, 1, 10), { fill: "red" }).plot(); // text fill
```

:::

To draw an outline around the tick labels, say to improve legibility when
drawing an axes atop other marks, use the **textStroke** (default _none_),
**textStrokeWidth** (default 3), and **textStrokeOpacity** (default 1) options.

:::plot https://observablehq.com/@observablehq/plot-axes-with-color

```js
Plot.plot({
  height: 40,
  style: "background: #777;",
  x: { domain: [0, 100] },
  marks: [
    Plot.axisX({
      fill: "black",
      stroke: "white",
      textStroke: "white",
      textStrokeWidth: 3,
      textStrokeOpacity: 0.6,
    }),
  ],
});
```

:::

When faceting, the _x_- and _y_-axes are typically repeated across facets. A
_bottom_-anchored _x_-axis is by default drawn on any facet _with empty space
below it_; conversely, a _top_-anchored _x_-axis is drawn on any facet _with
empty space above it_. Similarly, a _left_-anchored _y_-axis is drawn on facets
with empty space to the left, and a _right_-anchored _y_-axis is drawn on facets
with empty space to the right.

If the default behavior isn’t what you want, use the _mark_.**facetAnchor**
option to control which facets show an axis. (This option applies not just to
Plot’s axis and grid mark, but any mark; for example, you can use it to place a
text mark at the bottom of each facet column.) The supported values for this
option are:

- _top_ - show only on the top facets
- _right_ - show only on the right facets
- _bottom_ - show only on the bottom facets
- _left_ - show only on the left facets
- _top-empty_ - show on any facet with space above (a superset of _top_)
- _right-empty_ - show on any facet with space to the right (a superset of
  _right_)
- _bottom-empty_ - show on any facet with space to below (a superset of _below_)
- _left-empty_ - show on any facet with space to the left (a superset of _left_)
- null - show on every facet

The interactive chart below shows the different possibilities. Note that we
place the facet _fx_-axis (in
<span style="border-bottom: solid 2px var(--vp-c-blue);">blue</span>) opposite
the _x_-axis (in
<span style="border-bottom: solid 2px var(--vp-c-red);">red</span>).

<p>
  <label class="label-input">
    anchor:
    <select v-model="anchor">
      <option>bottom</option>
      <option>top</option>
    </select>
  </label>
  <label class="label-input">
    facetAnchor:
    <select v-model="facetAnchor">
      <option>auto</option>
      <option>bottom-empty</option>
      <option>bottom</option>
      <option>top-empty</option>
      <option>top</option>
      <option>null</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-facetanchor

```js
Plot.plot({
  facet: { marginRight: 80 },
  grid: true,
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species",
    }),
    Plot.axisX({
      color: "red",
      anchor,
      facetAnchor: facetAnchor === "auto"
        ? undefined
        : facetAnchor === "null"
        ? null
        : facetAnchor,
    }),
    Plot.axisFx({ color: "blue", anchor: anchor === "top" ? "bottom" : "top" }), // place fx axis opposite x
  ],
});
```

:::

The **labelAnchor** option controls the position of the axis label. For the _x_
or _fx_ axis, the label anchor may be _left_, _center_, or _right_. It defaults
to _center_ for ordinal scales and _right_ for quantitative scales.

:::plot https://observablehq.com/@observablehq/plot-labelanchor

```js
Plot.plot({
  height: 80,
  grid: true,
  x: { type: "linear" },
  marks: [
    Plot.axisX({ anchor: "top", label: "top-left", labelAnchor: "left" }),
    Plot.axisX({
      anchor: "top",
      label: "top-center",
      labelAnchor: "center",
      ticks: [],
    }),
    Plot.axisX({
      anchor: "top",
      label: "top-right",
      labelAnchor: "right",
      ticks: [],
    }),
    Plot.axisX({ anchor: "bottom", label: "bottom-left", labelAnchor: "left" }),
    Plot.axisX({
      anchor: "bottom",
      label: "bottom-center",
      labelAnchor: "center",
      ticks: [],
    }),
    Plot.axisX({
      anchor: "bottom",
      label: "bottom-right",
      labelAnchor: "right",
      ticks: [],
    }),
  ],
});
```

:::

For the _y_ and _fy_ axis, the label anchor may be _top_, _center_, or _bottom_.
It defaults to _center_ for ordinal scales and _top_ for quantitative scales.
When the label anchor is _center_, the label is rotated by 90° to fit, though
you may need to adjust the margins to avoid overlap between the tick labels and
the axis label.

:::plot https://observablehq.com/@observablehq/plot-labelanchor

```js
Plot.plot({
  grid: true,
  y: { type: "linear" },
  marks: [
    Plot.axisY({ anchor: "left", label: "left-top", labelAnchor: "top" }),
    Plot.axisY({
      anchor: "left",
      label: "left-center",
      labelAnchor: "center",
      ticks: [],
    }),
    Plot.axisY({
      anchor: "left",
      label: "left-bottom",
      labelAnchor: "bottom",
      ticks: [],
    }),
    Plot.axisY({ anchor: "right", label: "right-top", labelAnchor: "top" }),
    Plot.axisY({
      anchor: "right",
      label: "right-center",
      labelAnchor: "center",
      ticks: [],
    }),
    Plot.axisY({
      anchor: "right",
      label: "right-bottom",
      labelAnchor: "bottom",
      ticks: [],
    }),
  ],
});
```

:::

<a id="plot-marks--axis--axis-options"></a>

## Axis options

By default, the _data_ for an axis mark are tick values sampled from the
associated scale’s domain. If desired, you can specify the _data_ explicitly
(_e.g._ as an array of numbers), or use one of the following options:

- **ticks** - the approximate number of ticks to generate, or interval, or array
  of values
- **tickSpacing** - the approximate number of pixels between ticks (if **ticks**
  is not specified)
- **interval** - an interval or time interval

Note that when an axis mark is declared explicitly (via the
[**marks** plot option](#plot-features--plots--marks-option), as opposed to an
implicit axis), the corresponding scale’s _scale_.ticks and _scale_.tickSpacing
options are not automatically inherited by the axis mark; however, the
_scale_.interval option _is_ inherited, as is the _scale_.label option. You can
declare multiple axis marks for the same scale with different ticks, and styles,
as desired.

In addition to the [standard mark options](#plot-features--marks), the axis mark
supports the following options:

- **anchor** - the axis orientation: _top_ or _bottom_ for _x_ or _fx_; _left_
  or _right_ for _y_ or _fy_
- **tickSize** - the length of the tick vector (in pixels; default 6 for _x_ or
  _y_, or 0 for _fx_ or _fy_)
- **tickPadding** - the separation between the tick vector and its label (in
  pixels; default 3)
- **tickFormat** - either a function or specifier string to format tick values;
  see [Formats](#plot-features--formats)
- **tickRotate** - whether to rotate tick labels (an angle in degrees clockwise;
  default 0)
- **fontVariant** - the ticks’ font-variant; defaults to _tabular-nums_ for
  quantitative axes
- **label** - a string to label the axis; defaults to the scale’s label, perhaps
  with an arrow
- **labelAnchor** - the label anchor: _top_, _right_, _bottom_, _left_, or
  _center_
- **labelArrow** - the label arrow: _auto_ (default), _up_, _right_, _down_,
  _left_, _none_, or true <VersionBadge version="0.6.7" />
- **labelOffset** - the label position offset (in pixels; default depends on
  margins and orientation)
- **color** - the color of the ticks and labels (defaults to _currentColor_)
- **textStroke** - the color of the stroke around tick labels (defaults to
  _none_)
- **textStrokeOpacity** - the opacity of the stroke around tick labels
- **textStrokeWidth** - the thickness of the stroke around tick labels (in
  pixels)

The **labelArrow** option controls the arrow (↑, →, ↓, or ←) added to the axis
label indicating the direction of ascending value; for example, horizontal
position _x_ typically increases in value going right→, while vertical position
_y_ typically increases in value going up↑. If _auto_ (the default), the arrow
will be added only if the scale is quantitative or temporal; if true, the arrow
will also apply to ordinal scales, provided the domain is consistently ordered.

As a composite mark, the **stroke** option affects the color of the tick vector,
while the **fill** option affects the color the text labels; both default to the
**color** option, which defaults to _currentColor_. The **x** and **y**
channels, if specified, position the ticks; if not specified, the tick positions
depend on the axis **anchor**. The orientation of the tick labels likewise
depends on the **anchor**. See the [text mark](#plot-marks--text) for details on
available options for the tick and axis labels.

The axis mark’s [**facetAnchor**](#plot-features--facets) option defaults to
_top-empty_ if anchor is _top_, _right-empty_ if anchor is _right_,
_bottom-empty_ if anchor is _bottom_, and _left-empty_ if anchor is _left_. This
ensures the proper positioning of the axes with respect to empty facets.

The axis mark’s default margins depend on its orientation (**anchor**) as
follows, in order of **marginTop**, **marginRight**, **marginBottom**, and
**marginLeft**, in pixels:

- _top_ - 30, 20, 0, 20
- _right_ - 20, 40, 20, 0
- _bottom_ - 0, 20, 30, 20
- _left_ - 20, 0, 20, 40

For simplicity’s sake and for consistent layout across plots, axis margins are
not automatically sized to make room for tick labels; instead, shorten your tick
labels (for example using the _k_ SI-prefix tick format, or setting a
_scale_.transform to show thousands or millions, or setting the **textOverflow**
option to _ellipsis_ and the **lineWidth** option to clip long labels) or
increase the margins as needed.

<a id="plot-marks--axis--axisX"></a>

## axisX(_data_, _options_)

```js
Plot.axisX({ anchor: "bottom", tickSpacing: 80 });
```

Returns a new _x_ axis with the given _options_.

<a id="plot-marks--axis--axisY"></a>

## axisY(_data_, _options_)

```js
Plot.axisY({ anchor: "left", tickSpacing: 35 });
```

Returns a new _y_ axis with the given _options_.

<a id="plot-marks--axis--axisFx"></a>

## axisFx(_data_, _options_)

```js
Plot.axisFx({ anchor: "top", label: null });
```

Returns a new _fx_ axis with the given _options_.

<a id="plot-marks--axis--axisFy"></a>

## axisFy(_data_, _options_)

```js
Plot.axisFy({ anchor: "right", label: null });
```

Returns a new _fy_ axis with the given _options_.

---

<a id="plot-marks--bar"></a>

# marks/bar.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/bar.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import alphabet from "../data/alphabet.ts";
import civilizations from "../data/civilizations.ts";
import hadcrut from "../data/hadcrut.ts";
import penguins from "../data/penguins.ts";
import statepop from "../data/us-state-population-2010-2019.ts";

const checked = ref(true);

const timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  // {year: 2018, population: 7631.091040},
  {year: 2019, population: 7713.468100},
  {year: 2020, population: 7794.798739}
];

</script>

<a id="plot-marks--bar--bar-mark"></a>

# Bar mark

:::tip The bar mark is a variant of the [rect mark](#plot-marks--rect) for use
when one dimension is ordinal and the other is quantitative. See also the
[cell mark](#plot-marks--cell). :::

The **bar mark** comes in two orientations: [barY](#plot-marks--bar--barY)
extends vertically↑ as in a vertical bar chart or column chart, while
[barX](#plot-marks--bar--barX) extends horizontally→. For example, the bar chart
below shows the frequency of letters in the English language.

:::plot https://observablehq.com/@observablehq/plot-vertical-bars

```js
Plot.barY(alphabet, { x: "letter", y: "frequency" }).plot();
```

:::

Ordinal domains are sorted naturally (alphabetically) by default. Either set the
[scale **domain**](#plot-features--scales) explicitly to change the order, or
use the mark [**sort** option](#plot-features--scales--sort-mark-option) to
derive the scale domain from a channel. For example, to sort **x** by descending
**y**:

:::plot https://observablehq.com/@observablehq/plot-vertical-bars

```js
Plot.barY(alphabet, { x: "letter", y: "frequency", sort: { x: "-y" } }).plot();
```

:::

There is typically one ordinal value associated with each bar, such as a name
(or above, letter), and two quantitative values defining a lower and upper
bound; the lower bound is often not specified (as above) because it defaults to
zero. For barY, **x** is ordinal and **y1** & **y2** are quantitative, whereas
for barX, **y** is ordinal and **x1** & **x2** are quantitative.

Above, since **y** was specified instead of **y1** and **y2**, the bar spans
from zero to the given _y_ value: if you only specify a single quantitative
value, barY applies an implicit [stackY transform](#plot-transforms--stack) and
likewise barX implicitly applies stackX. The stacked horizontal bar chart below
draws one bar (of unit width in **x**) per penguin, colored and sorted by the
penguin’s body mass, and grouped by species along **y**.

:::plot defer https://observablehq.com/@observablehq/plot-stacked-unit-chart

```js
Plot.plot({
  marginLeft: 60,
  x: { label: "Frequency" },
  y: { label: null },
  color: { legend: true },
  marks: [
    Plot.barX(penguins, {
      y: "species",
      x: 1,
      inset: 0.5,
      fill: "body_mass_g",
      sort: "body_mass_g",
    }),
    Plot.ruleX([0]),
  ],
});
```

:::

:::tip The [group transform](#plot-transforms--group) with the _count_ reducer
could be used to produce one bar per species. :::

You can opt-out of the implicit stack transform by specifying the bar’s extent
with two quantitative values: **x1** and **x2** for barX, or **y1** and **y2**
for barY. For example, here is a historical timeline of civilizations, where
each has a beginning and an end.

:::plot https://observablehq.com/@observablehq/plot-civilizations-timeline

```js
Plot.plot({
  marginLeft: 130,
  axis: null,
  x: {
    axis: "top",
    grid: true,
    tickFormat: (x) => x < 0 ? `${-x} BC` : `${x} AD`,
  },
  marks: [
    Plot.barX(civilizations, {
      x1: "start",
      x2: "end",
      y: "civilization",
      sort: { y: "x1" },
    }),
    Plot.text(civilizations, {
      x: "start",
      y: "civilization",
      text: "civilization",
      textAnchor: "end",
      dx: -3,
    }),
  ],
});
```

:::

:::tip This uses a [text mark](#plot-marks--text) to label the bars directly
instead of a _y_ axis. It also uses a custom tick format for the _x_ axis to
show the calendar era. :::

For a diverging bar chart, simply specify a negative value. The chart below
shows change in population from 2010 to 2019. States whose population increased
are
<span :style="{borderBottom: `solid ${d3.schemePiYG[3][2]} 3px`}">green</span>,
while states whose population decreased are
<span :style="{borderBottom: `solid ${d3.schemePiYG[3][0]} 3px`}">pink</span>.
(Puerto Rico’s population declined sharply after hurricanes Maria and Irma.)

:::plot https://observablehq.com/@observablehq/plot-state-population-change

```js
Plot.plot({
  label: null,
  x: {
    axis: "top",
    label: "← decrease · Change in population, 2010–2019 (%) · increase →",
    labelAnchor: "center",
    tickFormat: "+",
    percent: true,
  },
  color: {
    scheme: "PiYg",
    type: "ordinal",
  },
  marks: [
    Plot.barX(statepop, {
      y: "State",
      x: (d) => (d[2019] - d[2010]) / d[2010],
      fill: (d) => Math.sign(d[2019] - d[2010]),
      sort: { y: "x" },
    }),
    Plot.gridX({ stroke: "var(--vp-c-bg)", strokeOpacity: 0.5 }),
    Plot.axisY({ x: 0 }),
    Plot.ruleX([0]),
  ],
});
```

:::

:::tip The **percent** scale option is useful for showing percentages; it
applies a [scale transform](#plot-features--scales--scale-transforms) that
multiplies associated channel values by 100. :::

When ordinal data is regular, such as the yearly observations of the time-series
bar chart of world population below, use the **interval** option to enforce
uniformity and show gaps for missing data. It can be set to a named interval
such as _hour_ or _day_, a number for numeric intervals, a
[d3-time interval](https://d3js.org/d3-time#_interval), or a custom
implementation.

<p>
  <label class="label-input">
    Use interval:
    <input type="checkbox" v-model="checked">
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-ordinal-scale-interval

```js
Plot
  .barY(timeseries, { x: "year", y: "population" })
  .plot({ x: { tickFormat: "", interval: checked ? 1 : undefined } });
```

:::

:::tip You can also make a time-series bar chart with a
[rect mark](#plot-marks--rect), possibly with the
[bin transform](#plot-transforms--bin) to bin observations at regular intervals.
:::

A bar’s ordinal dimension is optional; if missing, the bar spans the chart along
this dimension. Such bars typically also have a color encoding. For example,
here are [warming stripes](https://showyourstripes.info/) showing the increase
in average temperature globally over the last 172 years.

:::plot https://observablehq.com/@observablehq/plot-warming-stripes-2

```js
Plot.plot({
  x: { round: true, tickFormat: "d" },
  color: { scheme: "BuRd" },
  marks: [
    Plot.barX(hadcrut, {
      x: "year",
      fill: "anomaly",
      interval: 1, // annual observations
      inset: 0, // no gaps
    }),
  ],
});
```

:::

With the [stack transform](#plot-transforms--stack), a one-dimensional bar can
show the proportions of each value relative to the whole, as a compact
alternative to a pie or donut chart.

:::plot https://observablehq.com/@observablehq/plot-stacked-percentages

```js
Plot.plot({
  x: { percent: true },
  marks: [
    Plot.barX(
      alphabet,
      Plot.stackX({ x: "frequency", fillOpacity: 0.3, inset: 0.5 }),
    ),
    Plot.textX(
      alphabet,
      Plot.stackX({ x: "frequency", text: "letter", inset: 0.5 }),
    ),
    Plot.ruleX([0, 1]),
  ],
});
```

:::

:::tip Although barX applies an implicit stackX transform,
[textX](#plot-marks--text) does not; this example uses an explicit stackX
transform in both cases for clarity. :::

For a grouped bar chart, use [faceting](#plot-features--facets). The chart below
uses **fy** to partition the bar chart of penguins by island.

:::plot defer https://observablehq.com/@observablehq/plot-grouped-unit-chart

```js
Plot.plot({
  marginLeft: 60,
  marginRight: 60,
  label: null,
  x: { label: "Frequency" },
  y: { padding: 0 },
  marks: [
    Plot.barX(penguins, { fy: "island", y: "sex", x: 1, inset: 0.5 }),
    Plot.ruleX([0]),
  ],
});
```

:::

<a id="plot-marks--bar--bar-options"></a>

## Bar options

For required channels, see [barX](#plot-marks--bar--barX) and
[barY](#plot-marks--bar--barY). The bar mark supports the
[standard mark options](#plot-features--marks), including
[insets](#plot-features--marks--insets) and
[rounded corners](#plot-features--marks--rounded-corners). The **stroke**
defaults to _none_. The **fill** defaults to _currentColor_ if the stroke is
_none_, and to _none_ otherwise.

<a id="plot-marks--bar--barX"></a>

## barX(_data_, _options_)

```js
Plot.barX(alphabet, { y: "letter", x: "frequency" });
```

Returns a new horizontal→ bar with the given _data_ and _options_. The following
channels are required:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale

The following optional channels are supported:

- **y** - the vertical position; bound to the _y_ scale, which must be _band_

If neither the **x1** nor **x2** option is specified, the **x** option may be
specified as shorthand to apply an implicit
[stackX transform](#plot-transforms--stack); this is the typical configuration
for a horizontal bar chart with bars aligned at _x_ = 0. If the **x** option is
not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity).
If _options_ is undefined, then it defaults to **x2** as identity and **y** as
the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed
to barX to make a quick sequential bar chart. If the **y** channel is not
specified, the bar will span the full vertical extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be
derived from **x**: _interval_.floor(_x_) is invoked for each _x_ to produce
_x1_, and _interval_.offset(_x1_) is invoked for each _x1_ to produce _x2_. If
the interval is specified as a number _n_, _x1_ and _x2_ are taken as the two
consecutive multiples of _n_ that bracket _x_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--bar--barY"></a>

## barY(_data_, _options_)

```js
Plot.barY(alphabet, { x: "letter", y: "frequency" });
```

Returns a new vertical↑ bar with the given _data_ and _options_. The following
channels are required:

- **y1** - the starting vertical position; bound to the _y_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

The following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale, which must be _band_

If neither the **y1** nor **y2** option is specified, the **y** option may be
specified as shorthand to apply an implicit
[stackY transform](#plot-transforms--stack); this is the typical configuration
for a vertical bar chart with bars aligned at _y_ = 0. If the **y** option is
not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity).
If _options_ is undefined, then it defaults to **y2** as identity and **x** as
the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed
to barY to make a quick sequential bar chart. If the **x** channel is not
specified, the bar will span the full horizontal extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be
derived from **y**: _interval_.floor(_y_) is invoked for each _y_ to produce
_y1_, and _interval_.offset(_y1_) is invoked for each _y1_ to produce _y2_. If
the interval is specified as a number _n_, _y1_ and _y2_ are taken as the two
consecutive multiples of _n_ that bracket _y_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

---

<a id="plot-marks--bollinger"></a>

# marks/bollinger.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/bollinger.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import aapl from "../data/aapl.ts";

const n = ref(20);
const k = ref(2);

</script>

<a id="plot-marks--bollinger--bollinger-mark"></a>

# Bollinger mark <VersionBadge version="0.6.10" pr="1772" />

The **bollinger mark** is a [composite mark](#plot-features--marks--marks)
consisting of a [line](#plot-marks--line) representing a moving average and an
[area](#plot-marks--area) representing volatility as a band; the band thickness
is proportional to the deviation of nearby values. The bollinger mark is often
used to [analyze the price](https://en.wikipedia.org/wiki/Bollinger_Bands) of
financial instruments such as stocks.

For example, the chart below shows the price of Apple stock from 2013 to 2018,
with a window size _n_ of {{n}} days and radius _k_ of {{k}} standard
deviations.

<p>
  <label class="label-input">
    <span>Window size (n):</span>
    <input type="range" v-model.number="n" min="1" max="100" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{n.toLocaleString("en-US")}}</span>
  </label>
  <label class="label-input">
    <span>Radius (k):</span>
    <input type="range" v-model.number="k" min="0" max="10" step="0.1" />
    <span style="font-variant-numeric: tabular-nums;">{{k.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot hidden

```js
Plot.bollingerY(aapl, { x: "Date", y: "Close", n, k }).plot();
```

:::

```js-vue
Plot.bollingerY(aapl, {x: "Date", y: "Close", n: {{n}}, k: {{k}}}).plot()
```

For more control, you can also use the
[bollinger map method](#plot-marks--bollinger--bollinger) directly with the
[map transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md).

:::plot

```js
Plot.plot({
  marks: [
    Plot.lineY(
      aapl,
      Plot.mapY(Plot.bollinger({ n: 20, k: -2 }), {
        x: "Date",
        y: "Close",
        stroke: "red",
      }),
    ),
    Plot.lineY(
      aapl,
      Plot.mapY(Plot.bollinger({ n: 20, k: 2 }), {
        x: "Date",
        y: "Close",
        stroke: "green",
      }),
    ),
    Plot.lineY(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

Below a candlestick chart is constructed from two
[rule marks](#plot-marks--rule), with a bollinger mark underneath to emphasize
the days when the stock was more volatile.

:::plot

```js
Plot.plot({
  x: { domain: [new Date("2014-01-01"), new Date("2014-06-01")] },
  y: { domain: [68, 92], grid: true },
  color: { domain: [-1, 0, 1], range: ["red", "black", "green"] },
  marks: [
    Plot.bollingerY(aapl, {
      x: "Date",
      y: "Close",
      stroke: "none",
      clip: true,
    }),
    Plot.ruleX(aapl, {
      x: "Date",
      y1: "Low",
      y2: "High",
      strokeWidth: 1,
      clip: true,
    }),
    Plot.ruleX(aapl, {
      x: "Date",
      y1: "Open",
      y2: "Close",
      strokeWidth: 3,
      stroke: (d) => Math.sign(d.Close - d.Open),
      clip: true,
    }),
  ],
});
```

:::

The bollinger mark has two constructors: the common
[bollingerY](#plot-marks--bollinger--bollingerY) for when time goes right→ (or
←left); and the rare [bollingerX](#plot-marks--bollinger--bollingerX) for when
time goes up↑ (or down↓).

:::plot

```js
Plot.bollingerX(aapl, { y: "Date", x: "Close" }).plot();
```

:::

As
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md),
you can pass an array of numbers as data. Below, the _x_ axis represents the
zero-based index into the data (_i.e._, trading days since May 13, 2013).

:::plot

```js
Plot.bollingerY(aapl.map((d) => d.Close)).plot();
```

:::

<a id="plot-marks--bollinger--bollinger-options"></a>

## Bollinger options

The bollinger mark is a [composite mark](#plot-features--marks--marks)
consisting of two marks:

- an [area](#plot-marks--area) representing volatility as a band, and
- a [line](#plot-marks--line) representing a moving average

The bollinger mark supports the following special options:

- **n** - the window size (the window transform’s **k** option), an integer;
  defaults to 20
- **k** - the band radius, a number representing a multiple of standard
  deviations; defaults to 2
- **color** - the fill color of the area, and the stroke color of the line;
  defaults to _currentColor_
- **opacity** - the fill opacity of the area; defaults to 0.2
- **fill** - the fill color of the area; defaults to **color**
- **fillOpacity** - the fill opacity of the area; defaults to **opacity**
- **stroke** - the stroke color of the line; defaults to **color**
- **strokeOpacity** - the stroke opacity of the line; defaults to 1
- **strokeWidth** - the stroke width of the line in pixels; defaults to 1.5

Any additional options are passed through to the underlying
[line mark](#plot-marks--line), [area mark](#plot-marks--area), and
[window transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/window.md).
Unlike the window transform, the **strict** option defaults to true, and the
**anchor** option defaults to _end_ (which assumes that the data is in
chronological order).

<a id="plot-marks--bollinger--bollingerX"></a>

## bollingerX(_data_, _options_)

```js
Plot.bollingerX(aapl, { y: "Date", x: "Close" });
```

Returns a bollinger mark for when time goes up↑ (or down↓). If the **x** option
is not specified, it defaults to the identity function, as when _data_ is an
array of numbers [_x₀_, _x₁_, _x₂_, …]. If the **y** option is not specified, it
defaults to [0, 1, 2, …].

<a id="plot-marks--bollinger--bollingerY"></a>

## bollingerY(_data_, _options_)

```js
Plot.bollingerY(aapl, { x: "Date", y: "Close" });
```

Returns a bollinger mark for when time goes right→ (or ←left). If the **y**
option is not specified, it defaults to the identity function, as when _data_ is
an array of numbers [_y₀_, _y₁_, _y₂_, …]. If the **x** option is not specified,
it defaults to [0, 1, 2, …].

<a id="plot-marks--bollinger--bollinger"></a>

## bollinger(_options_)

```js
Plot.lineY(
  data,
  Plot.map({ y: Plot.bollinger({ n: 20 }) }, { x: "Date", y: "Close" }),
);
```

Returns a bollinger map method for use with the
[map transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md).
The **k** option here defaults to zero instead of two.

---

<a id="plot-marks--box"></a>

# marks/box.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/box.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import morley from "../data/morley.ts";

const diamonds = shallowRef([]);

onMounted(() => {
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
});

</script>

<a id="plot-marks--box--box-mark"></a>

# Box mark <VersionBadge version="0.4.2" />

The **box mark** summarizes one-dimensional distributions as boxplots. It is a
[composite mark](#plot-features--marks--marks) consisting of a
[rule](#plot-marks--rule) to represent the extreme values (not including
outliers), a [bar](#plot-marks--bar) to represent the interquartile range
(trimmed to the data), a [tick](#plot-marks--tick) to represent the median
value, and a [dot](#plot-marks--dot) to represent any outliers. The
[group transform](#plot-transforms--group) is used to group and aggregate data.

For example, the boxplot below shows
[A.A. Michelson’s experimental measurements](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/morley.html)
of the speed of light. (Speed is in km/sec minus 299,000.)

:::plot https://observablehq.com/@observablehq/plot-vertical-box-plot

```js
Plot.plot({
  y: {
    grid: true,
    inset: 6,
  },
  marks: [
    Plot.boxY(morley, { x: "Expt", y: "Speed" }),
  ],
});
```

:::

[boxY](#plot-marks--box--boxY) produces vertical boxplots; for horizontal
boxplots, use [boxX](#plot-marks--box--boxX) and swap **x** and **y**.

:::plot https://observablehq.com/@observablehq/plot-horizontal-box-plot

```js
Plot.plot({
  x: {
    grid: true,
    inset: 6,
  },
  marks: [
    Plot.boxX(morley, { x: "Speed", y: "Expt" }),
  ],
});
```

:::

As
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md),
you can pass an array of numbers for a single boxplot.

:::plot https://observablehq.com/@observablehq/plot-shorthand-box-plot

```js
Plot.boxX([0, 3, 4.4, 4.5, 4.6, 5, 7]).plot();
```

:::

Since the box mark uses the [group transform](#plot-transforms--group), the
secondary dimension must be ordinal. To group quantitative values, bin manually,
say with
[Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor);
see [#1330](https://github.com/observablehq/plot/issues/1330).

:::plot defer https://observablehq.com/@observablehq/plot-binned-box-plot

```js
Plot.plot({
  marginLeft: 60,
  y: {
    grid: true,
    label: "Price",
  },
  x: {
    interval: 0.5,
    label: "Carats",
    labelAnchor: "right",
    tickFormat: (x) => x.toFixed(1),
  },
  marks: [
    Plot.ruleY([0]),
    Plot.boxY(diamonds, { x: (d) => Math.floor(d.carat * 2) / 2, y: "price" }),
  ],
});
```

:::

This chart is slightly easier to construct with
[faceting](#plot-features--facets) using the
[**interval** scale option](#plot-features--scales--scale-transforms) on the
_fx_ scale. (This technique cannot be used with the _x_ scale above because the
scale interval transform is applied _after_ the box mark applies the group
transform.)

:::plot defer https://observablehq.com/@observablehq/plot-binned-box-plot

```js
Plot.plot({
  marginLeft: 60,
  y: {
    grid: true,
    label: "Price",
  },
  fx: {
    interval: 0.5,
    label: "Carats",
    labelAnchor: "right",
    tickFormat: (x) => x.toFixed(1),
  },
  marks: [
    Plot.ruleY([0]),
    Plot.boxY(diamonds, { fx: "carat", y: "price" }),
  ],
});
```

:::

<a id="plot-marks--box--box-options"></a>

## Box options

The box mark is a [composite mark](#plot-features--marks--marks) consisting of
four marks:

- a [rule](#plot-marks--rule) representing the extreme values (not including
  outliers)
- a [bar](#plot-marks--bar) representing the interquartile range (trimmed to the
  data)
- a [tick](#plot-marks--tick) representing the median value, and
- a [dot](#plot-marks--dot) representing outliers, if any

The given _options_ are passed through to these underlying marks, with the
exception of the following options:

- **fill** - the fill color of the bar; defaults to #ccc
- **fillOpacity** - the fill opacity of the bar; defaults to 1
- **stroke** - the stroke color of the rule, tick, and dot; defaults to
  _currentColor_
- **strokeOpacity** - the stroke opacity of the rule, tick, and dot; defaults to
  1
- **strokeWidth** - the stroke width of the tick; defaults to 1
- **r** - the radius of the dot; defaults to 3

<a id="plot-marks--box--boxX"></a>

## boxX(_data_, _options_)

```js
Plot.boxX(simpsons.map((d) => d.imdb_rating));
```

Returns a horizontal box mark. If the **x** option is not specified, it defaults
to the identity function, as when _data_ is an array of numbers. If the **y**
option is not specified, it defaults to null; if the **y** option is specified,
it should represent an ordinal (discrete) value.

<a id="plot-marks--box--boxY"></a>

## boxY(_data_, _options_)

```js
Plot.boxY(simpsons.map((d) => d.imdb_rating));
```

Returns a vertical box mark. If the **y** option is not specified, it defaults
to the identity function, as when _data_ is an array of numbers. If the **x**
option is not specified, it defaults to null; if the **x** option is specified,
it should represent an ordinal (discrete) value.

---

<a id="plot-marks--cell"></a>

# marks/cell.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/cell.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import hadcrut from "../data/hadcrut.ts";

const dji = shallowRef([]);
const seattle = shallowRef([]);
const simpsons = shallowRef(d3.cross(d3.range(1, 29), d3.range(1, 26), (x, y) => ({season: x, number_in_season: y})));

onMounted(() => {
  d3.csv("../data/dji.csv", d3.autoType).then((data) => (dji.value = data));
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/simpsons.csv", d3.autoType).then((data) => (simpsons.value = data));
});

</script>

<a id="plot-marks--cell--cell-mark"></a>

# Cell mark

:::tip The cell mark is a variant of the [rect mark](#plot-marks--rect) for use
when both dimensions are ordinal. See also the [bar mark](#plot-marks--bar). :::

The **cell mark** draws rectangles positioned in two ordinal dimensions. Hence,
the plot’s _x_ and _y_ scales are [band scales](#plot-features--scales). Cells
typically also have a **fill** color encoding.

For example, the heatmap below shows the decline of _The Simpsons_ after Season
9: high IMDb ratings are dark green, while low ratings are dark pink. (The worst
episode ever — cue Comic Book Guy — is season 23’s
[“Lisa Goes Gaga”](https://en.wikipedia.org/wiki/Lisa_Goes_Gaga).)

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-ratings

```js
Plot.plot({
  padding: 0,
  grid: true,
  x: { axis: "top", label: "Season" },
  y: { label: "Episode" },
  color: { type: "linear", scheme: "PiYG" },
  marks: [
    Plot.cell(simpsons, {
      x: "season",
      y: "number_in_season",
      fill: "imdb_rating",
      inset: 0.5,
    }),
    Plot.text(simpsons, {
      x: "season",
      y: "number_in_season",
      text: (d) => d.imdb_rating?.toFixed(1),
      fill: "black",
      title: "title",
    }),
  ],
});
```

:::

With [faceting](#plot-features--facets), we can produce a calendar of multiple
years, where **x** represents week-of-year and **y** represents day-of-week.
Below shows almost twenty years of daily changes of the Dow Jones Industrial
Average.

:::plot defer https://observablehq.com/@observablehq/plot-dow-jones-calendar

```js
Plot.plot({
  padding: 0,
  x: { axis: null },
  y: { tickFormat: Plot.formatWeekday("en", "narrow"), tickSize: 0 },
  fy: { tickFormat: "" },
  color: { scheme: "PiYG" },
  marks: [
    Plot.cell(dji, {
      x: (d) => d3.utcWeek.count(d3.utcYear(d.Date), d.Date),
      y: (d) => d.Date.getUTCDay(),
      fy: (d) => d.Date.getUTCFullYear(),
      fill: (d, i) =>
        i > 0 ? (d.Close - dji[i - 1].Close) / dji[i - 1].Close : NaN,
      title: (d, i) =>
        i > 0
          ? ((d.Close - dji[i - 1].Close) / dji[i - 1].Close * 100).toFixed(1)
          : NaN,
      inset: 0.5,
    }),
  ],
});
```

:::

The cell mark can be combined with the
[group transform](#plot-transforms--group), which groups data by ordinal value.
(The [bin transform](#plot-transforms--bin), on the other hand, is intended for
quantitative data and is typically paired with the
[rect mark](#plot-marks--rect).) The heatmap below shows the maximum observed
temperature by month (**y**) and date (**x**) in Seattle from 2012 through 2015.

:::plot defer
https://observablehq.com/@observablehq/plot-seattle-temperature-heatmap

```js
Plot.plot({
  padding: 0,
  y: { tickFormat: Plot.formatMonth("en", "short") },
  marks: [
    Plot.cell(
      seattle,
      Plot.group({ fill: "max" }, {
        x: (d) => d.date.getUTCDate(),
        y: (d) => d.date.getUTCMonth(),
        fill: "temp_max",
        inset: 0.5,
      }),
    ),
  ],
});
```

:::

A one-dimensional cell is produced by specifying only **x** or only **y**. The
plot below collapses the history of _The Simpsons_ to a single line.

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-barcode

```js
Plot.plot({
  x: {
    ticks: simpsons.filter((d) => d.number_in_season === 1).map((d) => d.id),
    tickFormat: (x) => simpsons.find((d) => d.id === x).season,
    label: "Season",
    labelAnchor: "right",
    labelArrow: true,
  },
  color: {
    type: "linear",
    scheme: "PiYG",
  },
  marks: [
    Plot.cell(simpsons, { x: "id", fill: "imdb_rating" }),
  ],
});
```

:::

:::info Here the _x_-scale domain contains the _id_ of every episode. An ordinal
scale by default draws a tick for every domain value; setting **ticks** to just
the first episode of each season prevents overlapping labels. The **tickFormat**
function finds the row corresponding to the episode id and returns the
corresponding _season_ number. :::

One-dimensional cells can be a compact alternative to a bar chart, where the
_fill_ color of the cell replaces the length of the bar. However, position is a
more salient encoding and should be preferred to color if space is available.

:::plot https://observablehq.com/@observablehq/plot-color-cells

```js
Plot.cell(alphabet, { x: "letter", fill: "frequency" }).plot();
```

:::

When ordinal data is regular, such as the yearly observations of the warming
stripes below, use the **interval** scale option to enforce uniformity and show
gaps for missing data. It can be set to a named interval such as _hour_ or
_day_, a number for numeric intervals, a
[d3-time interval](https://d3js.org/d3-time#_interval), or a custom
implementation.

:::plot https://observablehq.com/@observablehq/plot-ordinal-scale-interval-2

```js{5}
Plot.plot({
  x: {
    ticks: d3.ticks(...d3.extent(hadcrut, (d) => d.year), 10),
    tickFormat: "d",
    interval: 1, // recommended in case of missing data
    label: null
  },
  color: {
    scheme: "BuRd"
  },
  marks: [
    Plot.cell(hadcrut, {x: "year", fill: "anomaly"})
  ]
})
```

:::

:::tip When an ordinal scale domain has high cardinality, the **ticks** scale
option can be used to specify which ticks to label. Alternatively, consider
using a quantitative or temporal scale instead, as by switching to a
[bar mark](#plot-marks--bar). :::

<a id="plot-marks--cell--cell-options"></a>

## Cell options

In addition to the [standard mark options](#plot-features--marks--mark-options),
including [insets](#plot-features--marks--insets) and
[rounded corners](#plot-features--marks--rounded-corners), the following
optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale, which must be _band_
- **y** - the vertical position; bound to the _y_ scale, which must be _band_

If **x** is not specified, the cell will span the full horizontal extent of the
plot (or facet). Likewise if **y** is not specified, the cell will span the full
vertical extent of the plot (or facet). Typically either **x**, **y**, or both
are specified; use a [frame mark](#plot-marks--frame) to decorate the plot’s
frame.

The **stroke** defaults to _none_. The **fill** defaults to _currentColor_ if
the stroke is _none_, and to _none_ otherwise.

<a id="plot-marks--cell--cell"></a>

## cell(_data_, _options_)

```js
Plot.cell(simpsons, {
  x: "number_in_season",
  y: "season",
  fill: "imdb_rating",
});
```

Returns a new cell with the given _data_ and _options_. If neither the **x** nor
**y** options are specified, _data_ is assumed to be an array of pairs [[_x₀_,
_y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that **x** = [_x₀_, _x₁_, _x₂_, …]
and **y** = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--cell--cellX"></a>

## cellX(_data_, _options_)

```js
Plot.cellX(simpsons.map((d) => d.imdb_rating));
```

Equivalent to [cell](#plot-marks--cell--cell), except that if the **x** option
is not specified, it defaults to [0, 1, 2, …], and if the **fill** option is not
specified and **stroke** is not a channel, the fill defaults to the identity
function and assumes that _data_ = [_x₀_, _x₁_, _x₂_, …].

<a id="plot-marks--cell--cellY"></a>

## cellY(_data_, _options_)

```js
Plot.cellY(simpsons.map((d) => d.imdb_rating));
```

Equivalent to [cell](#plot-marks--cell--cell), except that if the **y** option
is not specified, it defaults to [0, 1, 2, …], and if the **fill** option is not
specified and **stroke** is not a channel, the fill defaults to the identity
function and assumes that _data_ = [_y₀_, _y₁_, _y₂_, …].

---

<a id="plot-marks--contour"></a>

# marks/contour.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/contour.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import volcano from "../data/volcano.ts";

const ca55 = shallowRef([]);
const vapor = shallowRef([]);
const grid = {"width": 10, "height": 10, "values": d3.cross(d3.range(10), d3.range(10), (x, y) => x * y)};

onMounted(() => {
  d3.csv("../data/ca55-south.csv", d3.autoType).then((data) => (ca55.value = data));
  d3.text("../data/MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv").then((text) => (vapor.value = d3.csvParseRows(text).flat().map((x) => (x === "99999.0" ? NaN : +x))));
});

function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}

</script>

<a id="plot-marks--contour--contour-mark"></a>

# Contour mark <VersionBadge version="0.6.2" />

:::tip To produce a heatmap instead of contours, see the
[raster mark](#plot-marks--raster). For contours of estimated point density, see
the [density mark](#plot-marks--density). :::

The **contour mark** draws
[isolines](https://en.wikipedia.org/wiki/Contour_line) to delineate regions
above and below a particular continuous value. These contours are computed by
applying the
[marching squares algorithm](https://en.wikipedia.org/wiki/Marching_squares) to
a discrete grid. Like the [raster mark](#plot-marks--raster), the grid can be
constructed either by
[interpolating spatial samples](#plot-marks--raster--spatial-interpolators)
(arbitrary points in **x** and **y**) or by sampling a continuous function
_f_(_x_,_y_) along the grid.

For example, the contours below show the topography of the
[Maungawhau volcano](https://en.wikipedia.org/wiki/Maungawhau), produced from a
{{volcano.width}}×{{volcano.height}} grid of elevation samples.

:::plot defer https://observablehq.com/@observablehq/plot-stroked-contours

```js
Plot.contour(volcano.values, { width: volcano.width, height: volcano.height })
  .plot();
```

:::

Whereas the **value** option produces isolines suitable for stroking, the
**fill** option produces filled contours. Setting the **fill** to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
will apply a color encoding to the contour values, allowing the contour values
to be read via a _color_ legend.

:::plot defer https://observablehq.com/@observablehq/plot-filled-contours

```js
Plot.plot({
  color: {
    legend: true,
    label: "Elevation (m)",
  },
  marks: [
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      fill: Plot.identity,
      stroke: "black",
    }),
  ],
});
```

:::

:::info Contours are drawn in ascending value order, with the highest value on
top; hence, filled contour polygons overlap! If you are interested in isobands,
please upvote [#1420](https://github.com/observablehq/plot/issues/1420). :::

The grid (`volcano.values` above) is a list of numbers `[103, 104, 104, …]`. The
first number `103` is the elevation of the bottom-left corner. This grid is in
[row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order),
meaning that the elevations of the first row are followed by the second row,
then the third, and so on. Here’s a smaller grid to demonstrate the concept.

```js
grid = {
  "width": 10,
  "height": 10,
  "values": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    0,
    3,
    6,
    9,
    12,
    15,
    18,
    21,
    24,
    27,
    0,
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    0,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    0,
    6,
    12,
    18,
    24,
    30,
    36,
    42,
    48,
    54,
    0,
    7,
    14,
    21,
    28,
    35,
    42,
    49,
    56,
    63,
    0,
    8,
    16,
    24,
    32,
    40,
    48,
    56,
    64,
    72,
    0,
    9,
    18,
    27,
    36,
    45,
    54,
    63,
    72,
    81,
  ],
};
```

We can visualize this small grid directly with a [text mark](#plot-marks--text)
using the same color encoding. Notice that the image below is flipped vertically
relative to the data: the first row of the data is the _bottom_ of the image
because below _y_ points up↑.

:::plot https://observablehq.com/@observablehq/plot-small-grid-contours

```js
Plot.plot({
  grid: true,
  x: { domain: [0, grid.width], label: "column" },
  y: { domain: [0, grid.height], label: "row" },
  marks: [
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: Plot.identity,
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5,
    }),
  ],
});
```

:::

Also notice that the grid points are offset by 0.5: they represent the _middle_
of each pixel rather than the corner. Below, the contour mark is laid under the
text mark to show filled contours.

:::plot defer https://observablehq.com/@observablehq/plot-small-grid-contours

```js
Plot.plot({
  marks: [
    Plot.contour(grid.values, {
      width: grid.width,
      height: grid.height,
      fill: Plot.identity,
      interval: 5,
    }),
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: "white",
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5,
    }),
  ],
});
```

:::

Similar to the [bin transform](#plot-transforms--bin), contour levels can be
specified either with the **interval** option (above, a contour at each multiple
of 5) or with the **thresholds** option (either a count of thresholds or an
explicit array of values).

While the contour mark provides convenient shorthand for strictly gridded data,
as above, it _also_ works with samples in arbitrary positions and arbitrary
order. For example, in 1955 the
[Great Britain aeromagnetic survey](https://www.bgs.ac.uk/datasets/gb-aeromagnetic-survey/)
measured the Earth’s magnetic field by plane. Each sample recorded the longitude
and latitude alongside the strength of the
[IGRF](https://www.ncei.noaa.gov/products/international-geomagnetic-reference-field)
in [nanoteslas](https://en.wikipedia.org/wiki/Tesla_(unit)).

```
LONGITUDE,LATITUDE,MAG_IGRF90
-2.36216,51.70945,7
-2.36195,51.71727,6
-2.36089,51.72404,9
-2.35893,51.73758,12
-2.35715,51.7532,18
-2.35737,51.76636,24
```

Using a [dot mark](#plot-marks--dot), we can make a quick scatterplot to see the
irregular grid. We’ll use a _diverging_ color scale to distinguish positive and
negative values.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-dots

```js
Plot.dot(ca55, { x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90" }).plot({
  color: { type: "diverging" },
});
```

:::

Pass the same arguments to the contour mark for continuous contours.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-contours

```js
Plot.contour(ca55, { x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90" }).plot({
  color: { type: "diverging" },
});
```

:::

As with the raster mark, the **blur** option applies a Gaussian blur to the
underlying raster grid, resulting in smoother contours.

:::plot defer https://observablehq.com/@observablehq/plot-blurred-contours

```js
Plot.contour(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  blur: 4,
}).plot({ color: { type: "diverging" } });
```

:::

:::tip The contour mark also supports the **interpolate** option for control
over [spatial interpolation](#plot-marks--raster--spatial-interpolators). :::

The contour mark supports Plot’s
[projection system](#plot-features--projections). The chart below shows global
atmospheric water vapor measurements from
[NASA Earth Observations](https://neo.gsfc.nasa.gov/view.php?datasetId=MYDAL2_M_SKY_WV).

:::plot defer https://observablehq.com/@observablehq/plot-contours-projection

```js
Plot.plot({
  projection: "equal-earth",
  color: {
    scheme: "BuPu",
    domain: [0, 6],
    legend: true,
    label: "Water vapor (cm)",
  },
  marks: [
    Plot.contour(vapor, {
      fill: Plot.identity,
      width: 360,
      height: 180,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      blur: 1,
      stroke: "black",
      strokeWidth: 0.5,
      clip: "sphere",
    }),
    Plot.sphere({ stroke: "black" }),
  ],
});
```

:::

As an alternative to interpolating discrete samples, you can supply values as a
continuous function _f_(_x_,_y_); the contour mark will invoke this function for
the midpoint of each pixel in the raster grid, similar to a WebGL fragment
shader. For example, below we visualize the trigonometric function sin(_x_)
cos(_y_), producing a checkerboard-like pattern.

:::plot defer https://observablehq.com/@observablehq/plot-function-contour-2

```js
Plot.plot({
  aspectRatio: 1,
  x: { tickSpacing: 80, label: "x" },
  y: { tickSpacing: 80, label: "y" },
  color: { type: "diverging", legend: true, label: "sin(x) cos(y)" },
  marks: [
    Plot.contour({
      fill: (x, y) => Math.sin(x) * Math.cos(y),
      x1: 0,
      y1: 0,
      x2: 6 * Math.PI,
      y2: 4 * Math.PI,
    }),
  ],
});
```

:::

:::tip When faceting, the sample function _f_(_x_,_y_) is passed a third
argument of the facet values {_fx_, _fy_}. :::

<a id="plot-marks--contour--contour-options"></a>

## Contour options

If _data_ is provided, it represents discrete samples in abstract coordinates
**x** and **y**; the **value** channel specifies further abstract quantitative
values (_e.g._, height in a topographic map) to be
[spatially interpolated](#plot-marks--raster--spatial-interpolators) to produce
the underlying raster grid.

```js
Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height,
  value: Plot.identity,
});
```

The **value** channel may alternatively be specified as a continuous function
_f_(_x_,_y_) to be evaluated at each pixel centroid of the raster grid (without
interpolation).

```js
Plot.contour({
  x1: 0,
  y1: 0,
  x2: 4,
  y2: 4,
  value: (x, y) => Math.sin(x) * Math.cos(y),
});
```

The resolution of the raster grid may be specified with the following options:

- **width** - the number of pixels on each horizontal line
- **height** - the number of lines; a positive integer

Alternatively, the raster dimensions may be imputed from the extent of _x_ and
_y_ and a pixel size:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **y2** - the ending vertical position; bound to the _y_ scale
- **pixelSize** - the screen size of a raster pixel; defaults to 1

If **width** is specified, **x1** defaults to 0 and **x2** defaults to
**width**; likewise, if **height** is specified, **y1** defaults to 0 and **y2**
defaults to **height**. Otherwise, if **data** is specified, **x1**, **y1**,
**x2**, and **y2** respectively default to the frame’s left, top, right, and
bottom coordinates. Lastly, if **data** is not specified (as when **value** is a
function of _x_ and _y_), you must specify all of **x1**, **x2**, **y1**, and
**y2** to define the raster domain (see below).

The contour mark shares many options with the
[raster mark](#plot-marks--raster). The **interpolate** option is ignored when
the **value** channel is a continuous function of _x_ and _y_, and otherwise
defaults to _nearest_. For smoother contours, the **blur** option (default 0)
specifies a non-negative pixel radius for smoothing prior to applying marching
squares. The **smooth** option (default true) specifies whether to apply linear
interpolation after marching squares when computing contour polygons. The
**thresholds** and **interval** options specify the contour thresholds; see the
[bin transform](#plot-transforms--bin) for details.

With the exception of the **x**, **y**, **x1**, **y1**, **x2**, **y2**, and
**value** channels, the contour mark’s channels are not evaluated on the initial
_data_ but rather on the contour multipolygons generated in the initializer. For
example, to generate filled contours where the color corresponds to the contour
threshold value:

```js
Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height,
  value: Plot.identity,
  fill: "value",
});
```

As shorthand, a single channel may be specified, in which case it is promoted to
the _value_ channel.

```js
Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height,
  fill: Plot.identity,
});
```

<a id="plot-marks--contour--contour"></a>

## contour(_data_, _options_)

```js
Plot.contour(volcano.values, {
  width: volcano.width,
  height: volcano.height,
  fill: Plot.identity,
});
```

Returns a new contour mark with the given (optional) _data_ and _options_.

---

<a id="plot-marks--delaunay"></a>

# marks/delaunay.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/delaunay.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const walmarts = shallowRef([]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});

onMounted(() => {
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

<a id="plot-marks--delaunay--delaunay-marks"></a>

# Delaunay marks <VersionBadge version="0.5.1" />

Given set of points in **x** and **y**, the **Delaunay marks** compute the
[Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation),
its dual the
[Voronoi tessellation](https://en.wikipedia.org/wiki/Voronoi_diagram), and the
[convex hull](https://en.wikipedia.org/wiki/Convex_hull).

The [voronoi mark](#plot-marks--delaunay--voronoi) computes the region closest
to each point (its _Voronoi cell_). The cell can be empty if another point
shares the exact same coordinates. Together, the cells cover the entire plot.
Voronoi diagrams can group related points with color, for example.

:::plot https://observablehq.com/@observablehq/plot-voronoi-scatterplot

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.voronoi(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
      fillOpacity: 0.2,
      stroke: "var(--vp-c-bg)",
    }),
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
    }),
  ],
});
```

:::

Each cell is associated with a particular data point, and channels such as
**stroke**, **fill**, **fillOpacity**, **strokeOpacity**, **href**, _etc._, work
as they do on other marks, such as [dots](#plot-marks--dot).

To show the local density of a scatterplot, one can draw the whole boundary at
once with [voronoiMesh](#plot-marks--delaunay--voronoiMesh). Whereas the
[voronoi mark](#plot-marks--delaunay--voronoi) will draw shared cell boundaries
twice, the mesh will draw them only once.

:::plot https://observablehq.com/@observablehq/plot-voronoi-mesh

```js
Plot.plot({
  marks: [
    Plot.voronoiMesh(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" }),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
    }),
  ],
});
```

:::

The boundary between two neighboring Voronoi cells is a line segment defined by
equal distance from their two respective points. The construction of the Voronoi
diagram involves the computation of the Delaunay graph, which defines these
neighbors. Use [delaunayMesh](#plot-marks--delaunay--delaunayMesh) to draw the
graph.

:::plot https://observablehq.com/@observablehq/plot-delaunay-mesh

```js
Plot.plot({
  marks: [
    Plot.delaunayMesh(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      z: "species",
      stroke: "species",
      strokeOpacity: 0.5,
    }),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
    }),
  ],
});
```

:::

As shown above, the Delaunay graph is computed separately for each color;
specifying **z**, **stroke**, or **fill** creates independent series.

Another derivative of the Delaunay graph is the convex hull of a set of points:
the polygon with the minimum perimeter that contains all the points. The
[hull mark](#plot-marks--delaunay--hull) will draw this hull.

:::plot defer https://observablehq.com/@observablehq/plot-convex-hull

```js
Plot.plot({
  marks: [
    Plot.hull(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      fill: "species",
      fillOpacity: 0.2,
    }),
    Plot.dot(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      stroke: "species",
    }),
  ],
});
```

:::

Using independent series is not recommended in the case of the voronoi and
voronoiMesh marks as it will result in an unreadable chart due to overlapping
Voronoi diagrams, but it can be useful to color the links of the Delaunay graph
based on some property of data, such as the body mass of penguins below.

:::plot defer https://observablehq.com/@observablehq/plot-delaunay-links

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.delaunayLink(penguins, {
      x: "culmen_depth_mm",
      y: "culmen_length_mm",
      stroke: "body_mass_g",
      strokeWidth: 1.5,
    }),
  ],
});
```

:::

:::warning CAUTION The link color is driven by one arbitrary extremity of each
edge; this might change in the future. :::

The Delaunay marks can be one-dimensional, too.

:::plot defer
https://observablehq.com/@observablehq/plot-one-dimensional-voronoi

```js
Plot.plot({
  marks: [
    Plot.voronoi(penguins, { x: "body_mass_g", fill: "species" }),
    Plot.voronoiMesh(penguins, {
      x: "body_mass_g",
      stroke: "white",
      strokeOpacity: 1,
    }),
  ],
});
```

:::

The [Delaunay marks](#plot-marks--delaunay) also work with Plot’s
[projection system](#plot-features--projections), as in this Voronoi diagram
showing the distribution of Walmart stores in the contiguous United States.

:::plot defer https://observablehq.com/@observablehq/plot-walmart-voronoi

```js
Plot.plot({
  projection: "albers",
  marks: [
    Plot.geo(nation),
    Plot.dot(walmarts, {
      x: "longitude",
      y: "latitude",
      fill: "currentColor",
      r: 1,
    }),
    Plot.voronoiMesh(walmarts, { x: "longitude", y: "latitude" }),
  ],
});
```

:::

:::warning CAUTION Distances between projected points are not exactly
proportional to the corresponding distances on the sphere. This
[creates a discrepancy](https://observablehq.com/@observablehq/planar-vs-spherical-voronoi)
between the planar Voronoi diagram and its spherical counterpart. For greater
accuracy, use [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi) with the
[geo mark](#plot-marks--geo). :::

<a id="plot-marks--delaunay--delaunayLink"></a>

## delaunayLink(_data_, _options_)

```js
Plot.delaunayLink(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" });
```

Draws links for each edge of the Delaunay triangulation of the points given by
the **x** and **y** channels. Supports the same options as the
[link mark](#plot-marks--link), except that **x1**, **y1**, **x2**, and **y2**
are derived automatically from **x** and **y**. When an aesthetic channel is
specified (such as **stroke** or **strokeWidth**), the link inherits the
corresponding channel value from one of its two endpoints arbitrarily.

If a **z** channel is specified, the input points are grouped by _z_, and
separate Delaunay triangulations are constructed for each group.

<a id="plot-marks--delaunay--delaunayMesh"></a>

## delaunayMesh(_data_, _options_)

```js
Plot.delaunayMesh(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" });
```

Draws a mesh of the Delaunay triangulation of the points given by the **x** and
**y** channels. The **stroke** option defaults to _currentColor_, and the
**strokeOpacity** defaults to 0.2. The **fill** option is not supported. When an
aesthetic channel is specified (such as **stroke** or **strokeWidth**), the mesh
inherits the corresponding channel value from one of its constituent points
arbitrarily.

If a **z** channel is specified, the input points are grouped by _z_, and
separate Delaunay triangulations are constructed for each group.

<a id="plot-marks--delaunay--hull"></a>

## hull(_data_, _options_)

```js
Plot.hull(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" });
```

Draws a convex hull around the points given by the **x** and **y** channels. The
**stroke** option defaults to _currentColor_ and the **fill** option defaults to
_none_. When an aesthetic channel is specified (such as **stroke** or
**strokeWidth**), the hull inherits the corresponding channel value from one of
its constituent points arbitrarily.

If a **z** channel is specified, the input points are grouped by _z_, and
separate convex hulls are constructed for each group. If the **z** channel is
not specified, it defaults to either the **fill** channel, if any, or the
**stroke** channel, if any.

<a id="plot-marks--delaunay--voronoi"></a>

## voronoi(_data_, _options_)

```js
Plot.voronoi(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" });
```

Draws polygons for each cell of the Voronoi tessellation of the points given by
the **x** and **y** channels.

If a **z** channel is specified, the input points are grouped by _z_, and
separate Voronoi tessellations are constructed for each group.

<a id="plot-marks--delaunay--voronoiMesh"></a>

## voronoiMesh(_data_, _options_)

```js
Plot.voronoiMesh(penguins, { x: "culmen_depth_mm", y: "culmen_length_mm" });
```

Draws a mesh for the cell boundaries of the Voronoi tessellation of the points
given by the **x** and **y** channels. The **stroke** option defaults to
_currentColor_, and the **strokeOpacity** defaults to 0.2. The **fill** option
is not supported. When an aesthetic channel is specified (such as **stroke** or
**strokeWidth**), the mesh inherits the corresponding channel value from one of
its constituent points arbitrarily.

If a **z** channel is specified, the input points are grouped by _z_, and
separate Voronoi tessellations are constructed for each group.

---

<a id="plot-marks--density"></a>

# marks/density.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/density.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import faithful from "../data/faithful.ts";
import penguins from "../data/penguins.ts";

const walmarts = shallowRef([]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const skew = ref(0);
const bandwidth = ref(20);
const thresholds = ref(20);
const diamonds = shallowRef([]);

onMounted(() => {
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

<a id="plot-marks--density--density-mark"></a>

# Density mark <VersionBadge version="0.5.1" />

:::tip For contours of spatially-distributed quantitative values, see the
[contour mark](#plot-marks--contour). :::

The **density mark** shows the
[estimated density](https://en.wikipedia.org/wiki/Multivariate_kernel_density_estimation)
of two-dimensional point clouds. Contours guide the eye towards the local peaks
of concentration of the data, much like a topographic map does with elevation.
This is especially useful given overplotting in dense datasets.

:::plot https://observablehq.com/@observablehq/plot-point-cloud-density

```js
Plot.plot({
  inset: 10,
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      y: "eruptions",
      stroke: "blue",
      strokeWidth: 0.25,
    }),
    Plot.density(faithful, {
      x: "waiting",
      y: "eruptions",
      stroke: "blue",
      thresholds: 4,
    }),
    Plot.dot(faithful, {
      x: "waiting",
      y: "eruptions",
      fill: "currentColor",
      r: 1.5,
    }),
  ],
});
```

:::

The **bandwidth** option specifies the radius of the
[Gaussian kernel](https://en.wikipedia.org/wiki/Gaussian_function) describing
the influence of each point as a function of distance; this kernel is summed
over a discrete grid covering the plot, and then contours (_isolines_) are
derived for values between 0 (exclusive) and the maximum density (exclusive)
using the
[marching squares algorithm](https://en.wikipedia.org/wiki/Marching_squares).

<p>
  <label class="label-input">
    Bandwidth:
    <input type="range" v-model.number="bandwidth" min="0" max="40" step="0.2">
    <span style="font-variant-numeric: tabular-nums;">{{bandwidth.toLocaleString("en-US", {minimumFractionDigits: 1})}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-options

```js
Plot.plot({
  inset: 20,
  marks: [
    Plot.density(faithful, { x: "waiting", y: "eruptions", bandwidth }),
    Plot.dot(faithful, { x: "waiting", y: "eruptions" }),
  ],
});
```

:::

The **thresholds** option specifies the number of contour lines (minus one) to
be computed, or an explicit array of threshold values. For example, with 4
thresholds and a maximum density of 10, contour lines would be drawn for the
values 2.5, 5, and 7.5. The default number of thresholds is 20.

<p>
  <label class="label-input">
    Thresholds:
    <input type="range" v-model.number="thresholds" min="1" max="40" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{thresholds}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-options

```js
Plot.plot({
  inset: 20,
  marks: [
    Plot.density(faithful, { x: "waiting", y: "eruptions", thresholds }),
    Plot.dot(faithful, { x: "waiting", y: "eruptions" }),
  ],
});
```

:::

The density mark also works with one-dimensional values:

:::plot defer
https://observablehq.com/@observablehq/plot-one-dimensional-density

```js
Plot.plot({
  height: 100,
  inset: 10,
  marks: [
    Plot.density(faithful, {
      x: "waiting",
      stroke: "blue",
      strokeWidth: 0.25,
      bandwidth: 10,
    }),
    Plot.density(faithful, {
      x: "waiting",
      stroke: "blue",
      thresholds: 4,
      bandwidth: 10,
    }),
    Plot.dot(faithful, { x: "waiting", fill: "currentColor", r: 1.5 }),
  ],
});
```

:::

The density mark supports Plot’s
[projection system](#plot-features--projections), as in this heatmap showing the
density of Walmart stores across the contiguous United States (which is a decent
proxy for population density).

:::plot defer https://observablehq.com/@observablehq/plot-walmart-density

```js-vue
Plot.plot({
  projection: "albers",
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.density(walmarts, {x: "longitude", y: "latitude", bandwidth: 10, fill: "density"}),
    Plot.geo(statemesh, {strokeOpacity: 0.3}),
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
  ]
})
```

:::

:::tip Use an equal-area projection with the density mark. :::

By using the _density_ keyword as a **fill** or **stroke** color, you can draw
regions with a sequential color encoding.

:::plot defer https://observablehq.com/@observablehq/plot-density-stroke

```js
Plot.plot({
  inset: 10,
  grid: true,
  x: { type: "log" },
  y: { type: "log" },
  marks: [
    Plot.density(diamonds, { x: "carat", y: "price", stroke: "density" }),
  ],
});
```

:::

To facilitate comparison across facets (**fx** or **fy**) and series (**z**,
**stroke**, or **fill**), the thresholds are determined by the series with the
highest density. For instance, the chart below shows the highest concentration
of penguins, arranged by flipper length and culmen length, on Biscoe island; the
contours in the other facets use the same thresholds.

<!-- ```js
Plot.plot({
  axis: null,
  marks: [
    Plot.dot(penguins, {x: "flipper_length_mm", y: "culmen_length_mm"}),
    Plot.density(penguins, {x: "flipper_length_mm", y: "culmen_length_mm"})
  ]
})
``` -->

:::plot defer https://observablehq.com/@observablehq/plot-density-faceted

```js
Plot.plot({
  marks: [
    Plot.density(penguins, {
      fx: "island",
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "density",
      clip: true,
    }),
    Plot.frame(),
  ],
});
```

:::

<!-- With the default settings, the density is the local average number of dots on an area of ${tex`100\text{px}^2`} — a square of 10px by 10px. This can be multiplied by the dots’ weights. -->

The **weight** channel specifies the contribution of each data point to the
estimated density; it defaults to 1, weighing each point equally. This can be
used to give some points more influence than others. Try adjusting the skew
slider below to transition between female- and male-weighted density.

<p>
  <label class="label-input">
    Skew (-F/+M):
    <input type="range" v-model.number="skew" min="-1" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{skew.toLocaleString("en-US", {minimumFractionDigits: 2, signDisplay: "always"})}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-weighted

```js
Plot.plot({
  inset: 10,
  color: { legend: true },
  marks: [
    Plot.density(penguins.filter((d) => d.sex), {
      weight: (d) => d.sex === "FEMALE" ? 1 - skew : 1 + skew,
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      strokeOpacity: 0.5,
      clip: true,
    }),
    Plot.dot(penguins.filter((d) => d.sex), {
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "sex",
      strokeOpacity: (d) => d.sex === "FEMALE" ? 1 - skew : 1 + skew,
    }),
    Plot.frame(),
  ],
});
```

:::

You can specify a negative weight for points that the density contours should
avoid, resulting in regions of influence that do not overlap.

:::plot defer
https://observablehq.com/@observablehq/plot-non-overlapping-density-regions

```js
Plot.plot({
  inset: 10,
  color: { legend: true },
  marks: [
    d3.groups(penguins, (d) => d.species).map(([s]) =>
      Plot.density(penguins, {
        x: "flipper_length_mm",
        y: "culmen_length_mm",
        weight: (d) => d.species === s ? 1 : -1,
        fill: () => s,
        fillOpacity: 0.2,
        thresholds: [0.05],
      })
    ),
    Plot.dot(penguins, {
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "species",
    }),
    Plot.frame(),
  ],
});
```

:::

<a id="plot-marks--density--density-options"></a>

## Density options

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale
- **weight** - the contribution to the estimated density

If either of the **x** or **y** channels are not specified, the corresponding
position is controlled by the **frameAnchor** option.

The **thresholds** option, which defaults to 20, specifies one more than the
number of contours that will be computed at uniformly-spaced intervals between 0
(exclusive) and the maximum density (exclusive). The **thresholds** option may
also be specified as an array or iterable of explicit density values. The
**bandwidth** option, which defaults to 20, specifies the standard deviation of
the Gaussian kernel used for estimation in pixels.

If a **z**, **stroke** or **fill** channel is specified, the input points are
grouped by series, and separate sets of contours are generated for each series.
If the **stroke** or **fill** is specified as _density_, a color channel is
constructed with values representing the density threshold value of each
contour.

<a id="plot-marks--density--density"></a>

## density(_data_, _options_)

```js
Plot.density(faithful, { x: "waiting", y: "eruptions" });
```

Returns a new density mark for the given _data_ and _options_.

---

<a id="plot-marks--difference"></a>

# marks/difference.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/difference.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, shallowRef, onMounted} from "vue";

const aapl = shallowRef([]);
const gistemp = shallowRef([]);
const tsa = shallowRef([{Date: new Date("2020-01-01")}]);
const temperature = shallowRef([{date: new Date("2020-01-01")}]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  d3.csv("../data/tsa.csv",d3.autoType).then((data) => (tsa.value = data));
  d3.csv("../data/sf-sj-temperatures.csv", d3.autoType).then((data) => (temperature.value = data.filter((d) => d.date.getUTCFullYear() === 2020)));
});

</script>

<a id="plot-marks--difference--difference-mark"></a>

# Difference mark <VersionBadge version="0.6.12" pr="1896" />

The **difference mark** puts a metric in context by comparing it. Like the
[area mark](#plot-marks--area), the region between two lines is filled; unlike
the area mark, alternating color shows when the metric is above or below the
comparison value.

In the simplest case, the difference mark compares a metric to a constant. For
example, the plot below shows the
[global surface temperature anomaly](https://data.giss.nasa.gov/gistemp/) from
1880–2016; 0° represents the 1951–1980 average; above-average temperatures are
in <span style="border-bottom: solid var(--vp-c-red) 3px;">red</span>, while
below-average temperatures are in
<span style="border-bottom: solid var(--vp-c-blue) 3px;">blue</span>. (It’s
getting hotter.)

:::plot

```js
Plot.differenceY(gistemp, {
  x: "Date",
  y: "Anomaly",
  positiveFill: "red",
  negativeFill: "blue",
  tip: true,
}).plot({ y: { grid: true } });
```

:::

A 24-month
[moving average](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/window.md)
improves readability by smoothing out the noise.

:::plot

```js
Plot.differenceY(
  gistemp,
  Plot.windowY(12 * 2, {
    x: "Date",
    y: "Anomaly",
    positiveFill: "red",
    negativeFill: "blue",
    tip: true,
  }),
).plot({ y: { grid: true } });
```

:::

More powerfully, the difference mark compares two metrics. For example, the plot
below shows the number of travelers per day through TSA checkpoints in 2020
compared to 2019. (This in effect compares a metric against itself, but as the
data represents each year as a separate column, it is equivalent to two
metrics.) In the first two months of 2020, there were on average
<span style="border-bottom: solid #01ab63 3px;">more travelers</span> per day
than 2019; yet when COVID-19 hit, there were many
<span style="border-bottom: solid #4269d0 3px;">fewer travelers</span> per day,
dropping almost to zero.

:::plot

```js
Plot.plot({
  x: { tickFormat: "%b" },
  y: { grid: true, label: "Travelers" },
  marks: [
    Plot.axisY({
      label: "Travelers per day (thousands, 2020 vs. 2019)",
      tickFormat: (d) => d / 1000,
    }),
    Plot.ruleY([0]),
    Plot.differenceY(tsa, {
      x: "Date",
      y1: "2019",
      y2: "2020",
      tip: { format: { x: "%B %-d" } },
    }),
  ],
});
```

:::

If the data is “tall” rather than “wide” — that is, if the two metrics we wish
to compare are represented by separate _rows_ rather than separate _columns_
— we can use the [group transform](#plot-transforms--group) with the
[find reducer](#plot-transforms--group--find): group the rows by **x** (date),
then find the desired **y1** and **y2** for each group. The plot below shows
daily minimum temperature for San Francisco compared to San Jose. Notice how the
insulating fog keeps San Francisco
<span style="border-bottom: solid #01ab63 3px;">warmer</span> in winter and
<span style="border-bottom: solid #4269d0 3px;">cooler</span> in summer,
reducing seasonal variation.

:::plot

```js
Plot.plot({
  x: { tickFormat: "%b" },
  y: { grid: true },
  marks: [
    Plot.ruleY([32]),
    Plot.differenceY(
      temperature,
      Plot.windowY(
        14,
        Plot.groupX(
          {
            y1: Plot.find((d) => d.station === "SJ"),
            y2: Plot.find((d) => d.station === "SF"),
          },
          {
            x: "date",
            y: "tmin",
            tip: true,
          },
        ),
      ),
    ),
  ],
});
```

:::

The difference mark can also be used to compare a metric to itself using the
[shift transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/shift.md).
The chart below shows year-over-year growth in the price of Apple stock.

:::plot

```js
Plot.differenceY(aapl, Plot.shiftX("+1 year", { x: "Date", y: "Close" })).plot({
  y: { grid: true },
});
```

:::

For most of the covered time period, you would have
<span style="border-bottom: solid #01ab63 3px;">made a profit</span> by holding
Apple stock for a year; however, if you bought in 2015 and sold in 2016, you
would likely have <span style="border-bottom: solid #4269d0 3px;">lost
money</span>.

<a id="plot-marks--difference--difference-options"></a>

## Difference options

The following channels are required:

- **x2** - the horizontal position of the metric; bound to the _x_ scale
- **y2** - the vertical position of the metric; bound to the _y_ scale

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x1** - the horizontal position of the comparison; bound to the _x_ scale
- **y1** - the vertical position of the comparison; bound to the _y_ scale

If **x1** is not specified, it defaults to **x2**. If **y1** is not specified,
it defaults to 0 if **x1** and **x2** are equal, and to **y2** otherwise. These
defaults facilitate sharing _x_ or _y_ coordinates between the metric and its
comparison.

The standard **fill** option is ignored; instead, there are separate channels
based on the sign of the difference:

- **positiveFill** - the color for when the metric is greater, defaults to
  <span style="border-bottom:solid #01ab63 3px;">green</span>
- **negativeFill** - the color for when the comparison is greater, defaults to
  <span style="border-bottom:solid #4269d0 3px;">blue</span>
- **fillOpacity** - the areas’ opacity, defaults to 1
- **positiveFillOpacity** - the positive area’s opacity, defaults to _opacity_
- **negativeFillOpacity** - the negative area’s opacity, defaults to _opacity_
- **stroke** - the metric line’s stroke color, defaults to currentColor
- **strokeOpacity** - the metric line’s opacity, defaults to 1

These options are passed to the underlying area and line marks; in particular,
when they are defined as a channel, the underlying marks are broken into
contiguous overlapping segments when the values change. When any of these
channels are used, setting an explicit **z** channel (possibly to null) is
strongly recommended.

<a id="plot-marks--difference--differenceY"></a>

## differenceY(_data_, _options_)

```js
Plot.differenceY(gistemp, { x: "Date", y: "Anomaly" });
```

Returns a new vertical difference with the given _data_ and _options_. The mark
is a composite of a positive area, negative area, and line. The positive area
extends from the bottom of the frame to the line, and is clipped by the area
extending from the comparison to the top of the frame. The negative area
conversely extends from the top of the frame to the line, and is clipped by the
area extending from the comparison to the bottom of the frame.

<a id="plot-marks--difference--differenceX"></a>

## differenceX(_data_, _options_) <VersionBadge version="0.6.16" pr="1922" />

```js
Plot.differenceX(gistemp, { y: "Date", x: "Anomaly" });
```

Returns a new horizontal difference with the given _data_ and _options_. See
[differenceY](#plot-marks--difference--differenceY) for more.

---

<a id="plot-marks--dot"></a>

# marks/dot.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/dot.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import cars from "../data/cars.ts";
import penguins from "../data/penguins.ts";

const sorted = ref(true);
const aapl = shallowRef([]);
const congress = shallowRef([]);
const diamonds = shallowRef([]);
const gistemp = shallowRef([{Date: new Date("1880-01-01"), Anomaly: -0.78}, {Date: new Date("2016-12-01"), Anomaly: 1.35}]);
const stateage = shallowRef([]);
const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

const xy = Plot.normalizeX({basis: "sum", z: "state", x: "population", y: "state"});

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/us-congress-2023.csv", d3.autoType).then((data) => (congress.value = data));
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv")
  ]).then(([_us, _population]) => {
    const map = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.population = map.get(g.id)));
    us.value = _us;
  });
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

<a id="plot-marks--dot--dot-mark"></a>

# Dot mark

The **dot mark** draws circles or other symbols positioned in **x** and **y** as
in a scatterplot. For example, the chart below shows the roughly-inverse
relationship between car horsepower in _y_↑ and fuel efficiency in miles per
gallon in _x_→.

:::plot https://observablehq.com/@observablehq/plot-basic-scatterplot

```js
Plot.dot(cars, { x: "economy (mpg)", y: "power (hp)" }).plot({ grid: true });
```

:::

Using a function for **x**, we can instead plot the roughly-linear relationship
when fuel efficiency is represented as gallons per 100 miles. (For fans of the
metric system, 1 gallon per 100 miles is roughly 2.4 liters per 100 km.)

:::plot https://observablehq.com/@observablehq/plot-derived-value-scatterplot

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: { label: "Fuel consumption (gallons per 100 miles)" },
  y: { label: "Horsepower" },
  marks: [
    Plot.dot(cars, { x: (d) => 100 / d["economy (mpg)"], y: "power (hp)" }),
  ],
});
```

:::

Dots support **stroke** and **fill** channels in addition to position along
**x** and **y**. Below, color is used as a redundant encoding to emphasize the
rising trend in average global surface temperatures. A _diverging_ color scale
encodes values below zero blue and above zero red.

:::plot defer
https://observablehq.com/@observablehq/plot-diverging-color-scatterplot

```js
Plot.plot({
  y: {
    grid: true,
    tickFormat: "+f",
    label: "Surface temperature anomaly (°F)",
  },
  color: {
    scheme: "BuRd",
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, { x: "Date", y: "Anomaly", stroke: "Anomaly" }),
  ],
});
```

:::

Dots also support an **r** channel allowing dot size to represent quantitative
value. Below, each dot represents a day of trading; the _x_-position represents
the day’s change, while the _y_-position and area (**r**) represent the day’s
trading volume. As you might expect, days with higher volatility have higher
trading volume.

:::plot defer
https://observablehq.com/@observablehq/plot-proportional-symbol-scatterplot

```js
Plot.plot({
  grid: true,
  x: {
    label: "Daily change (%)",
    tickFormat: "+f",
    percent: true,
  },
  y: {
    type: "log",
    label: "Daily trading volume",
  },
  marks: [
    Plot.ruleX([0]),
    Plot.dot(aapl, {
      x: (d) => (d.Close - d.Open) / d.Open,
      y: "Volume",
      r: "Volume",
    }),
  ],
});
```

:::

With the [bin transform](#plot-transforms--bin), sized dots can also be used as
an alternative to a [rect-based](#plot-marks--rect) heatmap to show a
two-dimensional distribution.

:::plot defer
https://observablehq.com/@observablehq/plot-proportional-dot-heatmap

```js
Plot.plot({
  height: 640,
  marginLeft: 60,
  grid: true,
  x: { label: "Carats" },
  y: { label: "Price ($)" },
  r: { range: [0, 20] },
  marks: [
    Plot.dot(
      diamonds,
      Plot.bin({ r: "count" }, { x: "carat", y: "price", thresholds: 100 }),
    ),
  ],
});
```

:::

:::tip For hexagonal binning, use the
[hexbin transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md)
instead of the bin transform. :::

While dots are typically positioned in two dimensions (**x** and **y**),
one-dimensional dots (only **x** or only **y**) are also supported. Below, dot
area is used to represent the frequency of letters in the English language as a
compact alternative to a bar chart.

:::plot https://observablehq.com/@observablehq/plot-dot-area-chart

```js
Plot.dot(alphabet, { x: "letter", r: "frequency" }).plot();
```

:::

Dots, together with [rules](#plot-marks--rule), can be used as a stylistic
alternative to [bars](#plot-marks--bar) to produce a lollipop 🍭 chart. (Sadly
these lollipops cannot be eaten.)

:::plot https://observablehq.com/@observablehq/plot-lollipop

```js
Plot.plot({
  x: { label: null, tickPadding: 6, tickSize: 0 },
  y: { percent: true },
  marks: [
    Plot.ruleX(alphabet, { x: "letter", y: "frequency", strokeWidth: 2 }),
    Plot.dot(alphabet, {
      x: "letter",
      y: "frequency",
      fill: "currentColor",
      r: 4,
    }),
  ],
});
```

:::

A dot may have an ordinal dimension on either **x** and **y**, as in the plot
below comparing the demographics of states: color represents age group, **y**
represents the state, and **x** represents the proportion of the state’s
population in that age group. The
[normalize transform](#plot-transforms--normalize) is used to compute the
relative proportion of each age group within each state, while the
[group transform](#plot-transforms--group) is used to pull out the _min_ and
_max_ values for each state for a horizontal [rule](#plot-marks--rule).

:::plot defer https://observablehq.com/@observablehq/plot-dot-plot

```js
Plot.plot({
  height: 660,
  axis: null,
  grid: true,
  x: {
    axis: "top",
    label: "Population (%)",
    percent: true,
  },
  color: {
    scheme: "spectral",
    domain: stateage.ages, // in age order
    legend: true,
  },
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(
      stateage,
      Plot.groupY({ x1: "min", x2: "max" }, { ...xy, sort: { y: "x1" } }),
    ),
    Plot.dot(stateage, { ...xy, fill: "age", title: "age" }),
    Plot.text(
      stateage,
      Plot.selectMinX({ ...xy, textAnchor: "end", dx: -6, text: "state" }),
    ),
  ],
});
```

:::

```js
xy = Plot.normalizeX("sum", { x: "population", y: "state", z: "state" });
```

:::tip To reduce code duplication, pull shared options out into an object (here
`xy`) and then merge them into each mark’s options using the spread operator
(`...`). :::

To improve accessibility, particularly for readers with color vision deficiency,
the **symbol** channel can be used in addition to color (or instead of it) to
represent ordinal data.

:::plot defer https://observablehq.com/@observablehq/plot-symbol-channel

```js
Plot.plot({
  grid: true,
  x: { label: "Body mass (g)" },
  y: { label: "Flipper length (mm)" },
  symbol: { legend: true },
  marks: [
    Plot.dot(penguins, {
      x: "body_mass_g",
      y: "flipper_length_mm",
      stroke: "species",
      symbol: "species",
    }),
  ],
});
```

:::

Plot uses the following default symbols for filled dots:

:::plot

```js
Plot.dotX([
  "circle",
  "cross",
  "diamond",
  "square",
  "star",
  "triangle",
  "wye",
], { fill: "currentColor", symbol: Plot.identity }).plot();
```

:::

There is a separate set of default symbols for stroked dots:

:::plot

```js
Plot.dotX([
  "circle",
  "plus",
  "times",
  "triangle2",
  "asterisk",
  "square2",
  "diamond2",
], { stroke: "currentColor", symbol: Plot.identity }).plot();
```

:::

:::info The stroked symbols are based on
[Heman Robinson’s research](https://www.tandfonline.com/doi/abs/10.1080/10618600.2019.1637746).
There is also a _hexagon_ symbol; it is primarily intended for the
[hexbin transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md).
You can even specify a D3 or custom symbol type as an object that implements the
[_symbol_.draw(_context_, _size_)](https://d3js.org/d3-shape/symbol#symbolType_draw)
method. :::

The dot mark can be combined with the
[stack transform](#plot-transforms--stack). The diverging stacked dot plot below
shows the age and gender distribution of the U.S. Congress in 2023.

:::plot defer https://observablehq.com/@observablehq/plot-stacked-dots

```js
Plot.plot({
  aspectRatio: 1,
  x: { label: "Age (years)" },
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs,
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name",
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

:::info The stackY2 transform places each dot at the upper bound of the
associated stacked interval, rather than the middle of the interval as when
using stackY. Hence, the first male dot is placed at _y_ = 1, and the first
female dot is placed at _y_ = -1. :::

:::tip The
[dodge transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/dodge.md)
can also be used to produce beeswarm plots; this is particularly effective when
dots have varying radius. :::

Dots are sorted by descending radius by default <VersionBadge version="0.5.0" />
to mitigate occlusion; the smallest dots are drawn on top. Set the **sort**
option to null to draw them in input order. Use the checkbox below to see the
effect of sorting on a bubble map of U.S. county population.

<p>
  <label class="label-input">
    Use default sort:
    <input type="checkbox" v-model="sorted">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-dot-sort

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.4 }),
    Plot.dot(
      counties,
      Plot.geoCentroid({
        r: (d) => d.properties.population,
        fill: "currentColor",
        stroke: "var(--vp-c-bg)",
        strokeWidth: 1,
        sort: sorted ? undefined : null,
      }),
    ),
  ],
});
```

:::

The dot mark can also be used to construct a
[quantile-quantile (QQ) plot](https://observablehq.com/@observablehq/qq-plot)
for comparing two univariate distributions.

<a id="plot-marks--dot--dot-options"></a>

## Dot options

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale
- **r** - the radius (area); bound to the _r_ (radius) scale, which defaults to
  _sqrt_
- **rotate** - the rotation angle in degrees clockwise
- **symbol** - the categorical symbol; bound to the _symbol_ scale
  <VersionBadge version="0.4.0" />

If either of the **x** or **y** channels are not specified, the corresponding
position is controlled by the **frameAnchor** option.

The following dot-specific constant options are also supported:

- **r** - the effective radius (length); a number in pixels
- **rotate** - the rotation angle in degrees clockwise; defaults to 0
- **symbol** - the categorical symbol; defaults to _circle_
  <VersionBadge version="0.4.0" />
- **frameAnchor** - how to position the dot within the frame; defaults to
  _middle_

The **r** option can be specified as either a channel or constant. When the
radius is specified as a number, it is interpreted as a constant; otherwise it
is interpreted as a channel. The radius defaults to 4.5 pixels when using the
**symbol** channel, and otherwise 3 pixels. Dots with a nonpositive radius are
not drawn.

The **stroke** defaults to _none_. The **fill** defaults to _currentColor_ if
the stroke is _none_, and to _none_ otherwise. The **strokeWidth** defaults to
1.5. The **rotate** and **symbol** options can be specified as either channels
or constants. When rotate is specified as a number, it is interpreted as a
constant; otherwise it is interpreted as a channel. When symbol is a valid
symbol name or symbol object (implementing the draw method), it is interpreted
as a constant; otherwise it is interpreted as a channel. If the **symbol**
channel’s values are all symbols, symbol names, or nullish, the channel is
unscaled (values are interpreted literally); otherwise, the channel is bound to
the _symbol_ scale.

<a id="plot-marks--dot--dot"></a>

## dot(_data_, _options_)

```js
Plot.dot(sales, { x: "units", y: "fruit" });
```

Returns a new dot with the given _data_ and _options_. If neither the **x** nor
**y** nor **frameAnchor** options are specified, _data_ is assumed to be an
array of pairs [[_x₀_, _y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that **x** =
[_x₀_, _x₁_, _x₂_, …] and **y** = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--dot--dotX"></a>

## dotX(_data_, _options_)

```js
Plot.dotX(cars.map((d) => d["economy (mpg)"]));
```

Equivalent to [dot](#plot-marks--dot--dot) except that if the **x** option is
not specified, it defaults to the identity function and assumes that _data_ =
[_x₀_, _x₁_, _x₂_, …].

If an **interval** is specified, such as d3.utcDay, **y** is transformed to
(_interval_.floor(_y_) + _interval_.offset(_interval_.floor(_y_))) / 2. If the
interval is specified as a number _n_, _y_ will be the midpoint of two
consecutive multiples of _n_ that bracket _y_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--dot--dotY"></a>

## dotY(_data_, _options_)

```js
Plot.dotY(cars.map((d) => d["economy (mpg)"]));
```

Equivalent to [dot](#plot-marks--dot--dot) except that if the **y** option is
not specified, it defaults to the identity function and assumes that _data_ =
[_y₀_, _y₁_, _y₂_, …].

If an **interval** is specified, such as d3.utcDay, **x** is transformed to
(_interval_.floor(_x_) + _interval_.offset(_interval_.floor(_x_))) / 2. If the
interval is specified as a number _n_, _x_ will be the midpoint of two
consecutive multiples of _n_ that bracket _x_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--dot--circle"></a>

## circle(_data_, _options_) <VersionBadge version="0.5.0" />

Equivalent to [dot](#plot-marks--dot--dot) except that the **symbol** option is
set to _circle_.

<a id="plot-marks--dot--hexagon"></a>

## hexagon(_data_, _options_) <VersionBadge version="0.5.0" />

Equivalent to [dot](#plot-marks--dot--dot) except that the **symbol** option is
set to _hexagon_.

---

<a id="plot-marks--frame"></a>

# marks/frame.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/frame.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const framed = ref(true);

const faithful = shallowRef([]);

onMounted(() => {
  d3.tsv("../data/faithful.tsv", d3.autoType).then((data) => (faithful.value = data));
});

</script>

<a id="plot-marks--frame--frame-mark"></a>

# Frame mark

The **frame mark** draws a rectangle around the plot area.

:::plot

```js
Plot.frame().plot({ x: { domain: [0, 1], grid: true } });
```

:::

Frames are most commonly used in conjunction with facets to provide better
separation (Gestalt grouping) of faceted marks. Without a frame, it can be hard
to tell where one facet ends and the next begins.

<p>
  <label class="label-input">
    Show frame:
    <input type="checkbox" v-model="framed">
  </label>
</p>

:::plot

```js
Plot.plot({
  grid: true,
  inset: 10,
  marks: [
    framed ? Plot.frame() : null,
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "#eee",
    }),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "species",
    }),
  ],
});
```

:::

Unlike most marks, a frame never takes _data_; the first argument to
[frame](#plot-marks--frame--frame) is the _options_ object. (For data-driven
rectangles, see the [rect mark](#plot-marks--rect).)

:::plot

```js
Plot.frame({ stroke: "red" }).plot({ x: { domain: [0, 1], grid: true } });
```

:::

While options are often specified in literal values, such as
<span style="border-bottom: solid 2px var(--vp-c-red);">_red_</span> above, the
standard [mark channels](#plot-features--marks--mark-options) such as **fill**
and **stroke** can also be specified as abstract values. For example, in the
density heatmap below comparing the delay between eruptions of the Old Faithful
geyser (_waiting_) in _x_→ and the duration of the eruption (_eruptions_) in
_y_↑, both in minutes, we fill the frame with
<span :style="{borderBottom: `solid 2px ${d3.interpolateTurbo(0)}`}">black</span>
representing zero density.

:::plot defer

```js
Plot.plot({
  inset: 30,
  marks: [
    Plot.frame({ fill: 0 }),
    Plot.density(faithful, { x: "waiting", y: "eruptions", fill: "density" }),
  ],
});
```

:::

:::tip This is equivalent to a [rect](#plot-marks--rect):
`Plot.rect({length: 1}, {fill: 0})`. :::

You can also place a frame on a specific facet using the **fx** or **fy**
option. Below, a frame emphasizes the _Gentoo_ facet, say to draw attention to
how much bigger they are. 🐧

:::plot

```js
Plot.plot({
  marginLeft: 80,
  inset: 10,
  marks: [
    Plot.frame({ fy: "Gentoo" }),
    Plot.dot(penguins, { x: "body_mass_g", fy: "species" }),
  ],
});
```

:::

:::tip Or: `Plot.rect({length: 1}, {fy: ["Gentoo"], stroke: "currentColor"})`.
:::

The **anchor** option <VersionBadge version="0.6.3" />, if specified to a value
of _left_, _right_, _top_ or _bottom_, draws only that side of the frame. In
that case, the **fill** and **rx**, **ry** options are ignored.

:::plot

```js
Plot.plot({
  x: {
    domain: [0, 1],
    grid: true,
  },
  marks: [
    Plot.frame({ stroke: "red", anchor: "bottom" }),
  ],
});
```

:::

<a id="plot-marks--frame--frame-options"></a>

## Frame options

The frame mark supports the
[standard mark options](#plot-features--marks--mark-options), including
[insets](#plot-features--marks--insets) and
[rounded corners](#plot-features--marks--rounded-corners). It does not accept
any data. The default **stroke** is _currentColor_, and the default **fill** is
_none_.

If the **anchor** option is specified as one of _left_, _right_, _top_, or
_bottom_, that side is rendered as a single line (and the **fill**,
**fillOpacity**, **rx**, and **ry** options are ignored).

<a id="plot-marks--frame--frame"></a>

## frame(_options_)

```js
Plot.frame({ stroke: "red" });
```

Returns a new frame mark with the specified _options_.

---

<a id="plot-marks--geo"></a>

# marks/geo.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/geo.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";

const us = shallowRef(null);
const earthquakes = shallowRef([]);
const walmarts = shallowRef({type: "FeatureCollection", features: []});
const world = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const states = computed(() => us.value ? topojson.feature(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties) : {type: null});
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});

onMounted(() => {
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then((data) => (earthquakes.value = data));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = {type: "FeatureCollection", features: data.map((d) => ({type: "Feature", properties: {date: d.date}, geometry: {type: "Point", coordinates: [d.longitude, d.latitude]}}))}));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-unemployment.csv")
  ]).then(([_us, _unemployment]) => {
    const map = new Map(_unemployment.map((d) => [d.id, +d.rate]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.unemployment = map.get(g.id)));
    us.value = _us;
  });
});

</script>

<a id="plot-marks--geo--geo-mark"></a>

# Geo mark <VersionBadge version="0.6.1" />

The **geo mark** draws geographic features — polygons, lines, points, and other
geometry — often as thematic maps. It works with Plot’s
[projection system](#plot-features--projections). For example, the
[choropleth map](https://en.wikipedia.org/wiki/Choropleth_map) below shows
unemployment by county in the United States.

:::plot defer https://observablehq.com/@observablehq/plot-us-choropleth

```js
Plot.plot({
  projection: "albers-usa",
  color: {
    type: "quantile",
    n: 9,
    scheme: "blues",
    label: "Unemployment (%)",
    legend: true,
  },
  marks: [
    Plot.geo(counties, {
      fill: "unemployment",
      title: (d) => `${d.properties.name} ${d.properties.unemployment}%`,
      tip: true,
    }),
  ],
});
```

:::

A geo mark’s data is typically [GeoJSON](https://geojson.org/). You can pass a
single GeoJSON object, a feature or geometry collection, or an array or iterable
of GeoJSON objects; Plot automatically normalizes these into an array of
features or geometries. When a mark’s data is GeoJSON, Plot will look for the
specified field name (such as _unemployment_ above, for **fill**) in the GeoJSON
object’s `properties` if the object does not have this property directly.
<VersionBadge version="0.6.16" pr="2092" />

The size of Point and MultiPoint geometries is controlled by the **r** option.
For example, below we show earthquakes in the last seven days with a magnitude
of 2.5 or higher as reported by the
[USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). As with
the [dot mark](#plot-marks--dot), the effective radius is controlled by the _r_
scale, which is by default a _sqrt_ scale such that the area of a point is
proportional to its value. And likewise point geometries are by default sorted
by descending radius to reduce occlusion, drawing the smallest circles on top.
Set the **sort** option to null to use input order instead.

:::plot defer https://observablehq.com/@observablehq/plot-live-earthquake-map

```js
Plot.plot({
  projection: "equirectangular",
  r: { transform: (r) => Math.pow(10, r) }, // Richter to amplitude
  marks: [
    Plot.geo(land, { fill: "currentColor", fillOpacity: 0.2 }),
    Plot.sphere(),
    Plot.geo(earthquakes, {
      r: "mag",
      fill: "red",
      fillOpacity: 0.2,
      stroke: "red",
      title: "title",
      href: "url",
      target: "_blank",
    }),
  ],
});
```

:::

:::tip Click on any of the earthquakes above to see details. :::

The [graticule](#plot-marks--geo--graticule) helper draws a uniform grid of
meridians (lines of constant longitude) and parallels (lines of constant
latitude) every 10° between ±80° latitude; for the polar regions, meridians are
drawn every 90°. The [sphere](#plot-marks--geo--sphere) helper draws the outline
of the projected sphere.

:::plot https://observablehq.com/@observablehq/plot-sphere-and-graticule

```js
Plot.plot({
  inset: 2,
  projection: { type: "orthographic", rotate: [0, -30, 20] },
  marks: [
    Plot.sphere({ fill: "var(--vp-c-bg-alt)", stroke: "currentColor" }),
    Plot.graticule({ strokeOpacity: 0.3 }),
  ],
});
```

:::

The geo mark’s **geometry** channel can be used to generate geometry from a
non-GeoJSON data source. For example, below we visualize the shockwave created
by the explosion of the
[Hunga Tonga–Hunga Haʻapai volcano](https://en.wikipedia.org/wiki/2021–22_Hunga_Tonga–Hunga_Haʻapai_eruption_and_tsunami)
on January 15, 2022 with a series of geodesic circles of increasing radius.

:::plot defer https://observablehq.com/@observablehq/plot-shockwave

```js
Plot.plot({
  projection: {
    type: "equal-earth",
    rotate: [90, 0],
  },
  color: {
    legend: true,
    label: "Distance from Tonga (km)",
    transform: (d) => 111.2 * d, // degrees to km
    zero: true,
  },
  marks: [
    Plot.geo(land),
    Plot.geo([0.5, 179.5].concat(d3.range(10, 171, 10)), {
      geometry: d3.geoCircle().center([-175.38, -20.57]).radius((r) => r),
      stroke: (r) => r,
      strokeWidth: 2,
    }),
    Plot.sphere(),
  ],
});
```

:::

By default, the geo mark doesn’t have **x** and **y** channels; when you use the
[**tip** option](https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tip.md),
the [centroid transform](#plot-transforms--centroid) is implicitly applied on
the geometries to compute the tip position by generating **x** and **y**
channels. <VersionBadge version="0.6.16" pr="2088" /> You can alternatively
specify these channels explicitly. The centroids are shown below in red.

:::plot defer https://observablehq.com/@observablehq/plot-state-centroids

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { strokeOpacity: 0.1, tip: true, title: "name" }),
    Plot.geo(nation),
    Plot.dot(
      states,
      Plot.centroid({ fill: "red", stroke: "var(--vp-c-bg-alt)" }),
    ),
  ],
});
```

:::

The geo mark supports [faceting](#plot-features--facets). Below, a comic strip
of sorts shows the locations of Walmart store openings in past decades.

:::plot defer https://observablehq.com/@observablehq/plot-map-large-multiples

```js
Plot.plot({
  margin: 0,
  padding: 0,
  projection: "albers",
  fy: { interval: "10 years" },
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.2 }),
    Plot.geo(nation),
    Plot.geo(walmarts, {
      fy: "date",
      r: 1.5,
      fill: "blue",
      tip: true,
      title: "date",
    }),
    Plot.axisFy({
      frameAnchor: "top",
      dy: 30,
      tickFormat: (d) => `${d.getUTCFullYear()}’s`,
    }),
  ],
});
```

:::

:::info This uses the
[**interval** scale option](#plot-features--scales--scale-transforms) to bin
temporal data into facets by decade. :::

Lastly, the geo mark is not limited to spherical geometries!
[Plot’s projection system](#plot-features--projections) includes planar
projections, which allow you to work with shapes — such as contours — generated
on an arbitrary flat surface.

<a id="plot-marks--geo--geo-options"></a>

## Geo options

The **geometry** channel specifies the geometry (GeoJSON object) to draw; if not
specified, the mark’s _data_ is assumed to be GeoJSON.

In addition to the [standard mark options](#plot-features--marks--mark-options),
the **r** option controls the size of Point and MultiPoint geometries. It can be
specified as either a channel or constant. When **r** is specified as a number,
it is interpreted as a constant radius in pixels; otherwise it is interpreted as
a channel and the effective radius is controlled by the _r_ scale. If the **r**
option is not specified it defaults to 3 pixels. Geometries with a nonpositive
radius are not drawn. If **r** is a channel, geometries will be sorted by
descending radius by default.

The **x** and **y** position channels may also be specified in conjunction with
the **tip** option. <VersionBadge version="0.6.16" pr="2088" /> These are bound
to the _x_ and _y_ scale (or projection), respectively.

<a id="plot-marks--geo--geo"></a>

## geo(_data_, _options_)

```js
Plot.geo(counties, { fill: "rate" });
```

Returns a new geo mark with the given _data_ and _options_. If _data_ is a
GeoJSON feature collection, then the mark’s data is _data_.features; if _data_
is a GeoJSON geometry collection, then the mark’s data is _data_.geometries; if
_data_ is some other GeoJSON object, then the mark’s data is the single-element
array [_data_]. If the **geometry** option is not specified, _data_ is assumed
to be a GeoJSON object or an iterable of GeoJSON objects.

<a id="plot-marks--geo--sphere"></a>

## sphere(_options_) <VersionBadge version="0.6.1" />

```js
Plot.sphere();
```

Returns a new geo mark with a _Sphere_ geometry object and the given _options_.

<a id="plot-marks--geo--graticule"></a>

## graticule(_options_) <VersionBadge version="0.6.1" />

```js
Plot.graticule();
```

Returns a new geo mark with a
[10° global graticule](https://d3js.org/d3-geo/shape#geoGraticule10) geometry
object and the given _options_.

---

<a id="plot-marks--grid"></a>

# marks/grid.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/grid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import alphabet from "../data/alphabet.ts";

const atop = ref(true);

</script>

<a id="plot-marks--grid--grid-mark"></a>

# Grid mark <VersionBadge version="0.6.3" />

The **grid mark** is a specially-configured [rule](#plot-marks--rule) for
drawing an axis-aligned grid. Like the [axis mark](#plot-marks--axis), a grid
mark is automatically generated by Plot when you use the **grid** scale option.
But you can also declare a grid mark explicitly, for example to draw grid lines
atop rather than below bars.

<p>
  <label class="label-input">
    Show grid on top:
    <input type="checkbox" v-model="atop">
  </label>
</p>

:::plot

```js
Plot.plot({
  x: { axis: "top", percent: true, grid: !atop },
  marks: [
    Plot.barX(alphabet, { x: "frequency", y: "letter", sort: { y: "width" } }),
    atop
      ? Plot.gridX({
        interval: 1,
        stroke: "var(--vp-c-bg)",
        strokeOpacity: 0.5,
      })
      : null,
    Plot.ruleX([0]),
  ],
});
```

:::

The **interval** option above instructs the grid lines to be drawn at unit
intervals, _i.e._ whole percentages. As an alternative, you can use the
**ticks** option to specify the desired number of ticks or the **tickSpacing**
option to specify the desired separation between adjacent ticks in pixels.

:::plot

```js
Plot.gridX().plot({ x: { type: "linear" } });
```

:::

The color of the grid lines can be controlled with the **stroke** option (or the
alias **color**). While this option is are typically set to a constant color
(such as _red_ or the default _currentColor_), it can be specified as a channel
to assign colors dynamically based on the associated tick value.

:::plot

```js
Plot.gridX(d3.range(101), { stroke: Plot.identity, strokeOpacity: 1 }).plot();
```

:::

You can set other [stroke options](#plot-features--marks--mark-options) to
further customize the appearance, say for dashed strokes.

:::plot

```js
Plot.gridX({ strokeDasharray: "2", strokeOpacity: 1 }).plot({
  x: { type: "linear" },
});
```

:::

See the [axis mark](#plot-marks--axis) for more details and examples.

<a id="plot-marks--grid--grid-options"></a>

## Grid options

The optional _data_ is an array of tick values — it defaults to the scale’s
ticks. The grid mark draws a line for each tick value, across the whole frame.

The following options are supported:

- **strokeDasharray** - the
  [stroke dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
  for dashed lines, defaults to null

The following options are supported as constant or data-driven channels:

- **stroke** - the grid color, defaults to _currentColor_
- **strokeWidth** - the grid’s line width, defaults to 1
- **strokeOpacity** - the stroke opacity, defaults to 0.1
- **y1** - the start of the line, a channel of _y_ positions
- **y2** - the end of the line, a channel of _y_ positions

All the other common options are supported when applicable (_e.g._, **title**).

<a id="plot-marks--grid--gridX"></a>

## gridX(_data_, _options_)

```js
Plot.gridX({ strokeDasharray: "5,3" });
```

Returns a new _x_ grid with the given _options_.

<a id="plot-marks--grid--gridY"></a>

## gridY(_data_, _options_)

```js
Plot.gridY({ strokeDasharray: "5,3" });
```

Returns a new _y_ grid with the given _options_.

<a id="plot-marks--grid--gridFx"></a>

## gridFx(_data_, _options_)

```js
Plot.gridFx({ strokeDasharray: "5,3" });
```

Returns a new _fx_ grid with the given _options_.

<a id="plot-marks--grid--gridFy"></a>

## gridFy(_data_, _options_)

```js
Plot.gridFy({ strokeDasharray: "5,3" });
```

Returns a new _fy_ grid with the given _options_.

---

<a id="plot-marks--hexgrid"></a>

# marks/hexgrid.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/hexgrid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import penguins from "../data/penguins.ts";

</script>

<a id="plot-marks--hexgrid--hexgrid-mark"></a>

# Hexgrid mark <VersionBadge version="0.5.0" />

The **hexgrid mark** draws a hexagonal grid spanning the frame. It can be used
with the
[hexbin transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md)
to show how points are binned. The **binWidth** option specifies the distance
between centers of neighboring hexagons in pixels; it defaults to 20, matching
the hexbin transform.

:::plot https://observablehq.com/@observablehq/plot-hexgrid-example

```js
Plot.plot({
  marks: [
    Plot.hexgrid(),
    Plot.dot(
      penguins,
      Plot.hexbin({ r: "count" }, {
        x: "culmen_length_mm",
        y: "culmen_depth_mm",
        fill: "currentColor",
      }),
    ),
  ],
});
```

:::

<a id="plot-marks--hexgrid--hexgrid-options"></a>

## Hexgrid options

The hexgrid mark supports the
[standard mark options](#plot-features--marks--mark-options). It does not accept
any data or support channels. The default **stroke** is _currentColor_, the
default **strokeOpacity** is 0.1, and the default **clip** is true. The
**binWidth** defaults to 20, matching the
[hexbin transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md).
The **fill** option is not supported, but a [frame mark](#plot-marks--frame) can
be used to the same effect.

<a id="plot-marks--hexgrid--hexgrid"></a>

## hexgrid(_options_)

```js
Plot.hexgrid({ stroke: "red" });
```

Returns a new hexgrid mark with the specified _options_.

---

<a id="plot-marks--image"></a>

# marks/image.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/image.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const presidents = shallowRef([]);

onMounted(() => {
  d3.csv("../data/us-president-favorability.csv", d3.autoType).then((data) => (presidents.value = data));
});

</script>

<a id="plot-marks--image--image-mark"></a>

# Image mark <VersionBadge version="0.3.0" />

The **image mark** draws images centered at the given position in **x** and
**y**. It is often used to construct scatterplots in place of a
[dot mark](#plot-marks--dot). For example, the chart below, based on one by
[Robert Lesser](https://observablehq.com/@rlesser/when-presidents-fade-away),
shows the favorability of U.S. presidents over time alongside their portraits.

:::plot defer https://observablehq.com/@observablehq/plot-image-scatterplot

```js
Plot.plot({
  inset: 20,
  x: { label: "First inauguration date" },
  y: { grid: true, label: "Net favorability (%)", tickFormat: "+f" },
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) =>
        d["Very Favorable %"] + d["Somewhat Favorable %"] -
        d["Very Unfavorable %"] - d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      width: 40,
      title: "Name",
    }),
  ],
});
```

:::

Images are drawn in input order by default. This dataset is ordered
chronologically, and hence above the more recent presidents are drawn on top.
You can change the order with the [sort transform](#plot-transforms--sort).

With the **r** option, images will be clipped to circles of the given radius.
Use the
[**preserveAspectRatio** option](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)
to control which part of the image appears within the circle; below, we favor
the top part of the image to show the presidential head.

:::plot defer https://observablehq.com/@observablehq/plot-image-medals

```js
Plot.plot({
  x: { inset: 20, label: "First inauguration date" },
  y: { insetTop: 4, grid: true, label: "Any opinion (%)", tickFormat: "+f" },
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) =>
        d["Very Favorable %"] + d["Somewhat Favorable %"] +
        d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      r: 20,
      preserveAspectRatio: "xMidYMin slice",
      title: "Name",
    }),
  ],
});
```

:::

:::tip You can also use the **r** channel as a size encoding, and the **rotate**
channel, as with dots. :::

The **r** option works well with the
[dodge transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/dodge.md)
for an image beeswarm plot. This chart isn’t particularly interesting because
new presidents are inaugurated at a fairly consistent rate, but at least it
avoids overlapping portraits.

:::plot defer https://observablehq.com/@observablehq/plot-image-dodge

```js
Plot.plot({
  inset: 20,
  height: 280,
  marks: [
    Plot.image(
      presidents,
      Plot.dodgeY({
        x: "First Inauguration Date",
        r: 20, // clip to a circle
        preserveAspectRatio: "xMidYMin slice", // try not to clip heads
        src: "Portrait URL",
        title: "Name",
      }),
    ),
  ],
});
```

:::

The default size of an image is only 16×16 pixels. This may be acceptable if the
image is a small glyph, such as a categorical symbol in a scatterplot. But often
you will want to set **width**, **height**, or **r** to increase the image size.

:::plot defer https://observablehq.com/@observablehq/plot-image-scatterplot-2

```js
Plot.plot({
  aspectRatio: 1,
  grid: true,
  x: { label: "Favorable opinion (%)" },
  y: { label: "Unfavorable opinion (%)" },
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX([0]),
    Plot.image(presidents, {
      x: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"],
      y: (d) => d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      title: "Name",
    }),
  ],
});
```

:::

If — _for reasons_ — you want to style the plot with a background image, you can
do that using the top-level **style** option rather than an image mark. Below,
Kristen Gorman’s penguins dataset is visualized atop her photograph of sea ice
near Palmer Station on the Antarctic peninsula, where she collected the
measurements.

:::plot defer https://observablehq.com/@observablehq/plot-background-image

```js
Plot.plot({
  margin: 30,
  inset: 10,
  grid: true,
  style: {
    padding: "10px",
    color: "black",
    background: "url(../sea-ice.jpg)",
    backgroundSize: "cover",
  },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "white",
      stroke: "black",
    }),
  ],
});
```

:::

<a id="plot-marks--image--image-options"></a>

## Image options

The required **src** option specifies the URL (or relative path) of each image.
If **src** is specified as a string that starts with a dot, slash, or URL
protocol (_e.g._, “https:”) it is assumed to be a constant; otherwise it is
interpreted as a channel.

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale
- **width** - the image width (in pixels)
- **height** - the image height (in pixels)
- **r** - the image radius; bound to the _r_ scale
  <VersionBadge version="0.6.6" />
- **rotate** - the rotation angle in degrees clockwise
  <VersionBadge version="0.6.6" />

If either of the **x** or **y** channels are not specified, the corresponding
position is controlled by the **frameAnchor** option.

The **width** and **height** options default to 16 pixels (unless **r** is
specified) and can be specified as either a channel or constant. When the width
or height is specified as a number, it is interpreted as a constant; otherwise
it is interpreted as a channel. Images with a nonpositive width or height are
not drawn. If a **width** is specified but not a **height**, or vice versa, the
one defaults to the other. Images do not support either a fill or a stroke.

The **r** option, if not null (the default), enables circular clipping; it may
be specified as a constant in pixels or a channel. Use the
**preserveAspectRatio** option to control which part of the image is clipped.
Also defaults the **width** and **height** to twice the effective radius.

The following image-specific constant options are also supported:

- **frameAnchor** - how to position the image within the frame; defaults to
  _middle_
- **preserveAspectRatio** - the
  [aspect ratio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio);
  defaults to _xMidYMid meet_
- **crossOrigin** - the
  [cross-origin](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/crossorigin)
  behavior
- **imageRendering** - the
  [image-rendering attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/image-rendering);
  defaults to _auto_ (bilinear) <VersionBadge version="0.6.4" />

To crop the image instead of scaling it to fit, set **preserveAspectRatio** to
_xMidYMid slice_. The **imageRendering** option may be set to _pixelated_ to
disable bilinear interpolation on enlarged images; however, note that this is
not supported in WebKit.

Images are drawn in input order, with the last data drawn on top. If sorting is
needed, say to mitigate overplotting, consider a
[sort transform](#plot-transforms--sort).

<a id="plot-marks--image--image"></a>

## image(_data_, _options_)

```js
Plot.image(presidents, {
  x: "inauguration",
  y: "favorability",
  src: "portrait",
});
```

Returns a new image with the given _data_ and _options_. If neither the **x**
nor **y** nor **frameAnchor** options are specified, _data_ is assumed to be an
array of pairs [[_x₀_, _y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that **x** =
[_x₀_, _x₁_, _x₂_, …] and **y** = [_y₀_, _y₁_, _y₂_, …].

---

<a id="plot-marks--line"></a>

# marks/line.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/line.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import driving from "../data/driving.ts";
import sftemp from "../data/sf-temperatures.ts";
import tdf from "../data/tdf.ts";

const beagle = shallowRef([]);
const bls = shallowRef([]);
const stateage = shallowRef([]);
const stocks = shallowRef([]);
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});

onMounted(() => {
  d3.text("../data/beagle.csv").then((text) => (beagle.value = d3.csvParseRows(text).map(d3.autoType)));
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
  Promise.all([
    d3.csv("../data/amzn.csv", d3.autoType),
    d3.csv("../data/goog.csv", d3.autoType),
    d3.csv("../data/ibm.csv", d3.autoType)
  ]).then((datas) => {
    stocks.value = d3.zip(["AAPL", "AMZN", "GOOG", "IBM"], [aapl].concat(datas)).flatMap(([Symbol, data]) => data.map((d) => ({Symbol, ...d})));
  });
});

</script>

<a id="plot-marks--line--line-mark"></a>

# Line mark

The **line mark** draws two-dimensional lines as in a line chart. Because the
line mark interpolates between adjacent data points, typically both the _x_ and
_y_ scales are quantitative or temporal. For example, below is a line chart of
the closing price of Apple stock.

:::plot https://observablehq.com/@observablehq/plot-simple-line-chart

```js
Plot.line(aapl, { x: "Date", y: "Close" }).plot({ y: { grid: true } });
```

:::

If the **x** and **y** options are not defined, the line mark assumes that the
data is an iterable of points [[_x₁_, _y₁_], [_x₂_, _y₂_], …], allowing for
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md).

:::plot https://observablehq.com/@observablehq/plot-shorthand-line-chart

```js
Plot.line(aapl.map((d) => [d.Date, d.Close])).plot();
```

:::

:::tip This shorthand loses the automatic _x_- and _y_-axis labels, reducing
legibility. Use the **label** [scale option](#plot-features--scales) to restore
them. :::

The [lineY constructor](#plot-marks--line--lineY) provides default channel
definitions of **x** = index and **y** =
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity),
letting you pass an array of numbers as data. The
[lineX constructor](#plot-marks--line--lineX) similarly provides **x** =
identity and **y** = index defaults for lines that go up↑ instead of to the
right→. Below, a random walk is made using
[d3.cumsum](https://observablehq.com/@d3/d3-cumsum?collection=@d3/d3-array) and
[d3.randomNormal](https://observablehq.com/@d3/d3-random?collection=@d3/d3-random).

:::plot defer https://observablehq.com/@observablehq/plot-shorthand-liney

```js
Plot.lineY(d3.cumsum({ length: 600 }, d3.randomNormal())).plot();
```

:::

As with [areas](#plot-marks--area), points in lines are connected in input
order: the first point is connected to the second point, the second is connected
to the third, and so on. Line data is typically in chronological order. Unsorted
data may produce gibberish.

:::plot defer https://observablehq.com/@observablehq/plot-line-sort

```js
Plot.lineY(d3.shuffle(aapl.slice()), { x: "Date", y: "Close" }).plot(); // 🌶️
```

:::

If your data isn’t sorted, use the [sort transform](#plot-transforms--sort).

:::plot defer https://observablehq.com/@observablehq/plot-line-sort

```js
Plot.lineY(d3.shuffle(aapl.slice()), { x: "Date", y: "Close", sort: "Date" })
  .plot();
```

:::

While the _x_ scale of a line chart often represents time, this is not required.
For example, we can plot the elevation profile of a Tour de France stage — and
imagine how tiring it must be to start a climb after riding 160km! ⛰🚴💦

:::plot defer
https://observablehq.com/@observablehq/plot-tour-de-france-elevation-profile

```js
Plot.plot({
  x: {
    label: "Distance from stage start (km)",
  },
  y: {
    label: "Elevation (m)",
    grid: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(tdf, { x: "distance", y: "elevation" }),
  ],
});
```

:::

There is no requirement that **y** be dependent on **x**; lines can be used in
connected scatterplots to show two independent (but often correlated) variables.
(See also [phase plots](https://en.wikipedia.org/wiki/Phase_portrait).) The
chart below recreates Hannah Fairfield’s
[“Driving Shifts Into Reverse”](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html)
from 2009.

:::plot defer https://observablehq.com/@observablehq/plot-connected-scatterplot

```js
Plot.plot({
  inset: 10,
  grid: true,
  x: { label: "Miles driven (per person-year)" },
  y: { label: "Cost of gasoline ($ per gallon)" },
  marks: [
    Plot.line(driving, {
      x: "miles",
      y: "gas",
      curve: "catmull-rom",
      marker: true,
    }),
    Plot.text(driving, {
      filter: (d) => d.year % 5 === 0,
      x: "miles",
      y: "gas",
      text: (d) => `${d.year}`,
      dy: -8,
    }),
  ],
});
```

:::

To draw multiple lines, use the **z** channel to group
[tidy data](https://r4ds.had.co.nz/tidy-data.html) into series. For example, the
chart below shows unemployment rates of various metro areas from the Bureau of
Labor Statistics; the **z** value is the metro division name.

:::plot defer https://observablehq.com/@observablehq/plot-multiple-line-chart

```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)",
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, { x: "date", y: "unemployment", z: "division" }),
  ],
});
```

:::

:::tip If your data is not tidy, you can use
[_array_.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
to pivot. :::

<!-- Below, we load additional CSV files for other stocks to compare their performance. -->

If a **stroke** (or **fill**) channel is specified, the **z** option defaults to
the same, automatically grouping series. For this reason, both **stroke** and
**z** are typically ordinal or categorical.

:::plot defer https://observablehq.com/@observablehq/plot-index-chart

```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (x) => f((x - 1) * 100))(d3.format("+d")),
  },
  marks: [
    Plot.ruleY([1]),
    Plot.line(
      stocks,
      Plot.normalizeY({
        x: "Date",
        y: "Close",
        stroke: "Symbol",
      }),
    ),
    Plot.text(
      stocks,
      Plot.selectLast(Plot.normalizeY({
        x: "Date",
        y: "Close",
        z: "Symbol",
        text: "Symbol",
        textAnchor: "start",
        dx: 3,
      })),
    ),
  ],
});
```

:::

:::info Here the [normalize transform](#plot-transforms--normalize) normalizes
each time series (**z**) relative to its initial value, while the
[select transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/select.md)
extracts the last point for labeling. A custom tick format converts multiples to
percentage change (_e.g._, 1.6× = +60%). :::

Varying-color lines are supported. If the **stroke** value varies within series,
the line will be segmented by color. (The same behavior applies to other
channels, such as **strokeWidth** and **title**.) Specifying the **z** channel
(say to null for a single series) is recommended.

:::plot defer https://observablehq.com/@observablehq/plot-varying-stroke-line

```js
Plot.plot({
  x: {
    label: null,
  },
  y: {
    grid: true,
    label: "Unemployment (%)",
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      stroke: "unemployment",
    }),
  ],
});
```

:::

Color encodings can also be used to highlight specific series, such as here to
emphasize high unemployment in Michigan.

:::plot defer
https://observablehq.com/@observablehq/plot-multiple-line-highlight

```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)",
  },
  color: {
    domain: [false, true],
    range: ["#ccc", "red"],
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      stroke: (d) => /, MI /.test(d.division),
      sort: { channel: "stroke" },
    }),
  ],
});
```

:::

When using **z**, lines are drawn in input order. The
[sort transform](#plot-transforms--sort) above places the red lines on top of
the gray ones to improve readability.

As an alternative to **z**, you can render multiple lines using multiple marks.
While more verbose, this allows you to choose different options for each line.
For example, below we plot the a 14-day moving average of the daily highs and
lows in temperate San Francisco using the
[window transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/window.md).

:::plot defer https://observablehq.com/@observablehq/plot-moving-average-line

```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)",
  },
  marks: [
    Plot.line(
      sftemp,
      Plot.windowY(14, { x: "date", y: "low", stroke: "#4e79a7" }),
    ),
    Plot.line(
      sftemp,
      Plot.windowY(14, { x: "date", y: "high", stroke: "#e15759" }),
    ),
    Plot.ruleY([32]), // freezing
  ],
});
```

:::

If some channel values are undefined (or null or NaN), gaps will appear between
adjacent points. To demonstrate, below we set the **y** value to NaN for the
first three months of each year.

:::plot defer https://observablehq.com/@observablehq/plot-line-chart-with-gaps

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.lineY(aapl, {
      x: "Date",
      y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close,
    }),
  ],
});
```

:::

Supplying undefined values is not the same as filtering the data: the latter
will interpolate between the data points. Observe the conspicuous straight lines
below!

:::plot defer https://observablehq.com/@observablehq/plot-line-chart-with-gaps

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.lineY(aapl, {
      filter: (d) => d.Date.getUTCMonth() >= 3,
      x: "Date",
      y: "Close",
      strokeOpacity: 0.3,
    }),
    Plot.lineY(aapl, {
      x: "Date",
      y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close,
    }),
  ],
});
```

:::

While uncommon, you can draw a line with ordinal position values. For example
below, each line represents a U.S. state; **x** represents an (ordinal) age
group while **y** represents the proportion of the state’s population in that
age group. This chart emphasizes the overall age distribution of the United
States, while giving a hint to variation across states.

:::plot defer https://observablehq.com/@observablehq/plot-ordinal-line

```js
Plot.plot({
  x: {
    domain: stateage.ages, // in age order
    label: "Age range (years)",
    labelAnchor: "right",
    labelArrow: true,
  },
  y: {
    label: "Population (%)",
    percent: true,
    grid: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(
      stateage,
      Plot.normalizeY("sum", {
        x: "age",
        y: "population",
        z: "state",
        strokeWidth: 1,
      }),
    ),
  ],
});
```

:::

With a [spherical projection](#plot-features--projections), line segments become
[geodesics](https://en.wikipedia.org/wiki/Great-circle_distance), taking the
shortest path between two points on the sphere and wrapping around the
antimeridian at 180° longitude. The line below shows Charles Darwin’s voyage on
HMS _Beagle_. (Data via
[Benjamin Schmidt](https://observablehq.com/@bmschmidt/data-driven-projections-darwins-world).)

:::plot defer https://observablehq.com/@observablehq/plot-spherical-line

```js
Plot.plot({
  projection: "equirectangular",
  marks: [
    Plot.geo(land), // MultiPolygon
    Plot.line(beagle, { stroke: "red" }), // [[lon, lat], …]
    Plot.geo({ type: "Point", coordinates: [-0.13, 51.5] }, { fill: "red" }), // London
  ],
});
```

:::

:::tip Disable spherical interpolation by setting the **curve** option to
_linear_ instead of the default _auto_. :::

A projected line can use varying color, too. Below, color reveals the westward
direction of the Beagle’s journey around the world, starting and ending in
London.

:::plot defer
https://observablehq.com/@observablehq/plot-spherical-line-with-a-varying-stroke

```js
Plot.plot({
  projection: "equirectangular",
  marks: [
    Plot.geo(land),
    Plot.line(beagle, { stroke: (d, i) => i, z: null }),
  ],
});
```

:::

:::info Setting **z** to null forces a single line; we want the **stroke** to
vary within the line instead of producing a separate line for each color. :::

Interpolation is controlled by the [**curve** option](#plot-features--curves).
The default curve is _linear_, which draws straight line segments between pairs
of adjacent points. A _step_ curve is nice for emphasizing when the value
changes, while _basis_ and _catmull–rom_ are nice for smoothing.

<a id="plot-marks--line--line-options"></a>

## Line options

The following channels are required:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **z** - a categorical value to group data into series

By default, the data is assumed to represent a single series (a single value
that varies over time, _e.g._). If the **z** channel is specified, data is
grouped by **z** to form separate series. Typically **z** is a categorical value
such as a series name. If **z** is not specified, it defaults to **stroke** if a
channel, or **fill** if a channel.

The **fill** defaults to _none_. The **stroke** defaults to _currentColor_ if
the fill is _none_, and to _none_ otherwise. If the stroke is defined as a
channel, the line will be broken into contiguous overlapping segments when the
stroke color changes; the stroke color will apply to the interval spanning the
current data point and the following data point. This behavior also applies to
the **fill**, **fillOpacity**, **strokeOpacity**, **strokeWidth**, **opacity**,
**href**, **title**, and **ariaLabel** channels. When any of these channels are
used, setting an explicit **z** channel (possibly to null) is strongly
recommended. The **strokeWidth** defaults to 1.5, the **strokeLinecap** and
**strokeLinejoin** default to _round_, and the **strokeMiterlimit** defaults
to 1.

Points along the line are connected in input order. Likewise, if there are
multiple series via the **z**, **fill**, or **stroke** channel, the series are
drawn in input order such that the last series is drawn on top. Typically, the
data is already in sorted order, such as chronological for time series; if
sorting is needed, consider a [sort transform](#plot-transforms--sort).

The line mark supports [curve options](#plot-features--curves) to control
interpolation between points, and
[marker options](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md)
to add a marker (such as a dot or an arrowhead) on each of the control points.
The default curve is _auto_, which is equivalent to _linear_ if there is no
[projection](#plot-features--projections), and otherwise uses the associated
projection. If any of the **x** or **y** values are invalid (undefined, null, or
NaN), the line will be interrupted, resulting in a break that divides the line
shape into multiple segments. (See
[d3-shape’s _line_.defined](https://d3js.org/d3-shape/line#line_defined) for
more.) If a line segment consists of only a single point, it may appear
invisible unless rendered with rounded or square line caps. In addition, some
curves such as _cardinal-open_ only render a visible segment if it contains
multiple points.

<a id="plot-marks--line--line"></a>

## line(_data_, _options_)

```js
Plot.line(aapl, { x: "Date", y: "Close" });
```

Returns a new line with the given _data_ and _options_. If neither the **x** nor
**y** options are specified, _data_ is assumed to be an array of pairs [[_x₀_,
_y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that **x** = [_x₀_, _x₁_, _x₂_, …]
and **y** = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--line--lineX"></a>

## lineX(_data_, _options_)

```js
Plot.lineX(aapl.map((d) => d.Close));
```

Similar to [line](#plot-marks--line--line) except that if the **x** option is
not specified, it defaults to the identity function and assumes that _data_ =
[_x₀_, _x₁_, _x₂_, …]. If the **y** option is not specified, it defaults to [0,
1, 2, …].

If the **interval** option is specified, the
[binY transform](#plot-transforms--bin) is implicitly applied to the specified
_options_. The reducer of the output _x_ channel may be specified via the
**reduce** option, which defaults to _first_. To default to zero instead of
showing gaps in data, as when the observed value represents a quantity, use the
_sum_ reducer.

```js
Plot.lineX(observations, { y: "date", x: "temperature", interval: "day" });
```

The **interval** option is recommended to “regularize” sampled data; for
example, if your data represents timestamped temperature measurements and you
expect one sample per day, use "day" as the interval.

<a id="plot-marks--line--lineY"></a>

## lineY(_data_, _options_)

```js
Plot.lineY(aapl.map((d) => d.Close));
```

Similar to [line](#plot-marks--line--line) except that if the **y** option is
not specified, it defaults to the identity function and assumes that _data_ =
[_y₀_, _y₁_, _y₂_, …]. If the **x** option is not specified, it defaults to [0,
1, 2, …].

If the **interval** option is specified, the
[binX transform](#plot-transforms--bin) is implicitly applied to the specified
_options_. The reducer of the output _y_ channel may be specified via the
**reduce** option, which defaults to _first_. To default to zero instead of
showing gaps in data, as when the observed value represents a quantity, use the
_sum_ reducer.

```js
Plot.lineY(observations, { x: "date", y: "temperature", interval: "day" });
```

The **interval** option is recommended to “regularize” sampled data; for
example, if your data represents timestamped temperature measurements and you
expect one sample per day, use "day" as the interval.

---

<a id="plot-marks--linear-regression"></a>

# marks/linear-regression.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/linear-regression.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import cars from "../data/cars.ts";
import penguins from "../data/penguins.ts";

const m = ref(0);

</script>

<a id="plot-marks--linear-regression--linear-regression-mark"></a>

# Linear regression mark <VersionBadge version="0.5.1" />

The **linear regression** mark draws
[linear regression](https://en.wikipedia.org/wiki/Linear_regression) lines with
confidence bands, representing the estimated linear relation of a dependent
variable (typically **y**) on an independent variable (typically **x**). Below
we can see that, in this example dataset at least, the weight of a car is a good
linear predictor of its power.

:::plot https://observablehq.com/@observablehq/plot-cars-linear-regression

```js
Plot.plot({
  marks: [
    Plot.dot(cars, { x: "weight (lb)", y: "power (hp)" }),
    Plot.linearRegressionY(cars, {
      x: "weight (lb)",
      y: "power (hp)",
      stroke: "red",
    }),
  ],
});
```

:::

A linear model posits that _y_ is determined by an underlying affine function
_y_ = _a_ ﹢ _b&thinsp;x_, where _a_ is a constant (intercept of the line on the
_y_-axis when _x_ = 0) and _b_ is the slope. Given a set of points in **x** and
**y**, the linear regression method returns the most likely parameters _a_ and
_b_ for the linear model, as well as a confidence band showing the range where
these parameters lie with a certain probability, called **ci** (for confidence
interval), which defaults to 0.95.

:::info The regression line is fit using the
[least squares](https://en.wikipedia.org/wiki/Least_squares) approach. See
Torben Jansen’s
[“Linear regression with confidence bands”](https://observablehq.com/@toja/linear-regression-with-confidence-bands)
and
[this StatExchange question](https://stats.stackexchange.com/questions/101318/understanding-shape-and-calculation-of-confidence-bands-in-linear-regression)
for details. :::

Use the slider below to build a linear model from a subset of the data with
**m** points. As you can see, the model gives a line as soon as two points are
available, and gets more refined and stable as the size of the subset increases.

<p>
  <label class="label-input">
    Number of points (m):
    <input type="range" v-model.number="m" min="0" :max="cars.length" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{m.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot
https://observablehq.com/@observablehq/plot-linear-regression-confidence-band

```js
Plot.plot({
  marks: [
    Plot.dot(cars, {
      x: "weight (lb)",
      y: "power (hp)",
      fill: "currentColor",
      fillOpacity: 0.2,
    }),
    Plot.dot(cars.slice(0, m), { x: "weight (lb)", y: "power (hp)" }),
    Plot.linearRegressionY(cars.slice(0, m), {
      x: "weight (lb)",
      y: "power (hp)",
      stroke: "red",
    }),
  ],
});
```

:::

:::tip When operating on a subset of the data (the “training dataset”, in
machine learning parlance), randomly shuffling the data can reduce bias. :::

This type of model is regularly criticized for pushing people to the wrong
conclusions about their data when the actual underlying structure or process is
nonlinear. For example, if you measure the relationship between culmen depth and
length in a mixed population of penguins, it is positively correlated in each of
the three species (bigger penguins with the longer culmens also tend to have the
deeper ones); however, the Gentoo population has a smaller aspect ratio of depth
against length, and the overall correlation across the three species is
negative. This is called
[Simpson’s paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox), and it
applies to any data that contains underlying populations with different
properties or outcomes.

:::plot https://observablehq.com/@observablehq/plot-linear-regression-simpson

```js
Plot.plot({
  grid: true,
  color: { legend: true },
  marks: [
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "species",
    }),
    Plot.linearRegressionY(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      stroke: "species",
    }),
    Plot.linearRegressionY(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
    }),
  ],
});
```

:::

Finally, note that regression is not a symmetric method: the model computed to
express _y_ as a function of _x_ (linearRegressionY) doesn’t give the same
result as the regression of _x_ as a function of _y_ (linearRegressionX) unless
the points are all perfectly aligned. In the worst case, where the two variables
are statistically independent, the linear regression of _y_ against _x_ is an
horizontal line, whereas the linear regression of _x_ against _y_ is a vertical
line.

:::plot
https://observablehq.com/@observablehq/plot-linear-regression-is-not-symmetric

```js
Plot.plot({
  marks: [
    Plot.dot(cars, {
      x: "weight (lb)",
      y: "power (hp)",
      strokeOpacity: 0.5,
      r: 2,
    }),
    Plot.linearRegressionY(cars, {
      x: "weight (lb)",
      y: "power (hp)",
      stroke: "steelblue",
    }),
    Plot.linearRegressionX(cars, {
      x: "weight (lb)",
      y: "power (hp)",
      stroke: "orange",
    }),
  ],
});
```

:::

<a id="plot-marks--linear-regression--linear-regression-options"></a>

## Linear regression options

The given _options_ are passed through to these underlying marks, with the
exception of the following options:

- **stroke** - the stroke color of the regression line; defaults to
  _currentColor_
- **fill** - the fill color of the confidence band; defaults to the line’s
  _stroke_
- **fillOpacity** - the fill opacity of the confidence band; defaults to 0.1
- **ci** - the confidence interval in [0, 1), or 0 to hide bands; defaults to
  0.95
- **precision** - the distance (in pixels) between samples of the confidence
  band; defaults to 4

Multiple regressions can be defined by specifying **z**, **fill**, or
**stroke**.

<a id="plot-marks--linear-regression--linearRegressionX"></a>

## linearRegressionX(_data_, _options_)

```js
Plot.linearRegressionX(mtcars, { y: "wt", x: "hp" });
```

Returns a linear regression mark where **x** is the dependent variable and **y**
is the independent variable. (This is the uncommon orientation.)

<a id="plot-marks--linear-regression--linearRegressionY"></a>

## linearRegressionY(_data_, _options_)

```js
Plot.linearRegressionY(mtcars, { x: "wt", y: "hp" });
```

Returns a linear regression mark where **y** is the dependent variable and **x**
is the independent variable. (This is the common orientation.)

---

<a id="plot-marks--link"></a>

# marks/link.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/link.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import income from "../data/income-gender.ts";
import metros from "../data/metros.ts";

const xy = {x1: -122.4194, y1: 37.7749, x2: 2.3522, y2: 48.8566};
const gods = ["Chaos/Gaia/Mountains", "Chaos/Gaia/Pontus", "Chaos/Gaia/Uranus", "Chaos/Eros", "Chaos/Erebus", "Chaos/Tartarus"];
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : null);

onMounted(() => {
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
});

</script>

<a id="plot-marks--link--link-mark"></a>

# Link mark

The **link mark** draws straight lines between two points [**x1**, **y1**] and
[**x2**, **y2**] in quantitative dimensions. It is similar to the
[arrow mark](#plot-marks--arrow), except it draws a straight line — or geodesic
when used with a [spherical projection](#plot-features--projections).

For example, the chart below shows the rising inequality (and population) in
various U.S. cities from 1980 to 2015. Each link represents two observations of
a city: the city’s population (**x**) and inequality (**y**) in 1980, and the
same in 2015. The link’s **stroke** redundantly encodes the change in
inequality: red indicates rising inequality, while blue (there are only four)
indicates declining inequality.

:::plot defer https://observablehq.com/@observablehq/plot-link-variation-chart

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population",
  },
  y: {
    label: "Inequality",
    ticks: 4,
  },
  color: {
    scheme: "BuRd",
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f",
  },
  marks: [
    Plot.link(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980,
      markerEnd: "arrow",
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      dy: -8,
    }),
  ],
});
```

:::

The link mark is used by the composite [tree mark](#plot-marks--tree) to render
a link from parent to child in a hierarchy. The
[treeLink transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/tree.md)
sets the default [curve option](#plot-features--curves) to _bump-x_.

:::plot https://observablehq.com/@observablehq/plot-tree-and-link

```js
Plot.plot({
  axis: null,
  height: 120,
  inset: 20,
  insetRight: 120,
  marks: [
    Plot.link(gods, Plot.treeLink({ stroke: "node:internal" })),
    Plot.dot(gods, Plot.treeNode({ fill: "node:internal" })),
    Plot.text(
      gods,
      Plot.treeNode({
        text: "node:name",
        stroke: "var(--vp-c-bg)",
        fill: "currentColor",
        dx: 6,
      }),
    ),
  ],
});
```

:::

In this example, `gods` is an array of slash-separated paths representing the
ancestry of mythological Greek gods.

```js
gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus",
];
```

With a [spherical projection](#plot-features--projections) and the default
[_auto_ curve](#plot-features--curves), the link mark will render a geodesic:
the shortest path between two points on the surface of the sphere. Setting the
**curve** to _linear_ will instead draw a straight line between the projected
points. For example, below we draw two links from San Francisco to Paris.

:::plot defer https://observablehq.com/@observablehq/plot-projected-link

```js
Plot.plot({
  projection: "equal-earth",
  marks: [
    Plot.sphere(),
    Plot.geo(land, { fill: "currentColor", fillOpacity: 0.3 }),
    Plot.link({ length: 1 }, { curve: "linear", stroke: "red", ...xy }),
    Plot.link({ length: 1 }, {
      markerStart: "dot",
      markerEnd: "arrow",
      strokeWidth: 1.5,
      ...xy,
    }),
  ],
});
```

:::

```js
xy = { x1: -122.4194, y1: 37.7749, x2: 2.3522, y2: 48.8566 };
```

Like a [rule](#plot-marks--rule), a link can also serve as annotation. Whereas a
rule is strictly horizontal or vertical, however, a link can generate
[diagonal lines](http://kelsocartography.com/blog/?p=2074). The following chart
depicts the gender gap in wages, segmented by education and age, in the U.S. A
regular grid would make the gender disparity much less clear, even with the
domains explicitly set to be equal.

:::plot https://observablehq.com/@observablehq/plot-gender-income-inequality

```js
Plot.plot({
  aspectRatio: 1,
  marginRight: 40,
  x: {
    label: "Median annual income (men, thousands)",
    transform: (d) => d / 1000,
    tickSpacing: 60,
  },
  y: {
    label: "Median annual income (women, thousands)",
    transform: (d) => d / 1000,
    tickSpacing: 60,
  },
  marks: [
    Plot.link([0.6, 0.7, 0.8, 0.9, 1], {
      x1: 0,
      y1: 0,
      x2: 102000,
      y2: (k) => 102000 * k,
      strokeOpacity: (k) => k === 1 ? 1 : 0.2,
    }),
    Plot.text([0.6, 0.7, 0.8, 0.9, 1], {
      x: 102000,
      y: (k) => 102000 * k,
      text: ((f) => (k) => k === 1 ? "Equal" : f(k - 1))(d3.format("+.0%")),
      textAnchor: "start",
      dx: 6,
    }),
    Plot.dot(income, { x: "m", y: "f" }),
  ],
});
```

:::

<a id="plot-marks--link--link-options"></a>

## Link options

The following channels are required:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

For vertical or horizontal links, the **x** option can be specified as shorthand
for **x1** and **x2**, and the **y** option can be specified as shorthand for
**y1** and **y2**, respectively.

The link mark supports the [standard mark options](#plot-features--marks). The
**stroke** defaults to currentColor. The **fill** defaults to none. The
**strokeWidth** and **strokeMiterlimit** default to one.

The link mark supports [curve options](#plot-features--curves) to control
interpolation between points, and
[marker options](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md)
to add a marker (such as a dot or an arrowhead) on each of the control points.
Since a link always has two points by definition, only the following curves (or
a custom curve) are recommended: _linear_, _step_, _step-after_, _step-before_,
_bump-x_, or _bump-y_. Note that the _linear_ curve is incapable of showing a
fill since a straight line has zero area. For a curved link, you can use a bent
[arrow](#plot-marks--arrow) (with no arrowhead, if desired).

<a id="plot-marks--link--link"></a>

## link(_data_, _options_)

```js
Plot.link(inequality, {
  x1: "POP_1980",
  y1: "R90_10_1980",
  x2: "POP_2015",
  y2: "R90_10_2015",
});
```

Returns a new link with the given _data_ and _options_.

---

<a id="plot-marks--raster"></a>

# marks/raster.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/raster.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";
import volcano from "../data/volcano.ts";

const ca55 = shallowRef([]);
const vapor = shallowRef([]);
const grid = {"width": 10, "height": 10, "values": d3.cross(d3.range(10), d3.range(10), (x, y) => x * y)};

onMounted(() => {
  d3.csv("../data/ca55-south.csv", d3.autoType).then((data) => (ca55.value = data));
  d3.text("../data/MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv").then((text) => (vapor.value = d3.csvParseRows(text).flat().map((x) => (x === "99999.0" ? NaN : +x))));
});

function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}

</script>

<a id="plot-marks--raster--raster-mark"></a>

# Raster mark <VersionBadge version="0.6.2" />

:::tip To produce contours instead of a heatmap, see the
[contour mark](#plot-marks--contour). :::

The **raster mark** renders a
[raster image](https://en.wikipedia.org/wiki/Raster_graphics) — that is, an
image formed by discrete pixels in a grid, not a vector graphic like other
marks. And whereas the [image mark](#plot-marks--image) shows an _existing_
image, the raster mark _creates_ one from abstract data, either by
[interpolating spatial samples](#plot-marks--raster--spatial-interpolators)
(arbitrary points in **x** and **y**) or by sampling a function _f_(_x_,_y_)
along the grid.

For example, the heatmap below shows the topography of the
[Maungawhau volcano](https://en.wikipedia.org/wiki/Maungawhau), produced from a
{{volcano.width}}×{{volcano.height}} grid of elevation samples.

:::plot defer https://observablehq.com/@observablehq/plot-volcano-raster

```js
Plot.plot({
  color: { label: "Elevation (m)", legend: true },
  marks: [
    Plot.raster(volcano.values, {
      width: volcano.width,
      height: volcano.height,
    }),
  ],
});
```

:::

The grid (`volcano.values` above) is a list of numbers `[103, 104, 104, …]`. The
first number `103` is the elevation of the bottom-left corner. This grid is in
[row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order),
meaning that the elevations of the first row are followed by the second row,
then the third, and so on. Here’s a smaller grid to demonstrate the concept.

```js
grid = {
  "width": 10,
  "height": 10,
  "values": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    0,
    3,
    6,
    9,
    12,
    15,
    18,
    21,
    24,
    27,
    0,
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    0,
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    0,
    6,
    12,
    18,
    24,
    30,
    36,
    42,
    48,
    54,
    0,
    7,
    14,
    21,
    28,
    35,
    42,
    49,
    56,
    63,
    0,
    8,
    16,
    24,
    32,
    40,
    48,
    56,
    64,
    72,
    0,
    9,
    18,
    27,
    36,
    45,
    54,
    63,
    72,
    81,
  ],
};
```

We can visualize this small grid directly with a [text mark](#plot-marks--text)
using the same color encoding. Notice that the image below is flipped vertically
relative to the data: the first row of the data is the _bottom_ of the image
because below _y_ points up↑.

:::plot https://observablehq.com/@observablehq/plot-small-grid-raster

```js
Plot.plot({
  grid: true,
  x: { domain: [0, grid.width], label: "column" },
  y: { domain: [0, grid.height], label: "row" },
  marks: [
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: Plot.identity,
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5,
    }),
  ],
});
```

:::

Also notice that the grid points are offset by 0.5: they represent the _middle_
of each pixel rather than the corner. Below, the raster mark is laid under the
text mark to show the raster image.

:::plot defer https://observablehq.com/@observablehq/plot-small-grid-raster

```js
Plot.plot({
  marks: [
    Plot.raster(grid.values, {
      width: grid.width,
      height: grid.height,
      imageRendering: "pixelated", // to better show the grid
    }),
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: "white",
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5,
    }),
  ],
});
```

:::

:::warning CAUTION Safari does not currently support the **imageRendering**
option. :::

While the raster mark provides convenient shorthand for strictly gridded data,
as above, it _also_ works with samples in arbitrary positions and arbitrary
order. For example, in 1955 the
[Great Britain aeromagnetic survey](https://www.bgs.ac.uk/datasets/gb-aeromagnetic-survey/)
measured the Earth’s magnetic field by plane. Each sample recorded the longitude
and latitude alongside the strength of the
[IGRF](https://www.ncei.noaa.gov/products/international-geomagnetic-reference-field)
in [nanoteslas](https://en.wikipedia.org/wiki/Tesla_(unit)).

```
LONGITUDE,LATITUDE,MAG_IGRF90
-2.36216,51.70945,7
-2.36195,51.71727,6
-2.36089,51.72404,9
-2.35893,51.73758,12
-2.35715,51.7532,18
-2.35737,51.76636,24
```

Using a [dot mark](#plot-marks--dot), we can make a quick scatterplot to see the
irregular grid. We’ll use a _diverging_ color scale to distinguish positive and
negative values.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-dots

```js
Plot.dot(ca55, { x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90" }).plot({
  color: { type: "diverging" },
});
```

:::

And using a [line mark](#plot-marks--line), we can connect the line segments to
reveal the flight paths.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-flight-paths

```js
Plot.line(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  stroke: "MAG_IGRF90",
  z: "LINE_NUMB-SEG",
}).plot({ color: { type: "diverging" } });
```

:::

The image above starts to be readable, but it would be frustrating to not do
more with this data given all the effort that went into collecting it!
Fortunately the raster mark’s **interpolate** option can quickly produce a
continuous image.

The _nearest_ interpolator assigns the value of each pixel in the grid using the
nearest sample in the data. In effect, this produces a Voronoi diagram.

:::plot defer https://observablehq.com/@observablehq/plot-igfr90-raster

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: "nearest",
}).plot({ color: { type: "diverging" } });
```

:::

:::tip You can also make this Voronoi diagram with the
[voronoi mark](#plot-marks--delaunay). :::

If the observed phenomenon is continuous, we can use the _barycentric_
interpolator. This constructs a Delaunay triangulation of the samples, and then
paints each triangle by interpolating the values of the triangle’s vertices in
[barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system).
(Points outside the convex hull are extrapolated.)

:::plot defer https://observablehq.com/@observablehq/plot-igfr90-barycentric

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: "barycentric",
}).plot({ color: { type: "diverging" } });
```

:::

Finally, the _random-walk_ interpolator assigns the value at each grid location
simply by taking a random walk that stops after reaching a minimum distance from
any sample! The interpolator uses the
[walk on spheres](https://observablehq.com/@fil/walk-on-spheres) algorithm,
limited to 2 consecutive jumps.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-random-walk

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: "random-walk",
}).plot({ color: { type: "diverging" } });
```

:::

With the _random-walk_ method, the image is grainy, reflecting the uncertainty
of the random walk. Use the **blur** option to make it smoother.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-random-walk

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: "random-walk",
  blur: 5,
}).plot({ color: { type: "diverging" } });
```

:::

:::tip If none of the built-in
[spatial interpolators](#plot-marks--raster--spatial-interpolators) suffice, you
can write your own as a custom function! :::

The raster mark can interpolate categorical values, too! Below, this creates an
interesting “map” of penguin species in the space of culmen length _vs._ depth.

:::plot defer https://observablehq.com/@observablehq/plot-nominal-random-walk

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.raster(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "species",
      interpolate: "random-walk",
    }),
    Plot.dot(penguins, { x: "culmen_length_mm", y: "culmen_depth_mm" }),
  ],
});
```

:::

As an alternative to interpolating discrete samples, you can supply values as a
continuous function _f_(_x_,_y_); the raster mark will invoke this function for
the midpoint of each pixel in the raster grid, similar to a WebGL fragment
shader. For example, below we visualize the
[Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) by counting the
number of iterations needed until the point “escapes”.

:::plot defer https://observablehq.com/@observablehq/plot-mandelbrot-set

```js
Plot.raster({ fill: mandelbrot, x1: -2, x2: 1, y1: -1.164, y2: 1.164 }).plot({
  aspectRatio: 1,
});
```

:::

```js
function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}
```

Or to visualize the arctangent function:

:::plot defer https://observablehq.com/@observablehq/plot-arctangent-raster

```js
Plot.raster({ x1: -1, x2: 1, y1: -1, y2: 1, fill: (x, y) => Math.atan2(y, x) })
  .plot();
```

:::

:::tip When faceting, the sample function _f_(_x_,_y_) is passed a third
argument of the facet values {_fx_, _fy_}. :::

The raster mark supports Plot’s
[projection system](#plot-features--projections). The chart below shows global
atmospheric water vapor measurements from
[NASA Earth Observations](https://neo.gsfc.nasa.gov/view.php?datasetId=MYDAL2_M_SKY_WV).

:::plot defer https://observablehq.com/@observablehq/plot-raster-projection

```js
Plot.plot({
  projection: "equal-earth",
  color: {
    scheme: "BuPu",
    domain: [0, 6],
    legend: true,
    label: "Water vapor (cm)",
  },
  marks: [
    Plot.raster(vapor, {
      fill: Plot.identity,
      width: 360,
      height: 180,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      interpolate: "barycentric",
      clip: "sphere",
    }),
    Plot.sphere({ stroke: "black" }),
  ],
});
```

:::

<a id="plot-marks--raster--raster-options"></a>

## Raster options

If _data_ is provided, it represents discrete samples in abstract coordinates
**x** and **y**; the **fill** and **fillOpacity** channels specify further
abstract values (_e.g._, height in a topographic map) to be
[spatially interpolated](#plot-marks--raster--spatial-interpolators) to produce
an image.

```js
Plot.raster(volcano.values, { width: volcano.width, height: volcano.height });
```

The **fill** and **fillOpacity** channels may alternatively be specified as
continuous functions _f_(_x_,_y_) to be evaluated at each pixel centroid of the
raster grid (without interpolation).

```js
Plot.raster({ x1: -1, x2: 1, y1: -1, y2: 1, fill: (x, y) => Math.atan2(y, x) });
```

The resolution of the rectangular raster image may be specified with the
following options:

- **width** - the number of pixels on each horizontal line
- **height** - the number of lines; a positive integer

The raster dimensions may also be imputed from the extent of _x_ and _y_ and a
pixel size:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **y2** - the ending vertical position; bound to the _y_ scale
- **pixelSize** - the screen size of a raster pixel; defaults to 1

If **width** is specified, **x1** defaults to 0 and **x2** defaults to
**width**; likewise, if **height** is specified, **y1** defaults to 0 and **y2**
defaults to **height**. Otherwise, if **data** is specified, **x1**, **y1**,
**x2**, and **y2** respectively default to the frame’s left, top, right, and
bottom coordinates. Lastly, if **data** is not specified (as when **fill** or
**fillOpacity** is a function of _x_ and _y_), you must specify all of **x1**,
**x2**, **y1**, and **y2** to define the raster domain (see below). The
**pixelSize** may be set to the inverse of the devicePixelRatio for a sharper
image.

The following raster-specific constant options are supported:

- **interpolate** - the
  [spatial interpolation method](#plot-marks--raster--spatial-interpolators)
- **imageRendering** - the
  [image-rendering attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/image-rendering);
  defaults to _auto_ (bilinear)
- **blur** - a non-negative pixel radius for smoothing; defaults to 0

The **imageRendering** option may be set to _pixelated_ for a sharper image. The
**interpolate** option is ignored when **fill** or **fillOpacity** is a function
of _x_ and _y_.

<a id="plot-marks--raster--raster"></a>

## raster(_data_, _options_)

```js
Plot.raster(volcano.values, { width: volcano.width, height: volcano.height });
```

Returns a new raster mark with the given (optional) _data_ and _options_.

<a id="plot-marks--raster--spatial-interpolators"></a>

## Spatial interpolators

The [raster](#plot-marks--raster--raster-mark) and
[contour](#plot-marks--contour) marks use **spatial interpolators** to populate
a raster grid from a discrete set of (often ungridded) spatial samples.
The **interpolate** option controls how these marks compute the raster grid. The
following built-in methods are provided:

- _none_ (or null) - assign each sample to the containing pixel
- _nearest_ - assign each pixel to the closest sample’s value (Voronoi diagram)
- _barycentric_ - apply barycentric interpolation over the Delaunay
  triangulation
- _random-walk_ - apply a random walk from each pixel, stopping when near a
  sample

The **interpolate** option can also be specified as a function with the
following arguments:

- _index_ - an array of numeric indexes into the channels _x_, _y_, _value_
- _width_ - the width of the raster grid; a positive integer
- _height_ - the height of the raster grid; a positive integer
- _x_ - an array of values representing the _x_-position of samples
- _y_ - an array of values representing the _y_-position of samples
- _value_ - an array of values representing the sample’s observed value

So, _x_[_index_[0]] represents the _x_-position of the first sample,
_y_[_index_[0]] its _y_-position, and _value_[_index_[0]] its value (_e.g._, the
observed height for a topographic map).

<a id="plot-marks--raster--interpolateNone"></a>

## interpolateNone(_index_, _width_, _height_, _x_, _y_, _value_)

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: Plot.interpolateNone,
});
```

Applies a simple forward mapping of samples, binning them into pixels in the
raster grid without any blending or interpolation. If multiple samples map to
the same pixel, the last one wins; this can introduce bias if the points are not
in random order, so use [Plot.shuffle](#plot-transforms--sort--shuffle) to
randomize the input if needed.

<a id="plot-marks--raster--interpolateNearest"></a>

## interpolateNearest(_index_, _width_, _height_, _x_, _y_, _value_)

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: Plot.interpolateNearest,
});
```

Assigns each pixel in the raster grid the value of the closest sample;
effectively a Voronoi diagram.

<a id="plot-marks--raster--interpolatorBarycentric"></a>

## interpolatorBarycentric(_options_)

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: Plot.interpolatorBarycentric(),
});
```

Constructs a Delaunay triangulation of the samples, and then for each pixel in
the raster grid, determines the triangle that covers the pixel’s centroid and
interpolates the values associated with the triangle’s vertices using
[barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system).
If the interpolated values are ordinal or categorical (_i.e._, anything other
than numbers or dates), then one of the three values will be picked randomly
weighted by the barycentric coordinates; the given **random** number generator
will be used, which defaults to a
[linear congruential generator](https://d3js.org/d3-random#randomLcg) with a
fixed seed (for deterministic results).

<a id="plot-marks--raster--interpolatorRandomWalk"></a>

## interpolatorRandomWalk(_options_)

```js
Plot.raster(ca55, {
  x: "LONGITUDE",
  y: "LATITUDE",
  fill: "MAG_IGRF90",
  interpolate: Plot.interpolatorRandomWalk(),
});
```

For each pixel in the raster grid, initiates a random walk, stopping when either
the walk is within a given distance (**minDistance**) of a sample or the maximum
allowable number of steps (**maxSteps**) have been taken, and then assigning the
current pixel the closest sample’s value. The random walk uses the “walk on
spheres” algorithm in two dimensions described by
[Sawhney and Crane](https://www.cs.cmu.edu/~kmcrane/Projects/MonteCarloGeometryProcessing/index.html),
SIGGRAPH 2020; the given **random** number generator will be used, which
defaults to a
[linear congruential generator](https://d3js.org/d3-random#randomLcg) with a
fixed seed (for deterministic results).

---

<a id="plot-marks--rect"></a>

# marks/rect.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/rect.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";

const r = ref(4);
const diamonds = shallowRef([]);
const seattle = shallowRef([]);
const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);
const povcalnet = shallowRef([]);
const us = shallowRef(null);
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);
const countyboxes = computed(() => counties.value.map((d) => d3.geoBounds(d).flat()));
const bins = d3.bin()(d3.range(1000).map(d3.randomNormal.source(d3.randomLcg(42))()));

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/povcalnet.csv", d3.autoType).then((data) => (povcalnet.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

<a id="plot-marks--rect--rect-mark"></a>

# Rect mark

The **rect mark** draws axis-aligned rectangles defined by **x1**, **y1**,
**x2**, and **y2**. For example, here we display geographic bounding boxes of
U.S. counties represented as [_x1_, _y1_, _x2_, _y2_] tuples, where _x1_ & _x2_
are degrees longitude and _y1_ & _y2_ are degrees latitude.

:::plot defer https://observablehq.com/@observablehq/plot-county-boxes

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.rect(countyboxes, {
      x1: "0", // or ([x1]) => x1
      y1: "1", // or ([, y1]) => y1
      x2: "2", // or ([,, x2]) => x2
      y2: "3", // or ([,,, y2]) => y2
      stroke: "currentColor",
    }),
  ],
});
```

:::

The rect mark is often used to produce histograms or heatmaps of quantitative
data. For example, given some binned observations computed by
[d3.bin](https://d3js.org/d3-array/bin), we can produce a basic histogram with
[rectY](#plot-marks--rect--rectY) as follows:

:::plot https://observablehq.com/@observablehq/plot-rects-and-bins

```js
Plot.rectY(bins, { x1: "x0", x2: "x1", y: "length" }).plot({ round: true });
```

:::

```js
bins = d3.bin()(d3.range(1000).map(d3.randomNormal()));
```

:::info d3.bin uses _x0_ and _x1_ to represent the lower and upper bound of each
bin, whereas the rect mark uses **x1** and **x2**. The _length_ field is the
count of values in each bin, which is encoded as **y**. :::

More commonly, the rect mark is paired with the
[bin transform](#plot-transforms--bin) to bin quantitative values automatically.
As an added bonus, this sets default
[inset options](#plot-features--marks--mark-options) for a 1px gap separating
adjacent rects, improving readability.

:::plot https://observablehq.com/@observablehq/plot-rects-and-bins

```js
Plot.rectY(d3.range(1000).map(d3.randomNormal()), Plot.binX()).plot();
```

:::

Like the [bar mark](#plot-marks--bar), the rect mark has two convenience
constructors for common orientations: [rectX](#plot-marks--rect--rectX) is for
horizontal→ rects with an implicit
[stackX transform](#plot-transforms--stack--stackX), while
[rectY](#plot-marks--rect--rectY) is for vertical↑ rects with an implicit
[stackY transform](#plot-transforms--stack--stackY).

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, { x: "weight", fill: "sex" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

For overlapping rects, you can opt-out of the implicit stack transform by
specifying either **x1** or **x2** for rectX, and likewise either **y1** or
**y2** for rectY.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram

```js-vue
Plot.plot({
  round: true,
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y2: "count"}, {x: "weight", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```

:::

:::warning CAUTION While the **mixBlendMode** option is useful for mitigating
occlusion, it can be slow to render if there are many elements. More than two
overlapping histograms may also be hard to read. :::

The rect mark and bin transform naturally support
[faceting](#plot-features--facets), too.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram

```js
Plot.plot({
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, { x: "weight", fy: "sex" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

The [rect constructor](#plot-marks--rect--rect), again with the
[bin transform](#plot-transforms--bin), can produce two-dimensional histograms
(heatmaps) where density is represented by the **fill** color encoding.

:::plot defer
https://observablehq.com/@observablehq/plot-continuous-dimensions-heatmap

```js-vue
Plot.plot({
  height: 640,
  marginLeft: 60,
  color: {
    scheme: "{{$dark ? "turbo" : "YlGnBu"}}",
    type: "symlog"
  },
  marks: [
    Plot.rect(diamonds, Plot.bin({fill: "count"}, {x: "carat", y: "price", thresholds: 100}))
  ]
})
```

:::

:::tip A similar plot can be made with the [dot mark](#plot-marks--dot), if
you’d prefer a size encoding. :::

Below we recreate an uncommon
[chart by Max Roser](https://ourworldindata.org/poverty-minimum-growth-needed)
that visualizes global poverty. Each rect represents a country: _x_ encodes the
country’s population, while _y_ encodes the proportion of that population living
in poverty; hence area represents the number of people living in poverty. Rects
are [stacked](#plot-transforms--stack) along _x_ in order of descending _y_.

:::plot defer
https://observablehq.com/@observablehq/plot-cumulative-distribution-of-poverty

```js
Plot.plot({
  x: { label: "Population (millions)" },
  y: { percent: true, label: "Proportion living on less than $30 per day (%)" },
  marks: [
    Plot.rectY(
      povcalnet,
      Plot.stackX({
        filter: (d) => ["N", "A"].includes(d.CoverageType),
        x: "ReqYearPopulation",
        order: "HeadCount",
        reverse: true,
        y2: "HeadCount", // y2 to avoid stacking by y
        title: (d) => `${d.CountryName}\n${(d.HeadCount * 100).toFixed(1)}%`,
        insetLeft: 0.2,
        insetRight: 0.2,
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

The
[interval transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/interval.md)
may be used to convert a single value in **x** or **y** (or both) into an
extent. (Unlike the bin transform, the interval transform will produce
overlapping rects if multiple points have the same position.) The chart below
shows the observed daily maximum temperature in Seattle for the year 2015. The
day-in-month and month-in-year numbers are expanded to unit intervals by setting
the **interval** option to 1.

:::plot defer
https://observablehq.com/@observablehq/plot-seattle-heatmap-quantitative

```js
Plot.plot({
  aspectRatio: 1,
  y: { ticks: 12, tickFormat: Plot.formatMonth("en", "narrow") },
  marks: [
    Plot.rect(seattle.filter((d) => d.date.getUTCFullYear() === 2015), {
      x: (d) => d.date.getUTCDate(),
      y: (d) => d.date.getUTCMonth(),
      interval: 1,
      fill: "temp_max",
      inset: 0.5,
    }),
  ],
});
```

:::

:::tip A similar chart could be made with the [cell mark](#plot-marks--cell)
using ordinal _x_ and _y_ scales instead, or with the
[dot mark](#plot-marks--dot) as a scatterplot. :::

To round corners, use the **r** option. If the combined corner radii exceed the
width or height of the rect, the radii are proportionally reduced to produce a
pill shape with circular caps. Try increasing the radii below.

<p>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">r:</span>
    <input type="range" v-model.number="r" min="0" max="25" step="0.2">
    <span style="font-variant-numeric: tabular-nums;">{{r}}</span>
  </label>
</p>

:::plot hidden defer https://observablehq.com/@observablehq/plot-rounded-rects

```js
Plot.plot({
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, { x: "weight", r, thresholds: 10 }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

```js-vue
Plot.plot({
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", r: {{r}}, thresholds: 10})),
    Plot.ruleY([0])
  ]
})
```

To round corners on a specific side, use the **rx1**, **ry1**, **rx2**, or
**ry2** options. When stacking rounded rects vertically, use a positive **ry2**
and a corresponding negative **ry1**; likewise for stacking rounded rects
horizontally, use a positive **rx2** and a negative **rx1**. Use the **clip**
option to hide the “wings” below zero.

:::plot defer https://observablehq.com/@observablehq/plot-rounded-rects

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, {
        x: "weight",
        fill: "sex",
        ry2: 4,
        ry1: -4,
        clip: "frame",
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

You can even round specific corners using the **rx1y1**, **rx2y1**, **rx2y2**,
and **rx1y2** options.

:::plot defer https://observablehq.com/@observablehq/plot-rounded-rects

```js
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, {
        x: "weight",
        fill: "sex",
        rx1y2: 10,
        rx1y1: -10,
        clip: "frame",
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

<a id="plot-marks--rect--rect-options"></a>

## Rect options

The following channels are optional:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

If **x1** is specified but **x2** is not specified, then _x_ must be a _band_
scale; if **y1** is specified but **y2** is not specified, then _y_ must be a
_band_ scale.

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be
derived from **x**: _interval_.floor(_x_) is invoked for each **x** to produce
**x1**, and _interval_.offset(_x1_) is invoked for each **x1** to produce
**x2**. The same is true for **y**, **y1**, and **y2**, respectively. If the
interval is specified as a number _n_, **x1** and **x2** are taken as the two
consecutive multiples of _n_ that bracket **x**. Named UTC intervals such as
_day_ are also supported; see
[scale options](#plot-features--scales--scale-options).

The rect mark supports the
[standard mark options](#plot-features--marks--mark-options), including
[insets](#plot-features--marks--insets) and
[rounded corners](#plot-features--marks--rounded-corners). The **stroke**
defaults to _none_. The **fill** defaults to _currentColor_ if the stroke is
_none_, and to _none_ otherwise.

<a id="plot-marks--rect--rect"></a>

## rect(_data_, _options_)

```js
Plot.rect(olympians, Plot.bin({ fill: "count" }, { x: "weight", y: "height" }));
```

Returns a new rect with the given _data_ and _options_.

<a id="plot-marks--rect--rectX"></a>

## rectX(_data_, _options_)

```js
Plot.rectX(olympians, Plot.binY({ x: "count" }, { y: "weight" }));
```

Equivalent to [rect](#plot-marks--rect--rect), except that if neither the **x1**
nor **x2** option is specified, the **x** option may be specified as shorthand
to apply an implicit [stackX transform](#plot-transforms--stack); this is the
typical configuration for a histogram with horizontal→ rects aligned at _x_ = 0.
If the **x** option is not specified, it defaults to the identity function.

<a id="plot-marks--rect--rectY"></a>

## rectY(_data_, _options_)

```js
Plot.rectY(olympians, Plot.binX({ y: "count" }, { x: "weight" }));
```

Equivalent to [rect](#plot-marks--rect--rect), except that if neither the **y1**
nor **y2** option is specified, the **y** option may be specified as shorthand
to apply an implicit [stackY transform](#plot-transforms--stack); this is the
typical configuration for a histogram with vertical↑ rects aligned at _y_ = 0.
If the **y** option is not specified, it defaults to the identity function.

---

<a id="plot-marks--rule"></a>

# marks/rule.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/rule.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";

const seattle = shallowRef([]);
const simpsons = shallowRef(d3.cross(d3.range(1, 29), d3.range(1, 26), (x, y) => ({season: x, number_in_season: y})));

onMounted(() => {
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/simpsons.csv", d3.autoType).then((data) => (simpsons.value = data));
});

</script>

<a id="plot-marks--rule--rule-mark"></a>

# Rule mark

:::tip The rule mark is one of two marks in Plot for drawing horizontal or
vertical lines; it should be used when the secondary position dimension, if any,
is quantitative. When it is ordinal, use a [tick](#plot-marks--tick). :::

The **rule mark** comes in two orientations: [ruleY](#plot-marks--rule--ruleY)
draws a horizontal↔︎ line with a given _y_ value, while
[ruleX](#plot-marks--rule--ruleX) draws a vertical↕︎ line with a given _x_ value.
Rules are often used as annotations, say to mark the _y_ = 0 baseline (in red
below for emphasis) in a line chart.

:::plot https://observablehq.com/@observablehq/plot-rule-zero

```js
Plot.plot({
  y: {
    grid: true,
  },
  marks: [
    Plot.ruleY([0], { stroke: "red" }),
    Plot.line(aapl, { x: "Date", y: "Close" }),
  ],
});
```

:::

As annotations, rules often have a hard-coded array of literal values as data.
This
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md)
utilizes the default
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
definition of the rule’s position (**y** for ruleY and **x** for ruleX).

:::plot https://observablehq.com/@observablehq/plot-rule-one

```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (d) => f((d - 1) * 100))(d3.format("+d")),
  },
  marks: [
    Plot.ruleY([1], { stroke: "red" }),
    Plot.line(aapl, Plot.normalizeY("first", { x: "Date", y: "Close" })),
  ],
});
```

:::

Yet rules can also be used to visualize data. Below, a random normal
distribution is plotted with rules, looking a bit like the
[emission spectrum of Hydrogen](https://en.wikipedia.org/wiki/Hydrogen_spectral_series).

:::plot https://observablehq.com/@observablehq/plot-rule-random

```js
Plot.plot({
  x: { domain: [-4, 4] },
  marks: [
    Plot.ruleX({ length: 500 }, { x: d3.randomNormal(), strokeOpacity: 0.2 }),
  ],
});
```

:::

:::tip Reducing opacity allows better perception of density when rules overlap.
:::

Rules can also serve as an alternative to an [area mark](#plot-marks--area) as
in a band chart, provided the data is sufficiently dense: you can limit the
extent of a rule along the secondary dimension (**y1** and **y2** channels for
ruleX, and **x1** and **x2** channels for ruleY) rather than having it span the
frame. And rules support a **stroke** color encoding. The rules below plot the
daily minimum and maximum temperature for Seattle.

:::plot defer

```js
Plot.plot({
  y: { grid: true, label: "Temperature (°C)" },
  color: { scheme: "BuRd" },
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(seattle, {
      x: "date",
      y1: "temp_min",
      y2: "temp_max",
      stroke: "temp_min",
    }),
  ],
});
```

:::

In the dense
[candlestick chart](https://observablehq.com/@observablehq/observable-plot-candlestick)
below, three rules are drawn for each trading day: a gray rule spans the chart,
showing gaps for weekends and holidays; a
<span style="border-bottom: solid 2px currentColor;">{{$dark ? "white" :
"black"}}</span> rule spans the day’s low and high; and a
<span style="border-bottom: solid 2px var(--vp-c-green);">green</span> or
<span style="border-bottom: solid 2px var(--vp-c-red);">red</span> rule spans
the day’s open and close.

:::plot defer https://observablehq.com/@observablehq/plot-candlestick-chart

```js
Plot.plot({
  inset: 6,
  label: null,
  y: { grid: true, label: "Stock price ($)" },
  color: { type: "threshold", range: ["red", "green"] },
  marks: [
    Plot.ruleX(aapl, { x: "Date", y1: "Low", y2: "High" }),
    Plot.ruleX(aapl, {
      x: "Date",
      y1: "Open",
      y2: "Close",
      stroke: (d) => d.Close - d.Open,
      strokeWidth: 4,
    }),
  ],
});
```

:::

Rules can be used to connect graphical elements, such as in the
[dot plot](#plot-marks--dot) below showing the decline of _The Simpsons_. The
rules indicate the extent (minimum and maximum) for each season, computed via
the [group transform](#plot-transforms--group), while a red line shows the
median rating trend.

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-decline

```js
Plot.plot({
  marks: [
    Plot.ruleX(
      simpsons,
      Plot.groupX({ y1: "min", y2: "max" }, { x: "season", y: "imdb_rating" }),
    ),
    Plot.dot(simpsons, {
      x: "season",
      y: "imdb_rating",
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
    }),
    Plot.lineY(
      simpsons,
      Plot.groupX({ y: "median" }, {
        x: "season",
        y: "imdb_rating",
        stroke: "red",
      }),
    ),
  ],
});
```

:::

Rules can indicate uncertainty or error by setting the
[**marker** option](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md)
to _tick_; this draws a small perpendicular line at the start and end of the
rule. For example, to simulate ±10% error:

:::plot

```js
Plot.plot({
  x: { label: null },
  y: { percent: true },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency", fill: "blue" }),
    Plot.ruleX(alphabet, {
      x: "letter",
      y1: (d) => d.frequency * 0.9,
      y2: (d) => d.frequency * 1.1,
      marker: "tick",
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

Rules can also be a stylistic choice, as in the lollipop 🍭 chart below, serving
the role of a skinny [bar](#plot-marks--bar) topped with a
[_dot_ marker](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md).

:::plot https://observablehq.com/@observablehq/plot-lollipop

```js
Plot.plot({
  x: { label: null, tickPadding: 6, tickSize: 0 },
  y: { percent: true },
  marks: [
    Plot.ruleX(alphabet, {
      x: "letter",
      y: "frequency",
      strokeWidth: 2,
      markerEnd: "dot",
    }),
  ],
});
```

:::

Rules are also used by the [grid mark](#plot-marks--grid) to draw grid lines.

<a id="plot-marks--rule--rule-options"></a>

## Rule options

For the required channels, see [ruleX](#plot-marks--rule--ruleX) and
[ruleY](#plot-marks--rule--ruleY). The rule mark supports the
[standard mark options](#plot-features--marks--mark-options), including insets
along its secondary dimension, and
[marker options](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md)
to add a marker (such as a dot or an arrowhead) to the start or end of the rule.
The **stroke** defaults to _currentColor_.

<a id="plot-marks--rule--ruleX"></a>

## ruleX(_data_, _options_)

```js
Plot.ruleX([0]); // as annotation
```

```js
Plot.ruleX(alphabet, { x: "letter", y: "frequency" }); // like barY
```

Returns a new vertical↕︎ rule with the given _data_ and _options_. The following
channels are optional:

- **x** - the horizontal position; bound to the _x_ scale
- **y1** - the starting vertical position; bound to the _y_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

If **x** is not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
and assumes that _data_ = [_x₀_, _x₁_, _x₂_, …]. If **x** is null, the rule will
be centered horizontally in the plot frame.

If **y** is specified, it is shorthand for **y2** with **y1** equal to zero;
this is the typical configuration for a vertical lollipop chart with rules
aligned at _y_ = 0. If **y1** is not specified, the rule will start at the top
of the plot (or facet). If **y2** is not specified, the rule will end at the
bottom of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be
derived from **y**: _interval_.floor(_y_) is invoked for each _y_ to produce
_y1_, and _interval_.offset(_y1_) is invoked for each _y1_ to produce _y2_. If
the interval is specified as a number _n_, _y1_ and _y2_ are taken as the two
consecutive multiples of _n_ that bracket _y_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--rule--ruleY"></a>

## ruleY(_data_, _options_)

```js
Plot.ruleY([0]); // as annotation
```

```js
Plot.ruleY(alphabet, { y: "letter", x: "frequency" }); // like barX
```

Returns a new horizontal↔︎ rule with the given _data_ and _options_. The
following channels are optional:

- **y** - the vertical position; bound to the _y_ scale
- **x1** - the starting horizontal position; bound to the _x_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale

If **y** is not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
and assumes that _data_ = [_y₀_, _y₁_, _y₂_, …]. If **y** is null, the rule will
be centered vertically in the plot frame.

If **x** is specified, it is shorthand for **x2** with **x1** equal to zero;
this is the typical configuration for a horizontal lollipop chart with rules
aligned at _x_ = 0. If **x1** is not specified, the rule will start at the left
edge of the plot (or facet). If **x2** is not specified, the rule will end at
the right edge of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be
derived from **x**: _interval_.floor(_x_) is invoked for each _x_ to produce
_x1_, and _interval_.offset(_x1_) is invoked for each _x1_ to produce _x2_. If
the interval is specified as a number _n_, _x1_ and _x2_ are taken as the two
consecutive multiples of _n_ that bracket _x_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

---

<a id="plot-marks--text"></a>

# marks/text.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/text.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import caltrain from "../data/caltrain.ts";
import driving from "../data/driving.ts";

const travelers = shallowRef([]);

onMounted(() => {
  d3.csv("../data/travelers.csv", d3.autoType).then((data) => (travelers.value = data));
});

</script>

<a id="plot-marks--text--text-mark"></a>

# Text mark

The **text mark** draws text at the given position in **x** and **y**. It is
often used to label other marks, such as to show the value of a
[bar](#plot-marks--bar). When space is available, direct labeling can allow
faster and more accurate reading of values than an axis alone (or a tooltip).

:::plot https://observablehq.com/@observablehq/plot-labeled-bars

```js
Plot.plot({
  label: null,
  y: {
    grid: true,
    label: "Frequency (%)",
    percent: true,
  },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency" }),
    Plot.text(alphabet, {
      x: "letter",
      y: "frequency",
      text: (d) => (d.frequency * 100).toFixed(1),
      dy: -6,
      lineAnchor: "bottom",
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip For formatting numbers and dates, consider
[_number_.toLocaleString](https://observablehq.com/@mbostock/number-formatting),
[_date_.toLocaleString](https://observablehq.com/@mbostock/date-formatting),
[d3-format](https://d3js.org/d3-format), or
[d3-time-format](https://d3js.org/d3-time-format). :::

If there are too many data points, labels may overlap, making them hard to read.
Use the
[filter transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/filter.md)
to choose which points to label. In the connected scatterplot below, recreating
Hannah Fairfield’s
[“Driving Shifts Into Reverse”](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html)
from 2009, every fifth year is labeled.

:::plot https://observablehq.com/@observablehq/plot-connected-scatterplot

```js
Plot.plot({
  inset: 10,
  grid: true,
  x: { label: "Miles driven (per person-year)" },
  y: { label: "Cost of gasoline ($ per gallon)" },
  marks: [
    Plot.line(driving, {
      x: "miles",
      y: "gas",
      curve: "catmull-rom",
      marker: true,
    }),
    Plot.text(driving, {
      filter: (d) => d.year % 5 === 0,
      x: "miles",
      y: "gas",
      text: (d) => `${d.year}`,
      dy: -6,
      lineAnchor: "bottom",
    }),
  ],
});
```

:::

:::tip If you’d like automatic labeling, please upvote
[#27](https://github.com/observablehq/plot/issues/27). :::

For line charts with multiple series, you may wish to label only the start or
end of each series; this can be done using the
[select transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/select.md),
as shown in the chart below comparing the number of daily travelers at airports
in the U.S. between 2019 and 2020. The impact of the COVID-19 pandemic is
dramatic.

:::plot defer https://observablehq.com/@observablehq/plot-labeled-line-chart

```js
Plot.plot({
  y: {
    grid: true,
    label: "Travelers per day (millions)",
    transform: (d) => d / 1e6, // convert to millions
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(travelers, { x: "date", y: "previous", strokeOpacity: 0.5 }),
    Plot.line(travelers, { x: "date", y: "current" }),
    Plot.text(
      travelers,
      Plot.selectFirst({
        x: "date",
        y: "previous",
        text: ["2019"],
        fillOpacity: 0.5,
        lineAnchor: "bottom",
        dy: -6,
      }),
    ),
    Plot.text(
      travelers,
      Plot.selectFirst({
        x: "date",
        y: "current",
        text: ["2020"],
        lineAnchor: "top",
        dy: 6,
      }),
    ),
  ],
});
```

:::

:::warning CAUTION The select transform uses input order, not natural order by
value, to determine the meaning of _first_ and _last_. Since this dataset is in
reverse chronological order, the first element is the most recent. :::

A text mark can also be used to visualize data directly, similar to a
[dot mark](#plot-marks--dot) in a scatterplot. Below a “stem and leaf” plot of
Caltrain’s Palo Alto station schedule uses [stacked](#plot-transforms--stack)
text. The **fill** channel provides a color encoding to distinguish trains that
make every stop (<span style="border-bottom: solid currentColor 3px;">N</span>),
limited trains that make fewer stops
(<span style="border-bottom: solid peru 3px;">L</span>), and “baby bullet”
trains that make the fewest stops
(<span style="border-bottom: solid brown 3px;">B</span>).

:::plot https://observablehq.com/@observablehq/plot-caltrain-schedule

```js
Plot.plot({
  width: 240,
  axis: null,
  x: { type: "point" },
  y: { type: "point", domain: d3.range(4, 25) },
  color: {
    domain: "NLB",
    range: ["currentColor", "peru", "brown"],
    legend: true,
  },
  marks: [
    Plot.text([[0.5, 4]], {
      text: ["Northbound"],
      textAnchor: "start",
      dx: 16,
    }),
    Plot.text([[-0.5, 4]], {
      text: ["Southbound"],
      textAnchor: "end",
      dx: -16,
    }),
    Plot.text(d3.range(5, 25), {
      x: 0,
      y: Plot.identity,
      text: (y) => `${y % 12 || 12}${y % 24 >= 12 ? "p" : "a"}`,
    }),
    Plot.text(
      caltrain,
      Plot.stackX2({
        x: (d) => d.orientation === "N" ? 1 : -1,
        y: "hours",
        fill: "type",
        text: "minutes",
      }),
    ),
    Plot.ruleX([-0.5, 0.5]),
  ],
});
```

:::

:::info Since the **textAnchor** option is a constant rather than a channel,
separate text marks are used for the _Northbound_ and _Southbound_ labels. :::

The **x** and **y** channels are optional; a one-dimensional text mark can be
produced by specifying only one position dimension. If both **x** and **y** are
not defined, the text mark assumes that the data is an iterable of points
[[_x₁_, _y₁_], [_x₂_, _y₂_], …], allowing for
[shorthand](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/shorthand.md).
Furthermore, the default **text** channel is the associated datum’s index. (This
is rarely what you want, but at least it gets something on the screen.)

:::plot https://observablehq.com/@observablehq/plot-text-spiral

```js
Plot.plot({
  aspectRatio: 1,
  inset: 10,
  grid: true,
  marks: [
    Plot.text(
      d3.range(151).map((i) => [
        Math.sqrt(i) * Math.sin(i / 10),
        Math.sqrt(i) * Math.cos(i / 10),
      ]),
    ),
  ],
});
```

:::

The text mark will generate multiple lines if the **text** contains newline
characters (`\n`). This may be useful for longer annotations.

:::plot https://observablehq.com/@observablehq/plot-this-is-just-to-say

```js
Plot.plot({
  height: 200,
  marks: [
    Plot.frame(),
    Plot.text([`This Is Just To Say
William Carlos Williams, 1934

I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`], { frameAnchor: "middle" }),
  ],
});
```

:::

Alternatively, the **lineWidth** option enables automatic line wrapping. This
option must be specified as a number in
[ems](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units).
When a word contains a [soft-hyphen](https://en.wikipedia.org/wiki/Soft_hyphen)
(`\xad`), it may be replaced by a hyphen when wrapping. The **textOverflow**
option can also be used to truncate lines that exceed the specified line width,
like in the incipit of Herman Melville’s _Moby-Dick_ (1851).

:::plot https://observablehq.com/@observablehq/plot-moby-dick

```js
Plot.plot({
  height: 320,
  x: { type: "point", align: 0, axis: "top", tickSize: 0 },
  marks: [
    Plot.text(
      [
        "Call me Ishmael. Some years ago — never mind how long precisely — having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before cof\xadfin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off — then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
        "There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs — commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.",
        "Circumambulate the city of a dreamy Sabbath afternoon. Go from Corlears Hook to Coenties Slip, and from thence, by Whitehall, northward. What do you see? — Posted like silent sentinels all around the town, stand thousands upon thousands of mortal men fixed in ocean reveries. Some leaning against the spiles; some seated upon the pier-heads; some looking over the bulwarks of ships from China; some high aloft in the rigging, as if striving to get a still better seaward peep. But these are all landsmen; of week days pent up in lath and plaster — tied to counters, nailed to benches, clinched to desks. How then is this? Are the green fields gone? What do they here?",
      ],
      {
        x: (d, i) => 1 + i, // paragraph number
        lineWidth: 20,
        frameAnchor: "top",
        textAnchor: "start",
      },
    ),
  ],
});
```

:::

:::warning CAUTION For performance and simplicity, Plot does not measure text
exactly and instead uses an approximate heuristic. If Plot’s automatic wrapping
is not doing what you want, consider hard wrapping with manual newlines (`\n`)
instead. There is also a **monospace** option suitable for fixed-width fonts.
:::

<a id="plot-marks--text--text-options"></a>

## Text options

The following channels are required:

- **text** - the text contents (a string, possibly with multiple lines)

If the **text** contains `\n`, `\r\n`, or `\r`, it will be rendered as multiple
lines. If the **text** is specified as numbers or dates, a default formatter
will automatically be applied, and the **fontVariant** will default to
_tabular-nums_ instead of _normal_. If **text** is not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
for primitive data (such as numbers, dates, and strings), and to the zero-based
index [0, 1, 2, …] for objects (so that something identifying is visible by
default).

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale
- **fontSize** - the font size in pixels
- **rotate** - the rotation angle in degrees clockwise

If either of the **x** or **y** channels are not specified, the corresponding
position is controlled by the **frameAnchor** option.

The following text-specific constant options are also supported:

- **textAnchor** - the
  [text anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
  for horizontal position; _start_, _end_, or _middle_
- **lineAnchor** - the line anchor for vertical position; _top_, _bottom_, or
  _middle_
- **lineHeight** - the line height in ems; defaults to 1
- **lineWidth** - the line width in ems, for wrapping; defaults to Infinity
- **textOverflow** - how to wrap or clip lines longer than the specified line
  width <VersionBadge version="0.6.4" />
- **monospace** - if true, changes the default **fontFamily** and metrics to
  monospace
- **fontFamily** - the font name; defaults to
  [_system-ui_](https://drafts.csswg.org/css-fonts-4/#valdef-font-family-system-ui)
- **fontSize** - the font size in pixels; defaults to 10
- **fontStyle** - the
  [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style);
  defaults to _normal_
- **fontVariant** - the
  [font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant);
  defaults to _normal_
- **fontWeight** - the
  [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight);
  defaults to _normal_
- **frameAnchor** - how to position the text within the frame; defaults to
  _middle_
- **rotate** - the rotation angle in degrees clockwise; defaults to 0

If a **lineWidth** is specified, input text values will be wrapped as needed to
fit while preserving existing newlines. The line wrapping implementation is
rudimentary: it replaces the space before the word that overflows with a line
feed (`\n`). Lines might also be split on words that contain a soft-hyphen
(`\xad`), replacing it with a hyphen (-). For non-ASCII, non-U.S. English text,
or for when a different font is used, you may get better results by
hard-wrapping the text yourself (by supplying line feeds in the input). If the
**monospace** option is truthy, the default **fontFamily** changes to monospace
and the **lineWidth** option is interpreted as characters (ch) rather than ems.

The **textOverflow** option can be used to truncate lines of text longer than
the given **lineWidth**. If the mark does not have a **title** channel, a title
with the non-truncated text is also added. The following **textOverflow** values
are supported:

- null (default) - preserve overflowing characters
- _clip_ or _clip-end_ - remove characters from the end
- _clip-start_ - remove characters from the start
- _ellipsis_ or _ellipsis-end_ - replace characters from the end with an
  ellipsis (…)
- _ellipsis-start_ - replace characters from the start with an ellipsis (…)
- _ellipsis-middle_ - replace characters from the middle with an ellipsis (…)

The **fontSize** and **rotate** options can be specified as either channels or
constants. When fontSize or rotate is specified as a number, it is interpreted
as a constant; otherwise it is interpreted as a channel.

If the **frameAnchor** option is not specified, then **textAnchor** and
**lineAnchor** default to middle. Otherwise, **textAnchor** defaults to start if
**frameAnchor** is on the left, end if **frameAnchor** is on the right, and
otherwise middle. Similarly, **lineAnchor** defaults to top if **frameAnchor**
is on the top, bottom if **frameAnchor** is on the bottom, and otherwise middle.

The **paintOrder** option defaults to _stroke_ and the **strokeWidth** option
defaults to 3. By setting **fill** to the foreground color and **stroke** to the
background color (such as _black_ and _white_, respectively), you can surround
text with a “halo” which may improve legibility against a busy background.

<a id="plot-marks--text--text"></a>

## text(_data_, _options_)

```js
Plot.text(driving, { x: "miles", y: "gas", text: "year" });
```

Returns a new text mark with the given _data_ and _options_. If neither the
**x** nor **y** nor **frameAnchor** options are specified, _data_ is assumed to
be an array of pairs [[_x₀_, _y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that
**x** = [_x₀_, _x₁_, _x₂_, …] and **y** = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--text--textX"></a>

## textX(_data_, _options_)

```js
Plot.textX(alphabet.map((d) => d.frequency));
```

Equivalent to [text](#plot-marks--text--text), except **x** defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
and assumes that _data_ = [_x₀_, _x₁_, _x₂_, …].

If an **interval** is specified, such as d3.utcDay, **y** is transformed to
(_interval_.floor(_y_) + _interval_.offset(_interval_.floor(_y_))) / 2. If the
interval is specified as a number _n_, _y_ will be the midpoint of two
consecutive multiples of _n_ that bracket _y_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--text--textY"></a>

## textY(_data_, _options_)

```js
Plot.textY(alphabet.map((d) => d.frequency));
```

Equivalent to [text](#plot-marks--text--text), except **y** defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity)
and assumes that _data_ = [_y₀_, _y₁_, _y₂_, …].

If an **interval** is specified, such as d3.utcDay, **x** is transformed to
(_interval_.floor(_x_) + _interval_.offset(_interval_.floor(_x_))) / 2. If the
interval is specified as a number _n_, _x_ will be the midpoint of two
consecutive multiples of _n_ that bracket _x_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

---

<a id="plot-marks--tick"></a>

# marks/tick.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tick.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";

const stateage = shallowRef([]);

onMounted(() => {
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

<a id="plot-marks--tick--tick-mark"></a>

# Tick mark

:::tip The tick mark is one of two marks in Plot for drawing horizontal or
vertical lines; it should be used when the secondary position dimension, if any,
is ordinal. When it is quantitative, use a [rule](#plot-marks--rule). :::

The **tick mark** comes in two orientations: [tickY](#plot-marks--tick--tickY)
draws a horizontal↔︎ line with a given _y_ value, while
[tickX](#plot-marks--tick--tickX) draws a vertical↕︎ line with a given _x_ value.
Ticks have an optional secondary position dimension (**x** for tickY and **y**
for tickX); this second dimension is ordinal, unlike a
[rule](#plot-marks--rule), and requires a corresponding
[band scale](#plot-features--scales).

Ticks are often used to show one-dimensional distributions, as in the “barcode”
plot below showing the proportion of the population in each age bracket across
U.S. states.

:::plot defer https://observablehq.com/@observablehq/plot-barcode

```js
Plot.plot({
  x: {
    grid: true,
    label: "Population (%)",
    percent: true,
  },
  y: {
    domain: stateage.ages, // in age order
    reverse: true,
    label: "Age (years)",
    labelAnchor: "top",
  },
  marks: [
    Plot.ruleX([0]),
    Plot.tickX(
      stateage,
      Plot.normalizeX("sum", { z: "state", x: "population", y: "age" }),
    ),
  ],
});
```

:::

Both ticks and [bars](#plot-marks--bar) have an ordinal secondary position
dimension; a tick is therefore convenient for stroking the upper bound of a bar
for emphasis, as in the bar chart below. A separate [rule](#plot-marks--rule) is
also used to denote _y_ = 0.

:::plot https://observablehq.com/@observablehq/plot-bar-and-tick

```js
Plot.plot({
  x: { label: null },
  y: { percent: true },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency", fillOpacity: 0.2 }),
    Plot.tickY(alphabet, { x: "letter", y: "frequency" }),
    Plot.ruleY([0]),
  ],
});
```

:::

When there is no secondary position dimension, a tick behaves identically to a
[rule](#plot-marks--rule). While a one-dimensional rule and tick are equivalent,
a one-dimensional rule is generally preferred, if only because the name “rule”
is more descriptive. But as an example below, a random normal distribution is
plotted below with ticks.

:::plot https://observablehq.com/@observablehq/plot-random-ticks

```js
Plot.plot({
  x: { domain: [-4, 4] },
  marks: [
    Plot.tickX({ length: 500 }, { x: d3.randomNormal(), strokeOpacity: 0.2 }),
  ],
});
```

:::

:::tip Reducing opacity allows better perception of density when ticks overlap.
:::

Ticks are also used by the [box mark](#plot-marks--box) to denote the median
value for each group.

<a id="plot-marks--tick--tick-options"></a>

## Tick options

For the required channels, see [tickX](#plot-marks--tick--tickX) and
[tickY](#plot-marks--tick--tickY). The tick mark supports the
[standard mark options](#plot-features--marks--mark-options), including insets,
and
[marker options](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md)
to add a marker (such as a dot or an arrowhead) to the start or end of the rule.
The **stroke** defaults to _currentColor_.

<a id="plot-marks--tick--tickX"></a>

## tickX(_data_, _options_)

```js
Plot.tickX(stateage, { x: "population", y: "age" });
```

Returns a new vertical↕︎ tick with the given _data_ and _options_. The following
channels are required:

- **x** - the horizontal position; bound to the _x_ scale

The following optional channels are supported:

- **y** - the vertical position; bound to the _y_ scale, which must be _band_

If the **y** channel is not specified, the tick will span the full vertical
extent of the frame.

<a id="plot-marks--tick--tickY"></a>

## tickY(_data_, _options_)

```js
Plot.tickY(stateage, { y: "population", x: "age" });
```

Returns a new horizontal↔︎ tick with the given _data_ and _options_. The
following channels are required:

- **y** - the vertical position; bound to the _y_ scale

The following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale, which must be _band_

If the **x** channel is not specified, the tick will span the full vertical
extent of the frame.

---

<a id="plot-marks--tree"></a>

# marks/tree.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tree.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const flare = shallowRef([{name: "empty"}]);

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

onMounted(() => {
  d3.csv("../data/flare.csv", d3.autoType).then((data) => (flare.value = data));
});

function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}

</script>

<a id="plot-marks--tree--tree-mark"></a>

# Tree mark <VersionBadge version="0.4.3" />

The **tree mark** produces tree diagrams using the
[tree transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/tree.md).
It is a [composite mark](#plot-features--marks--marks), consisting of a
[link](#plot-marks--link) to render links from parent to child, an optional
[dot](#plot-marks--dot) for nodes, and one or two [text](#plot-marks--text) for
node labels. The link mark uses the
[treeLink transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/tree.md#treeLink),
while the dot and text marks use the
[treeNode transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/tree.md#treeNode).

For example, here is a little family tree of Greek gods.

:::plot https://observablehq.com/@observablehq/plot-tree-and-link

```js
Plot.plot({
  axis: null,
  height: 100,
  margin: 10,
  marginLeft: 40,
  marginRight: 120,
  marks: [
    Plot.tree(gods, { textStroke: "var(--vp-c-bg)" }),
  ],
});
```

:::

Here `gods` is an array of slash-separated paths, similar to paths in a file
system. Each path represents the hierarchical position of a node in the tree.

```js-vue
gods = {{JSON.stringify(gods, null, 2)}}
```

As a more complete example, here is a visualization of a software package
hierarchy.

:::plot defer https://observablehq.com/@observablehq/plot-tree-flare

```js
Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 30,
  marginRight: 160,
  width: 688,
  height: 1800,
  marks: [
    Plot.tree(flare, {
      path: "name",
      delimiter: ".",
      textStroke: "var(--vp-c-bg)",
    }),
  ],
});
```

:::

The **treeLayout** option specifies the layout algorithm. The tree mark uses the
Reingold–Tilford “tidy” tree algorithm,
[d3.tree](https://d3js.org/d3-hierarchy/tree), by default. The
[cluster](#plot-marks--tree--cluster) convenience method sets **treeLayout** to
[d3.cluster](https://d3js.org/d3-hierarchy/cluster), aligning the leaf nodes.

:::plot https://observablehq.com/@observablehq/plot-cluster-flare

```js
Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 30,
  marginRight: 160,
  width: 688,
  height: 2400,
  marks: [
    Plot.cluster(flare, {
      path: "name",
      treeSort: "node:height",
      delimiter: ".",
      textStroke: "var(--vp-c-bg)",
    }),
  ],
});
```

:::

Here is an example of a custom **treeLayout** implementation, assigning _node_.x
and _node_.y.

```js
function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}
```

This produces an indented tree layout.

:::plot defer https://observablehq.com/@observablehq/plot-custom-tree-layout

```js
Plot.plot({
  axis: null,
  inset: 10,
  insetRight: 120,
  round: true,
  width: 200,
  height: 3600,
  marks: Plot.tree(flare, {
    path: "name",
    delimiter: ".",
    treeLayout: indent,
    strokeWidth: 1,
    curve: "step-before",
    textStroke: "none",
  }),
});
```

:::

The tree mark currently does not inform the default layout; you may find it
necessary to set the **height** and **margin**
[layout options](#plot-features--plots--layout-options) for readability.

<a id="plot-marks--tree--tree-options"></a>

## Tree options

The following options are supported:

- **fill** - the dot and text fill color; defaults to _node:internal_
- **stroke** - the link stroke color; inherits **fill** by default
- **strokeWidth** - the link stroke width
- **strokeOpacity** - the link stroke opacity
- **strokeLinejoin** - the link stroke linejoin
- **strokeLinecap** - the link stroke linecap
- **strokeMiterlimit** - the link stroke miter limit
- **strokeDasharray** - the link stroke dash array
- **strokeDashoffset** - the link stroke dash offset
- **marker** - the link start and end marker
- **markerStart** - the link start marker
- **markerEnd** - the link end marker
- **dot** - if true, whether to render a dot; defaults to false if no link
  marker
- **title** - the text and dot title; defaults to _node:path_
- **text** - the text label; defaults to _node:name_
- **textStroke** - the text stroke; defaults to _white_
- **textLayout** - the text anchoring layout
- **dx** - the text horizontal offset; defaults to 6
- **dy** - the text vertical offset; defaults to 0

Any additional _options_ are passed through to the constituent link, dot, and
text marks and their corresponding treeLink or treeNode transform.

The **textLayout** option <VersionBadge version="0.6.9" /> controls how text
labels are anchored to the node. Two layouts are supported:

- _mirrored_ - leaf-node labels are left-anchored, and non-leaf nodes
  right-anchored
- _normal_ - all labels are left-anchored

If the **treeLayout** is d3.tree or d3.cluster, the **textLayout** defaults to
_mirrored_; otherwise it defaults to _normal_.

<a id="plot-marks--tree--tree"></a>

## tree(_data_, _options_)

```js
Plot.tree(flare, { path: "name", delimiter: "." });
```

Returns a new tree mark with the given _data_ and _options_.

<a id="plot-marks--tree--cluster"></a>

## cluster(_data_, _options_)

```js
Plot.cluster(flare, { path: "name", delimiter: "." });
```

Like [tree](#plot-marks--tree--tree), except sets the **treeLayout** option to
[d3.cluster](https://d3js.org/d3-hierarchy/cluster), aligning leaf nodes, and
defaults the **textLayout** option to _mirrored_.

---

<a id="plot-marks--vector"></a>

# marks/vector.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/vector.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import {poisson} from "../components/poisson.js";
import {octave, perlin2} from "../components/perlin.js";

const noise = octave(perlin2, 2);
const wind = shallowRef([{longitude: -9.875, latitude: 45.125}, {longitude: 9.875, latitude: 59.875}, {u: 0, v: 0}, {u: 0, v: 12.184501776503668}]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

onMounted(() => {
  d3.csv("../data/wind.csv", d3.autoType).then((data) => (wind.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv"),
    d3.csv("../data/us-presidential-election-2020.csv")
  ]).then(([_us, _population, _election]) => {
    const population = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    const election = new Map(_election.map((d) => [d.fips, d]));
    for (const g of _us.objects.counties.geometries) {
      g.properties.population = population.get(g.id);
      const e = election.get(g.id);
      if (e) {
        g.properties.margin2020 = +e.margin2020;
        g.properties.votes = +e.votes;
      }
    }
    us.value = _us;
  });
});

</script>

<a id="plot-marks--vector--vector-mark"></a>

# Vector mark <VersionBadge version="0.4.0" />

:::tip See also the [arrow mark](#plot-marks--arrow), which draws arrows between
two points. :::

The **vector mark** draws little arrows, typically positioned in **x** and **y**
quantitative dimensions, with an optional magnitude (**length**) and direction
(**rotate**), as in a vector field. For example, the chart below, based on a
[LitVis example](https://github.com/gicentre/litvis/blob/main/examples/windVectors.md),
shows wind speed and direction for a section of western Europe.

:::plot defer https://observablehq.com/@observablehq/plot-wind-map

```js
Plot.plot({
  inset: 10,
  aspectRatio: 1,
  color: { label: "Speed (m/s)", zero: true, legend: true },
  marks: [
    Plot.vector(wind, {
      x: "longitude",
      y: "latitude",
      rotate: ({ u, v }) => Math.atan2(u, v) * 180 / Math.PI,
      length: ({ u, v }) => Math.hypot(u, v),
      stroke: ({ u, v }) => Math.hypot(u, v),
    }),
  ],
});
```

:::

:::info Regarding this data,
[Remote Sensing Systems](https://www.remss.com/measurements/ccmp/) says:
_“Standard U and V coordinates apply, meaning the positive U is to the right and
positive V is above the axis. U and V are relative to true north. CCMP winds are
expressed using the oceanographic convention, meaning a wind blowing toward the
Northeast has a positive U component and a positive V component… Longitude is
given in degrees East from 0.125 to 359.875 and latitude is given in degrees
North with negative values representing southern locations.”_ :::

Vectors can be used with Plot’s
[projection system](#plot-features--projections). The map below shows the margin
by which the winner of the US presidential election of 2020 won the vote in each
county. The arrow’s length encodes the difference in votes, and the orientation
and color show who won
(<svg width=12 height=12 viewBox="-11 -11 12 12" style="display: inline-block"><path d="M0,0l-10,-6m1,3.28l-1,-3.28l3.28,-1" stroke="var(--vp-c-blue)" stroke-width="1.5"></path></svg>
for the Democratic candidate, and
<svg width=12 height=12 viewBox="0 -11 12 12" style="display: inline-block"><path d="M0,0l10,-6m-1,3.28l1,-3.28l-3.28,-1" stroke="var(--vp-c-red)" stroke-width="1.5"></path></svg>
for the Republican candidate).

:::plot defer https://observablehq.com/@observablehq/plot-election-wind-map

```js
Plot.plot({
  projection: "albers-usa",
  length: { type: "sqrt", transform: Math.abs },
  marks: [
    Plot.geo(statemesh, { strokeWidth: 0.5 }),
    Plot.geo(nation),
    Plot.vector(
      counties,
      Plot.centroid({
        anchor: "start",
        length: (d) => d.properties.margin2020 * d.properties.votes,
        stroke: (d) => d.properties.margin2020 > 0 ? "red" : "blue",
        rotate: (d) => d.properties.margin2020 > 0 ? 60 : -60,
      }),
    ),
  ],
});
```

:::

The **shape** option <VersionBadge version="0.6.2" /> controls the vector’s
appearance, while the **anchor** option positions the vector relative to its
anchor point specified in **x** and **y**. The
[spike constructor](#plot-marks--vector--spike) sets the **shape** to _spike_
and the **anchor** to _start_. For example, this can be used to produce a
[spike map](https://observablehq.com/@observablehq/plot-spike) of U.S. county
population.

:::plot defer https://observablehq.com/@observablehq/plot-spike-map-example

```js
Plot.plot({
  width: 688,
  projection: "albers-usa",
  length: { range: [0, 200] },
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.5 }),
    Plot.geo(nation),
    Plot.spike(
      counties,
      Plot.geoCentroid({
        length: (d) => d.properties.population,
        stroke: "green",
      }),
    ),
  ],
});
```

:::

You can even implement a custom **shape** by supplying an object with a **draw**
method. This method takes a _context_ for drawing paths and the _length_ of the
vector. See the
[moon phase calendar](https://observablehq.com/@observablehq/plot-phases-of-the-moon)
for an example.

Lastly, here is an example showing a Perlin noise field, just because it’s
pretty:

:::plot defer https://observablehq.com/@observablehq/plot-perlin-noise

```js
Plot.plot({
  inset: 6,
  width: 1024,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.vector(poisson([0, 0, 2, 2], 4000), {
      length: ([x, y]) => (noise(x + 2, y) + 0.5) * 24,
      rotate: ([x, y]) => noise(x, y) * 360,
    }),
  ],
});
```

:::

This example uses a noise(_x_, _y_) function defined as:

```js
noise = octave(perlin2, 2);
```

See Mike Bostock’s
[Perlin Noise](https://observablehq.com/@mbostock/perlin-noise) and
[Poisson Disk Sampling](https://observablehq.com/@mbostock/poisson-disk-sampling)
notebooks for source code.

<a id="plot-marks--vector--vector-options"></a>

## Vector options

In addition to the [standard mark options](#plot-features--marks--mark-options),
the following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale
- **y** - the vertical position; bound to the _y_ scale
- **length** - the length in pixels; bound to the _length_ scale; defaults to 12
- **rotate** - the rotation angle in degrees clockwise; defaults to 0

If either of the **x** or **y** channels are not specified, the corresponding
position is controlled by the **frameAnchor** option.

The following constant options are also supported:

- **shape** - the shape of the vector; defaults to _arrow_
- **r** - a radius in pixels; defaults to 3.5
- **anchor** - one of _start_, _middle_, or _end_; defaults to _middle_
- **frameAnchor** - how to position the vector within the frame; defaults to
  _middle_

The **shape** option controls the visual appearance (path geometry) of the
vector and supports the following values:

- _arrow_ (default) - an arrow with head size proportional to its length
- _spike_ - an isosceles triangle with open base
- any object with a **draw** method; it receives a _context_, _length_, and
  _radius_

If the **anchor** is _start_, the arrow will start at the given _xy_ position
and point in the direction given by the rotation angle. If the **anchor** is
_end_, the arrow will maintain the same orientation, but be positioned such that
it ends in the given _xy_ position. If the **anchor** is _middle_, the arrow
will be likewise be positioned such that its midpoint intersects the given _xy_
position.

If the **x** channel is not specified, vectors will be horizontally centered in
the plot (or facet). Likewise if the **y** channel is not specified, vectors
will be vertically centered in the plot (or facet). Typically either _x_, _y_,
or both are specified.

The **rotate** and **length** options can be specified as either channels or
constants. When specified as a number, it is interpreted as a constant;
otherwise it is interpreted as a channel. The length defaults to 12 pixels, and
the rotate defaults to 0 degrees (pointing up↑). Vectors with a negative length
will be drawn inverted. Positive angles proceed clockwise from noon.

The **stroke** defaults to _currentColor_. The **strokeWidth** defaults to 1.5,
and the **strokeLinecap** defaults to _round_.

Vectors are drawn in input order, with the last data drawn on top. If sorting is
needed, say to mitigate overplotting by drawing the smallest vectors on top,
consider a [sort transform](#plot-transforms--sort).

<a id="plot-marks--vector--vector"></a>

## vector(_data_, _options_)

```js
Plot.vector(wind, {
  x: "longitude",
  y: "latitude",
  length: "speed",
  rotate: "direction",
});
```

Returns a new vector with the given _data_ and _options_. If neither the **x**
nor **y** options are specified, _data_ is assumed to be an array of pairs
[[_x₀_, _y₀_], [_x₁_, _y₁_], [_x₂_, _y₂_], …] such that **x** = [_x₀_, _x₁_,
_x₂_, …] and **y** = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--vector--vectorX"></a>

## vectorX(_data_, _options_)

```js
Plot.vectorX(cars.map((d) => d["economy (mpg)"]));
```

Equivalent to [vector](#plot-marks--vector--vector) except that if the **x**
option is not specified, it defaults to the identity function and assumes that
_data_ = [_x₀_, _x₁_, _x₂_, …].

<a id="plot-marks--vector--vectorY"></a>

## vectorY(_data_, _options_)

```js
Plot.vectorY(cars.map((d) => d["economy (mpg)"]));
```

Equivalent to [vector](#plot-marks--vector--vector) except that if the **y**
option is not specified, it defaults to the identity function and assumes that
_data_ = [_y₀_, _y₁_, _y₂_, …].

<a id="plot-marks--vector--spike"></a>

## spike(_data_, _options_) <VersionBadge version="0.6.2" />

```js
Plot.spike(
  counties,
  Plot.geoCentroid({ length: (d) => d.properties.population }),
);
```

Equivalent to [vector](#plot-marks--vector--vector) except that the **shape**
defaults to _spike_, the **stroke** defaults to _currentColor_, the
**strokeWidth** defaults to 1, the **fill** defaults to **stroke**, the
**fillOpacity** defaults to 0.3, and the **anchor** defaults to _start_.

---

<a id="plot-marks--waffle"></a>

# marks/waffle.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/waffle.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";

const apples = ref(512);
const unit = ref(10);

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const survey = [
  {question: "don’t go out after dark", yes: 96},
  {question: "do no activities other than school", yes: 89},
  {question: "engage in political discussion and social movements, including online", yes: 10},
  {question: "would like to do activities but are prevented by safety concerns", yes: 73}
];

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

<a id="plot-marks--waffle--waffle-mark"></a>

# Waffle mark <VersionBadge version="0.6.16" pr="2040" />

The **waffle mark** is similar to the [bar mark](#plot-marks--bar) in that it
displays a quantity (or quantitative extent) for a given category; but unlike a
bar, a waffle is subdivided into square cells that allow easier counting.
Waffles are useful for reading exact quantities. How quickly can you count the
pears 🍐 below? How many more apples 🍎 are there than bananas 🍌?

:::plot https://observablehq.com/@observablehq/plot-simple-waffle

```js
Plot.waffleY([212, 207, 315, 11], {
  x: ["apples", "bananas", "oranges", "pears"],
}).plot({ height: 420 });
```

:::

The waffle mark is often used with the
[group transform](#plot-transforms--group) to compute counts. The chart below
compares the number of female and male athletes in the 2012 Olympics.

:::plot https://observablehq.com/@observablehq/plot-waffle-group

```js
Plot.waffleY(olympians, Plot.groupX({ y: "count" }, { x: "sex" })).plot({
  x: { label: null },
});
```

:::

:::info Waffles are rendered using SVG patterns, making them more performant
than alternatives such as the [dot mark](#plot-marks--dot) for rendering many
points. :::

The **unit** option determines the quantity each waffle cell represents; it
defaults to one. The unit may be set to a value greater than one for large
quantities, or less than one (but greater than zero) for small fractional
quantities. Try changing the unit below to see its effect.

<p>
  <span class="label-input">
    Unit:
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="1" v-model="unit" /> 1</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="2" v-model="unit" /> 2</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="5" v-model="unit" /> 5</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="10" v-model="unit" /> 10</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="25" v-model="unit" /> 25</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="50" v-model="unit" /> 50</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="100" v-model="unit" /> 100</label>
  </span>
</p>

:::plot https://observablehq.com/@observablehq/plot-waffle-unit

```js
Plot.waffleY(
  olympians,
  Plot.groupZ({ y: "count" }, { fx: "date_of_birth", unit }),
).plot({ fx: { interval: "5 years", label: null } });
```

:::

:::tip Use [faceting](#plot-features--facets) as an alternative to supplying an
ordinal channel (_i.e._, _fx_ instead of _x_ for a vertical waffleY). The facet
scale’s **interval** option then allows grouping by a quantitative or temporal
variable, such as the athlete’s year of birth in the chart below. :::

While waffles typically represent integer quantities, say to count people or
days, they can also encode fractional values with a partial first or last cell.
Set the **round** option to true to disable partial cells, or to Math.ceil or
Math.floor to round up or down.

Like bars, waffles can be [stacked](#plot-transforms--stack), and implicitly
apply the stack transform when only a single quantitative channel is supplied.

:::plot https://observablehq.com/@observablehq/plot-stacked-waffles

```js
Plot.waffleY(
  olympians,
  Plot.groupZ({ y: "count" }, {
    fill: "sex",
    sort: "sex",
    fx: "weight",
    unit: 10,
  }),
).plot({ fx: { interval: 10 }, color: { legend: true } });
```

:::

Waffles can also be used to highlight a proportion of the whole. The chart below
recreates a graphic of survey responses from
[“Teens in Syria”](https://www.economist.com/graphic-detail/2015/08/19/teens-in-syria)
by _The Economist_ (August 19, 2015); positive responses are in orange, while
negative responses are in gray. The **rx** option is used to produce circles
instead of squares.

:::plot https://observablehq.com/@observablehq/plot-survey-waffle

```js
Plot.plot({
  axis: null,
  label: null,
  height: 260,
  marginTop: 20,
  marginBottom: 70,
  title: "Subdued",
  subtitle: "Of 120 surveyed Syrian teenagers:",
  marks: [
    Plot.axisFx({ lineWidth: 10, anchor: "bottom", dy: 20 }),
    Plot.waffleY({ length: 1 }, { y: 120, fillOpacity: 0.4, rx: "100%" }),
    Plot.waffleY(survey, {
      fx: "question",
      y: "yes",
      rx: "100%",
      fill: "orange",
    }),
    Plot.text(survey, {
      fx: "question",
      text: (d) => (d.yes / 120).toLocaleString("en-US", { style: "percent" }),
      frameAnchor: "bottom",
      lineAnchor: "top",
      dy: 6,
      fill: "orange",
      fontSize: 24,
      fontWeight: "bold",
    }),
  ],
});
```

:::

The waffle mark comes in two orientations: waffleY extends vertically↑, while
waffleX extends horizontally→. The waffle mark automatically determines the
appropriate number of cells per row or per column (depending on orientation)
such that the cells are square, don’t overlap, and are consistent with position
scales.

<p>
  <label class="label-input">
    <span>Apples:</span>
    <input type="range" v-model.number="apples" min="10" max="1028" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{apples}}</span>
  </label>
</p>

:::plot

```js
Plot.waffleX([apples], { y: ["apples"] }).plot({ height: 240 });
```

:::

:::info The number of rows in the waffle above is guaranteed to be an integer,
but it might not be a multiple or factor of the _x_-axis tick interval. For
example, the waffle might have 15 rows while the _x_-axis shows ticks every 100
units. ::: :::tip To set the number of rows (or columns) directly, use the
**multiple** option, though note that manually setting the multiple may result
in non-square cells if there isn’t enough room. Alternatively, you can bias the
automatic multiple while preserving square cells by setting the **padding**
option on the corresponding band scale: padding defaults to 0.1; a higher value
may produce more rows, while a lower (or zero) value may produce fewer rows. :::

<a id="plot-marks--waffle--waffle-options"></a>

## Waffle options

For required channels, see the [bar mark](#plot-marks--bar). The waffle mark
supports the [standard mark options](#plot-features--marks), including
[insets](#plot-features--marks--insets) and
[rounded corners](#plot-features--marks--rounded-corners). The **stroke**
defaults to _none_. The **fill** defaults to _currentColor_ if the stroke is
_none_, and to _none_ otherwise.

The waffle mark supports a few additional options to control the rendering of
cells:

- **unit** - the quantity each cell represents; defaults to 1
- **multiple** - the number of cells per row (or column); defaults to undefined
- **gap** - the separation between adjacent cells, in pixels; defaults to 1
- **round** - whether to round values to avoid partial cells; defaults to false

If **multiple** is undefined (the default), the waffle mark will use as many
cells per row (or column) that fits within the available bandwidth while
ensuring that the cells are square, or one cell per row if square cells are not
possible. You can change the rounding behavior by specifying **round** as a
function, such as Math.floor or Math.ceil; true is equivalent to Math.round.

<a id="plot-marks--waffle--waffleX"></a>

## waffleX(_data_, _options_)

```js
Plot.waffleX(olympians, Plot.groupY({ x: "count" }, { y: "sport" }));
```

Returns a new horizontal→ waffle with the given _data_ and _options_. The
following channels are required:

- **x1** - the starting horizontal position; bound to the _x_ scale
- **x2** - the ending horizontal position; bound to the _x_ scale

The following optional channels are supported:

- **y** - the vertical position; bound to the _y_ scale, which must be _band_

If neither the **x1** nor **x2** option is specified, the **x** option may be
specified as shorthand to apply an implicit
[stackX transform](#plot-transforms--stack); this is the typical configuration
for a horizontal waffle chart with columns aligned at _x_ = 0. If the **x**
option is not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity).
If _options_ is undefined, then it defaults to **x2** as identity and **y** as
the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed
to waffleX to make a quick sequential waffle chart. If the **y** channel is not
specified, the column will span the full vertical extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be
derived from **x**: _interval_.floor(_x_) is invoked for each _x_ to produce
_x1_, and _interval_.offset(_x1_) is invoked for each _x1_ to produce _x2_. If
the interval is specified as a number _n_, _x1_ and _x2_ are taken as the two
consecutive multiples of _n_ that bracket _x_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

<a id="plot-marks--waffle--waffleY"></a>

## waffleY(_data_, _options_)

```js
Plot.waffleY(olympians, Plot.groupX({ y: "count" }, { x: "sport" }));
```

Returns a new vertical↑ waffle with the given _data_ and _options_. The
following channels are required:

- **y1** - the starting vertical position; bound to the _y_ scale
- **y2** - the ending vertical position; bound to the _y_ scale

The following optional channels are supported:

- **x** - the horizontal position; bound to the _x_ scale, which must be _band_

If neither the **y1** nor **y2** option is specified, the **y** option may be
specified as shorthand to apply an implicit
[stackY transform](#plot-transforms--stack); this is the typical configuration
for a vertical waffle chart with columns aligned at _y_ = 0. If the **y** option
is not specified, it defaults to
[identity](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#identity).
If _options_ is undefined, then it defaults to **y2** as identity and **x** as
the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed
to waffleY to make a quick sequential waffle chart. If the **x** channel is not
specified, the column will span the full horizontal extent of the plot (or
facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be
derived from **y**: _interval_.floor(_y_) is invoked for each _y_ to produce
_y1_, and _interval_.offset(_y1_) is invoked for each _y1_ to produce _y2_. If
the interval is specified as a number _n_, _y1_ and _y2_ are taken as the two
consecutive multiples of _n_ that bracket _y_. Named UTC intervals such as _day_
are also supported; see [scale options](#plot-features--scales--scale-options).

---

<a id="plot-transforms--bin"></a>

# transforms/bin.md

Source: https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/bin.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, ref, shallowRef, onMounted} from "vue";

const cumulatives = ref("+1");
const cumulative = computed(() => +cumulatives.value);
const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

<a id="plot-transforms--bin--bin-transform"></a>

# Bin transform

:::tip The bin transform is for aggregating quantitative or temporal data. For
ordinal or nominal data, use the [group transform](#plot-transforms--group). See
also the
[hexbin transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md).
:::

The **bin transform** groups quantitative or temporal data — continuous
measurements such as heights, weights, or temperatures — into discrete bins. You
can then compute summary statistics for each bin, such as a count, sum, or
proportion. The bin transform is most often used to make histograms or heatmaps
with the [rect mark](#plot-marks--rect).

For example, here is a histogram showing the distribution of weights of Olympic
athletes.

:::plot defer https://observablehq.com/@observablehq/plot-a-simple-histogram

```js
Plot.plot({
  y: { grid: true },
  marks: [
    Plot.rectY(olympians, Plot.binX({ y: "count" }, { x: "weight" })),
    Plot.ruleY([0]),
  ],
});
```

:::

The binX transform takes **x** as input and outputs **x1** and **x2**
representing the extent of each bin in _x_. The _outputs_ argument (here
`{y: "count"}`) declares additional output channels (**y**) and the associated
reducer (_count_). Hence the height of each rect above represents the number of
athletes in the corresponding bin, _i.e._, the number of athletes with a similar
weight.

While the binX transform is often used to generate **y**, it can output any
channel. Below, the **fill** channel represents count per bin, resulting in a
one-dimensional heatmap.

:::plot defer https://observablehq.com/@observablehq/plot-color-bins

```js-vue
Plot
  .rect(olympians, Plot.binX({fill: "count"}, {x: "weight"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```

:::

You can partition bins using **z**. If **z** is undefined, it defaults to
**fill** or **stroke**, if any. In conjunction with the rectY mark’s implicit
[stackY transform](#plot-transforms--stack), this will produce a stacked
histogram.

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram

```js
Plot.plot({
  y: { grid: true },
  color: { legend: true },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, { x: "weight", fill: "sex" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip You can invoke the stack transform explicitly as
`Plot.stackY(Plot.binX({y: "count"}, {x: "weight", fill: "sex"}))` to produce an
identical chart. :::

You can opt-out of the implicit stackY transform by having binX generate **y1**
or **y2** instead of **y** (and similarly **x1** or **x2** for stackX and binY).
When overlapping marks, use either opacity or blending to make the overlap
visible.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram

```js-vue
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y2: "count"}, {x: "weight", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```

:::

:::warning CAUTION While the **mixBlendMode** option is useful for mitigating
occlusion, it can be slow to render if there are many elements. More than two
overlapping histograms may also be hard to read. :::

The bin transform comes in three orientations:

- [binX](#plot-transforms--bin--binX) bins on **x**, and often outputs **y** as
  in a histogram with vertical↑ rects;
- [binY](#plot-transforms--bin--binY) bins on **y**, and often outputs **x** as
  in a histogram with horizontal→ rects; and
- [bin](#plot-transforms--bin--bin) bins on both **x** and **y**, and often
  outputs to **fill** or **r** as in a heatmap.

As you might guess, the binY transform with the rectX mark produces a histogram
with horizontal→ rects.

:::plot defer https://observablehq.com/@observablehq/plot-horizontal-histogram

```js
Plot.plot({
  x: { grid: true },
  marks: [
    Plot.rectX(olympians, Plot.binY({ x: "count" }, { y: "weight" })),
    Plot.ruleX([0]),
  ],
});
```

:::

You can produce a two-dimensional heatmap with bin transform and a rect mark by
generating a **fill** output channel. Below, color encodes the number of
athletes in each bin (of similar height and weight).

:::plot defer https://observablehq.com/@observablehq/plot-olympians-heatmap

```js-vue
Plot
  .rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```

:::

The bin transform also outputs **x** and **y** channels representing bin
centers. These can be used to place a [dot mark](#plot-marks--dot) whose size
again represents the number of athletes in each bin.

:::plot defer https://observablehq.com/@observablehq/plot-dot-heatmap

```js
Plot.plot({
  r: { range: [0, 6] }, // generate slightly smaller dots
  marks: [
    Plot.dot(olympians, Plot.bin({ r: "count" }, { x: "weight", y: "height" })),
  ],
});
```

:::

We can add the **stroke** channel to show overlapping distributions by sex.

:::plot https://observablehq.com/@observablehq/plot-dot-heatmap

```js
Plot.plot({
  r: { range: [0, 6] },
  marks: [
    Plot.dot(
      olympians,
      Plot.bin({ r: "count" }, { x: "weight", y: "height", stroke: "sex" }),
    ),
  ],
});
```

:::

Similarly the binX and binY transforms generate respective **x** and **y**
channels for one-dimensional binning.

:::plot https://observablehq.com/@observablehq/plot-dot-bins

```js
Plot.plot({
  r: { range: [0, 14] },
  marks: [
    Plot.dot(olympians, Plot.binX({ r: "count" }, { x: "weight" })),
  ],
});
```

:::

In addition to rect and dot, you can even use continuous marks such as
[area](#plot-marks--area) and [line](#plot-marks--line). In this case you should
set the bin transform’s **filter** option to null so that empty bins are
included in the output; otherwise, the area or line would mislead by
interpolating over missing bins.

:::plot defer https://observablehq.com/@observablehq/plot-density-estimation

```js
Plot.plot({
  y: { grid: true },
  marks: [
    Plot.areaY(
      olympians,
      Plot.binX({ y: "count", filter: null }, {
        x: "weight",
        fillOpacity: 0.2,
      }),
    ),
    Plot.lineY(
      olympians,
      Plot.binX({ y: "count", filter: null }, { x: "weight" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

The **cumulative** option produces a cumulative distribution. Below, each bin
represents the number of athletes with the given weight _or less_. To have each
bin represent the number of athletes with the given weight _or more_, set
**cumulative** to −1.

<p>
  <span class="label-input">
    Cumulative:
    <label style="margin-left: 0.5em; font-variant: tabular-nums;"><input type="radio" name="cumulative" value="-1" v-model="cumulatives" /> -1 (reverse)</label>
    <label style="margin-left: 0.5em; font-variant: tabular-nums;"><input type="radio" name="cumulative" value="+1" v-model="cumulatives" /> +1 (true)</label>
  </span>
</p>

:::plot

```js
Plot.plot({
  marginLeft: 60,
  y: { grid: true },
  marks: [
    Plot.rectY(
      olympians,
      Plot.binX({ y: "count" }, { x: "weight", cumulative }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

The bin transform works with Plot’s [faceting system](#plot-features--facets),
partitioning bins by facet. Below, we compare the weight distributions of
athletes within each sport using the _proportion-facet_ reducer. Sports are
sorted by median weight: gymnasts tend to be the lightest, and basketball
players the heaviest.

:::plot defer

```js-vue
Plot.plot({
  marginLeft: 100,
  padding: 0,
  x: {grid: true},
  fy: {domain: d3.groupSort(olympians.filter((d) => d.weight), (g) => d3.median(g, (d) => d.weight), (d) => d.sport)},
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [Plot.rect(olympians, Plot.binX({fill: "proportion-facet"}, {x: "weight", fy: "sport", inset: 0.5}))]
})
```

:::

The bin transform sets default insets for a one-pixel gap between rects. You can
set explicit insets if you prefer, say if you want the rects to touch. In this
case we recommend rounding on the _x_ scale to avoid antialiasing artifacts
between rects.

:::plot defer

```js
Plot.plot({
  x: { round: true },
  y: { grid: true },
  marks: [
    Plot.rectY(olympians, Plot.binX({ y: "count" }, { x: "weight", inset: 0 })),
    Plot.ruleY([0]),
  ],
});
```

:::

<a id="plot-transforms--bin--bin-options"></a>

## Bin options

Given input _data_ = [_d₀_, _d₁_, _d₂_, …], by default the resulting binned data
is an array of arrays where each inner array is a subset of the input data
[[_d₁_, _d₂_, …], [_d₀_, …], …]. Each inner array is in input order. The outer
array is in ascending order according to the associated dimension (_x_ then
_y_).

By specifying a reducer for the **data** output, as described below, you can
change how the binned data is computed. The outputs may also include **filter**
and **sort** options specified as reducers, and a **reverse** option to reverse
the order of generated bins. By default, empty bins are omitted, and non-empty
bins are generated in ascending threshold order.

In addition to data, the following channels are automatically output:

- **x1** - the starting horizontal position of the bin
- **x2** - the ending horizontal position of the bin
- **x** - the horizontal center of the bin
- **y1** - the starting vertical position of the bin
- **y2** - the ending vertical position of the bin
- **y** - the vertical center of the bin
- **z** - the first value of the _z_ channel, if any
- **fill** - the first value of the _fill_ channel, if any
- **stroke** - the first value of the _stroke_ channel, if any

The **x1**, **x2**, and **x** output channels are only computed by the binX and
bin transform; similarly the **y1**, **y2**, and **y** output channels are only
computed by the binY and bin transform. The **x** and **y** output channels are
lazy: they are only computed if needed by a downstream mark or transform.
Conversely, the **x1** and **x2** outputs default to undefined if **x** is
explicitly defined; and the **y1** and **y2** outputs default to undefined if
**y** is explicitly defined.

You can declare additional output channels by specifying the channel name and
desired reducer in the _outputs_ object which is the first argument to the
transform. For example, to use binX to generate a **y** channel of bin counts as
in a frequency histogram:

```js
Plot.binX({ y: "count" }, { x: "culmen_length_mm" });
```

The following named reducers are supported:

- _first_ - the first value, in input order
- _last_ - the last value, in input order
- _count_ - the number of elements (frequency)
- _distinct_ - the number of distinct values
- _sum_ - the sum of values
- _proportion_ - the sum proportional to the overall total (weighted frequency)
- _proportion-facet_ - the sum proportional to the facet total
- _min_ - the minimum value
- _min-index_ - the zero-based index of the minimum value
- _max_ - the maximum value
- _max-index_ - the zero-based index of the maximum value
- _mean_ - the mean value (average)
- _median_ - the median value
- _mode_ - the value with the most occurrences
- _pXX_ - the percentile value, where XX is a number in [00,99]
- _deviation_ - the standard deviation
- _variance_ - the variance per
  [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
- _identity_ - the array of values
- _x_ - the middle of the bin’s _x_ extent (when binning on _x_)
- _x1_ - the lower bound of the bin’s _x_ extent (when binning on _x_)
- _x2_ - the upper bound of the bin’s _x_ extent (when binning on _x_)
- _y_ - the middle of the bin’s _y_ extent (when binning on _y_)
- _y1_ - the lower bound of the bin’s _y_ extent (when binning on _y_)
- _y2_ - the upper bound of the bin’s _y_ extent (when binning on _y_)
- _z_ <VersionBadge version="0.6.14" pr="1959" /> - the bin’s _z_ value (_z_,
  _fill_, or _stroke_)

In addition, a reducer may be specified as:

- a function to be passed the array of values for each bin and the extent of the
  bin
- an object with a **reduceIndex** method, and optionally a **scope**

In the last case, the **reduceIndex** method is repeatedly passed three
arguments: the index for each bin (an array of integers), the input channel’s
array of values, and the extent of the bin (an object {data, x1, x2, y1, y2});
it must then return the corresponding aggregate value for the bin.

If the reducer object’s **scope** is _data_, then the **reduceIndex** method is
first invoked for the full data; the return value of the **reduceIndex** method
is then made available as a third argument (making the extent the fourth
argument). Similarly if the **scope** is _facet_, then the **reduceIndex**
method is invoked for each facet, and the resulting reduce value is made
available while reducing the facet’s bins. (This optional **scope** is used by
the _proportion_ and _proportion-facet_ reducers.)

Most reducers require binding the output channel to an input channel; for
example, if you want the **y** output channel to be a _sum_ (not merely a
count), there should be a corresponding **y** input channel specifying which
values to sum. If there is not, _sum_ will be equivalent to _count_.

```js
Plot.binX({ y: "sum" }, { x: "culmen_length_mm", y: "body_mass_g" });
```

You can control whether a channel is computed before or after binning. If a
channel is declared only in _options_ (and it is not a special group-eligible
channel such as **x**, **y**, **z**, **fill**, or **stroke**), it will be
computed after binning and be passed the binned data: each datum is the array of
input data corresponding to the current bin.

```js
Plot.binX({ y: "count" }, {
  x: "economy (mpg)",
  title: (data) => data.map((d) => d.name).join("\n"),
});
```

This is equivalent to declaring the channel only in _outputs_.

```js
Plot.binX({ y: "count", title: (data) => data.map((d) => d.name).join("\n") }, {
  x: "economy (mpg)",
});
```

However, if a channel is declared in both _outputs_ and _options_, then the
channel in _options_ is computed before binning and can then be aggregated using
any built-in reducer (or a custom reducer function) during the bin transform.

```js
Plot.binX({ y: "count", title: (names) => names.join("\n") }, {
  x: "economy (mpg)",
  title: "name",
});
```

To control how the quantitative dimensions _x_ and _y_ are divided into bins,
the following options are supported:

- **thresholds** - the threshold values; see below
- **interval** - an alternative method of specifying thresholds
- **domain** - values outside the domain will be omitted
- **cumulative** - if positive, each bin will contain all lesser bins

These options may be specified either on the _options_ or _outputs_ object. If
the **domain** option is not specified, it defaults to the minimum and maximum
of the corresponding dimension (_x_ or _y_), possibly niced to match the
threshold interval to ensure that the first and last bin have the same width as
other bins. If **cumulative** is negative (-1 by convention), each bin will
contain all _greater_ bins rather than all _lesser_ bins, representing the
[complementary cumulative distribution](https://en.wikipedia.org/wiki/Cumulative_distribution_function#Complementary_cumulative_distribution_function_.28tail_distribution.29).

To pass separate binning options for **x** and **y**, use an object with the
options above and a **value** option to specify the input channel values.

```js
Plot.binX({ y: "count" }, { x: { thresholds: 20, value: "culmen_length_mm" } });
```

The **thresholds** option may be specified as a named method or a variety of
other ways:

- _auto_ (default) - Scott’s rule, capped at 200
- _freedman-diaconis_ - the
  [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Freedman–Diaconis_rule)
- _scott_ -
  [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Scott.27s_normal_reference_rule)
- _sturges_ -
  [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Sturges.27_formula)
- a count (hint) representing the desired number of bins
- an array of _n_ threshold values for _n_ - 1 bins
- an interval or time interval (for temporal binning; see below)
- a function that returns an array, count, or time interval

If the **thresholds** option is specified as a function, it is passed three
arguments: the array of input values, the domain minimum, and the domain
maximum. If a number, [d3.ticks](https://d3js.org/d3-array/ticks) or
[d3.utcTicks](https://d3js.org/d3-time#utcTicks) is used to choose suitable nice
thresholds. If an interval, it must expose an _interval_.floor(_value_),
_interval_.ceil(_value_), _interval_.offset(_value_), and
_interval_.range(_start_, _stop_) methods. If the interval is a time interval
such as "day" (equivalently, d3.utcDay), or if the thresholds are specified as
an array of dates, then the binned values are implicitly coerced to dates. Time
intervals are intervals that are also functions that return a Date instance when
called with no arguments.

If the **interval** option is used instead of **thresholds**, it may be either
an interval, a time interval, or a number. If a number _n_, threshold values are
consecutive multiples of _n_ that span the domain; otherwise, the **interval**
option is equivalent to the **thresholds** option. When the thresholds are
specified as an interval, and the default **domain** is used, the domain will
automatically be extended to start and end to align with the interval.

The bin transform supports grouping in addition to binning: you can subdivide
bins by up to two additional ordinal or categorical dimensions (not including
faceting). If any of **z**, **fill**, or **stroke** is a channel, the first of
these channels will be used to subdivide bins. Similarly, binX will group on
**y** if **y** is not an output channel, and binY will group on **x** if **x**
is not an output channel. For example, for a stacked histogram:

```js
Plot.binX({ y: "count" }, { x: "body_mass_g", fill: "species" });
```

Lastly, the bin transform changes the default
[mark insets](#plot-features--marks--mark-options): binX changes the defaults
for **insetLeft** and **insetRight**; binY changes the defaults for **insetTop**
and **insetBottom**; bin changes all four.

<a id="plot-transforms--bin--bin"></a>

## bin(_outputs_, _options_)

```js
Plot.rect(olympians, Plot.bin({ fill: "count" }, { x: "weight", y: "height" }));
```

Bins on **x** and **y**. Also groups on the first channel of **z**, **fill**, or
**stroke**, if any.

<a id="plot-transforms--bin--binX"></a>

## binX(_outputs_, _options_)

```js
Plot.rectY(olympians, Plot.binX({ y: "count" }, { x: "weight" }));
```

Bins on **x**. Also groups on **y** and the first channel of **z**, **fill**, or
**stroke**, if any.

<a id="plot-transforms--bin--binY"></a>

## binY(_outputs_, _options_)

```js
Plot.rectX(olympians, Plot.binY({ x: "count" }, { y: "weight" }));
```

Bins on **y**. Also groups on **x** and first channel of **z**, **fill**, or
**stroke**, if any.

---

<a id="plot-transforms--centroid"></a>

# transforms/centroid.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/centroid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";

const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const states = computed(() => us.value ? topojson.feature(us.value, us.value.objects.states).features : []);
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : []);

onMounted(() => {
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

<a id="plot-transforms--centroid--centroid-transform"></a>

# Centroid transform <VersionBadge version="0.6.2" />

Plot offers two transforms that derive centroids from GeoJSON geometries:
[centroid](#plot-transforms--centroid--centroid) and
[geoCentroid](#plot-transforms--centroid--geoCentroid). These transforms can be
used by any mark that accepts **x** and **y** channels. Below, a
[text mark](#plot-marks--text) labels the U.S. states.

:::plot defer https://observablehq.com/@observablehq/plot-state-labels

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh),
    Plot.text(
      states,
      Plot.centroid({
        text: (d) => d.properties.name,
        fill: "currentColor",
        stroke: "var(--vp-c-bg)",
      }),
    ),
  ],
});
```

:::

For fun, we can pass county centroids to the
[voronoi mark](#plot-marks--delaunay).

:::plot defer https://observablehq.com/@observablehq/plot-centroid-voronoi

```js
Plot.voronoi(counties, Plot.centroid()).plot({ projection: "albers" });
```

:::

While the centroid transform computes the centroid of a geometry _after_
projection, the geoCentroid transform computes it _before_ projection, then
projects the resulting coordinates. This difference has a few implications, as
follows.

As an
[initializer](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/transforms.md#custom-initializers),
the centroid transform operates _after_ the geometries have been projected to
screen coordinates. The resulting **x** and **y** channels reference the pixel
coordinates of the planar centroid of the _projected_ shapes. No assumption is
made about the geometries: they can be in any coordinate system, and the
returned value is in the frame — as long as the projected geometry returns at
least one visible point.

:::plot defer https://observablehq.com/@observablehq/plot-centroid-dot

```js
Plot.dot(counties, Plot.centroid()).plot({ projection: "albers-usa" });
```

:::

The geoCentroid transform is more specialized as the **x** and **y** channels it
derives represent the longitudes and latitudes of the centroids of the given
GeoJSON geometries, before projection. It expects the geometries to be specified
in _spherical_ coordinates. It is more correct, in a geospatial sense — for
example, the spherical centroid always represents the center of mass of the
original shape, and it will be rotated exactly in line with the projection’s
rotate argument. However, this also means that it might land outside the frame
if only a part of the land mass is visible, and might be clipped by the
projection. In practice, the difference is generally imperceptible.

:::plot defer https://observablehq.com/@observablehq/plot-centroid-dot

```js
Plot.dot(counties, Plot.geoCentroid()).plot({ projection: "albers-usa" });
```

:::

The geoCentroid transform is slightly faster than the centroid initializer
— which might be useful if you have tens of thousands of features and want to
show their density on a
[hexbin map](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/hexbin.md):

:::plot defer https://observablehq.com/@observablehq/plot-centroid-hexbin

```js
Plot.dot(counties, Plot.hexbin({ r: "count" }, Plot.geoCentroid())).plot({
  projection: "albers",
});
```

:::

Combined with the
[pointer transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/interactions/pointer.md),
the centroid transform can add
[interactive tips](https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tip.md)
on a map:

:::plot defer https://observablehq.com/@observablehq/plot-state-centroids

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.2 }),
    Plot.geo(nation),
    Plot.dot(
      states,
      Plot.centroid({ fill: "red", stroke: "var(--vp-c-bg-alt)" }),
    ),
    Plot.tip(
      states,
      Plot.pointer(Plot.centroid({ title: (d) => d.properties.name })),
    ),
  ],
});
```

:::

<a id="plot-transforms--centroid--centroid"></a>

## centroid(_options_)

```js
Plot.centroid({ geometry: Plot.identity });
```

The centroid initializer derives **x** and **y** channels representing the
planar (projected) centroids for the given GeoJSON geometry. If the **geometry**
option is not specified, the mark’s data is assumed to be GeoJSON objects.

<a id="plot-transforms--centroid--geoCentroid"></a>

## geoCentroid(_options_)

```js
Plot.geoCentroid({ geometry: Plot.identity });
```

The geoCentroid transform derives **x** and **y** channels representing the
spherical centroids for the given GeoJSON geometry. If the **geometry** option
is not specified, the mark’s data is assumed to be GeoJSON objects.

---

<a id="plot-transforms--group"></a>

# transforms/group.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/group.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

<a id="plot-transforms--group--group-transform"></a>

# Group transform

:::tip The group transform is for aggregating ordinal or nominal data. For
quantitative or temporal data, use the [bin transform](#plot-transforms--bin).
:::

The **group transform** groups ordinal or nominal data — discrete values such as
name, type, or category. You can then compute summary statistics for each group,
such as a count, sum, or proportion. The group transform is most often used to
make bar charts with the [bar mark](#plot-marks--bar).

For example, the bar chart below shows a distribution of Olympic athletes by
sport.

:::plot defer
https://observablehq.com/@observablehq/plot-group-olympic-athletes-by-sport

```js
Plot.plot({
  marginBottom: 100,
  x: { label: null, tickRotate: 90 },
  y: { grid: true },
  marks: [
    Plot.barY(olympians, Plot.groupX({ y: "count" }, { x: "sport" })),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip Ordinal domains are sorted naturally (alphabetically) by default. Either
set the [scale **domain**](#plot-features--scales) explicitly to change the
order, or use the mark
[**sort** option](#plot-features--scales--sort-mark-option) to derive the scale
domain from a channel. :::

The groupX transform groups on **x**. The _outputs_ argument (here
`{y: "count"}`) declares desired output channels (**y**) and the associated
reducer (_count_). Hence the height of each bar above represents the number of
Olympic athletes by sport.

<!-- For example, to sort **x** by descending **y**: -->

<!-- :::plot
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y: "count"}, {x: "sport", sort: {x: "-y"}})),
    Plot.ruleY([0])
  ]
})
```
::: -->

While the groupX transform is often used to generate **y**, it can output to any
channel. For example, by declaring **r** in _outputs_, we can generate dots of
size proportional to the number of athletes in each sport.

:::plot https://observablehq.com/@observablehq/plot-groups-as-dots

```js
Plot.plot({
  marginBottom: 100,
  x: { label: null, tickRotate: 90 },
  r: { range: [0, 14] },
  marks: [
    Plot.dot(olympians, Plot.groupX({ r: "count" }, { x: "sport" })),
  ],
});
```

:::

The **fill** channel meanwhile will produce a one-dimensional heatmap. Since
there is no **y** channel below, we use a [cell](#plot-marks--cell) instead of a
bar.

:::plot defer https://observablehq.com/@observablehq/plot-groups-as-cells

```js-vue
Plot.plot({
  marginBottom: 80,
  x: {tickRotate: 90},
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.groupX({fill: "count"}, {x: "sport"}))
  ]
})
```

:::

We aren’t limited to the _count_ reducer. We can use the _mode_ reducer, for
example, to show which sex is more prevalent in each sport:
<span :style="{borderBottom: `solid 2px ${scheme[1]}`}">men</span> are
represented more often than
<span :style="{borderBottom: `solid 2px ${scheme[0]}`}">women</span> in every
sport except gymnastics and fencing.

:::plot defer https://observablehq.com/@observablehq/plot-group-and-mode-reducer

```js
Plot.plot({
  marginBottom: 80,
  x: { tickRotate: 90 },
  marks: [
    Plot.cell(
      olympians,
      Plot.groupX({ fill: "mode" }, { fill: "sex", x: "sport" }),
    ),
  ],
});
```

:::

You can partition groups using **z**. If **z** is undefined, it defaults to
**fill** or **stroke**, if any. In conjunction with the barY mark’s implicit
[stackY transform](#plot-transforms--stack), this will produce stacked bars.

:::plot defer https://observablehq.com/@observablehq/plot-two-class-stacked-bars

```js
Plot.plot({
  marginBottom: 100,
  x: { label: null, tickRotate: 90 },
  y: { grid: true },
  color: { legend: true },
  marks: [
    Plot.barY(
      olympians,
      Plot.groupX({ y: "count" }, { x: "sport", fill: "sex" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip You can invoke the stack transform explicitly as
`Plot.stackY(Plot.groupX({y: "count"}, {x: "sport", fill: "sex"}))`, producing
an identical chart. :::

You can opt-out of the implicit stackY transform by having groupX generate
**y1** or **y2** instead of **y** (and similarly **x1** or **x2** for stackX and
groupY). When overlapping marks, use either opacity or blending to make the
overlap visible.

:::plot defer
https://observablehq.com/@observablehq/plot-two-class-overlapping-bars

```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y2: "count"}, {x: "sport", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```

:::

:::warning CAUTION While the **mixBlendMode** option is useful for mitigating
occlusion, it can be slow to render if there are many elements. More than two
overlapping histograms may also be hard to read. :::

Perhaps better would be to make a grouped bar chart using
[faceting](#plot-features--facets). This is accomplished by setting the **fx**
channel to facet horizontally on _sport_, while the **x** channel is used within
each facet to draw side-by-side bars for each _sex_. The group transform
automatically partitions groups by facet.

:::plot defer
https://observablehq.com/@observablehq/plot-olympians-grouped-bar-chart

```js
Plot.plot({
  marginBottom: 100,
  fx: { padding: 0, label: null, tickRotate: 90, tickSize: 6 },
  x: { axis: null, paddingOuter: 0.2 },
  y: { grid: true },
  color: { legend: true },
  marks: [
    Plot.barY(
      olympians,
      Plot.groupX({ y2: "count" }, { x: "sex", fx: "sport", fill: "sex" }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

Alternatively, below we use directional arrows (a [link mark](#plot-marks--link)
with
[markers](https://github.com/observablehq/plot/tree/v0.6.17/docs/features/markers.md))
to indicate the difference in counts of
<span :style="{borderBottom: `solid 2px ${scheme[1]}`}">male</span> and
<span :style="{borderBottom: `solid 2px ${scheme[0]}`}">female</span> athletes
by sport. The color of the arrow indicates which sex is more prevalent, while
its length is proportional to the difference.

:::plot defer https://observablehq.com/@observablehq/plot-difference-arrows

```js
Plot.plot({
  marginBottom: 100,
  x: { label: null, tickRotate: 90 },
  y: { grid: true, label: "Frequency" },
  color: {
    type: "categorical",
    domain: [-1, 1],
    unknown: "#aaa",
    transform: Math.sign,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.link(
      olympians,
      Plot.groupX(
        {
          y1: (D) => d3.sum(D, (d) => d === "female"),
          y2: (D) => d3.sum(D, (d) => d === "male"),
          stroke: (D) =>
            d3.sum(D, (d) => d === "male") - d3.sum(D, (d) => d === "female"),
        },
        {
          x: "sport",
          y1: "sex",
          y2: "sex",
          markerStart: "dot",
          markerEnd: "arrow",
          stroke: "sex",
          strokeWidth: 2,
        },
      ),
    ),
  ],
});
```

:::

The group transform comes in four orientations:

- [groupX](#plot-transforms--group--groupX) groups on **x**, and often outputs
  **y** as in a vertical↑ bar chart;
- [groupY](#plot-transforms--group--groupY) groups on **y**, and often outputs
  **x** as in a horizontal→ bar chart;
- [groupZ](#plot-transforms--group--groupZ) groups on _neither_ **x** nor **y**,
  combining everything into one group; and
- [group](#plot-transforms--group--group) groups on _both_ **x** and **y**, and
  often outputs to **fill** or **r** as in a heatmap.

As you might guess, the groupY transform with the barX mark produces a
horizontal→ bar chart. (We must increase the **marginLeft** to avoid the _y_
axis labels from being cut off.)

:::plot defer https://observablehq.com/@observablehq/plot-sorted-horizontal-bars

```js
Plot.plot({
  marginLeft: 100,
  x: { grid: true },
  y: { label: null },
  marks: [
    Plot.barX(
      olympians,
      Plot.groupY({ x: "count" }, { y: "sport", sort: { y: "x" } }),
    ),
    Plot.ruleX([0]),
  ],
});
```

:::

You can produce a two-dimensional heatmap with group transform and a cell mark
by generating a **fill** output channel. For example, we could show the median
weight of athletes by sport (**x**) and sex (**y**).

:::plot defer
https://observablehq.com/@observablehq/plot-grouped-olympians-heatmap

```js-vue
Plot.plot({
  marginBottom: 80,
  x: {label: null, tickRotate: 90},
  y: {label: null},
  color: {label: "Median weight (kg)", legend: true, scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.group({fill: "median"}, {fill: "weight", x: "sport", y: "sex"}))
  ]
})
```

:::

Or, we could group athletes by sport and the number of gold medals 🥇 won.
([Michael Phelps](https://en.wikipedia.org/wiki/Michael_Phelps), the most
decorated Olympian of all time, won five gold medals in the 2016 Summer
Olympics. [Simone Biles](https://en.wikipedia.org/wiki/Simone_Biles) and
[Katie Ledecky](https://en.wikipedia.org/wiki/Katie_Ledecky) each won four.)

:::plot defer
https://observablehq.com/@observablehq/plot-olympians-by-gold-medals

```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  color: {type: "sqrt", scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.group({fill: "count"}, {x: "sport", y: "gold"}))
  ]
})
```

:::

We could instead output **r** and use a [dot mark](#plot-marks--dot) whose size
again represents the number of athletes in each group.

:::plot defer
https://observablehq.com/@observablehq/plot-olympians-by-gold-medals-proportional-dots

```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {type: "point", label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  r: {range: [0, 12]},
  marks: [
    Plot.dot(olympians, Plot.group({r: "count"}, {x: "sport", y: "gold"}))
  ]
})
```

:::

We can add the **stroke** channel to show overlapping distributions by sex.

:::plot defer
https://observablehq.com/@observablehq/plot-olympians-by-gold-medals-overlapping-dots

```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {type: "point", label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  r: {range: [0, 12]},
  marks: [
    Plot.dot(olympians, Plot.group({r: "count"}, {x: "sport", y: "gold", stroke: "sex"}))
  ]
})
```

:::

To group solely on **z** (or **fill** or **stroke**), use
[groupZ](#plot-transforms--group--groupZ). The single stacked bar chart below
(an alternative to a pie chart) shows the proportion of athletes by sport. The
_proportion_ reducer converts counts into normalized proportions adding up to 1,
while the _first_ reducer pulls out the name of the sport for labeling.

:::plot defer https://observablehq.com/@observablehq/plot-single-stacked-bar

```js
Plot.plot({
  height: 100,
  x: { percent: true },
  marks: [
    Plot.barX(
      olympians,
      Plot.stackX(
        { order: "x", reverse: true },
        Plot.groupZ(
          { x: "proportion" },
          { z: "sport", fillOpacity: 0.2, inset: 0.5 },
        ),
      ),
    ),
    Plot.text(
      olympians,
      Plot.filter(
        (D) => D.length > 200,
        Plot.stackX(
          { order: "x", reverse: true },
          Plot.groupZ(
            { x: "proportion", text: "first" },
            { z: "sport", text: "sport", rotate: 90 },
          ),
        ),
      ),
    ),
    Plot.ruleX([0, 1]),
  ],
});
```

:::

:::info Although barX applies an implicit stackX transform,
[textX](#plot-marks--text) does not; this example uses an explicit stackX
transform in both cases for clarity, and to pass the additional **order** and
**reverse** options to place the largest sport on the left. The
[filter transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/filter.md)
is applied after the stack transform to hide the labels on the smallest sports
where the bars are too thin. :::

<a id="plot-transforms--group--group-options"></a>

## Group options

Given input _data_ = [_d₀_, _d₁_, _d₂_, …], by default the resulting grouped
data is an array of arrays where each inner array is a subset of the input data
such as [[_d₁_, _d₂_, …], [_d₀_, …], …]. Each inner array is in input order. The
outer array is in input order according to the first element of each group.

By specifying a different reducer for the **data** output, as described below,
you can change how the grouped data is computed. The outputs may also include
**filter** and **sort** options specified as reducers, and a **reverse** option
to reverse the order of generated groups. By default, empty groups are omitted,
and non-empty groups are generated in ascending (natural) order.

In addition to data, the following channels are automatically output:

- **x** - the horizontal position of the group
- **y** - the vertical position of the group
- **z** - the first value of the _z_ channel, if any
- **fill** - the first value of the _fill_ channel, if any
- **stroke** - the first value of the _stroke_ channel, if any

The **x** output channel is only computed by the groupX and group transform;
similarly the **y** output channel is only computed by the groupY and group
transform.

You can declare additional output channels by specifying the channel name and
desired reducer in the _outputs_ object which is the first argument to the
transform. For example, to use groupX to generate a **y** channel of group
counts as in a frequency histogram:

```js
Plot.groupX({ y: "count" }, { x: "species" });
```

The following named reducers are supported:

- _first_ - the first value, in input order
- _last_ - the last value, in input order
- _count_ - the number of elements (frequency)
- _sum_ - the sum of values
- _proportion_ - the sum proportional to the overall total (weighted frequency)
- _proportion-facet_ - the sum proportional to the facet total
- _min_ - the minimum value
- _min-index_ - the zero-based index of the minimum value
- _max_ - the maximum value
- _max-index_ - the zero-based index of the maximum value
- _mean_ - the mean value (average)
- _median_ - the median value
- _mode_ - the value with the most occurrences
- _pXX_ - the percentile value, where XX is a number in [00,99]
- _deviation_ - the standard deviation
- _variance_ - the variance per
  [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
- _identity_ - the array of values
- _x_ <VersionBadge version="0.6.12" pr="1916" /> - the group’s _x_ value (when
  grouping on _x_)
- _y_ <VersionBadge version="0.6.12" pr="1916" /> - the group’s _y_ value (when
  grouping on _y_)
- _z_ <VersionBadge version="0.6.14" pr="1959" /> - the group’s _z_ value (_z_,
  _fill_, or _stroke_)

In addition, a reducer may be specified as:

- a function to be passed the array of values for each group and the extent of
  the group
- an object with a **reduceIndex** method, an optionally a **scope**

In the last case, the **reduceIndex** method is repeatedly passed three
arguments: the index for each group (an array of integers), the input channel’s
array of values, and the extent of the group (an object {data, x, y}); it must
then return the corresponding aggregate value for the group.

If the reducer object’s **scope** is _data_, then the **reduceIndex** method is
first invoked for the full data; the return value of the **reduceIndex** method
is then made available as a third argument (making the extent the fourth
argument). Similarly if the **scope** is _facet_, then the **reduceIndex**
method is invoked for each facet, and the resulting reduce value is made
available while reducing the facet’s groups. (This optional **scope** is used by
the _proportion_ and _proportion-facet_ reducers.)

Most reducers require binding the output channel to an input channel; for
example, if you want the **y** output channel to be a _sum_ (not merely a
count), there should be a corresponding **y** input channel specifying which
values to sum. If there is not, _sum_ will be equivalent to _count_.

```js
Plot.groupX({ y: "sum" }, { x: "species", y: "body_mass_g" });
```

You can control whether a channel is computed before or after grouping. If a
channel is declared only in _options_ (and it is not a special group-eligible
channel such as **x**, **y**, **z**, **fill**, or **stroke**), it will be
computed after grouping and be passed the grouped data: each datum is the array
of input data corresponding to the current group.

```js
Plot.groupX({ y: "count" }, {
  x: "species",
  title: (group) => group.map((d) => d.body_mass_g).join("\n"),
});
```

This is equivalent to declaring the channel only in _outputs_.

```js
Plot.groupX({
  y: "count",
  title: (group) => group.map((d) => d.body_mass_g).join("\n"),
}, { x: "species" });
```

However, if a channel is declared in both _outputs_ and _options_, then the
channel in _options_ is computed before grouping and can be aggregated using any
built-in reducer (or a custom reducer function) during the group transform.

```js
Plot.groupX({ y: "count", title: (masses) => masses.join("\n") }, {
  x: "species",
  title: "body_mass_g",
});
```

If any of **z**, **fill**, or **stroke** is a channel, the first of these
channels is considered the _z_ dimension and will be used to subdivide groups.

The default reducer for the **title** channel returns a summary list of the top
5 values with the corresponding number of occurrences.

<a id="plot-transforms--group--group"></a>

## group(_outputs_, _options_)

```js
Plot.group({ fill: "count" }, { x: "island", y: "species" });
```

Groups on **x**, **y**, and the first channel of **z**, **fill**, or **stroke**,
if any.

<a id="plot-transforms--group--groupX"></a>

## groupX(_outputs_, _options_)

```js
Plot.groupX({ y: "sum" }, { x: "species", y: "body_mass_g" });
```

Groups on **x** and the first channel of **z**, **fill**, or **stroke**, if any.

<a id="plot-transforms--group--groupY"></a>

## groupY(_outputs_, _options_)

```js
Plot.groupY({ x: "sum" }, { y: "species", x: "body_mass_g" });
```

Groups on **y** and the first channel of **z**, **fill**, or **stroke**, if any.

<a id="plot-transforms--group--groupZ"></a>

## groupZ(_outputs_, _options_)

```js
Plot.groupZ({ x: "proportion" }, { fill: "species" });
```

Groups on the first channel of **z**, **fill**, or **stroke**, if any. If none
of **z**, **fill**, or **stroke** are channels, then all data (within each
facet) is placed into a single group.

<a id="plot-transforms--group--find"></a>

## find(_test_) <VersionBadge version="0.6.12" pr="1914" />

```js
Plot.groupX(
  { y1: Plot.find((d) => d.sex === "F"), y2: Plot.find((d) => d.sex === "M") },
  { x: "date", y: "value" },
);
```

Returns a reducer that finds the first datum for which the given _test_ function
returns a truthy value, and returns the corresponding channel value. This may be
used with the group or bin transform to implement a “pivot wider” transform; for
example, a “tall” dataset with separate rows for male and female observations
may be transformed into a “wide” dataset with separate columns for male and
female values.

---

<a id="plot-transforms--normalize"></a>

# transforms/normalize.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/normalize.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const stateage = shallowRef([]);
const stocks = shallowRef([]);
const xy = Plot.normalizeX("sum", {z: "state", x: "population", y: "state"});

onMounted(() => {
  Promise.all([
    d3.csv("../data/aapl.csv", d3.autoType),
    d3.csv("../data/amzn.csv", d3.autoType),
    d3.csv("../data/goog.csv", d3.autoType),
    d3.csv("../data/ibm.csv", d3.autoType)
  ]).then((datas) => {
    stocks.value = d3.zip(["AAPL", "AMZN", "GOOG", "IBM"], datas).flatMap(([Symbol, data]) => data.map((d) => ({Symbol, ...d})));
  });
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

<a id="plot-transforms--normalize--normalize-transform"></a>

# Normalize transform

The **normalize transform** is a specialized
[map transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md)
that normalizes series values relative to some basis, say to convert absolute
values into relative values. For example, here is an index chart — a type of
multi-series line chart — showing the return of several stocks relative to their
closing price on a particular date.

:::plot defer https://observablehq.com/@observablehq/plot-index-chart

```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (x) => f((x - 1) * 100))(d3.format("+d")),
  },
  marks: [
    Plot.ruleY([1]),
    Plot.line(
      stocks,
      Plot.normalizeY({
        x: "Date",
        y: "Close",
        stroke: "Symbol",
      }),
    ),
    Plot.text(
      stocks,
      Plot.selectLast(Plot.normalizeY({
        x: "Date",
        y: "Close",
        z: "Symbol",
        text: "Symbol",
        textAnchor: "start",
        dx: 3,
      })),
    ),
  ],
});
```

:::

:::tip The
[select transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/select.md)
is used to label the endpoints of each line. :::

:::info This example uses an
[immediately-invoked function expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
for the **tickFormat** option so that the
[d3.format](https://d3js.org/d3-format) only needs to be constructed once. :::

The normalize transform converts absolute values into relative ones. So, if
**y** is [_y₀_, _y₁_, _y₂_, …] and the _first_ basis is used with
[normalizeY](#plot-transforms--normalize--normalizeY), the resulting output
**y** channel is [_y₀_ / _y₀_, _y₁_ / _y₀_, _y₂_ / _y₀_, …]. But it’s a bit more
complicated than this in practice since **y** is first grouped by **z**,
**fill**, or **stroke** into separate series.

As another example, the normalize transform can be used to compute proportional
demographics from absolute populations. The plot below compares the demographics
of U.S. states: color represents age group, **y** represents the state, and
**x** represents the proportion of the state’s population in that age group.

:::plot defer https://observablehq.com/@observablehq/plot-dot-plot

```js
Plot.plot({
  height: 660,
  axis: null,
  grid: true,
  x: {
    axis: "top",
    label: "Population (%)",
    percent: true,
  },
  color: {
    scheme: "spectral",
    domain: stateage.ages, // in age order
    legend: true,
  },
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(
      stateage,
      Plot.groupY({ x1: "min", x2: "max" }, { ...xy, sort: { y: "x1" } }),
    ),
    Plot.dot(stateage, { ...xy, fill: "age", title: "age" }),
    Plot.text(
      stateage,
      Plot.selectMinX({ ...xy, textAnchor: "end", dx: -6, text: "state" }),
    ),
  ],
});
```

:::

```js
xy = Plot.normalizeX("sum", { z: "state", x: "population", y: "state" });
```

:::tip To reduce code duplication, pull shared options out into an object (here
`xy`) and then merge them into each mark’s options using the spread operator
(`...`). :::

<a id="plot-transforms--normalize--normalize-options"></a>

## Normalize options

The **basis** option specifies how to normalize the series values; it is one of:

- _first_ - the first value, as in an index chart; the default
- _last_ - the last value
- _min_ - the minimum value
- _max_ - the maximum value
- _mean_ - the mean value (average)
- _median_ - the median value
- _pXX_ - the percentile value, where XX is a number in [00,99]
- _sum_ - the sum of values
- _extent_ - the minimum is mapped to zero, and the maximum to one
- _deviation_ - subtract the mean, then divide by the standard deviation
- a function to be passed an array of values, returning the desired basis
- a function to be passed an index and channel value array, returning the
  desired basis

<a id="plot-transforms--normalize--normalize"></a>

## normalize(_basis_) <VersionBadge version="0.2.3" />

```js
Plot.map({ y: Plot.normalize("first") }, {
  x: "Date",
  y: "Close",
  stroke: "Symbol",
});
```

Returns a normalize map method for the given _basis_, suitable for use with the
[map transform](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md).

<a id="plot-transforms--normalize--normalizeX"></a>

## normalizeX(_basis_, _options_)

```js
Plot.normalizeX("first", { y: "Date", x: "Close", stroke: "Symbol" });
```

Like
[mapX](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md#mapX),
but applies the normalize map method with the given _basis_. The **basis**
option can also be mixed into the specified _options_ like so:

```js
Plot.normalizeX({ basis: "first", y: "Date", x: "Close", stroke: "Symbol" });
```

If not specified, the _basis_ defaults to _first_.

<a id="plot-transforms--normalize--normalizeY"></a>

## normalizeY(_basis_, _options_)

```js
Plot.normalizeY("first", { x: "Date", y: "Close", stroke: "Symbol" });
```

Like
[mapY](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/map.md#mapY),
but applies the normalize map method with the given _basis_. The **basis**
option can also be mixed into the specified _options_ like so:

```js
Plot.normalizeY({ basis: "first", x: "Date", y: "Close", stroke: "Symbol" });
```

If not specified, the _basis_ defaults to _first_.

---

<a id="plot-transforms--sort"></a>

# transforms/sort.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/sort.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import cars from "../data/cars.ts";

const sorted = ref(true);
const order = ref("ascending");
const bls = shallowRef([]);
const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

onMounted(() => {
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv")
  ]).then(([_us, _population]) => {
    const map = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.population = map.get(g.id)));
    us.value = _us;
  });
});

</script>

<a id="plot-transforms--sort--sort-transform"></a>

# Sort transform

The **sort transform** sorts a mark’s index to change the effective order of
data. The sort transform affects the order in which a mark’s graphical elements
are drawn ([z-order](https://en.wikipedia.org/wiki/Z-order)), which can have a
dramatic effect when these elements overlap. For example, see the bubble map of
U.S. county population below; when the null sort order is used for input order,
many small dots are hidden underneath larger ones.

<p>
  <label class="label-input">
    Sort by descending radius (r):
    <input type="checkbox" v-model="sorted">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-dot-sort

```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, { strokeOpacity: 0.4 }),
    Plot.dot(
      counties,
      Plot.geoCentroid({
        r: (d) => d.properties.population,
        fill: "currentColor",
        stroke: "var(--vp-c-bg)",
        strokeWidth: 1,
        sort: sorted ? { channel: "-r" } : null,
      }),
    ),
  ],
});
```

:::

:::tip Dots are sorted by descending **r** by default, so you may not need the
**sort** option. :::

The sort transform can be applied either via the **sort**
[mark option](#plot-features--marks--mark-options), as above, or as an explicit
[sort transform](#plot-transforms--sort--sort). The latter is generally only
needed when composing multiple transforms, or to disambiguate the sort transform
from imputed ordinal scale domains, _i.e._,
[scale sorting](#plot-features--scales--sort-mark-option).

As another example, in the line chart of unemployment rates below, lines for
metropolitan areas in Michigan (which saw exceptionally high unemployment
following the
[financial crisis of 2008](https://en.wikipedia.org/wiki/2007–2008_financial_crisis),
in part due to the
[auto industry collapse](https://en.wikipedia.org/wiki/2008–2010_automotive_industry_crisis))
are highlighted in
<span style="border-bottom: solid 2px var(--vp-c-red);">red</span>, and the
**sort** option is used to draw them on top of other series.

:::plot https://observablehq.com/@observablehq/plot-multiple-line-highlight

```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)",
  },
  color: {
    domain: [false, true],
    range: ["#ccc", "red"],
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      sort: (d) => /, MI /.test(d.division),
      stroke: (d) => /, MI /.test(d.division),
    }),
  ],
});
```

:::

:::tip You could say `sort: {channel: "stroke"}` here to avoid repeating the
test function. :::

The index order also affects the behavior of certain transforms such as
[stack](#plot-transforms--stack) and
[dodge](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/dodge.md).

<p>
  <span class="label-input">
    Sort x order:
    <label style="margin-left: 0.5em;"><input type="radio" name="order" value="ascending" v-model="order" /> ascending</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="order" value="descending" v-model="order" /> descending</label>
  </span>
</p>

:::plot https://observablehq.com/@observablehq/plot-dodge-cars-2

```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dotX(
      cars,
      Plot.dodgeY({
        x: "weight (lb)",
        title: "name",
        fill: "currentColor",
        sort: { channel: "x", order },
      }),
    ),
  ],
});
```

:::

The closely-related [reverse transform](#plot-transforms--sort--reverse)
likewise reverses the mark index, while the
[shuffle transform](#plot-transforms--sort--shuffle) for randomizes the mark
index’s order.

<a id="plot-transforms--sort--sort"></a>

## sort(_order_, _options_)

```js
Plot.sort("body_mass_g", { x: "culmen_length_mm", y: "culmen_depth_mm" });
```

Sorts the data by the specified _order_, which is one of:

- a comparator function, as with
  [_array_.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- an accessor function
- a field name
- a {_channel_, _order_} object

In the object case, the **channel** option specifies the name of the channel,
while the **order** option specifies _ascending_ (the default) or _descending_
order. You can also use the shorthand <span style="white-space: nowrap;">_-name_
<VersionBadge version="0.6.7" /></span> to sort by descending order of the
channel with the given _name_. For example, `sort: {channel: "-r"}` will sort by
descending radius (**r**).

In the function case, if the sort function does not take exactly one argument,
it is interpreted as a comparator function; otherwise it is interpreted as an
accessor function.

<a id="plot-transforms--sort--shuffle"></a>

## shuffle(_options_)

```js
Plot.shuffle({ x: "culmen_length_mm", y: "culmen_depth_mm" });
```

Shuffles the data randomly. If a **seed** option is specified, a
[linear congruential generator](https://d3js.org/d3-random#randomLcg) with the
given seed is used to generate random numbers; otherwise, Math.random is used.

<a id="plot-transforms--sort--reverse"></a>

## reverse(_options_)

```js
Plot.reverse({ x: "culmen_length_mm", y: "culmen_depth_mm" });
```

Reverses the order of the data.

---

<a id="plot-transforms--stack"></a>

# transforms/stack.md

Source:
https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/stack.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import alphabet from "../data/alphabet.ts";
import crimea from "../data/crimea.ts";
import {computed, ref, shallowRef, onMounted} from "vue";

const congress = shallowRef([]);
const offsets = ref("wiggle");
const offset = computed(() => offsets.value === "null" ? null : offsets.value);
const orders = ref("appearance");
const order = computed(() => orders.value === "null" ? null : orders.value);
const reverse = ref(true);
const riaa = shallowRef([]);
const survey = shallowRef([]);
const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/riaa-us-revenue.csv", d3.autoType).then((data) => (riaa.value = data));
  d3.csv("../data/survey.csv", d3.autoType).then((data) => (survey.value = data));
  d3.csv("../data/us-congress-2023.csv", d3.autoType).then((data) => (congress.value = data));
});

function Likert(responses) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    offset(I, X1, X2, Z) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) => (X2[i] - X1[i]) * (1 - map.get(Z[i]))) / 2;
          for (const i of stack) {
            X1[i] -= k;
            X2[i] -= k;
          }
        }
      }
    }
  };
}

const likert = Likert([
  ["Strongly Disagree", -1],
  ["Disagree", -1],
  ["Neutral", 0],
  ["Agree", 1],
  ["Strongly Agree", 1]
]);

</script>

<a id="plot-transforms--stack--stack-transform"></a>

# Stack transform

The **stack transform** comes in two orientations:
[stackY](#plot-transforms--stack--stackY) replaces **y** with **y1** and **y2**
to form vertical↑ stacks grouped on **x**, while
[stackX](#plot-transforms--stack--stackX) replaces **x** with **x1** and **x2**
for horizontal→ stacks grouped on **y**. In effect, stacking transforms a
_length_ into _lower_ and _upper_ positions: the upper position of each element
equals the lower position of the next element in the stack. Stacking makes it
easier to perceive a total while still showing its parts.

For example, below is a stacked area chart of
[deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War)
— predominantly from
<span :style="{borderBottom: `solid ${scheme[0]} 3px`}">disease</span> — using
Florence Nightingale’s data.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-casualties

```js
Plot.plot({
  y: { grid: true },
  color: { legend: true },
  marks: [
    Plot.areaY(crimea, { x: "date", y: "deaths", fill: "cause" }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip The [areaY mark](#plot-marks--area) applies the stackY transform
implicitly if you do not specify either **y1** or **y2**. The same applies to
[barY](#plot-marks--bar) and [rectY](#plot-marks--rect). You can invoke the
stack transform explicitly as
`Plot.stackY({x: "date", y: "deaths", fill: "cause"})` to produce an identical
chart. :::

The stack transform works with any mark that consumes **y1** & **y2** or **x1**
& **x2**, so you can stack rects, too.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-recty

```js
Plot.plot({
  y: { grid: true },
  marks: [
    Plot.rectY(crimea, {
      x: "date",
      y: "deaths",
      interval: "month",
      fill: "cause",
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::info The
[**interval** mark option](https://github.com/observablehq/plot/tree/v0.6.17/docs/transforms/interval.md)
specifies the periodicity of the data; without it, Plot wouldn’t know how wide
to make the rects. :::

And you can stack bars if you’d prefer to treat _x_ as ordinal.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-bary

```js
Plot.plot({
  x: {
    interval: "month",
    tickFormat: (d) => d.toLocaleString("en", { month: "narrow" }),
    label: null,
  },
  y: { grid: true },
  marks: [
    Plot.barY(crimea, { x: "date", y: "deaths", fill: "cause" }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::info The
[**interval** scale option](#plot-features--scales--scale-transforms) specifies
the periodicity of the data; without it, any gaps in the data would not be
visible since barY implies that _x_ is ordinal. :::

The stackY transform also outputs **y** representing the midpoint of **y1** and
**y2**, and likewise stackX outputs **x** representing the midpoint of **x1**
and **x2**. This is useful for point-based marks such as
[text](#plot-marks--text) and [dot](#plot-marks--dot). Below, a single stacked
horizontal [bar](#plot-marks--bar) shows the relative frequency of English
letters; this form is a compact alternative to a pie 🥧 or donut 🍩 chart.

:::plot https://observablehq.com/@observablehq/plot-stacked-percentages

```js
Plot.plot({
  x: { percent: true },
  marks: [
    Plot.barX(
      alphabet,
      Plot.stackX({ x: "frequency", fillOpacity: 0.3, inset: 0.5 }),
    ),
    Plot.textX(
      alphabet,
      Plot.stackX({ x: "frequency", text: "letter", inset: 0.5 }),
    ),
    Plot.ruleX([0, 1]),
  ],
});
```

:::

The **order** option controls the order in which the layers are stacked. It
defaults to null, meaning to respect the input order of the data. The
_appearance_ order excels when each series has a prominent peak, as in the chart
below of
[recording industry](https://en.wikipedia.org/wiki/Recording_Industry_Association_of_America)
revenue. <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">Compact
disc</span> sales started declining well before the rise of
<span :style="{borderBottom: `solid 2px ${scheme[1]}`}">downloads</span> and
<span :style="{borderBottom: `solid 2px ${scheme[3]}`}">streaming</span>,
suggesting that the industry was slow to provide a convenient digital product
and hence lost revenue to piracy.

<p>
  <label class="label-input">
    Order:
    <select v-model="orders">
      <option>null</option>
      <option>appearance</option>
      <option>inside-out</option>
      <option>sum</option>
      <option>group</option>
      <option>z</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-stacking-order

```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000, // convert millions to billions
  },
  color: { legend: true },
  marks: [
    Plot.areaY(riaa, {
      x: "year",
      y: "revenue",
      z: "format",
      fill: "group",
      order,
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

:::info In this data, the _group_ field is a supercategory of the _format_
field, which is useful to avoid overwhelming the color encoding with too many
categories. For example, the _Vinyl_ group includes both the _LP/EP_ and _Vinyl
Single_ formats. :::

The **reverse** option reverses the order of layers. In conjunction with the
_appearance_ order, now layers enter from the bottom rather than the top.

<p>
  <label class="label-input">
    Reverse:
    <input type="checkbox" v-model="reverse">
  </label>
</p>

:::plot defer
https://observablehq.com/@observablehq/plot-stacking-order-and-reverse

```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000, // convert millions to billions
  },
  color: { legend: true },
  marks: [
    Plot.areaY(
      riaa,
      Plot.stackY({ order: "appearance", reverse }, {
        x: "year",
        y: "revenue",
        z: "format",
        fill: "group",
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

:::tip The **reverse** option is also used by the
[sort transform](#plot-transforms--sort). To disambiguate, pass the _stack_
options separately using the two-argument form of the stack transform as above.
:::

The _value_ **order** is worth special mention: it sorts each stack by value
independently such that the order of layers can change, emphasizing the changing
ranks of layers. This is sometimes called a “ribbon” chart. (In fact, the
default null **order** supports changing order of layers, too! But most often
data comes already sorted by series.)

:::plot defer https://observablehq.com/@observablehq/plot-ribbon-chart

```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000, // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {
      x: "year",
      y: "revenue",
      z: "format",
      fill: "group",
      order: "value",
    }),
    Plot.ruleY([0]),
  ],
});
```

:::

The **offset** option controls the baseline of stacked layers. It defaults to
null for a _y_ = 0 baseline (for stackY, or _x_ = 0 for stackX). The _center_
**offset** centers each stack independently per
[Havre _et al._](https://innovis.cpsc.ucalgary.ca/innovis/uploads/Courses/InformationVisualizationDetails2009/Havre2000.pdf);
the _wiggle_ **offset** minimizes apparent movement per
[Byron & Wattenberg](http://leebyron.com/streamgraph/stackedgraphs_byron_wattenberg.pdf);
these two offsets produce “streamgraphs”, so called for their fluid appearance.
The _wiggle_ **offset** changes the default **order** to _inside-out_ to further
minimize movement.

<p>
  <label class="label-input">
    Offset:
    <select v-model="offsets">
      <option>null</option>
      <option>center</option>
      <option>wiggle</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-stack-offset

```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000,
  },
  marks: [
    Plot.areaY(riaa, {
      x: "year",
      y: "revenue",
      z: "format",
      fill: "group",
      offset,
    }),
  ],
});
```

:::

:::warning CAUTION When **offset** is not null, the _y_ axis is harder to use
because there is no longer a shared baseline at _y_ = 0, though it is still
useful for eyeballing length. :::

The _normalize_ **offset** is again worth special mention: it scales stacks to
fill the interval [0, 1], thereby showing the relative proportion of each layer.
Sales of <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">compact
discs</span> accounted for over 90% of revenue in the early 2000’s, but now most
revenue comes from
<span :style="{borderBottom: `solid 2px ${scheme[3]}`}">streaming</span>.

:::plot defer https://observablehq.com/@observablehq/plot-normalized-stack

```js
Plot.plot({
  y: {
    label: "Annual revenue (%)",
    percent: true,
  },
  marks: [
    Plot.areaY(
      riaa,
      Plot.stackY({ offset: "normalize", order: "group", reverse: true }, {
        x: "year",
        y: "revenue",
        z: "format",
        fill: "group",
      }),
    ),
    Plot.ruleY([0, 1]),
  ],
});
```

:::

When the provided length (typically **y**) is negative, in conjunction with the
null **offset** the stack transform will produce diverging stacks on opposites
sides of the zero baseline. The diverging stacked dot plot below shows the age
and gender distribution of the U.S. Congress in 2023. This form is also often
_popular_ for
[population pyramids](https://observablehq.com/@observablehq/plot-population-pyramid).

:::plot defer https://observablehq.com/@observablehq/plot-stacked-dots

```js
Plot.plot({
  aspectRatio: 1,
  x: { label: "Age (years)" },
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs,
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name",
      }),
    ),
    Plot.ruleY([0]),
  ],
});
```

:::

:::info The stackY2 transform places each dot at the upper bound of the
associated stacked interval, rather than the middle of the interval as when
using stackY. Hence, the first male dot is placed at _y_ = 1, and the first
female dot is placed at _y_ = -1. :::

When visualizing [Likert scale](https://en.wikipedia.org/wiki/Likert_scale)
survey results we may wish to place
<span :style="{borderWidth: 2, borderBottomStyle: 'solid', borderImage: `linear-gradient(to right, ${d3.schemeRdBu[5][0]}, ${d3.schemeRdBu[5][1]}) 2`}">negative</span>
(disagreeing) responses on the left and
<span :style="{borderWidth: 2, borderBottomStyle: 'solid', borderImage: `linear-gradient(to right, ${d3.schemeRdBu[5][3]}, ${d3.schemeRdBu[5][4]}) 2`}">positive</span>
(agreeing) responses on the right, leaving
<span :style="{borderBottom: `solid 2px ${d3.schemeRdBu[5][2]}`}">neutral</span>
responses in the middle. This is achieved below using a custom **offset**
function.

:::plot defer https://observablehq.com/@observablehq/plot-diverging-stacked-bar

```js
Plot.plot({
  x: { tickFormat: Math.abs },
  color: { domain: likert.order, scheme: "RdBu", legend: true },
  marks: [
    Plot.barX(
      survey,
      Plot.groupZ({ x: "count" }, {
        fy: "Question",
        fill: "Response",
        ...likert,
      }),
    ),
    Plot.ruleX([0]),
  ],
});
```

:::

Here `likert` declares which response values are negative (`-1`), which are
positive (`1`), and which are neutral (`0`).

```js
likert = Likert([
  ["Strongly Disagree", -1],
  ["Disagree", -1],
  ["Neutral", 0],
  ["Agree", 1],
  ["Strongly Agree", 1],
]);
```

And `Likert` implements the **order** (as an explicit array of ordinal values,
such that the ordinal color scale lists in the correct order rather than sorting
alphabetically) and **offset** (as a function that mutates the **x1** and **x2**
channel values) stack options.

```js
function Likert(responses) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    offset(I, X1, X2, Z) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) =>
            (X2[i] - X1[i]) * (1 - map.get(Z[i]))) / 2;
          for (const i of stack) {
            X1[i] -= k;
            X2[i] -= k;
          }
        }
      }
    },
  };
}
```

See the
[Marimekko example](https://observablehq.com/@observablehq/plot-marimekko) for
another interesting application of the stack transform.

<a id="plot-transforms--stack--stack-options"></a>

## Stack options

The stackY transform groups on **x** and transforms **y** into **y1** and
**y2**; the stackX transform groups on **y** and transforms **x** into **x1**
and **x2**. If **y** is not specified for stackY, or if **x** is not specified
for stackX, it defaults to the constant one, which is useful for constructing
simple isotype charts (_e.g._, stacked dots).

The supported stack options are:

- **offset** - the offset (or baseline) method
- **order** - the order in which stacks are layered
- **reverse** - true to reverse order

The following **order** methods are supported:

- null (default) - input order
- _value_ - ascending value order (or descending with **reverse**)
- _x_ - alias of _value_; for stackX only
- _y_ - alias of _value_; for stackY only
- _sum_ - order series by their total value
- _appearance_ - order series by the position of their maximum value
- _inside-out_ (default with _wiggle_) - order the earliest-appearing series on
  the inside
- a named field or function of data - order data by priority
- an array of _z_ values

The **reverse** option reverses the effective order. For the _value_ order,
stackY uses the _y_ value while stackX uses the _x_ value. For the _appearance_
order, stackY uses the _x_ position of the maximum _y_ value while stackX uses
the _y_ position of the maximum _x_ value. If an array of _z_ values are
specified, they should enumerate the _z_ values for all series in the desired
order; this array is typically hard-coded or computed with
[d3.groupSort](https://d3js.org/d3-array/group#groupSort). Note that the input
order (null) and _value_ order can produce crossing paths: they do not guarantee
a consistent series order across stacks.

The stack transform supports diverging stacks: negative values are stacked below
zero while positive values are stacked above zero. For stackY, the **y1**
channel contains the value of lesser magnitude (closer to zero) while the **y2**
channel contains the value of greater magnitude (farther from zero); the
difference between the two corresponds to the input **y** channel value. For
stackX, the same is true, except for **x1**, **x2**, and **x** respectively.

After all values have been stacked from zero, an optional **offset** can be
applied to translate or scale the stacks. The following **offset** methods are
supported:

- null (default) - a zero baseline
- _normalize_ - rescale each stack to fill [0, 1]
- _center_ - align the centers of all stacks
- _wiggle_ - translate stacks to minimize apparent movement
- a function to be passed a nested index, and start, end, and _z_ values

If a given stack has zero total value, the _normalize_ offset will not adjust
the stack’s position. Both the _center_ and _wiggle_ offsets ensure that the
lowest element across stacks starts at zero for better default axes. The
_wiggle_ offset is recommended for streamgraphs, and if used, changes the
default order to _inside-out_; see
[Byron & Wattenberg](http://leebyron.com/streamgraph/).

If the offset is specified as a function, it will receive four arguments: an
index of stacks nested by facet and then stack, an array of start values, an
array of end values, and an array of _z_ values. For stackX, the start and end
values correspond to **x1** and **x2**, while for stackY, the start and end
values correspond to **y1** and **y2**. The offset function is then responsible
for mutating the arrays of start and end values, such as by subtracting a common
offset for each of the indices that pertain to the same stack.

In addition to the **y1** and **y2** output channels, stackY computes a **y**
output channel that represents the midpoint of **y1** and **y2**; stackX does
the same for **x**. This can be used to position a label or a dot in the center
of a stacked layer. The **x** and **y** output channels are lazy: they are only
computed if needed by a downstream mark or transform.

If two arguments are passed to the stack transform functions below, the
stack-specific options (**offset**, **order**, and **reverse**) are pulled
exclusively from the first _options_ argument, while any channels (_e.g._,
**x**, **y**, and **z**) are pulled from second _options_ argument. Options from
the second argument that are not consumed by the stack transform will be passed
through. Using two arguments is sometimes necessary is disambiguate the option
recipient when chaining transforms.

<a id="plot-transforms--stack--stackY"></a>

## stackY(_stack_, _options_)

```js
Plot.stackY({ x: "year", y: "revenue", z: "format", fill: "group" });
```

Creates new channels **y1** and **y2**, obtained by stacking the original **y**
channel for data points that share a common **x** (and possibly **z**) value. A
new **y** channel is also returned, which lazily computes the middle value of
**y1** and **y2**. The input **y** channel defaults to a constant 1, resulting
in a count of the data points. The stack options (**offset**, **order**, and
**reverse**) may be specified as part of the _options_ object, if the only
argument, or as a separate _stack_ options argument.

<a id="plot-transforms--stack--stackY1"></a>

## stackY1(_stack_, _options_)

```js
Plot.stackY1({ x: "year", y: "revenue", z: "format", fill: "group" });
```

Like [stackY](#plot-transforms--stack--stackY), except that the **y1** channel
is returned as the **y** channel. This can be used, for example, to draw a line
at the bottom of each stacked area.

<a id="plot-transforms--stack--stackY2"></a>

## stackY2(_stack_, _options_)

```js
Plot.stackY2({ x: "year", y: "revenue", z: "format", fill: "group" });
```

Like [stackY](#plot-transforms--stack--stackY), except that the **y2** channel
is returned as the **y** channel. This can be used, for example, to draw a line
at the top of each stacked area.

<a id="plot-transforms--stack--stackX"></a>

## stackX(_stack_, _options_)

```js
Plot.stackX({ y: "year", x: "revenue", z: "format", fill: "group" });
```

Like [stackY](#plot-transforms--stack--stackY), but with _x_ as the input value
channel, _y_ as the stack index, _x1_, _x2_ and _x_ as the output channels.

<a id="plot-transforms--stack--stackX1"></a>

## stackX1(_stack_, _options_)

```js
Plot.stackX1({ y: "year", x: "revenue", z: "format", fill: "group" });
```

Like [stackX](#plot-transforms--stack--stackX), except that the **x1** channel
is returned as the **x** channel. This can be used, for example, to draw a line
at the left edge of each stacked area.

<a id="plot-transforms--stack--stackX2"></a>

## stackX2(_stack_, _options_)

```js
Plot.stackX2({ y: "year", x: "revenue", z: "format", fill: "group" });
```

Like [stackX](#plot-transforms--stack--stackX), except that the **x2** channel
is returned as the **x** channel. This can be used, for example, to draw a line
at the right edge of each stacked area.

## Upstream license

Copyright 2020-2025 Observable, Inc.

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

<!-- setup-data-project:observable-plot:0.6.17:complete -->
