import * as d3 from "d3";

export const scalesUtil = {
  palettes: {
    YlOrRd: [
      "#ffffcc",
      "#ffeda0",
      "#fed976",
      "#feb24c",
      "#fd8d3c",
      "#fc4e2a",
      "#e31a1c",
      "#bd0026",
      "#800026",
    ],
    BuPu: [
      "#f7fcfd",
      "#e0ecf4",
      "#bfd3e6",
      "#9ebcda",
      "#8c96c6",
      "#8c6bb1",
      "#88419d",
      "#810f7c",
      "#4d004b",
    ],
  },

  create: (data, mode = "quantile", palette = "YlOrRd") => {
    const values = data.filter((d) => d.value !== null).map((d) => d.value);
    const colors = scalesUtil.palettes[palette];

    switch (mode) {
      case "quantile":
        return d3.scaleQuantile().domain(values).range(colors);
      case "threshold":
        const min = d3.min(values);
        const max = d3.max(values);
        const step = (max - min) / colors.length;
        const thresholds = d3
          .range(colors.length - 1)
          .map((i) => min + step * (i + 1));
        return d3.scaleThreshold().domain(thresholds).range(colors);
      default:
        return d3.scaleQuantile().domain(values).range(colors);
    }
  },
};
