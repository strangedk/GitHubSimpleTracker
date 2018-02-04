import React from "react"

import {scaleLinear} from "d3-scale"
import {max} from "d3-array"
import {select} from "d3-selection"

import "../styles/barChartD3.css";

class BarChartD3 extends React.Component {
    monthes = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    updateChartComponent = () => {
        const node = this.node;
        const dataMax = max(this.props.data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.height]);

        select(node)
            .selectAll("text")
            .data(this.props.data)
            .enter()
            .append("text");

        select(node)
            .selectAll("text")
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll("text")
            .attr('x', (d, i) => {return (i * 20) - 3})
            .attr('y', (d, i) => {return this.props.height - yScale(d) - 2})
            .text((d, i) => {return d});

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect");

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', this.props.color)
            .attr('x', (d, i) => i * 20)
            .attr('y', d => this.props.height - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 10)
            .attr('key', (d, i) => i)
            .on("mousemove", (d, i) => this.onMouseMove(d, i))
            .on("mouseout", (d, i) => this.onMouseOut);
    };
    onMouseMove = (d, i) => {
        this.showTooltip(d);
    };
    onMouseOut = (e) => {
        this.hideTooltip();
    };
    showTooltip = (data, index) => {
        const chart = document.getElementById("chart");

        this.tooltip.x = chart.clientX;
        this.tooltip.y = chart.clientY;

        if (this.tooltip.style.visibility === "visible")
            return;

        this.tooltip.innerHTML = <b>{
            "commits count: " + data
        }</b>;

        this.tooltip.style.visibility = "visible";
    };
    hideTooltip = () => {
        this.tooltip.visibility = "hidden";
    };

    get tooltip() {
        return document.getElementById("chartTooltip");
    }

    componentDidMount() {
        this.updateChartComponent();
    }

    componentDidUpdate() {
        this.updateChartComponent();
    }

    render() {
        return (
            <div id="chart" className="bar-chart-container">
                <svg ref={(node) => {
                    this.node = node
                }} width={this.props.width} height={this.props.height}/>

                <div className="chart-monthes">
                    {
                        this.monthes.map((item, index) => {
                            return <small key={index}>
                                {index + 1}
                            </small>
                        })
                    }
                </div>

                <div id="chartTooltip" className="chart-tooltip"/>
            </div>
        );
    }
}

export default BarChartD3