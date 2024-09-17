import { useEffect } from "preact/hooks";
// @deno-types="@types/d3"
import * as d3 from "d3";

export default function Chart() {
  useEffect(() => {
    const data = [25, 30, 45, 60, 20, 65, 75];

    const svg = d3.select("#bar-chart")
      .attr("width", 500)
      .attr("height", 300);

    svg.selectAll("*").remove(); // Xóa nội dung cũ trước khi vẽ

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d) => 300 - d * 4)
      .attr("width", 65)
      .attr("height", (d) => d * 4)
      .attr("fill", "teal");
  }, []);

  return (
    <div>
      <h1>Biểu Đồ Cột D3.js</h1>
      <svg id="bar-chart" />
    </div>
  );
}