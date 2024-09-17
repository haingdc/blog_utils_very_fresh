// @deno-types="@types/d3@5.7.0"
import * as d3Old from "d3@5.7.0";
// @deno-types="@types/d3"
import * as d3 from "d3";

const { csv, csvParse, tsv, tsvParse } = d3; // d3-dsv
const { scaleLinear, scaleBand } = d3; // d3-scale
const { schemeCategory10 } = d3; // d3-scale-chromatic
const { line, curveCatmullRom } = d3; // d3-shape
const { max, min } = d3; // d3-array
const { select, selectAll } = d3; // d3-selection

const d4 = {
  ...d3Old,
  csv,
  csvParse,
  tsv,
  tsvParse,
  scaleLinear,
  scaleBand,
  schemeCategory10,
  line,
  curveCatmullRom,
  max,
  min,
  select,
  selectAll
};

export default d4;
