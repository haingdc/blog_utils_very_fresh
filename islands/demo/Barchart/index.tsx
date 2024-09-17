import { useEffect } from "preact/hooks";
// @deno-types="@types/d3"
import * as d3 from "d3";
import { Selection } from "d3";
import d4 from "../../../lib/d4.ts";
import { DataBarchart, DataItem } from "../../../types/blog/csv-sample.ts";

const width = 500;
const height = 500;
const margin = { top: 20, right: 0, bottom: 30, left: 40 };

// chỉ để qua đươc typescript check error
type SelectionOfSVGGElement = Selection<SVGGElement, undefined, null, unknown>;

export default function Barchart() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/readCsv");
      const value: DataBarchart = await response.json();
      console.log("inspect.islands.demo.Barchart", value);
      if (!value.data.length) {
        throw new Error("data is empty");
      }

      const x = d3.scaleBand()
        .domain(value.data.map((d) => d.name))
        //Here the domain is the letters in the our data and that's what will be written on the Axis
        .range([margin.left, width - margin.right])
        // margin.left and width-margin.right are respectively the minimum and maximum extents of the bands and that's where the axis will be placed.
        .padding(0.1);

      const maxY = d3.max(value.data, (d) => d.value);
      if (maxY === undefined) {
        if (!value.data.length) {
          throw new Error("data is empty");
        }
        throw new Error("accessor mapping is not correct");
      }
      const y = d3.scaleLinear()
        .domain([0, maxY]).nice()
        //Here the domain of y will vary between 0 and the maximum frequency of the letters and that's what will be written on the Axis
        .range([height - margin.bottom, margin.top]);
      //The extents of the bands will vary from height-margin to margin.top and that's where the axis will be placed.

      const xAxis = (g: SelectionOfSVGGElement) => {
        console.log("inspect.xAxis", g);
        return g
          .attr("transform", `translate(0,${height - margin.bottom})`) // This controls the vertical position of the Axis
          .call(d3.axisBottom(x).tickSizeOuter(0)); //Creates bottom horizontal axis with an  outer tick size equal to 0
      };
      const yAxis = (g: SelectionOfSVGGElement) =>
        g
          .attr("transform", `translate(${margin.left},0)`) // This controls the horizontal position of the Axis
          .call(d3.axisLeft(y)) //Creates left vertical axis
          .call((g) => g.select(".domain").remove()); //This removes the domain from the DOM API.
      const Tooltip = () => {
        const tooltip = d4
          .select("body")
          .append("div")
          .attr("class", "svg1-tooltip")
          .style("position", "absolute")
        .style("visibility", "hidden");

        // select all rect
        d4.selectAll("rect")
          .on("mouseover", function (_event: MouseEvent) {
            const d: DataItem = d3.select(this).datum() as DataItem;
            // change the selection style: width and color of the stroke which allows up to control of the shape of the ends of lines
            d4.select(this)
              .attr("stroke-width", "2")
              .attr("stroke", "black");
            // make the tooltip visible and update its text
            tooltip
              .style("visibility", "visible")
              .text(`frequency: ${d.value * 100}%\nletter: ${d.name}`); // the formating of the output text
          })
          .on("mousemove", function (event: MouseEvent) {
            tooltip
              .style("top", event.pageY - 90 + "px")
              .style("left", event.pageX + 90 + "px");
          })
          .on("mouseout", function () {
            // change the selection style
            d4.select(this).attr("stroke-width", "0");

            tooltip.style("visibility", "hidden");
          });
      };
      const JustAxis = () => {
        // creating of the svg object in the body of the page
        const svg = d3.create("svg")
          .attr("viewBox", [0, 0, width, height]); //This is the viewBox that we will be seeing (size of our svg)

        svg.append("g")
          .attr("class", "bars") // Adds the bars
          .attr("fill", "steelblue") //fills the bars with a steelblue color
          .selectAll("rect") //selects all the “rect” elements in the document.
          .data(value.data) // loops through each svg element and sets __data_ attribute
          .join("rect")
          .attr("x", (d) => {
            const value = x(d.name);
            if (value === undefined) return null;
            return value;
          }) //joins the x variable and use them to construct the bars
          .attr("y", (d) => y(d.value)) // joins the y variable and use them to construct the bars
          .attr("height", (d) => y(0) - y(d.value)) //sets the height of each bar following the value of each letter's frequency
          .attr("width", x.bandwidth()); //sets the width of each bar following the bandwidth of the variable x

        //Add the x-Axis
        svg.append("g")
          .attr("class", "x-axis")
          .call(xAxis);

        //Add the y-Axis
        svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis);

        const node = svg.node();
        if (node === null) {
          throw new Error("we can't find the svg node");
        }
        return node;
      };

      // Gắn SVG vào DOM
      try {
        const chartContainer = document.getElementById("chart-container");
        if (chartContainer === null) {
          throw new Error("we can't find the chart-container");
        }
        const svgNode = JustAxis();
        chartContainer.innerHTML = ""; // Xóa nội dung cũ
        chartContainer.appendChild(svgNode);
        Tooltip(); // Gọi hàm Tooltip ở đây
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: 420, margin: "0 auto" }}>
      <h1>islands/demo/Barchart.tsx</h1>
      <div id="chart-container"></div>
    </div>
  );
}
