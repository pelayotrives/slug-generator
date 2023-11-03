function transformString(input) {
  return input
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/[\s_]+/g, "-")
    .replace(/[.,;:]/g, "")
    .replace(/[^a-zA-Z0-9-]/g, "");
}
