import React from "react"
// Different part modules of D3 was used here,
// because D3 support for the last React version is unavailable now.
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
            .range([0, this.props.height - 15]);

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
            .selectAll("rect")
            .data(this.props.data)
            .style("fill", this.props.color)
            .attr("x", (d, i) => i * 20)
            .attr("y", d => this.props.height - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 10)
            .attr("id", (d, i) => ("bar" + i))
            .on("mousemove", (d, i) => this.onMouseMove(d, i))
            .on("mouseover", (d, i) => this.onMouseOver(d, i))
            .on("mouseout", () => this.onMouseOut());

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
            .attr("x", (d, i) => {
                return (i * 20)
            })
            .attr("y", (d) => {
                return this.props.height - yScale(d) - 3
            })
            .text((d) => {
                return d === 0 ? "" : d
            });
    };
    onMouseOver = (d, i) => {
        this.showTooltip(d, i);
    };
    onMouseMove = (d, i) => {
        if (this.tooltip.style.visibility === "hidden")
            return;

        let bar = document.getElementById("bar" + i);
        let pointY = (Math.floor(this.props.height - bar.height.baseVal.value - 10));
        let pointX = (Math.floor(bar.x.baseVal.value + 5));

        if (i >= this.monthes.length - this.monthes.length / 3) {
            pointX = this.props.width / 4;
        } else if (i >= this.monthes.length / 2) {
            pointX -= this.props.width / 3;
        }

        this.tooltip.style.top = pointY + "px";
        this.tooltip.style.left = pointX + "px";
    };
    onMouseOut = () => {
        this.hideTooltip();
    };
    showTooltip = (data, index) => {
        this.setState({
            tooltipText: `Commits per ${this.monthes[index]}: ${data}`
        });

        this.tooltip.style.display = "inline-block";
        this.tooltip.style.visibility = "visible";
    };
    hideTooltip = () => {
        this.tooltip.style.visibility = "hidden";
    };

    constructor(props) {
        super(props);

        this.state = {
            tooltipText: ""
        };
    }

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
                <b>Commits per year</b>

                <div className="chart-tooltip-holder">
                    <div id="chartTooltip" className="chart-tooltip">
                        <b>{this.state.tooltipText}</b>
                    </div>
                </div>

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
            </div>
        );
    }
}

export default BarChartD3