function PdfUploader() {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("pdf", file);

    await fetch("http://localhost:5000/api/upload-pdf", {
      method: "POST",
      body: formData,
    });
  };

  return <input type="file" accept="application/pdf" onChange={handleUpload} />;
}

export default PdfUploader;
