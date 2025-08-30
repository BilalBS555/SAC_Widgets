(function() {
    let template = document.createElement("template");
    template.innerHTML = `
      <style>@import url("style.css");</style>
      <div id="chart" style="display:flex; align-items:flex-end; height:200px;"></div>
    `;

    class CustomBarChart extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
        }

        onCustomWidgetBeforeUpdate(changedProps) {}

        onCustomWidgetAfterUpdate(changedProps) {
            if (this.dataBinding && this.dataBinding.data) {
                this.renderChart(this.dataBinding.data);
            }
        }

        renderChart(data) {
            let chartDiv = this._shadowRoot.getElementById("chart");
            chartDiv.innerHTML = "";
            data.forEach(row => {
                let bar = document.createElement("div");
                bar.style.height = row.value + "px";
                bar.style.width = "40px";
                bar.style.background = "steelblue";
                bar.style.margin = "5px";
                chartDiv.appendChild(bar);
            });
        }
    }

    customElements.define("custom-barchart", CustomBarChart);
})();