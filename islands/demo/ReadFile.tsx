import { useEffect, useState } from "preact/hooks";
// @deno-types="@types/d3"
import * as d3 from "d3";
import { Metadata } from "../../types/blog/post.ts";

export default function ReadFile() {
  const [posts, setPosts] = useState<Metadata[]>([]);
  const [chartData, setChartData] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/readPosts");
      const data: Metadata[] = await response.json();
      setPosts(data);
      processChartData(data);
    };

    fetchData();
  }, []);

  const processChartData = (data: Metadata[]) => {
    const countByMonth: Record<string, number> = {};

    // Đếm số lượng bài viết theo tháng
    data.forEach(item => {
      const month = new Date(item.date).toISOString().slice(0, 7); // YYYY-MM
      countByMonth[month] = (countByMonth[month] || 0) + 1;
    });

    // Lấy 3 tháng gần nhất
    const recentMonths = Object.keys(countByMonth).sort().reverse().slice(0, 3);
    const barData = recentMonths.map(month => ({
      month,
      count: countByMonth[month] || 0
    }));
    
    setChartData(barData);
  };

  useEffect(() => {
    if (chartData.length > 0) {
      drawBarChart(chartData);
    }
  }, [chartData]);

  const drawBarChart = (data: { month: string; count: number }[]) => {
    const svg = d3.select("#bar-chart")
      .attr("width", 500)
      .attr("height", 300);

    svg.selectAll("*").remove(); // Xóa nội dung cũ trước khi vẽ

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, 500])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([300, 0]);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.month))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", d => 300 - yScale(d.count))
      .attr("fill", "teal");

    // Thêm nhãn cho mỗi thanh
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.month) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.count) - 5) // Hiển thị trên thanh
      .attr("text-anchor", "middle")
      .text(d => d.count);

    // Thêm trục
    svg.append("g")
      .attr("transform", "translate(0,300)")
      .call(d3.axisBottom(xScale).tickFormat(month => {
        // Chuyển đổi định dạng tháng từ YYYY-MM sang tên tháng
        const date = new Date(`${month}-01`);
        return `Tháng ${date.getMonth() + 1}`; // Bắt đầu từ 0, cộng thêm 1
      }));

    svg.append("g")
      .call(d3.axisLeft(yScale));
  };

  return (
    <div>
      <h1>Bài viết:</h1>
      <svg id="bar-chart" />
    </div>
  );
}