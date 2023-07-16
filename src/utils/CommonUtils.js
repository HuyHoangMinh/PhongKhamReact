class CommonUtils {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  static readFileBase64(file) {
    const fileBase64 = new Buffer(file, "base64").toString("binary");
    return fileBase64;
  }
}

export default CommonUtils;
