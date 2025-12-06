export const exporterUtil = {
  downloadSVG: (svgElement, filename = "heatmap.svg") => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  downloadPNG: (svgElement, filename = "heatmap.png", scale = 2) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const bbox = svgElement.getBBox();
    canvas.width = bbox.width * scale;
    canvas.height = bbox.height * scale;

    const img = new Image();
    img.onload = () => {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      });
    };

    const svgData = new XMLSerializer().serializeToString(svgElement);
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  },
};
