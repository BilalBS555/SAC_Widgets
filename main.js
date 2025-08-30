class CustomBarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.chartData = [];
    this.barColor = "#4caf50"; // default color
  }

  // Called by SAC when the widget is initialized
  onCustomWidgetBeforeUpdate(changedProperties) {
    if (changedProperties.hasOwnProperty("barColor")) {
      this.barColor = changedProperties.barColor || "#4caf50";
    }
    if (changedProperties.hasOwnProperty("dataBinding")) {
      const data = changedProperties.dataBinding;
      this.setData(data);
    }
  }

  // Accept data from SAC
  setData(data) {
    if (!data || !data.raw || !data.raw.length) {
      this.chartData = [];
      this.render();
      return;
    }

    // Convert SAC dataset to { label, value } array
    this.chartData = data.raw.map(row => {
      return {
        label: row[0].label || row[0].id,
        value: row[1].value
      };
    });
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    if (!this.chartData || this.chartData.length === 0) {
      shadow.innerHTML = "<div>No data</div>";
      return;
    }

    // Find max value to auto-scale bars
    const maxValue = Math.max(...this.chartData.map(d => d.value));
    const scale = 150 / maxValue; // max bar height = 150px

    shadow.innerHTML = `
      <style>
        .bar-container {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          height: 200px;
        }
        .bar {
          width: 30px;
          background-color: ${this.barColor};
          text-align: center;
          color: white;
          font-size: 12px;
        }
        .label {
          text-align: center;
          margin-top: 5px;
          font-size: 12px;
        }
      </style>
      <div class="bar-container">
        ${this.chartData
          .map(
            d => `<div class="bar" style="height:${d.value * scale}px;" title="${d.label}: ${d.value}">${d.value}</div>`
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("custom-barchart", CustomBarChart);
